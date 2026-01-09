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
import { EmpleadoData } from "../models/EmpleadoData.ts";
import VerbalizationsCard from "../components/VerbalizationsCard.vue";
import {
  getAtributes,
  getHistory,
  getRanking,
  getScore,
  getTeam,
  getTermometer,
  getVerbalizacion,
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

const store = useStateStore();
const { isLoading, week, level, ceco } = storeToRefs(store);

const scoreData = ref<ScoreModel | null>(null);
const historyList = ref<HistoryModel>();
const rankingList = ref<RankingModel | null>(null);
const atributesList = ref<AtributeModel | null>(null);
const termometerList = ref<AtributeModel | null>(null);
const teamList = ref<EmpleadoData[] | null>(null);
const comments = ref<string[] | null>(null);

const mostrarTeam = ref(false);
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
      verbRes,
    ] = await Promise.all([
      getScore(ceco.value, week.value, 2025),
      getHistory(ceco.value),
      getRanking(ceco.value),
      getAtributes(ceco.value, week.value, 2025),
      getTermometer(ceco.value, week.value, 2025),
      getTeam(ceco.value, week.value),
      getVerbalizacion(ceco.value),
    ]);

    console.log("Respuesta equipo" + JSON.stringify(termometerRes, null, 2));

    scoreData.value = scoreRes;
    historyList.value = historyRes;
    rankingList.value = rankingRes;
    atributesList.value = atributeRes;
    termometerList.value = termometerRes;
    teamList.value = teamRes;
    comments.value = verbRes;
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

        <div class="con-cola">
          <div class="ocultar" @click="mostrarTeam = !mostrarTeam">
            <div class="tit-col">Colaboradores</div>
            <span>{{ mostrarTeam ? "Ocultar" : "Mostrar" }}</span>
          </div>

          <transition name="slide">
            <div
              v-if="mostrarTeam && teamList && teamList.length > 0"
              class="team-list-container"
            >
              <template v-for="asesor in teamList" :key="asesor.idEmpleado">
                <AsesoresCard v-if="asesor.metricas_semana" :item="asesor" />
              </template>
            </div>
          </transition>
        </div>

        <VerbalizationsCard :items="comments" />
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

.con-cola {
  background-color: #f6f7f9;
  width: 100vw;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .ocultar {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      color: #fff;
      background: #6ac63a;
      padding: 5px 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: max-content;
      border-radius: 5px;
      cursor: pointer;
      font-size: 12px;
    }

    .tit-col {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
  }
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 500px;
}

.slide-enter-active,
.slide-leave-active {
  overflow: hidden;
  transition: all 0.3s ease;
}
</style>
