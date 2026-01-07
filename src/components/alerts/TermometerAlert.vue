<script setup lang="ts">
import { computed } from 'vue';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleBackdropClick = () => {
  emit('close');
};

const currentValue = 45;
const targetValue = 80;

const markerStyle = computed(() => ({
  left: `${currentValue}%`
}));

const fillStyle = computed(() => ({
  width: `${currentValue}%`
}));

const targetLabelStyle = computed(() => ({
  left: `${targetValue}%`
}));
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="modal-overlay" @click.self="handleBackdropClick">

      <div class="modal-card">
        <button class="close-btn" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="header-group">
          <h2 class="title">Termómetro</h2>
          <span class="top-subtitle">Somos Extraordinarios</span>
        </div>

        <div class="content">
          <div class="section">
            <h3 class="question">¿Qué es?</h3>
            <p class="description">
              Es una herramienta que te ayudará a conocer tu avance en cada eje del <em>Modelo de Atención Somos Extraordinarios.</em>
            </p>
          </div>

          <div class="section">
            <h3 class="question">¿Cómo funciona?</h3>
            <p class="description">
              En cada barra podrás observar que tan Amable, Asesor e Inolvidable, eres para tus clientes.
            </p>
          </div>

          <div class="gauge-container">
            <h4 class="gauge-title">Amables</h4>

            <div class="progress-wrapper">

              <span class="value-label current-label" :style="markerStyle">
                {{ currentValue }}%
              </span>

              <span class="value-label target-label" :style="targetLabelStyle">
                {{ targetValue }}%
              </span>

              <div class="track">
                <div class="fill" :style="fillStyle"></div>
                <div class="segments-overlay"></div>
              </div>

              <div class="marker" :style="markerStyle">
                <div class="marker-circle">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="smiley-icon">
                    <path d="M8 10H8.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    <path d="M16 10H16.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    <path d="M7 15C7 15 9 17 12 17C15 17 17 15 17 15" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
              </div>

              <div class="axis-labels">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            <p class="footer-text">
              La barra te mostrará tu avance, el objetivo es el 80%
            </p>
          </div>
        </div>
      </div>

    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 16px;
  box-sizing: border-box;
}

.modal-card {
  background: white;
  width: 100%;
  max-width: 400px;
  border-radius: 24px;
  padding: 32px 24px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  font-family: system-ui, -apple-system, sans-serif;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #F3F4F6;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #374151;
  transition: background-color 0.2s;
  z-index: 10;
}

.close-btn:hover {
  background-color: #E5E7EB;
}

.header-group {
  margin-bottom: 24px;
}

.title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1F2937;
  margin: 0;
  line-height: 1.2;
}

.top-subtitle {
  font-size: 0.95rem;
  color: #6B7280;
  font-weight: 400;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.question {
  font-size: 1rem;
  color: #9CA3AF;
  font-weight: 600;
  margin: 0;
}

.description {
  font-size: 0.95rem;
  color: #374151;
  line-height: 1.5;
  margin: 0;
}

.description em {
  font-style: italic;
  font-weight: 500;
}

.gauge-container {
  margin-top: 8px;
}

.gauge-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 24px 0;
}

.progress-wrapper {
  position: relative;
  height: 60px;
  margin-bottom: 8px;
}

.track {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  height: 14px;
  background-color: #E5E7EB;
  border-radius: 999px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background-color: #00A859;
  border-radius: 999px 0 0 999px;
}

.segments-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 24%,
      rgba(255, 255, 255, 0.4) 24%,
      rgba(255, 255, 255, 0.4) 25%
  );
  pointer-events: none;
}

.marker {
  position: absolute;
  top: 27px;
  transform: translate(-50%, -50%);
  z-index: 2;
  pointer-events: none;
}

.marker-circle {
  width: 28px;
  height: 28px;
  background-color: #1A4D2E;
  border: 2px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.smiley-icon {
  width: 16px;
  height: 16px;
}

.value-label {
  position: absolute;
  font-weight: 800;
  transform: translateX(-50%);
}

.current-label {
  top: -5px;
  color: #00A859;
  font-size: 1.1rem;
}

.target-label {
  top: 5px;
  color: #5CD600;
  font-size: 0.75rem;
}

.axis-labels {
  position: absolute;
  top: 38px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  color: #D1D5DB;
  font-size: 0.9rem;
}

.footer-text {
  font-size: 0.9rem;
  color: #4B5563;
  line-height: 1.4;
  margin-top: 4px;
}
</style>