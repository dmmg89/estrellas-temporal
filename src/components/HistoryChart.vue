<script setup lang="ts">
import { computed } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
// Asegúrate de importar tus interfaces correctamente
import type {
  HistoryModel,
  HistoryWeekModel,
} from "../models/HistoryWeekModel.ts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

const props = withDefaults(
  defineProps<{
    // Nota: Asumo que HistoryModel es un array de HistoryWeekModel basado en tu uso anterior.
    // Si HistoryModel es un objeto { data: [...] }, ajusta el acceso en el computed.
    data: HistoryWeekModel[];
    title?: string;
    divisions?: number;
  }>(),
  {
    divisions: 5,
  }
);

const COLORS = {
  blueLine: "#5B93FF",
  bluePointBg: "#FFFFFF",
  grayAreaBg: "rgba(229, 231, 235, 0.5)",
  grayAreaBorder: "transparent",
  greenAnnotation: "#32c759",
  gridLines: "#626260",
  textGray: "#9CA3AF",
  text: "#333333",
  rojo: "#E71618",
};

const chartData = computed<ChartData<"line">>(() => {
  // 1. Obtenemos los datos crudos
  const rawData = props.data || [];

  // 2. Lógica para filtrar duplicados manteniendo el primero
  const seenWeeks = new Set<number>();

  const history = rawData.filter((item) => {
    if (seenWeeks.has(item.semana)) {
      // Si la semana ya está en el Set, devolvemos false para ignorar este registro
      return false;
    } else {
      // Si es nueva, la agregamos al Set y devolvemos true para mantenerla
      seenWeeks.add(item.semana);
      return true;
    }
  });

  // 3. Mapeamos usando la lista ya filtrada (history)
  const labels = history.map((item) => item.semana.toString());
  const scoreData = history.map((item) => item.calificacion);
  const goalData = history.map((item) => item.meta);

  return {
    labels: labels,
    datasets: [
      {
        label: "Calificación",
        data: scoreData,
        borderColor: COLORS.blueLine,
        backgroundColor: COLORS.bluePointBg,
        borderWidth: 1,
        pointRadius: 3,
        pointHoverRadius: 8,
        pointBorderWidth: 3,
        tension: 0.3,
        fill: false,
        order: 1,
      },
      {
        label: "Meta",
        data: goalData,
        borderColor: COLORS.grayAreaBorder,
        backgroundColor: "transparent",
        pointRadius: 0,
        tension: 0.4,
        fill: "start",
        order: 2,
      },
    ],
  };
});

const chartOptions = computed<ChartOptions<"line">>(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "#ddd",
        borderWidth: 1,
      },
      annotation: {
        annotations: {
          maxLine: {
            type: "line",
            yMin: 5.0,
            yMax: 5.0,
            borderColor: COLORS.rojo,
            borderWidth: 1,
            borderDash: [6, 6],
            label: {
              display: true,
              position: "start",
              backgroundColor: "transparent",
              color: COLORS.textGray,
              font: {
                size: 11,
              },
              yAdjust: -5,
              xAdjust: 10,
            },
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: COLORS.textGray,
          font: {
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Semana",
          color: COLORS.textGray,
          font: {
            size: 12,
          },
        },
      },
      y: {
        min: 3.8,
        max: 5.0,
        grid: {
          color: function (context) {
            if (context.tick.value === 5.0) return "transparent"; // <- última línea
            return COLORS.gridLines;
          },
          tickLength: 3,
          lineWidth: 0.3,
        },
        border: {
          display: false,
        },
        ticks: {
          color: COLORS.textGray,
          count: props.divisions,
          callback: function (value) {
            return typeof value === "number" ? value.toFixed(2) : value;
          },
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 20,
        top: 20,
        bottom: 10,
      },
    },
  };
});
</script>

<template>
  <div class="history-chart-card">
    <h3 v-if="title" class="chart-title">{{ title }}</h3>

    <div class="chart-container-wrapper">
      <Line :data="chartData" :options="chartOptions" />
    </div>

    <div class="custom-legend">
      <div class="legend-item">
        <span class="dot actual-dot"></span>
        <span class="legend-text">Año Actual</span>
      </div>
      <div class="legend-item">
        <span class="dot goal-dot"></span>
        <span class="legend-text">Objetivo</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-chart-card {
  width: calc(100vw - 83px);
  background-color: #f6f7f9;
  padding: 0 20px 20px 20px;
  margin: 30px auto 0 auto;
  border-radius: 21px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.chart-title {
  color: #393a36;
  font-size: 15px;
  font-weight: 600;
  text-align: left;
}

.chart-container-wrapper {
  position: relative;
  height: 180px;
  width: 100%;
}
.custom-legend {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  padding-left: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.legend-text {
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
}

.actual-dot {
  background-color: #1a73e8;
}

.goal-dot {
  background-color: #d93025;
}
</style>
