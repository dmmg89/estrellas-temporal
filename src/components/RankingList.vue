<script setup lang="ts">
import { computed, ref } from 'vue';
import router, { ProfilePath } from "../router";
import type {RankingItemModel, RankingModel} from "../models/RankingModel.ts";
// 1. Importar el Store
import { useStateStore } from "../store/StateStore.ts";

interface Props {
  title: string;
  week: number;
  items: RankingModel;
}

const props = defineProps<Props>();

const store = useStateStore();

type RankingItemNumeric = Omit<RankingItemModel, 'calificacion'> & { calificacion: number };

const isDescending = ref(true);

const parseScore = (val: string | number): number => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  return parseFloat(val.replace(/,/g, ''));
};

const sortedItems = computed<RankingItemNumeric[]>(() => {
  const mappedList = props.items.map(item => ({
    ...item,
    calificacion: parseScore(item.calificacion)
  }));

  const sorted = mappedList.sort((a, b) => {
    let comparison = 0;
    if (isDescending.value) {
      comparison = b.calificacion - a.calificacion;
    } else {
      comparison = a.calificacion - b.calificacion;
    }

    if (comparison === 0) {
      return a.ranking - b.ranking;
    }

    return comparison;
  });

  return sorted.map((item, index) => ({
    ...item,
    ranking: index + 1
  }));
});

const toggleSort = () => {
  isDescending.value = !isDescending.value;
};

const isTopRank = (rankValue: number) => rankValue <= 3;

const handleClick = async (item: RankingItemNumeric) => {
  console.log("Navegando a item:", item);

  store.setLoading(true);

  store.setCeco(item.ceco);
  store.setLevel(item.nivel);

  const routesMap: Record<number, string> = {
    1: ProfilePath.divisionScreen,
    2: ProfilePath.territorioScreen,
    // 3: ProfilePath.plazaScreen,
    4: ProfilePath.regionScreen,
    5: ProfilePath.pdv
  };

  const targetPath = routesMap[item.nivel];

  if (targetPath) {
    await router.push(targetPath);
  } else {
    console.warn("No hay ruta definida para el nivel:", item.nivel);
    store.setLoading(false);
  }
}
</script>

<template>
  <div class="ranking-card">
    <div class="header">
      <div class="title-section">
        <div class="header-row">
          <span class="map-icon">🗺️</span>
          <h2 class="title">{{ title }}</h2>
        </div>
        <p class="subtitle">Semana {{ week }}</p>
      </div>

      <button class="sort-btn" @click="toggleSort">
        <div class="sort-icon-wrapper">
          <svg v-if="isDescending" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 19V5"/>
            <path d="M5 12l7 7 7-7"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14"/>
            <path d="M19 12l-7-7-7 7"/>
          </svg>
        </div>
        <div class="medal-wrapper">
          <svg class="medal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="7"/>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
          </svg>
          <span class="sort-label">Calificación</span>
        </div>
      </button>
    </div>

    <div class="list-container">
      <div
          v-for="item in sortedItems"
          :key="item.ceco"
          class="ranking-row"
          @click="handleClick(item)"
      >
        <div
            class="rank-badge"
            :class="{
              'rank-top': isTopRank(item.ranking),
              'rank-regular': !isTopRank(item.ranking)
            }"
        >
          {{ item.ranking }}
        </div>

        <div class="item-name">
          {{ item.nombre }}
        </div>

        <div class="item-score-container">
          <span class="score-text text-dark">
            {{ item.calificacion }}
          </span>

          <svg class="arrow-right" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ranking-card {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  max-width: 500px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.header-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.map-icon {
  font-size: 1.5rem;
  color: #fbbf24;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #374151;
  margin: 0;
}

.subtitle {
  color: #9CA3AF;
  font-size: 0.9rem;
  margin: 4px 0 0 36px;
}

.sort-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6B7280;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.sort-btn:hover {
  background-color: #f3f4f6;
}

.medal-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.medal-icon {
  width: 20px;
  height: 20px;
  color: #76C843;
  fill: #76C843;
}

.sort-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ranking-row {
  display: flex;
  align-items: center;
  background-color: #F8F9FA;
  border-radius: 12px;
  padding: 0 0 24px 16px;
  padding-left: 0;
  position: relative;
  overflow: hidden;
}

.rank-badge {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
  font-weight: 700;
  color: white;
  margin-right: 12px;
  font-size: 1rem;
  position: absolute;
  left: 0;
}

.rank-top {
  background-color: #76C843;
  padding-top: 12px;
}

.rank-regular {
  background-color: #D1D5DB;
}

.item-name {
  flex: 1;
  font-size: 0.9rem;
  font-weight: 600;
  color: #4B5563;
  margin-left: 40px;
  margin-top: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.item-score-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

.score-text {
  font-weight: 700;
  font-size: 1rem;
}

.text-dark {
  color: #374151;
}
</style>