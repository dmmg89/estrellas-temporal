<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  trimScore: number | string | null | undefined;
  zone: string;
  currentWeek: number;
}>();

const MIN_VALUE = 0;
const MAX_VALUE = 5;
const RADIUS = 90;
const ARC_LENGTH = Math.PI * RADIUS;

const DIVISIONS = 4;
const OUTER_RADIUS = 92;

const safeScore = computed(() => {
  const val = props.trimScore;
  if (val === null || val === undefined || val === "") return 0;
  let numericVal: number;
  if (typeof val === "string") {
    numericVal = parseFloat(val.replace(/,/g, ""));
  } else {
    numericVal = val;
  }
  if (isNaN(numericVal) || numericVal === 0) return 0;
  return numericVal;
});

const divisionLines = computed(() => {
  const lines = [];
  const step = Math.PI / (DIVISIONS + 1);
  for (let i = 1; i <= DIVISIONS; i++) {
    const angle = Math.PI - step * i;
    const x2 = 100 + OUTER_RADIUS * Math.cos(angle);
    const y2 = 100 - OUTER_RADIUS * Math.sin(angle);
    lines.push({ x2, y2 });
  }
  return lines;
});

const clampedScore = computed(() => {
  return Math.min(Math.max(safeScore.value, MIN_VALUE), MAX_VALUE);
});

const formattedScore = computed(() => {
  return safeScore.value.toFixed(2);
});

const strokeDashoffset = computed(() => {
  const percentage = clampedScore.value / MAX_VALUE;
  return ARC_LENGTH * (1 - percentage);
});

const arrowRotation = computed(() => {
  const percentage = clampedScore.value / MAX_VALUE;
  const degrees = percentage * 180 - 90;
  return `rotate(${degrees}deg)`;
});

const weekRangeText = computed(() => {
  const startWeek = props.currentWeek - 5;
  return `S${startWeek} a S${props.currentWeek}`;
});

const feedbackMessage = computed(() => {
  if (safeScore.value >= 4.5) return "¡Van por excelente camino!";
  if (safeScore.value >= 3.5) return "¡Sigue trabajando en ello!";
  return "Podemos mejorar";
});
</script>

<template>
  <div class="trim-score-card">
    <div class="badge-quarter">Calificación 4Q</div>

    <div class="header">
      <h2 class="zone-title">{{ zone }}</h2>
      <span class="period-subtitle">Trimestral</span>
      <div class="week-range">{{ weekRangeText }}</div>
    </div>

    <div class="gauge-container">
      <svg class="gauge-svg" viewBox="0 -10 200 130">
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: #ffd700; stop-opacity: 1" />
            <stop offset="100%" style="stop-color: #fbbf24; stop-opacity: 1" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2"
              flood-color="rgba(0,0,0,0.3)"
            />
          </filter>
        </defs>

        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#E5E7EB"
          stroke-width="10"
          stroke-linecap="round"
        />

        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#32c759"
          stroke-width="10"
          stroke-linecap="round"
          stroke-dasharray="251.32"
          :stroke-dashoffset="strokeDashoffset"
          class="progress-bar"
        />

        <g stroke="white" stroke-width="2">
          <line
            v-for="(line, index) in divisionLines"
            :key="index"
            x1="100"
            y1="100"
            :x2="line.x2"
            :y2="line.y2"
          />
        </g>

        <g
          class="arrow-group"
          :style="{ transformOrigin: '100px 100px', transform: arrowRotation }"
        >
          <image
            class="star-fle"
            href="../assets/icons/fle-gra.svg"
            x="95"
            y="-7"
            width="30"
            height="30"
          />
        </g>

        <text x="-10" y="100" class="limit-text">0.00</text>
        <text x="215" y="100" class="limit-text" text-anchor="end">5.00</text>
      </svg>

      <div class="star-container">
        <img class="estrella" src="../assets/icons/ic_big_star.svg" alt="" />
      </div>
    </div>

    <div class="score-display">
      <div class="score-number">{{ formattedScore }}</div>
      <div class="score-message">{{ feedbackMessage }}</div>
    </div>
  </div>
</template>

<style scoped>
.trim-score-card {
  position: relative;
  width: calc(100vw - 62px);
  padding: 6px;
  margin-top: 180px;
  padding: 0 30px;
}

.badge-quarter {
  position: absolute;
  top: 0;
  right: 20px;
  background-color: #01a75d;
  color: white;
  padding: 4px 12px;
  border-radius: 0 12px;
  font-weight: 600;
  font-size: 10px;
}

.header {
  text-align: left;
  margin-bottom: 0.5rem;
}

.zone-title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #333;
}

.period-subtitle {
  color: #3ec53e;
  font-weight: 600;
  font-size: 13px;
  display: block;
}

.week-range {
  color: #9ca3af;
  font-size: 11px;
  font-weight: 500;
  margin-top: 2px;
}

.gauge-container {
  position: relative;
  width: 100%;
  margin-top: -40px;
}

.gauge-svg {
  width: 100%;
  height: auto;
  overflow: visible;
  height: 200px;
}

.progress-bar {
  transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.arrow-group {
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.star-fle {
  width: 20px;
}

.limit-text {
  fill: #9ca3af;
  font-weight: 600;
  font-size: 9px;
  border: 1px solid #333;
}

.star-container {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.estrella {
  width: 100%;
}

.score-display {
  margin-top: 0px;
  text-align: center;
}

.score-number {
  position: relative;
  color: #04884d;
  font-size: 20px;
  font-weight: 700;
  margin-top: -50px;
  z-index: 9;
}

.score-message {
  color: #6b7280;
  font-size: 14px;
  font-weight: 600;
  margin-top: 5px;
  color: #474844;
}
</style>
