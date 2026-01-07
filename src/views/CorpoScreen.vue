<script setup lang="ts">
import {onMounted, ref} from "vue";
import TrimScoreCard from "../components/TrimScoreCard.vue";
import WeekScoreBar from "../components/WeekScoreBar.vue";
import RankingList from "../components/RankingList.vue";
import CorpoSelector from "../components/CorpoSelector.vue";
import Footer from "../components/Footer.vue";
import type {RankingItemModel, RankingModel} from "../models/RankingModel.ts";
import type {ScoreModel} from "../models/ScoreModel.ts";
import {useStateStore} from "../store/StateStore.ts";
import {storeToRefs} from "pinia";
import {getHistory, getRanking, getScore} from "../api/mockService/ApiMockImpl.ts";
import type {HistoryModel, HistoryWeekModel} from "../models/HistoryWeekModel.ts";
import HistoryChart from "../components/HistoryChart.vue";

const store = useStateStore();
const { isLoading, week, level, ceco } = storeToRefs(store);

const scoreData = ref<ScoreModel | null>(null);
const historyList = ref<HistoryModel>();
const rankingList = ref<RankingModel | null>(null);



const listData:RankingItemModel[] = [
  {
    "ranking": 1,
    "ceco": 234848,
    "nivel": 1,
    "nombre": "DIVISION NORTE",
    "calificacion": 4.71
  },
  {
    "ranking": 2,
    "ceco": 234874,
    "nivel": 1,
    "nombre": "DIVISION CENTRO",
    "calificacion": 4.66
  },
  {
    "ranking": 3,
    "ceco": 235292,
    "nivel": 1,
    "nombre": "DIVISION SUR",
    "calificacion": 4.65
  }
]

onMounted(async () => {

try{
  store.setLoading(true);
  const response = await getScore(0, week.value, 2025);
  const historyResponse = await getHistory(0);
  const rankingResponse = await getRanking(0, week.value, 2025);
  scoreData.value = response
  historyList.value = historyResponse
  rankingList.value = rankingResponse
}catch(error){
  console.log(error)
}finally {
  store.setLoading(false);
}



})

</script>

<template>
  <div class="page-container">

    <div v-if="isLoading" class="loading-state">
      Cargando...
    </div>

    <div v-else-if="!isLoading && scoreData" class="body-content">

      <TrimScoreCard
          :trim-score="scoreData.califTrimestre"
          zone="Corporativo"
          :current-week="week"
      />

      <WeekScoreBar :score="scoreData.califSemana" />

      <HistoryChart title="Tendencia" :data="historyList" />
      <CorpoSelector />
      <RankingList title="Divisiones" :week="week" :items="rankingList" />
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