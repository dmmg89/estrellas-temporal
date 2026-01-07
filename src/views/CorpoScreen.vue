<script setup lang="ts">
import {onMounted} from "vue";
import {getComments} from "../api/mockService/ApiMockImpl.ts";
import TrimScoreCard from "../components/TrimScoreCard.vue";
import WeekScoreBar from "../components/WeekScoreBar.vue";
import HistoryChart from "../components/HistoryChart.vue";

const reportData = {
  history: [
    { week: 45, score: 3.9, goal: 4.0 },
    { week: 46, score: 4.2, goal: 4.2 },
    { week: 47, score: 4.5, goal: 4.5 },
    { week: 48, score: 4.3, goal: 4.5 }
  ]
};

onMounted(async () => {



})

</script>

<template>

  <div class="body-content">

  </div>

  <TrimScoreCard :trim-score="4.3" zone="Corporativo"  :current-week="48"/>
  <WeekScoreBar :score="4.1" />

  <HistoryChart title="Tendencia" :data="reportData" />


</template>

<style scoped>
.body-content{
  padding: 0;

}

</style>