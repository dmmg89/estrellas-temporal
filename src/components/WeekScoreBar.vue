<script setup lang="ts">
import { computed } from 'vue';

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
    <h3 class="label">Semanal</h3>

    <div class="bar-wrapper">
      <span class="range-text min">{{ MIN_VALUE.toFixed(1) }}</span>

      <div class="track">
        <div class="fill" :style="{ width: fillPercentage }">
          <div class="marker-container">
            <img src="../assets/icons/ic_small_star.svg">

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
  max-width: 400px;
  padding: 0 1rem;
  text-align: left;
}

.label {
  color: #3EC53E;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 0.5rem;

}

.bar-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.range-text {
  color: #9CA3AF;
  font-weight: 600;
  font-size: 14px;
}

.track {
  flex-grow: 1;
  height: 16px;
  background-color: #E5E7EB;
  border-radius: 10px;
  position: relative;
}

.fill {
  height: 100%;
  background-color: #3EC53E;
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

.star-icon {
  width: 24px;
  height: 24px;
  color: #FBBF24;
  filter: drop-shadow(0 2px 3px rgb(0 0 0 / 0.15));
}

.score-value {
  color: #3EC53E;
  font-weight: 800;
  font-size: 1rem;
  margin-top: 2px;
}
</style>