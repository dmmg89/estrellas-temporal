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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="star-icon"
            >
              <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
            </svg>

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
  font-size: 1.1rem;
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
  font-size: 0.9rem;
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