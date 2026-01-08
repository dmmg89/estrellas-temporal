<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  /** La lista de comentarios/cadenas de texto */
  items: string[];
  /** El número total a mostrar en el badge (opcional). Si no se pasa, usa el largo de items */
  totalCount?: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['clickMore']);

const INITIAL_LIMIT = 5;
const isExpanded = ref(false);

const visibleItems = computed(() => {
  if (isExpanded.value) return props.items;
  return props.items.slice(0, INITIAL_LIMIT);
});

const displayTotal = computed(() => props.totalCount ?? props.items.length);

const handleViewMore = () => {

  emit('clickMore');
};
</script>

<template>
  <div class="card-container">
    <div class="card-header">
      <div class="title-section">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="#F4B942"/>
          <circle cx="8" cy="10" r="1.5" fill="white"/>
          <circle cx="12" cy="10" r="1.5" fill="white"/>
          <circle cx="16" cy="10" r="1.5" fill="white"/>
        </svg>
        <h2 class="title">Verbalizaciones</h2>
      </div>

      <div class="badge">
        Total {{ displayTotal }}
      </div>
    </div>

    <div class="list-container">
      <div
          v-for="(item, index) in visibleItems"
          :key="index"
          class="list-item"
      >
        <div class="item-content">
          <span class="item-number">{{ index + 1 }}.</span>
          <p class="item-text">"{{ item }}"</p>
        </div>
        <div v-if="index < visibleItems.length - 1" class="separator"></div>
      </div>
    </div>

    <div class="card-footer">
      <button class="btn-ver-mas" @click="handleViewMore">
        Ver más
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor Principal */
.card-container {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 24px;
  width: 100%;
  max-width: 500px; /* Ancho máximo sugerido */
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #333;
}

/* Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  width: 28px;
  height: 28px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: #333;
}

.badge {
  background-color: #F4B942;
  color: white;
  padding: 4px 12px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

/* Lista */
.list-container {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.list-item {
  display: flex;
  flex-direction: column;
}

.item-content {
  display: flex;
  gap: 8px;
  padding: 12px 0;
}

.item-number {
  font-weight: 600;
  color: #666;
  min-width: 20px; /* Asegura alineación si hay >9 items */
}

.item-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #555;
  font-weight: 400;
}

.separator {
  height: 1px;
  background-color: #eee;
  width: 100%;
}

.card-footer {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.btn-ver-mas {
  background-color: #E31C1C;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 32px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-ver-mas:hover {
  background-color: #c41515;
}
</style>