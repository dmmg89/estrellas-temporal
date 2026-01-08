<script setup lang="ts">
import { computed, ref } from "vue";
import router, { ProfilePath } from "../router";
import type { RankingItemModel, RankingModel } from "../models/RankingModel.ts";
// 1. Importar el Store
import { useStateStore } from "../store/StateStore.ts";

interface Props {
  title: string;
  week: number;
  items: RankingModel;
}

const props = defineProps<Props>();

// 2. Instanciar el Store
const store = useStateStore();

type RankingItemNumeric = Omit<RankingItemModel, "calificacion"> & {
  calificacion: number;
};

const isDescending = ref(true);

const parseScore = (val: string | number): number => {
  if (typeof val === "number") return val;
  if (!val) return 0;
  return parseFloat(val.replace(/,/g, ""));
};

const sortedItems = computed<RankingItemNumeric[]>(() => {
  const mappedList = props.items.map((item) => ({
    ...item,
    calificacion: parseScore(item.calificacion),
  }));

  return mappedList.sort((a, b) => {
    if (isDescending.value) {
      return b.calificacion - a.calificacion;
    } else {
      return a.calificacion - b.calificacion;
    }
  });
});

const toggleSort = () => {
  isDescending.value = !isDescending.value;
};

const isTopRank = (rankValue: number) => rankValue <= 3;

// 3. Modificar el manejador de clic
const handleClick = async (item: RankingItemNumeric) => {
  console.log("Navegando a item:", item);

  // A. Activar Loading para que la siguiente pantalla nazca cargando
  store.setLoading(true);

  // B. Actualizar el contexto en Pinia (Ceco y Nivel seleccionados)
  store.setCeco(item.ceco);
  store.setLevel(item.nivel);

  const routesMap: Record<number, string> = {
    1: ProfilePath.divisionScreen,
    2: ProfilePath.territorioScreen,
    // 3: ProfilePath.plazaScreen,
    4: ProfilePath.regionScreen,
  };

  const targetPath = routesMap[item.nivel];

  if (targetPath) {
    await router.push(targetPath);
  } else {
    console.warn("No hay ruta definida para el nivel:", item.nivel);
    store.setLoading(false);
  }
};

const capitalizeWords = (text: string): string => {
  if (!text) return "";
  return text
    .toLowerCase() // todo a minúsculas
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitaliza
    .join(" ");
};
</script>

<template>
  <div class="ranking-card">
    <div class="header">
      <div class="title-section">
        <div class="header-row">
          <span class="map-icon">
            <img class="mapa" src="../assets/icons/Territorio.svg" alt="" />
          </span>
          <h2 class="title">Ranking {{ title }}</h2>
        </div>
        <p class="subtitle">Semana {{ week }}</p>
      </div>

      <button class="sort-btn" @click="toggleSort">
        <div class="sort-icon-wrapper">
          <img class="may-men" src="../assets/icons/mayoramenor.svg" alt="" />
        </div>
        <div class="medal-wrapper">
          <img class="clasi" src="../assets/icons/calificacion.svg" alt="" />
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
        <div class="rank-badge">
          <span
            class="pos"
            :class="{
              'rank-top': isTopRank(item.ranking),
              'rank-regular': !isTopRank(item.ranking),
            }"
            >{{ item.ranking }}</span
          >
        </div>

        <div class="item-name">
          {{ capitalizeWords(item.nombre) }}
        </div>

        <div class="item-score-container">
          {{ item.calificacion }}
        </div>

        <div class="arrow-right">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA3AF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
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
  margin-top: 20px;
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

.mapa {
  width: 80%;
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
}

.clasi {
  width: 30%;
}

.subtitle {
  color: #333333;
  font-size: 12px;
  text-align: left;
  margin-top: -10px;
}

.sort-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: end;
  gap: 8px;
  color: #6b7280;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background 0.2s;
  margin-top: 15px;
}

.sort-btn:hover {
  background-color: #f3f4f6;
}

.medal-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
}

.may-men {
  width: 85%;
}

.sort-label {
  font-size: 10px;
  font-weight: 400;
  margin-top: 3px;
  color: #333;
}

.list-container {
}

.ranking-row {
  border: 1px solid #333;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin-bottom: 15px;
}

.ranking-row:nth-child(even) {
  background-color: #f6f7f9;
}

.rank-badge {
  border: 1px solid #333;
  width: 40px;
}

.rank-top {
  background-color: #76c843;
}

.rank-regular {
  background-color: #d1d5db;
}

.item-name {
  color: #333;
  border: 1px solid #333;
  width: calc(100% - 100px);
}

.item-score-container {
  color: #333;
  border: 1px solid #333;
  width: 40px;
}

.arrow-right {
  border: 1px solid #333;
  width: 20px;
}
</style>
