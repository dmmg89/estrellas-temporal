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
  getHistory, getLevelRanking,
  getRanking,
  getScore,
} from "../api/mockService/ApiMockImpl.ts";
import type {
  HistoryModel,
  HistoryWeekModel,
} from "../models/HistoryWeekModel.ts";
import HistoryChart from "../components/HistoryChart.vue";
import LoadingLottie from "../components/LoadingLottie.vue";

const store = useStateStore();
const { isLoading, week, level, ceco } = storeToRefs(store);

const scoreData = ref<ScoreModel | null>(null);
const historyList = ref<HistoryModel>();
const rankingList = ref<RankingModel | null>(null);
const rankingTList = ref<RankingModel | null>(null);
const viewMode = ref<'División' | 'Territorio'>('División');

const loadData = async () => {

  console.log("Datos: " + ceco.value + '  ' + week.value + ' ' + level.value);
  try {
    store.setLoading(true);

    const [scoreRes, historyRes, rankingRes,rankingTRes] = await Promise.all([
      getScore(0, week.value, 2025),
      getHistory(0),
      getRanking(0),
      getLevelRanking(1, week.value, 2025)
    ]);

    scoreData.value = scoreRes;
    historyList.value = historyRes;
    rankingList.value = rankingRes;
    rankingTList.value = rankingTRes
  } catch (error) {
    console.error("Error cargando datos:", error);
  } finally {
    store.setLoading(false);
  }
};

onActivated(() => {
  loadData();
});

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

    <div v-else-if="!isLoading && scoreData" class="success-wrapper">
      <div class="body-content">
        <TrimScoreCard
          :trim-score="scoreData.califTrimestre"
          zone="RED"
          :current-week="week"
        />

        <WeekScoreBar :score="scoreData.califSemana" />

        <HistoryChart title="Tendencia" :data="historyList" />
        <div>
          <CorpoSelector v-model="viewMode" />

          <div class="content-area">
            <RankingList
                v-if="viewMode === 'División'"
                title="Divisiones"
                :week="week"
                :items="rankingList"
            />

            <RankingList
                v-else
                title="Territorio"
                :week="week"
                :items="rankingTList"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>

    <div v-else class="error-state">
      <p>No se pudo cargar la información.</p>
    </div>
  </div>
</template>

<style scoped>
.success-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.body-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
}
</style>
