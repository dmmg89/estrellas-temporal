<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  trimScore: number | string | null | undefined;
  zone: string;
  currentWeek: number;
}>();

const MIN_VALUE = 0;
const MAX_VALUE = 5;

// --- CORRECCIÓN AQUÍ ---
// El radio debe ser 80 para coincidir con el path del SVG (A 80 80)
const RADIUS = 80;
const ARC_LENGTH = Math.PI * RADIUS; // Ahora dará aprox 251.32, coincidiendo con el dasharray

const DIVISIONS = 4;
const OUTER_RADIUS = 92;

// ... (El resto de la lógica de safeScore se mantiene igual) ...
const safeScore = computed(() => {
  const val = props.trimScore;
  if (val === null || val === undefined || val === '') return 0;
  let numericVal: number;
  if (typeof val === 'string') {
    numericVal = parseFloat(val.replace(/,/g, ''));
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
    const angle = Math.PI - (step * i);
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
  const degrees = (percentage * 180) - 90;
  return `rotate(${degrees}deg)`;
});

// ... (Resto de computed properties: weekRangeText, feedbackMessage) ...
const weekRangeText = computed(() => {
  const startWeek = props.currentWeek - 5;
  return `S${startWeek} a S${props.currentWeek}`;
});

const feedbackMessage = computed(() => {
  if (safeScore.value >= 4.5) return '¡Van por excelente camino!';
  if (safeScore.value >= 3.5) return '¡Sigue trabajando en ello!';
  return 'Podemos mejorar';
});
</script>

<template>
  <div class="trim-score-card">
    <div class="badge-quarter">
      Calificación 4Q
    </div>

    <div class="header">
      <h2 class="zone-title">{{ zone }}</h2>
      <span class="period-subtitle">Trimestral</span>
      <div class="week-range">{{ weekRangeText }}</div>
    </div>

    <div class="gauge-container">
      <svg class="gauge-svg" viewBox="0 -10 200 130">
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FBBF24;stop-opacity:1" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
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
            stroke-dasharray="251.33"
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

        <g class="arrow-group" :style="{ transformOrigin: '100px 100px', transform: arrowRotation }">
          <path
              d="M 91 0 L 109 0 L 109 12 L 100 22 L 91 12 Z"
              fill="#32c759"
              stroke="white"
              stroke-width="2"
              filter="url(#shadow)"
          />
        </g>

        <text x="5" y="125" class="limit-text">0.00</text>
        <text x="195" y="125" class="limit-text" text-anchor="end">5.00</text>
      </svg>

      <div class="star-container">
        <svg viewBox="0 0 24 24" class="star-icon-3d">
          <path fill="url(#starGradient)" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
        </svg>
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
  width: 380px;
  padding: 6px;
  border-radius: 16px;
  margin-top: 120px;
}

.badge-quarter {
  position: absolute;
  top: 24px;
  right: 24px;
  background-color: #3EC53E;
  color: white;
  padding: 4px 12px;
  border-radius: 0 12px;
  font-weight: 600;
  font-size: 0.85rem;
}

.header {
  text-align: left;
  margin-bottom: 0.5rem;
}

.zone-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
  color: #333;
}

.period-subtitle {
  color: #3EC53E;
  font-weight: 700;
  font-size: 1rem;
  display: block;
}

.week-range {
  color: #9CA3AF;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 2px;
}

.gauge-container {
  position: relative;
  width: 100%;
  margin-top: 8px;
}

.gauge-svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

.progress-bar {
  transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.arrow-group {
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.limit-text {
  fill: #9CA3AF;
  font-weight: 600;
  font-size: 0.6rem;
}

.star-container {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.star-icon-3d {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 6px rgba(251, 191, 36, 0.4));
}

.star-icon-3d path {
  stroke: #D97706;
  stroke-width: 0.5;
  stroke-linejoin: round;
}

.score-display {
  margin-top: 0px;
  text-align: center;
}

.score-number {
  color: #3EC53E;
  font-size: 2rem;
  font-weight: 900;
}

.score-message {
  color: #6B7280;
  font-size: 0.95rem;
  font-weight: 600;
  margin-top: 2px;
}
</style>