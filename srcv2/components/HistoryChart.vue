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
    data: HistoryModel;
    title?: string;
    divisions?: number; // Nueva prop para controlar "n" divisiones
  }>(),
  {
    divisions: 5, // Valor por defecto si no se especifica
  }
);

const COLORS = {
  blueLine: "#5B93FF",
  bluePointBg: "#FFFFFF",
  grayAreaBg: "rgba(229, 231, 235, 0.5)",
  grayAreaBorder: "transparent",
  greenAnnotation: "#32c759",
  gridLines: "#626260",
  textGray: "#818181",
  text: "#333333",
  rojo: "#E71618",
};

const chartData = computed<ChartData<"line">>(() => {
  console.log("componente > " + JSON.stringify(props));
  const history = props.data;

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
        pointBorderWidth: 1,
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
          color: COLORS.text,
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
            // context.tick.value es el valor de cada línea
            if (context.tick.value === 5.0) return "transparent"; // <- última línea
            return COLORS.gridLines; // resto de líneas normales
          },
          tickLength: 3,
          lineWidth: 0.3,
        },
        border: {
          display: false,
        },
        ticks: {
          color: COLORS.textGray,
          stepSize: 0.1,
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
    <!-- <h3 v-if="title" class="chart-title">{{ title }}</h3> -->
    <h3 v-if="title" class="chart-title">Tendencia Red Grupo Elektra</h3>

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
        <span class="legend-text">Objetivo: 5.0</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-chart-card {
  width: calc(100vw - 83px);
  background-color: #f6f7f9;
  padding: 20px;
  margin: 60px auto 0 auto;

  border-radius: 21px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.chart-title {
  color: #393a36;
  font-size: 15px;
  font-weight: 600;
  text-align: left;
  margin-left: 10px;
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
  margin-top: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: -10px;
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
