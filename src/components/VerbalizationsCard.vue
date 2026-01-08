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
  getTeam,
  getTermometer,
} from "../api/mockService/ApiMockImpl.ts";
import type {
  HistoryModel,
  HistoryWeekModel,
} from "../models/HistoryWeekModel.ts";
import HistoryChart from "../components/HistoryChart.vue";
import type { AtributeModel } from "../models/AtributeItemModel.ts";
// import AtributosCard from "../components/AtributosCard.vue";
import ProgressBar from "../components/ProgressBar.vue";
import TermometroCard from "../components/TermometroCard.vue";
import LoadingLottie from "../components/LoadingLottie.vue";
import AsesoresCard from "../components/AsesoresCard.vue";
import type { EmpleadoData } from "../models/EmpleadoData.ts";

const store = useStateStore();
const { isLoading, week, level, ceco } = storeToRefs(store);

const scoreData = ref<ScoreModel | null>(null);
const historyList = ref<HistoryModel>();
const rankingList = ref<RankingModel | null>(null);
const atributesList = ref<AtributeModel | null>(null);
const termometerList = ref<AtributeModel | null>(null);
const teamList = ref<EmpleadoData[] | null>(null);

// const verbList = ref<

const loadData = async () => {
  try {
    store.setLoading(true);

    const [
      scoreRes,
      historyRes,
      rankingRes,
      atributeRes,
      termometerRes,
      teamRes,
    ] = await Promise.all([
      getScore(ceco.value, week.value, 2025),
      getHistory(ceco.value),
      getRanking(ceco.value),
      getAtributes(ceco.value, week.value, 2025),
      getTermometer(ceco.value, week.value, 2025),
      getTeam(ceco.value, week.value),
    ]);

    console.log("Respuesta equipo" + JSON.stringify(termometerRes, null, 2));

    scoreData.value = scoreRes;
    historyList.value = historyRes;
    rankingList.value = rankingRes;
    atributesList.value = atributeRes;
    termometerList.value = termometerRes;
    teamList.value = teamRes;
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

        <ProgressBar v-if="atributesList" :items="atributesList" />
        <!-- <AtributosCard :atributos="atributesList" /> -->

        <TermometroCard v-if="atributesList" :items="atributesList" />

        <!--        <AsesoresCard  :item="datosEmpleado"/>-->

        <div v-if="teamList && teamList.length > 0" class="team-list-container">
          <template v-for="asesor in teamList" :key="asesor.idEmpleado">
            <AsesoresCard v-if="asesor.metricas_semana" :item="asesor" />
          </template>
        </div>

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

.team-list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  margin-top: 20px;
}
</style>
