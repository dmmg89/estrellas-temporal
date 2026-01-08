<script setup lang="ts">
import {computed, onMounted, onUpdated} from 'vue';
import type {AtributeModel} from "../models/AtributeItemModel.ts";

const props = defineProps<{
  items: AtributeModel
}>();

onMounted(() => {
  console.log('TermometerCard received items:', props.items);
});

onUpdated(() => {
  console.log('TermometerCard updated items:', props.items);
});

const getAttributesConfig = (name: string, score: number) => {
  const normalized = name.toLowerCase();

  let config = {
    color: '#2979FF',
    icon: 'star',
    gradient: 'linear-gradient(90deg, #2979FF 0%, #448AFF 100%)'
  };

  if (normalized.includes('amables')) {
    config = {
      color: '#00C853',
      icon: 'smile',
      gradient: 'linear-gradient(90deg, #00C853 0%, #00E676 100%)'
    };
  } else if (normalized.includes('asesores')) {
    config = {
      color: '#FFAB00',
      icon: 'chat',
      gradient: 'linear-gradient(90deg, #FFAB00 0%, #FFD740 100%)'
    };
  } else if (normalized.includes('inolvidables')) {
    config = {
      color: '#FF3D00',
      icon: 'heart',
      gradient: 'linear-gradient(90deg, #D32F2F 0%, #FF5252 100%)'
    };
  }

  if (score === 0) {
    config.color = '#9E9E9E'; // Gris
    config.gradient = 'linear-gradient(90deg, #9E9E9E 0%, #BDBDBD 100%)';
  }

  return config;



};

const getPercentage = (score: number) => Math.round(score * 100);
</script>

<template>
  <div class="termometer-card">
    <div class="header">
      <div class="title-group">
        <h2 class="card-title">Termómetro</h2>
        <p class="card-subtitle">Somos Extraordinarios</p>
      </div>
      <div class="meta-badge" >
        Meta 80%
      </div>
    </div>

    <div class="bars-container">
      <div v-for="item in items" :key="item.idAtributo" class="bar-row">

        <div class="label-name">{{ item.nombreAtributo }}</div>

        <div class="track-wrapper">
          <span class="side-label">0%</span>

          <div class="track">
            <div class="segments-overlay"></div>

            <div
                class="fill"
                :style="{
                width: `${getPercentage(item.valorAtributo)}%`,
                background: getAttributesConfig(item.nombreAtributo, item.valorAtributo).gradient
              }"
            >
              <div class="marker">
                <span
                    class="floating-percentage"
                    :style="{ color: getAttributesConfig(item.nombreAtributo, item.valorAtributo).color }"
                >
                  {{ getPercentage(item.valorAtributo) }}%
                </span>

                <div
                    class="icon-circle"
                    :style="{ backgroundColor: getAttributesConfig(item.nombreAtributo, item.valorAtributo).color }"
                >
                  <svg v-if="getAttributesConfig(item.nombreAtributo, item.valorAtributo).icon === 'smile'" viewBox="0 0 24 24" fill="currentColor" class="item-icon">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                  </svg>

                  <svg v-if="getAttributesConfig(item.nombreAtributo, item.valorAtributo).icon === 'chat'" viewBox="0 0 24 24" fill="currentColor" class="item-icon">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                  </svg>

                  <svg v-if="getAttributesConfig(item.nombreAtributo, item.valorAtributo).icon === 'heart'" viewBox="0 0 24 24" fill="currentColor" class="item-icon">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>

                  <svg v-if="getAttributesConfig(item.nombreAtributo, item.valorAtributo).icon === 'star'" viewBox="0 0 24 24" fill="currentColor" class="item-icon">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <span class="side-label">100%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ... (Los estilos se mantienen igual que tu código original) ... */
.termometer-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  max-width: 450px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #333;
  margin: 0;
}

.card-subtitle {
  font-size: 0.9rem;
  color: #888;
  margin: 4px 0 0 0;
}

.meta-badge {
  background-color: #00C853;
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 6px 12px;
  border-bottom-left-radius: 12px;
  border-top-left-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 200, 83, 0.3);
}

.bar-row {
  margin-bottom: 2rem;
}

.label-name {
  font-weight: 700;
  color: #444;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.track-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.side-label {
  font-size: 0.8rem;
  color: #CCC;
  font-weight: 600;
  min-width: 30px;
}

.track {
  position: relative;
  flex-grow: 1;
  height: 14px;
  background-color: #EEE;
  border-radius: 10px;
}

.segments-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  border-radius: 10px;
  background: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 24%,
      #FFF 24%,
      #FFF 25%
  );
  pointer-events: none;
}

.fill {
  height: 100%;
  border-radius: 10px;
  position: relative;
  transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.marker {
  position: absolute;
  right: -14px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.floating-percentage {
  position: absolute;
  top: -22px;
  font-weight: 800;
  font-size: 0.95rem;
  white-space: nowrap;
}

.icon-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow:
      inset 0 -2px 4px rgba(0,0,0,0.2),
      0 3px 6px rgba(0,0,0,0.15);
  border: 2px solid white;
}

.item-icon {
  width: 16px;
  height: 16px;
}
</style>