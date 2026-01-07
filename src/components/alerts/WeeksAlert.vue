<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleBackdropClick = () => {
  emit('close');
};
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

        <h2 class="title">Esquema Acciones y Consecuencias</h2>

        <div class="content">
          <div class="section">
            <h3 class="subtitle">¿Qué es?</h3>
            <p class="description">
              Es un programa donde toma relevancia la atención que brindas hacia nuestros clientes, basado en los resultados de la encuesta de estrellas de servicio.
            </p>
          </div>

          <div class="section">
            <h3 class="subtitle">¿Cómo funciona?</h3>
            <p class="description">Según el resultado, se te asigna:</p>

            <ul class="status-list">
              <li class="status-item">
                <span class="dot red"></span>
                <span class="status-text"><strong>Rojo:</strong> Evaluación en baja (5 semanas)</span>
              </li>
              <li class="status-item">
                <span class="dot orange"></span>
                <span class="status-text"><strong>Naranja:</strong> Acta Administrativa (3 semanas)</span>
              </li>
              <li class="status-item">
                <span class="dot yellow"></span>
                <span class="status-text"><strong>Amarillo:</strong> Acta Compromiso (2 semanas)</span>
              </li>
              <li class="status-item">
                <span class="dot green"></span>
                <span class="status-text"><strong>Verde:</strong> Sin acción</span>
              </li>
            </ul>
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
}

.close-btn:hover {
  background-color: #E5E7EB;
}

.title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1F2937;
  margin-top: 0;
  margin-bottom: 24px;
  padding-right: 20px;
  line-height: 1.3;
}

.subtitle {
  font-size: 1rem;
  color: #9CA3AF;
  font-weight: 600;
  margin-bottom: 8px;
}

.description {
  font-size: 0.95rem;
  color: #4B5563;
  line-height: 1.5;
  margin: 0;
}

.section {
  margin-bottom: 24px;
}

.status-list {
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.status-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.status-text {
  font-size: 0.95rem;
  color: #374151;
  line-height: 1.4;
}

.status-text strong {
  font-weight: 700;
  color: #111827;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
}

.red { background-color: #FF0000; }
.orange { background-color: #FFA500; }
.yellow { background-color: #FFD700; }
.green { background-color: #5CD600; }
</style>