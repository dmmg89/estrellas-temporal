<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  score: number;
}>();

const MIN_VALUE = 1.0;
const MAX_VALUE = 5.0;
const TOTAL_RANGE = MAX_VALUE - MIN_VALUE;

const clampedScore = computed((): number => {
  return Math.min(Math.max(props.score, MIN_VALUE), MAX_VALUE);
});

const fillPercentage = computed((): string => {
  const relativeValue = clampedScore.value - MIN_VALUE;
  const percentage = (relativeValue / TOTAL_RANGE) * 100;
  return `${Math.min(Math.max(percentage, 0), 100)}%`;
});

const formattedScore = computed((): string => {
  return props.score.toFixed(2);
});
</script>

<template>
  <div class="week-score-bar">
    <h3 class="label">Calificación Semanal</h3>

    <div class="bar-wrapper">
      <span class="range-text min">{{ MIN_VALUE.toFixed(1) }}</span>

      <div class="track">
        <div class="fill" :style="{ width: fillPercentage }">
          <div class="marker-container">
            <img class="star" src="../assets/icons/ic_small_star.svg" />

            <span class="score-value">{{ formattedScore }}</span>
          </div>
        </div>
      </div>

      <span class="range-text max">{{ MAX_VALUE.toFixed(2) }}</span>
    </div>
  </div>
</template>

<style scoped>
.week-score-bar {
  width: 95%;
  text-align: left;
  margin: 10px auto 30px auto;
}

.label {
  color: #3ec53e;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 10px;
}

.bar-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.range-text {
  color: #bcbcbc;
  font-weight: 800;
  font-size: 12px;
}

.track {
  flex-grow: 1;
  height: 16px;
  background-color: #e5e7eb;
  border-radius: 10px;
  position: relative;
  margin-left: 10px;
}

.fill {
  height: 100%;
  background-color: #3ec53e;
  border-radius: 10px;
  position: relative;
  transition: width 0.3s ease-in-out;
}

.marker-container {
  position: absolute;
  right: 0;
  top: 120%;
  transform: translate(50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}
.star {
  width: 100%;
  margin-top: -3px;
}

.score-value {
  color: #06884c;
  font-weight: 800;
  font-size: 14px;
  margin-top: 2px;
}
</style>
