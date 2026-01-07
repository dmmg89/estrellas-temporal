<script setup lang="ts">
import {onMounted} from "vue";
import {getComments} from "../api/mockService/ApiMockImpl.ts";
import TrimScoreCard from "../components/TrimScoreCard.vue";
import WeekScoreBar from "../components/WeekScoreBar.vue";
import HistoryChart from "../components/HistoryChart.vue";
import RankingList from "../components/RankingList.vue";
import CorpoSelector from "../components/CorpoSelector.vue";
import Footer from "../components/Footer.vue";
import type {RankingItemModel} from "../models/RankingModel.ts";

const reportData = {
  history: [
    { week: 45, score: 3.9, goal: 4.0 },
    { week: 46, score: 4.2, goal: 4.2 },
    { week: 47, score: 4.5, goal: 4.5 },
    { week: 48, score: 4.3, goal: 4.5 }
  ]
};

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



})

</script>

<template>

  <div class="body-content">

  </div>

  <TrimScoreCard :trim-score="4.3" zone="Corporativo"  :current-week="48"/>
  <WeekScoreBar :score="4.1" />

  <HistoryChart title="Tendencia" :data="reportData" />
  <CorpoSelector />
  <RankingList title="Divisiones" :week="48" :items="listData" />
  <Footer/>


</template>

<style scoped>
.body-content{
  padding: 0;

}

</style>