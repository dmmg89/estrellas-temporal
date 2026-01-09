<script setup lang="ts">
import { defineComponent, h, onMounted, onUpdated, computed } from "vue";
import type { AtributeModel } from "../models/AtributeItemModel.ts";
import amablesIcon from "../assets/icons/amables.svg";
import asesoresIcon from "../assets/icons/asesores.svg";
import inolvidablesIcon from "../assets/icons/inolvidables .svg";
/* Importación desde Google Fonts */

const props = defineProps<{
  items: AtributeModel;
}>();

// --- Lógica de Iconos ---
const SmileIcon = defineComponent({
  render: () =>
    h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
      },
      [
        h("path", {
          d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z",
        }),
      ]
    ),
});
const ATTRIBUTE_CONFIG: Record<
  number,
  {
    label: string;
    icon: string;
    colorTextClass: string;
    colorBgClass: string;
  }
> = {
  1: {
    // Amables
    label: "Amables",
    icon: amablesIcon,
    colorTextClass: "text-green",
    colorBgClass: "bg-green",
  },
  2: {
    // Asesores
    label: "Asesores",
    icon: asesoresIcon,
    colorTextClass: "text-yellow",
    colorBgClass: "bg-yellow",
  },
  3: {
    // Inolvidables
    label: "Inolvidables",
    icon: inolvidablesIcon,
    colorTextClass: "text-red",
    colorBgClass: "bg-red",
  },
};

const ChatIcon = defineComponent({
  render: () =>
    h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
      },
      [
        h("path", {
          d: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z",
        }),
      ]
    ),
});

const HeartIcon = defineComponent({
  render: () =>
    h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
      },
      [
        h("path", {
          d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
        }),
      ]
    ),
});
const normalizePercentage = (value: number): number => {
  // Si viene ya como porcentaje (0–100)
  if (value > 1) {
    return Math.min(Math.round(value), 100);
  }

  // Si viene normalizado (0–1)
  return Math.min(Math.round(value * 100), 100);
};

interface MetricData {
  label: string;
  value: number;
  icon: ReturnType<typeof defineComponent>;
  colorTextClass: string;
  colorBgClass: string;
}

const metrics = computed<MetricData[]>(() => {
  if (!props.items || props.items.length === 0) return [];

  return (
    props.items
      // 1️⃣ Limita solo a los 3 IDs permitidos
      .filter((item) => ATTRIBUTE_CONFIG[item.idAtributo])

      // 2️⃣ Fuerza orden fijo del termómetro
      .sort((a, b) => a.idAtributo - b.idAtributo)

      // 3️⃣ Mapea a la estructura visual existente
      .map((item) => {
        const config = ATTRIBUTE_CONFIG[item.idAtributo];

        return {
          label: config.label, // ← nombre controlado
          value: normalizePercentage(item.valorAtributo),
          icon: config.icon,
          colorTextClass: config.colorTextClass,
          colorBgClass: config.colorBgClass,
        };
      })
  );
});
</script>

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
      Cada rubro refleja un aspecto positivo de tu atención al cliente, tu Meta
      es el
      <span class="bold-text">80%</span>
    </p>

    <div class="metrics-container">
      <div class="meta-badge-top">Meta 80%</div>

      <div v-for="(metric, index) in metrics" :key="index" class="metric-item">
        <div class="metric-header">
          <span class="metric-label">{{ metric.label }}</span>
        </div>

        <div class="progress-bar-container">
          <span class="limit-label start">0%</span>
          <span class="limit-label end">100%</span>

          <div class="meta-marker-group">
            <span class="meta-label-top">80%</span>
            <div class="meta-line"></div>
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
            <img :src="metric.icon" class="icon-svg-img" />
          </div>

          <div
            class="floating-value-bottom"
            :class="metric.colorTextClass"
            :style="{ left: `${metric.value}%` }"
          >
            {{ metric.value }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.termometro-container {
  background-color: #f8f9fb;
  padding: 40px;
  border-radius: 24px;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.icon-svg-img {
  width: 28px;
  height: 28px;
  /* Nota: con <img> no puedes cambiar el color del SVG con CSS fácilmente */
}
.header-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.main-title {
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  text-align: justify;
  text-justify: inter-word;
}
.subtitle {
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.info-icon {
  font-family: "Times New Roman", Times, serif; /* Fuente Serif con remates */
  font-style: italic; /* Cursiva obligatoria */
  font-weight: 700; /* Negrita para que resalte el cuerpo de la 'i' */
  font-size: 20px;

  width: 30px;
  height: 30px;
  background-color: #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-weight: 700;
}

.description {
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 50px;
  line-height: 1.5;
  text-align: justify;
  text-justify: inter-word;
  line-height: 16px;
}

.bold-text {
  font-weight: 700;
}

.metrics-container {
  position: relative;
  margin-top: 20px;
}

/* Badge superior general */
.meta-badge-top {
  position: absolute;
  top: -30px;
  right: 10%;
  transform: translateX(50%);
  background-color: #69c248;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  z-index: 10;

  border-radius: 0px 12px 0px 12px;
}

.metric-item {
  margin-bottom: 25px; /* Más espacio para los porcentajes de abajo */
}

.metric-header {
  margin-bottom: 15px;
  text-align: justify;
  text-justify: inter-word;
}

.metric-label {
  font-family: "Poppins", sans-serif;
  color: #374151;
  font-weight: 600;
  font-size: 15px;
}

.progress-bar-container {
  height: 17px;
  background-color: #e5e7eb;
  border-radius: 9999px;
  position: relative;
  overflow: visible;
  max-width: 76%;
  margin-left: 40px;
}

/* Etiquetas de extremos 0% y 100% */
.limit-label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  font-weight: 700;
  color: #9ca3af;
}
.limit-label.start {
  left: -35px;
}
.limit-label.end {
  right: -45px;
}

/* Grupo de Meta 80% Superior */
.meta-marker-group {
  position: absolute;
  left: 80%;
  top: -20px;
  height: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
}

.meta-label-top {
  font-size: 12px;
  font-weight: 800;
  color: #69c248;
  margin-bottom: 2px;
}

.meta-line {
  width: 2px;
  height: 20px;
  background-color: #d1d5db;
}

.progress-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.5s ease;
  position: relative;
  overflow: hidden;
}

.bg-green {
  background-color: #00a859;
}
.bg-yellow {
  background-color: #f6a824;
}
.bg-red {
  background-color: #ef4e45;
}

.text-green {
  color: #00a859;
}
.text-yellow {
  color: #f6a824;
}
.text-red {
  color: #ef4e45;
}

.segment-marker {
  position: absolute;
  height: 100%;
  width: 1.5px;
  background-color: white;
  opacity: 0.4;
}

.icon-circle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 20;
  transition: left 0.5s ease;
}

.icon-svg {
  width: 16px;
  height: 16px;
  color: white;
}

/* Valor flotante abajo del icono */
.floating-value-bottom {
  position: absolute;
  top: 30px;
  transform: translateX(-50%);
  font-size: 15px;
  font-weight: 800;
  transition: left 0.5s ease;
  white-space: nowrap;
}
</style>
