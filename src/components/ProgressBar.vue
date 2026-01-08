<template>
  <div class="attribute-container">
    <header class="header">
      <div class="icon-gear">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.97 19.05,5.05L16.56,6.05C16.04,5.66 15.47,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.53,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.97 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.95C7.96,18.34 8.53,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.47,18.68 16.04,18.34 16.56,17.95L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
        </svg>
      </div>
      <h1 class="title">Atributos</h1>
    </header>

    <p class="description">
      Así nos perciben nuestros clientes en cada aspecto del servicio
    </p>

    <div class="attributes-list">
      <div v-for="attr in data" :key="attr.label" class="attribute-item">
        <label class="attribute-label">{{ attr.label }}</label>
        <div class="progress-container">
          <div 
            class="bar green" 
            :style="{ width: `${attr.positive}%` }"
          >
            {{ attr.positive }}%
          </div>
          <div 
              class="bar red" 
              :style="{ width: `${attr.opportunity}%` }"
            >
            {{ attr.opportunity }}%
          </div>
        </div>
      </div>
    </div>

    <footer class="legend">
      <div class="legend-item">
        <span class="dot green-dot"></span>
        <span class="legend-text">Lo que más valoran</span>
      </div>
      <div class="legend-item">
        <span class="dot red-dot"></span>
        <span class="legend-text">Áreas de oportunidad</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AtributeModel } from '../models/AtributeItemModel'

// =====================
// PROPS
// =====================
const props = defineProps<{
  items: AtributeModel
}>()

// =====================
// CONFIGURACIÓN DE ATRIBUTOS
// =====================
const ATTRIBUTE_CONFIG: Record<number, { label: string }> = {
  1: { label: 'Actitud de Servicio' },
  2: { label: 'Tiempo de información' },
  3: { label: 'Calidad de la información' },
  4: { label: 'Conocimiento del asesor' },
  5: { label: 'Imagen del asesor' }
}

// =====================
// NORMALIZADOR (reutilizado)
// =====================
const normalizePercentage = (value: number): number => {
  if (value > 1) {
    return Math.min(Math.round(value), 100)
  }
  return Math.min(Math.round(value * 100), 100)
}

// =====================
// MODELO INTERNO DEL COMPONENTE
// =====================
interface AttributeData {
  label: string
  positive: number
  opportunity: number
}

// =====================
// DATA FINAL PARA EL TEMPLATE
// =====================
const data = computed<AttributeData[]>(() => {
  if (!props.items || props.items.length === 0) return []

  return (
    props.items
      .filter(item => ATTRIBUTE_CONFIG[item.idAtributo])
      .sort((a, b) => a.idAtributo - b.idAtributo)
      .map(item => {
        const value = normalizePercentage(item.valorAtributo)
        return {
          label: ATTRIBUTE_CONFIG[item.idAtributo].label,
          positive: value,
          opportunity: 100 - value
        }
      })
  )
})
</script>


<style scoped>
.attribute-container {
  
  font-family: 'Poppins', sans-serif;
  color: #444;
  padding: 25px;

  
 /* Centra horizontalmente */
  align-items: center;     /* Centra verticalmente */
  text-align: center;      /* Asegura que el texto interno también se centre */
 
}

.header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.icon-gear {
  width: 32px;
  height: 32px;
  color: #a5afff;
}

.title {
  font-size: 24px;
  font-weight: 750;
  margin: 0;
  color: #333;
}

.description {
  font-size: 15px;
  color:  #666;
  margin-bottom: 25px;
  line-height: 1.2;
}

.attributes-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.attribute-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.attribute-label {
  font-weight: 600;
  text-align: left;
  font-size: 16px;
  color: #333;
}

.progress-container {
  display: flex;
  height: 28px;
  width: 100%;
  gap: 0; 
  align-items: center;
  /* Eliminamos overflow: hidden para que la curva de la roja se vea bien */
}

.bar {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 10px;
  height: 100%;
  position: relative; /* Necesario para que z-index funcione */
  min-width: ; /* Permite que las barras se reduzcan */
  flex-shrink: 0; /* Evita que se compriman */
}

.green {
  background-color:rgba(117, 203, 67, 0.99);
  border-radius: 20px 20px 20px 20px ;
  z-index: 1; /* Queda atrás */
}

.red {
  background-color: #e33127;
  border-radius: 20px 20px 20px 20px ; /* Forma de píldora completa */
  z-index: 2; /* Queda adelante */
  
  /* --- ESTO MUEVE LA BARRA HACIA LA IZQUIERDA --- */
  margin-left: -px; 
  /* Puedes ajustar este valor (ej: -10px, -20px) según qué tanto 
     quieras que se encime sobre la verde */
}
/* ------------------------------------ */

.legend {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}

.green-dot { background-color: #76cb43; }
.red-dot { background-color: #e33127; }

.legend-text {
  font-size: 14px;
  color: #666;
}
</style>