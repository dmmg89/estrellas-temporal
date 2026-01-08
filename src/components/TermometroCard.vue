<template>
  <div class="termometro-container">
    <div class="header-section">
      <div class="title-group">
        <h2 class="main-title">Termómetro</h2>
        <h3 class="subtitle">Somos Extraordinarios</h3>
      </div>
      <div class="info-icon">i</div>
    </div>

    <p class="description">
      Cada rubro refleja un aspecto positivo de tu atención al cliente, tu Meta es el
      <span class="bold-text">80%</span>
    </p>

    <div class="metrics-container">
      <div class="meta-badge">Meta 80%</div>

      <div v-for="(metric, index) in metrics" :key="index" class="metric-item">
        <div class="metric-header">
          <span class="metric-label">{{ metric.label }}</span>
          </div>

        <div class="progress-bar-container">
          <div
            class="floating-value"
            :class="metric.colorTextClass"
            :style="{ left: `${metric.value}%` }"
          >
            {{ metric.value }}%
          </div>

          <div
            class="progress-fill"
            :class="metric.colorBgClass"
            :style="{ width: `${metric.value}%` }"
          >
            <div class="segment-marker" style="right: 25%"></div>
            <div class="segment-marker" style="right: 50%"></div>
            <div class="segment-marker" style="right: 75%"></div>
          </div>

          <div
            class="icon-circle"
            :class="metric.colorBgClass"
            :style="{ left: `calc(${metric.value}% - 16px)` }"
          >
            <component :is="metric.icon" class="icon-svg" />
          </div>

          <div class="meta-line"></div>
        </div>

        <div class="scale-labels">
          <span>0%</span>
          <span class="meta-label">80%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue';

const SmileIcon = defineComponent({
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z' })
  ])
});

const ChatIcon = defineComponent({
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z' })
  ])
});

const HeartIcon = defineComponent({
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' })
  ])
});

interface MetricData {
  label: string;
  value: number;
  icon: ReturnType<typeof defineComponent>;
  colorTextClass: string;
  colorBgClass: string;
}

const metrics: MetricData[] = [
  { label: 'Amables', value: 45, icon: SmileIcon, colorTextClass: 'text-green', colorBgClass: 'bg-green' },
  { label: 'Asesores', value: 75, icon: ChatIcon, colorTextClass: 'text-yellow', colorBgClass: 'bg-yellow' },
  { label: 'Inolvidables', value: 35, icon: HeartIcon, colorTextClass: 'text-red', colorBgClass: 'bg-red' },
];
</script>

<style scoped>
.termometro-container {
  background-color: #F8F9FB;
  padding: 40px;
  border-radius: 24px;
  max-width: 380px;
  margin: 0 auto;
  font-family: sans-serif;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
}

.header-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.main-title { font-size: 20px; font-weight: 700; color: #1F2937; margin: 0; }
.subtitle { font-size: 18px; font-weight: 600; color: #374151; margin: 0; }

.info-icon {
  width: 32px; height: 32px;
  background-color: #E5E7EB;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #6B7280; font-family: serif; font-style: italic; font-weight: 700;
}

.description {
  font-size: 14px;
  color: #4B5563;
  margin-bottom: 40px;
  line-height: 1.5;
  text-align: left; /* Alinea el texto a la izquierda */
  width: 100%;      /* Asegura que ocupe todo el ancho disponible */
}
.bold-text { font-weight: 700; }

.metrics-container { position: relative; margin-top: 48px; }

.meta-badge {
  position: absolute; top: -40px; right: 20%; transform: translateX(50%);
  background-color: #69C248; color: white;
  font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 9999px;
  z-index: 10;
}

.metric-item { margin-bottom: 45px; }

.metric-header {
  display: flex;
  justify-content: flex-start; /* Fuerza la alineación al inicio (izquierda) */
  margin-bottom: 25px; /* Mantiene el espacio para el número flotante */
  width: 100%;
}

.metric-label {
  color: #374151;
  font-weight: 500;
  font-size: 16px;
  text-align: left; /* Asegura que el texto dentro del span apunte a la izquierda */
}
.floating-value {
  position: absolute;
  top: -30px;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: 700;
  transition: left 0.5s ease;
  white-space: nowrap;
}

.text-green { color: #00A859; }
.text-yellow { color: #F6A824; }
.text-red { color: #EF4E45; }

.progress-bar-container {
  height: 20px;
  background-color: #E5E7EB;
  border-radius: 9999px;
  position: relative;
  /* IMPORTANTE: overflow visible para que el icono sobresalga */
  overflow: visible; 
}

.progress-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.5s ease;
  position: relative;
  overflow: hidden; /* Para que los marcadores blancos se corten al final */
}

.bg-green { background-color: #00A859; }
.bg-yellow { background-color: #F6A824; }
.bg-red { background-color: #EF4E45; }

.segment-marker {
  position: absolute; right: 0; top: 0; height: 100%; width: 1.5px;
  background-color: white; opacity: 0.6;
}

.icon-circle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid white;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 20;
  transition: left 0.5s ease;
}

.icon-svg { width: 18px; height: 18px; color: white; fill: currentColor; }

.meta-line {
  position: absolute; top: 0; height: 100%; width: 2px;
  background-color: #D1D5DB; /* Gris claro para que se vea la meta */
  left: 80%; z-index: 5;
}

.scale-labels {
  display: flex; justify-content: space-between;
  font-size: 13px; color: #9CA3AF; margin-top: 8px;
  font-weight: 700; position: relative;
}

.meta-label {
  position: absolute; left: 80%; transform: translateX(-50%);
  color: #69C248;
}
</style>