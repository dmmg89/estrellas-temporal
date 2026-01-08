<script setup lang="ts">
import type {AtributeModel} from "../models/AtributeItemModel.ts";

const props = defineProps<{
  atributos: AtributeModel;
}>();

const getPercentage = (score: number): number => {
  return Math.min(Math.max(score, 0), 100);
};

const getRemaining = (score: number): number => {
  return 100 - getPercentage(score);
};
</script>

<template>
  <div class="atributos-card">
    <div class="header">
      <div class="title-row">
        <div class="icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="gear-icon">
            <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.922-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.45-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd" />
          </svg>
        </div>
        <h2 class="main-title">Atributos</h2>
      </div>
      <p class="subtitle">Así nos perciben nuestros clientes en cada aspecto del servicio</p>
    </div>

    <div class="attributes-list">
      <div v-for="item in atributos" :key="item.idAtributo" class="attribute-item">
        <div class="attr-name">{{ item.nombreAtributo }}</div>

        <div class="progress-row">
          <span class="limit-label">0</span>

          <div class="progress-track">

            <div
                class="bar-layer green-layer"
                :style="{ width: `calc(${getPercentage(item.valorAtributo)}% + 15px)` }"
            >
               <span class="inner-text" v-if="getPercentage(item.valorAtributo) > 5">
                  {{ getPercentage(item.valorAtributo) }}%
               </span>
            </div>

            <div
                class="bar-layer red-layer"
                :style="{ width: `${getRemaining(item.valorAtributo)}%` }"
            >
               <span class="inner-text" v-if="getRemaining(item.valorAtributo) > 5">
                  {{ getRemaining(item.valorAtributo) }}%
               </span>
            </div>

          </div>

          <span class="limit-label">100%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos generales */
.atributos-card {
  background-color: #F9FAFB;
  border-radius: 24px;
  padding: 1.5rem;
  max-width: 400px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
}
.header { margin-bottom: 1.5rem; }
.title-row { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.icon-wrapper { display: flex; align-items: center; justify-content: center; }
.gear-icon { width: 24px; height: 24px; color: #818CF8; }
.main-title { margin: 0; font-size: 1.25rem; font-weight: 800; color: #374151; }
.subtitle { margin: 0; font-size: 0.9rem; color: #9CA3AF; font-weight: 500; }
.attributes-list { display: flex; flex-direction: column; gap: 1.2rem; }
.attribute-item { display: flex; flex-direction: column; gap: 6px; }
.attr-name { font-weight: 700; color: #4B5563; font-size: 0.95rem; }
.progress-row { display: flex; align-items: center; gap: 10px; }
.limit-label { font-size: 0.85rem; color: #D1D5DB; font-weight: 600; min-width: 10px; }


.progress-track {
  position: relative;
  flex-grow: 1;
  height: 16px;
  background-color: #E5E7EB;
  border-radius: 999px;
  overflow: hidden;
}

.bar-layer {
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.5s ease-out;
  overflow: hidden;
}

.green-layer {
  left: 0;
  background-color: #6BC63B;
  z-index: 1;

  border-radius: 999px 0 0 999px;

  max-width: 100%;
  padding-right: 10px;
}

/* ROJO */
.red-layer {
  right: 0;
  background-color: #EF4444;
  z-index: 2;

  border-radius: 999px;

  box-shadow: -3px 0 6px rgba(0,0,0,0.25);
}

.inner-text {
  font-size: 10px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  pointer-events: none;
  line-height: 1;
  padding: 0 4px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2); /* Sombra al texto para mejor lectura */
}
</style>