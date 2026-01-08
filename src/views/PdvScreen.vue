<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
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

const scoreData = ref<ScoreModel | null>(null);
const historyList = ref<HistoryModel>();
const rankingList = ref<RankingModel | null>(null);
const atributesList = ref<AtributeModel | null>(null);
const termometerList = ref<AtributeModel | null>(null);

const loadData = async () => {
  try {
    store.setLoading(true);

    const [scoreRes, historyRes, rankingRes, atributeRes, termometerRes] =
      await Promise.all([
        getScore(ceco.value, week.value, 2025),
        getHistory(ceco.value),
        getRanking(ceco.value),
        getAtributes(ceco.value, week.value, 2025),
        getTermometer(ceco.value, week.value, 2025),
      ]);

    scoreData.value = scoreRes;
    historyList.value = historyRes;
    rankingList.value = rankingRes;
    atributesList.value = atributeRes;
    termometerList.value = termometerRes;
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

        <TermometerCard
          v-if="termometerList.length > 0"
          :items="termometerList"
        />

        <AsesoresCard />

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
