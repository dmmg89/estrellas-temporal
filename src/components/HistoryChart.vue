<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
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
  ChartData
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

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

export interface HistoryItem {
  week: number;
  score: number;
  goal: number;
}

export interface PropsData {
  history: HistoryItem[];
}

const props = withDefaults(defineProps<{
  data: PropsData;
  title?: string;
  divisions?: number; // Nueva prop para controlar "n" divisiones
}>(), {
  divisions: 5 // Valor por defecto si no se especifica
});

const COLORS = {
  blueLine: '#5B93FF',
  bluePointBg: '#FFFFFF',
  grayAreaBg: 'rgba(229, 231, 235, 0.5)',
  grayAreaBorder: 'transparent',
  greenAnnotation: '#32c759',
  gridLines: '#626260',
  textGray: '#9CA3AF'
};

const chartData = computed<ChartData<'line'>>(() => {
  const history = props.data.history;
  const labels = history.map(item => item.week.toString());
  const scoreData = history.map(item => item.score);
  const goalData = history.map(item => item.goal);

  return {
    labels: labels,
    datasets: [
      {
        label: 'Calificación',
        data: scoreData,
        borderColor: COLORS.blueLine,
        backgroundColor: COLORS.bluePointBg,
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBorderWidth: 3,
        tension: 0.3,
        fill: false,
        order: 1
      },
      {
        label: 'Meta',
        data: goalData,
        borderColor: COLORS.grayAreaBorder,
        backgroundColor: COLORS.grayAreaBg,
        pointRadius: 0,
        tension: 0.4,
        fill: 'start',
        order: 2
      }
    ]
  };
});

const chartOptions = computed<ChartOptions<'line'>>(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1
      },
      annotation: {
        annotations: {
          maxLine: {
            type: 'line',
            yMin: 5.00,
            yMax: 5.00,
            borderColor: COLORS.greenAnnotation,
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: true,
              content: '5.00',
              position: 'start',
              backgroundColor: 'transparent',
              color: COLORS.textGray,
              font: {
                size: 12
              },
              yAdjust: -10
            }
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: COLORS.textGray,
          font: {
            weight: 'bold'
          }
        },
        title: {
          display: true,
          text: 'Semana',
          color: COLORS.textGray,
          font: {
            size: 12
          }
        }
      },
      y: {
        min: 3.8,
        max: 5.0,
        grid: {
          color: COLORS.gridLines,
          tickLength: 0,
        },
        border: {
          display: false, // Oculta la línea vertical del eje Y si quieres un look más limpio
        },
        ticks: {
          color: COLORS.textGray,
          count: props.divisions, // Fuerza "n" divisiones
          callback: function(value) {
            return typeof value === 'number' ? value.toFixed(2) : value;
          }
        }
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 20,
        top: 20,
        bottom: 10
      }
    }
  };
});
</script>

<template>
  <div class="history-chart-card">
    <h3 v-if="title" class="chart-title">{{ title }}</h3>

    <div class="chart-container-wrapper">
      <Line
          :data="chartData"
          :options="chartOptions"
      />
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
  background-color: #F6F7F9;
  border-radius: 24px;
  padding: 12px 0;
  margin-top: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
}

.chart-title {
  margin: 0 0 1.5rem 0;
  color: #374151;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: left;
}

.chart-container-wrapper {
  position: relative;
  height: 250px;
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
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.legend-text {
  font-size: 0.85rem;
  color: #6B7280;
  font-weight: 500;
}

.actual-dot {
  background-color: #1A73E8;
}

.goal-dot {
  background-color: #D93025;
}
</style>