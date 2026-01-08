<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import TrimScoreCard from "../components/TrimScoreCard.vue";
import WeekScoreBar from "../components/WeekScoreBar.vue";
import RankingList from "../components/RankingList.vue";
import CorpoSelector from "../components/CorpoSelector.vue";
import Footer from "../components/Footer.vue";
import type {RankingItemModel, RankingModel} from "../models/RankingModel.ts";
import type {ScoreModel} from "../models/ScoreModel.ts";
import {useStateStore} from "../store/StateStore.ts";
import {storeToRefs} from "pinia";
import {getAtributes, getHistory, getRanking, getScore} from "../api/mockService/ApiMockImpl.ts";
import type {HistoryModel, HistoryWeekModel} from "../models/HistoryWeekModel.ts";
import HistoryChart from "../components/HistoryChart.vue";
import type {AtributeModel} from "../models/AtributeItemModel.ts";
import AtributosCard from "../components/AtributosCard.vue";

const store = useStateStore();
const { isLoading, week, level, ceco } = storeToRefs(store);

const scoreData = ref<ScoreModel | null>(null);
const historyList = ref<HistoryModel>();
const rankingList = ref<RankingModel | null>(null);
const atributesList = ref<AtributeModel | null>(null);

const loadData = async () => {
  try {
    store.setLoading(true);

    const [scoreRes, historyRes, rankingRes, atributeRes] = await Promise.all([
      getScore(ceco.value, week.value, 2025),
      getHistory(ceco.value),
      getRanking(3, week.value, 2025),
        getAtributes(ceco.value, week.value, 2025)
    ]);

    scoreData.value = scoreRes;
    historyList.value = historyRes;
    rankingList.value = rankingRes;
    atributesList.value = atributeRes;

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
      Cargando...
    </div>

    <div v-else-if="!isLoading && scoreData" class="body-content">

      <TrimScoreCard
          :trim-score="scoreData.califTrimestre"
          zone="Territorio"
          :current-week="week"
      />

      <WeekScoreBar :score="scoreData.califSemana" />

      <HistoryChart title="Tendencia" :data="historyList" />

      <AtributosCard :atributos="atributesList" />

      <RankingList title="Regiones" :week="week" :items="rankingList" />
      <Footer/>
    </div>

    <div v-else class="error-state">
      <p>No se pudo cargar la información.</p>
    </div>

  </div>
</template>

<style scoped>
.body-content{
  padding: 0;

}

</style>