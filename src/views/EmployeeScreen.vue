<script setup lang="ts">
import {onActivated, onMounted, ref, watch} from "vue";
import TrimScoreCard from "../components/TrimScoreCard.vue";
import WeekScoreBar from "../components/WeekScoreBar.vue";
import RankingList from "../components/RankingList.vue";
import CorpoSelector from "../components/CorpoSelector.vue";
import Footer from "../components/Footer.vue";
import type { RankingItemModel, RankingModel } from "../models/RankingModel.ts";
import type { ScoreModel } from "../models/ScoreModel.ts";
import { useStateStore } from "../store/StateStore.ts";
import { storeToRefs } from "pinia";
import {
  getAtributes,
  getHistory,
  getRanking,
  getScore,
  getTermometer,
} from "../api/mockService/ApiMockImpl.ts";
import type {
  HistoryModel,
  HistoryWeekModel,
} from "../models/HistoryWeekModel.ts";
import HistoryChart from "../components/HistoryChart.vue";
import type { AtributeModel } from "../models/AtributeItemModel.ts";
import AtributosCard from "../components/AtributosCard.vue";
import TermometerCard from "../components/TermometerCard.vue";
import LoadingLottie from "../components/LoadingLottie.vue";
import AsesoresCard from "../components/AsesoresCard.vue";

const store = useStateStore();
const { isLoading, week, level, ceco } = storeToRefs(store);

// const scoreData = ref<ScoreModel | null>(null);
// const historyList = ref<HistoryModel>();
// const atributesList = ref<AtributeModel | null>(null);
// const termometerList = ref<AtributeModel | null>(null);

const scoreData = ref<ScoreModel>({
  califSemana: 4.6,
  califTrimestre: 4.25,
});

const historyList = ref<HistoryModel>([
  { semana: 44, calificacion: 3.2, meta: 4.5 },
  { semana: 45, calificacion: 4.1, meta: 4.5 },
  { semana: 46, calificacion: 4.8, meta: 4.5 }, // Superó la meta
  { semana: 47, calificacion: 3.5, meta: 4.5 }, // Bajó
  { semana: 48, calificacion: 4.6, meta: 4.5 }, // Recuperación
]);

const atributesList = ref<AtributeModel>([
  { idAtributo: 1, nombreAtributo: "Amabilidad", valorAtributo: 4.8 },
  { idAtributo: 2, nombreAtributo: "Rapidez", valorAtributo: 3.5 },
  { idAtributo: 3, nombreAtributo: "Limpieza", valorAtributo: 5.0 },
  { idAtributo: 4, nombreAtributo: "Conocimiento", valorAtributo: 4.2 },
]);

onActivated(() => {
  loadData();
});

const loadData = async () => {

  console.log("Datos: " + ceco.value + '  ' + week.value + ' ' + level.value);

  try {
    store.setLoading(true);

    // const [scoreRes, historyRes,  atributeRes, termometerRes] =
    //     await Promise.all([
    //       getScore(ceco.value, week.value, 2025),
    //       getHistory(ceco.value),
    //       getAtributes(ceco.value, week.value, 2025),
    //       getTermometer(ceco.value, week.value, 2025),
    //     ]);

    // scoreData.value = scoreData.value;
    // historyList.value = historyList.value;
    // atributesList.value = atributeRes;
    // termometerList.value = termometerRes;
  } catch (error) {
    console.error("Error cargando datos:", error);
  } finally {
    store.setLoading(false);
  }
};

watch(
  [week, level, ceco],
  () => {
    loadData();
  },
  { immediate: true }
);
</script>

<template>
  <div class="page-container">
    <div v-if="isLoading" class="loading-state">
      <LoadingLottie />
    </div>

    <div v-else-if="!isLoading && scoreData">
      <div class="body-content">
        <TrimScoreCard
          :trim-score="scoreData.califTrimestre"
          zone="PDV"
          :current-week="week"
        />

        <WeekScoreBar :score="scoreData.califSemana" />

        <HistoryChart title="Tendencia" :data="historyList" />

        <AtributosCard :atributos="atributesList" />

        <!--        <TermometerCard-->
        <!--            v-if="termometerList.length > 0"-->
        <!--            :items="termometerList"-->
        <!--        />-->

        <!--      <RankingList title="Puntos de Venta" :week="week" :items="rankingList" />-->
      </div>

      <Footer />
    </div>

    <div v-else class="error-state">
      <p>No se pudo cargar la información.</p>
    </div>
  </div>
</template>

<style scoped>
.body-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
}
</style>
