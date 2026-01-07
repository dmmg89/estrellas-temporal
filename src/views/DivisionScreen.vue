<script setup lang="ts">
import {onMounted} from "vue";
import TrimScoreCard from "../components/TrimScoreCard.vue";
import WeekScoreBar from "../components/WeekScoreBar.vue";
import HistoryChart from "../components/HistoryChart.vue";
import Footer from "../components/Footer.vue";
import type {RankingItemModel} from "../models/RankingModel.ts";
import RankingList from "../components/RankingList.vue";

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
    "ceco": 239403,
    "nivel": 2,
    "nombre": "TERRITORIO MICHOACAN",
    "calificacion": "45,842.00"
  },
  {
    "ranking": 2,
    "ceco": 239393,
    "nivel": 2,
    "nombre": "TERRITORIO METRO SUR",
    "calificacion": "45,842.00"
  },
  {
    "ranking": 3,
    "ceco": 239399,
    "nivel": 2,
    "nombre": "TERRITORIO QUERETARO",
    "calificacion": "45,812.00"
  },
  {
    "ranking": 4,
    "ceco": 238010,
    "nivel": 2,
    "nombre": "TERRITORIO BAJA CALIFORNIA NORTE",
    "calificacion": 4.79
  },
  {
    "ranking": 5,
    "ceco": 239396,
    "nivel": 2,
    "nombre": "TERRITORIO SINALOA",
    "calificacion": 4.74
  },
  {
    "ranking": 6,
    "ceco": 224093,
    "nivel": 2,
    "nombre": "TERRITORIO METRO FORANEA",
    "calificacion": 4.71
  },
  {
    "ranking": 7,
    "ceco": 239390,
    "nivel": 2,
    "nombre": "TERRITORIO BAJIO",
    "calificacion": 4.71
  },
  {
    "ranking": 8,
    "ceco": 239804,
    "nivel": 2,
    "nombre": "TERRITORIO BAJA CALIFORNIA SUR",
    "calificacion": 4.69
  },
  {
    "ranking": 9,
    "ceco": 238457,
    "nivel": 2,
    "nombre": "TERRITORIO NUEVO LEON",
    "calificacion": 4.69
  },
  {
    "ranking": 10,
    "ceco": 239394,
    "nivel": 2,
    "nombre": "TERRITORIO CHIHUAHUA",
    "calificacion": 4.69
  }
]

onMounted(async () => {



})

</script>

<template>

  <div class="body-content">

  </div>

  <TrimScoreCard :trim-score="4.3" zone="Territorio"  :current-week="48"/>
  <WeekScoreBar :score="4.1" />

  <HistoryChart title="Tendencia" :data="reportData" />
  <RankingList title="Territorio" :week="48" :items="listData" />
  <Footer/>


</template>

<style scoped>
.body-content{
  padding: 0;

}

</style>