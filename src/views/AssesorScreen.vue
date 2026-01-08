<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import TrimScoreCard from "../components/TrimScoreCard.vue";
import Footer from "../components/Footer.vue";
import type {ScoreModel} from "../models/ScoreModel.ts";
import {useStateStore} from "../store/StateStore.ts";
import {storeToRefs} from "pinia";
import {getAtributes, getHistory, getScore} from "../api/mockService/ApiMockImpl.ts";
import type {HistoryModel, HistoryWeekModel} from "../models/HistoryWeekModel.ts";
import type {AtributeModel} from "../models/AtributeItemModel.ts";

import LoadingLottie from "../components/LoadingLottie.vue";
import ProgressBar from "../components/ProgressBar.vue";
import TermometroCard from "../components/TermometroCard.vue";

const store = useStateStore();
const { isLoading, week, level, ceco } = storeToRefs(store);

const scoreData = ref<ScoreModel | null>(null);
const historyList = ref<HistoryModel>();
const atributesList = ref<AtributeModel | null>(null);

const loadData = async () => {
  try {
    store.setLoading(true);

    const [scoreRes, historyRes, atributeRes] = await Promise.all([
      getScore(ceco.value, week.value, 2025),
      getHistory(ceco.value),
      getAtributes(ceco.value, week.value, 2025)
    ]);

    scoreData.value = scoreRes;
    historyList.value = historyRes;
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
      <LoadingLottie/>
    </div>

    <div v-else-if="!isLoading && scoreData" >

      <div class="body-content">

      <TrimScoreCard
          :trim-score="scoreData.califTrimestre"
          zone="Asesor"
          :current-week="week"
      />

      <AtributosCard :atributos="atributesList" />

      <TermometroCard />

      <ProgressBar label="Satisfacción del Cliente" :positive="75" :negative="20" />

      </div>

      <Footer/>

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
  width: 100%;
  gap: 20px;
  padding: 20px 10px;
  box-sizing: border-box;
}

.body-content > * {
  width: 100%;
  max-width: 380px;
}
</style>
