<script lang="ts" setup>
import { ref } from 'vue';

// Definimos la interfaz para los elementos de la lista
interface CollaboratorItem {
  id: number;
  text: string;
  weeks: number;
}

// Datos simulados basados en la imagen
const collaboratorItems = ref<CollaboratorItem[]>([
  { id: 1, text: 'Colaborador en esquema', weeks: 2 },
  { id: 2, text: 'Colaborador en esquema', weeks: 3 },
  { id: 3, text: 'Colaborador en esquema', weeks: 5 },
]);

// Función para manejar el click en un elemento (opcional)
const handleItemClick = (item: CollaboratorItem) => {
  console.log('Click en:', item);
};

// Función para manejar el click en el botón de info (opcional)
const handleInfoClick = () => {
  console.log('Click en información');
}
</script>

<template>
  <div class="scheme-card">
    <div class="card-header">
      <div class="header-title-group">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="#FFC107" stroke="none"/>
          <line x1="12" y1="9" x2="12" y2="13" stroke="#fff" stroke-width="2"/>
          <line x1="12" y1="17" x2="12.01" y2="17" stroke="#fff" stroke-width="3"/>
        </svg>
        <h2 class="title">Esquema Acciones y Consecuencias</h2>
      </div>
      
      <button class="info-button" @click="handleInfoClick" aria-label="Información">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <circle cx="12" cy="12" r="12" fill="#D1D5DB"/>
          <path d="M11 7h2v2h-2zm0 4h2v6h-2z" fill="#575F6E"/>
        </svg>
      </button>
    </div>

    <p class="description">
      Acompañamiento para mejorar el desempeño y alinearse al modelo <i>Somos Extraordinarios</i>.
    </p>

    <div class="list-container">
      <div 
        v-for="item in collaboratorItems" 
        :key="item.id" 
        class="list-item"
        @click="handleItemClick(item)"
      >
        <div class="item-icon-wrapper">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon-person" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        
        <div class="item-content">
          <span class="item-text">
            {{ item.text }} (<strong>{{ item.weeks }} sem</strong>)
          </span>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" class="icon-chevron" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Variables de color para facilitar ajustes */
:root {
  --card-bg: #F4F6F8;
  --text-primary: #333333;
  --text-secondary: #666666;
  --red-accent: #E31C23; /* Un rojo similar al de la imagen */
  --item-bg: #FFFFFF;
  --border-radius-card: 20px;
  --border-radius-item: 12px;
}

.scheme-card {
  background-color: var(--card-bg, #F4F6F8);
  padding: 24px;
  border-radius: var(--border-radius-card, 20px);
  max-width: 500px; /* Ajusta según necesites */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* --- Header --- */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.header-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-warning {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary, #333);
  margin: 0;
  line-height: 1.3;
  text-align: left;
}

.info-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

/* --- Description --- */
.description {
  color: var(--text-secondary, #666);
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 24px;
  text-align: left;
}

.description i {
  font-style: italic;
  

}

/* --- List Items --- */
.list-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.list-item {
  display: flex;
  align-items: center;
  background-color: var(--item-bg, #fff);
  padding: 12px;
  border-radius: var(--border-radius-item, 12px);
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  text-align: left;
}

.list-item:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.item-icon-wrapper {
  background-color: var(--red-accent, #E31C23);
  width: 40px;
  height: 40px;
  border-radius: 10px 0px; /* Un poco menos redondeado que el contenedor principal */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  flex-shrink: 0;
}

.icon-person {
  width: 24px;
  height: 24px;
}

.item-content {
  flex-grow: 1;
}

.item-text {
  font-size: 1rem;
  color: var(--text-primary, #333);
  font-weight: 500;
  
}

.item-text strong {
  font-weight: 700;
}

.icon-chevron {
  width: 20px;
  height: 20px;
  color: #9CA3AF; /* Color gris claro para la flecha */
  flex-shrink: 0;
}
</style>