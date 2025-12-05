<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  trimScore: number;
  zone: string;
}>();

const MIN_VALUE = 0;
const MAX_VALUE = 5;
const RADIUS = 80;
const STROKE_WIDTH = 18;
const ARC_LENGTH = Math.PI * RADIUS; // Longitud de un semicírculo (PI * r)

const clampedScore = computed(() => {
  return Math.min(Math.max(props.trimScore, MIN_VALUE), MAX_VALUE);
});

const formattedScore = computed(() => {
  return props.trimScore.toFixed(2).replace('.', ',');
});

const strokeDashoffset = computed(() => {
  const percentage = clampedScore.value / MAX_VALUE;
  // Calculamos cuánto falta por llenar (el offset empieza lleno y se reduce)
  // En SVG dasharray, el offset 0 es lleno, el offset = largo es vacío.
  // Pero como queremos llenar de izq a derecha, invertimos la lógica visualmente.
  return ARC_LENGTH * (1 - percentage);
});

// Mensaje dinámico basado en la calificación (puedes personalizar esto)
const feedbackMessage = computed(() => {
  if (props.trimScore >= 4.5) return '¡Excelente trabajo!';
  if (props.trimScore >= 3.5) return '¡Sigue trabajando en ello!';
  return 'Podemos mejorar';
});
</script>

<template>
  <div class="trim-score-card">
    <div class="header">
      <h2 class="zone-title">{{ zone }}</h2>
      <span class="period-subtitle">Trimestre</span>
    </div>

    <div class="gauge-container">
      <svg class="gauge-svg" viewBox="0 0 200 110">
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FBBF24;stop-opacity:1" />
          </linearGradient>
        </defs>

        <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#E5E7EB"
            :stroke-width="STROKE_WIDTH"
            stroke-linecap="round"
        />

        <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#32c759"
            :stroke-width="STROKE_WIDTH"
            stroke-linecap="round"
            stroke-dasharray="251.32"
            :stroke-dashoffset="strokeDashoffset"
            class="progress-bar"
        />

        <line x1="100" y1="100" x2="43" y2="43" stroke="white" stroke-width="4" />
        <line x1="100" y1="100" x2="100" y2="20" stroke="white" stroke-width="4" />
        <line x1="100" y1="100" x2="157" y2="43" stroke="white" stroke-width="4" />
      </svg>

      <div class="limits">
        <span class="limit-text">0.00</span>
        <span class="limit-text">5.00</span>
      </div>

      <div class="star-container">
        <svg
            viewBox="0 0 24 24"
            class="star-icon-3d"
            fill="url(#starGradient)"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
  font-family: system-ui, -apple-system, sans-serif;
  max-width: 320px;
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  /* box-shadow: 0 4px 20px rgba(0,0,0,0.05); Opcional si quieres tarjeta flotante */
  text-align: center;
}

.header {
  text-align: left;
  margin-bottom: 1rem;
}

.zone-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 800;
  color: #333;
}

.period-subtitle {
  color: #32c759;
  font-weight: 600;
  font-size: 0.9rem;
}

.gauge-container {
  position: relative;
  width: 100%;
  margin-top: 10px;
}

.gauge-svg {
  width: 100%;
  height: auto;
  overflow: visible; /* Importante para que no corte los bordes redondeados */
}

/* Animación de la barra */
.progress-bar {
  transition: stroke-dashoffset 0.8s ease-out;
}

.limits {
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  bottom: 10px; /* Ajustar según posición visual */
  padding: 0 10px;
  box-sizing: border-box;
}

.limit-text {
  color: #9CA3AF;
  font-weight: 600;
  font-size: 0.85rem;
}

.star-container {
  position: absolute;
  bottom: -5px; /* Ajuste fino para centrarla en la base */
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.star-icon-3d {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 3px rgba(0,0,0,0.2));
  fill: #FBBF24; /* Fallback color */
}

/* El path de la estrella necesita un color base si el gradiente falla */
.star-icon-3d path {
  fill: #FBBF24;
}

.score-display {
  margin-top: 10px;
}

.score-number {
  color: #32c759;
  font-size: 1.8rem;
  font-weight: 900;
  line-height: 1;
}

.score-message {
  color: #6B7280;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 5px;
}
</style>