<script setup lang="ts">
import { ref, computed } from 'vue';

interface VerbalizationItem {
  id: number;
  text: string;
  type: 1 | 2;
}

const props = defineProps<{
  verbalizaciones: string[];
}>();

const currentFilter = ref<1 | 2>(1);

const totalCount = computed(() => props.verbalizaciones.length);
// const positiveCount = computed(() => props.verbalizaciones.filter(v => v.type === 1).length);
// const negativeCount = computed(() => props.verbalizaciones.filter(v => v.type === 2).length);
//
// const filteredList = computed(() => {
//   return props.verbalizaciones.filter(v => v.type === currentFilter.value);
// });

const setFilter = (type: 1 | 2) => {
  currentFilter.value = type;
};
</script>

<template>
  <div class="verbalizations-card">

    <div class="header">
      <div class="title-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="chat-icon">
          <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clip-rule="evenodd" />
        </svg>
        <h2 class="title">Verbalizaciones</h2>
      </div>

      <div class="total-badge">
        Total {{ totalCount }}
      </div>
    </div>

    <div class="filters-row">
      <button
          class="filter-pill positive"
          :class="{ active: currentFilter === 1 }"
          @click="setFilter(1)"
      >
        Positivas <span class="count-bubble">{{ positiveCount }}</span>
      </button>

      <button
          class="filter-pill negative"
          :class="{ active: currentFilter === 2 }"
          @click="setFilter(2)"
      >
        Negativas <span class="count-bubble">{{ negativeCount }}</span>
      </button>
    </div>

    <div class="list-container">
      <div v-if="filteredList.length === 0" class="empty-state">
        No hay verbalizaciones de este tipo.
      </div>

      <div
          v-for="(item, index) in filteredList"
          :key="item.id"
          class="list-item"
      >
        <p class="item-text">
          <span class="item-number">{{ index + 1 }}.</span>
          {{ item.text }}
        </p>

        <div v-if="index < filteredList.length - 1" class="separator"></div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.verbalizations-card {
  max-width: 500px;
  background-color: white;
  padding: 1.5rem;
  border-radius: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat-icon {
  width: 28px;
  height: 28px;
  color: #FBC02D;
}

.title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #424242;
  margin: 0;
}

.total-badge {
  background-color: #FBC02D;
  color: white;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 0.9rem;
}

.filters-row {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.filter-pill {
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  outline: none;
}

.count-bubble {
  background: rgba(0,0,0,0.1);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.85rem;
}

.filter-pill.positive {
  background-color: #F5F5F5;
  color: #9E9E9E;
}

.filter-pill.positive.active {
  background-color: #46d268;
  color: white;
  box-shadow: 0 4px 10px rgba(70, 210, 104, 0.3);
}

.filter-pill.positive.active .count-bubble {
  background: rgba(255,255,255,0.3);
  color: white;
}

.filter-pill.negative {
  background-color: #F5F5F5;
  color: #9E9E9E;
}

.filter-pill.negative.active {
  background-color: #EF5350;
  color: white;
  box-shadow: 0 4px 10px rgba(239, 83, 80, 0.3);
}

.filter-pill.negative.active .count-bubble {
  background: rgba(255,255,255,0.3);
  color: white;
}

.list-container {
  background-color: #F8F9FA;
  border-radius: 20px;
  padding: 1.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.empty-state {
  text-align: center;
  color: #9CA3AF;
  padding: 2rem;
  font-style: italic;
}

.list-item {
  margin-bottom: 1rem;
}

.item-text {
  font-size: 0.95rem;
  color: #616161;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  font-weight: 500;
}

.item-number {
  font-weight: 700;
  margin-right: 4px;
}

.separator {
  height: 1px;
  background-color: #E0E0E0;
  width: 100%;
  margin-bottom: 1rem;
}

.list-item:last-child {
  margin-bottom: 0;
}
.list-item:last-child .item-text {
  margin-bottom: 0;
}
</style>