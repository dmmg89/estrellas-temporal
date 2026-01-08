<script setup lang="ts">
// No necesitamos importar ref porque el estado vendrá de fuera

// Definimos el tipo (opcional, pero buena práctica)
type SelectionOption = "División" | "Territorio";

// 1. Recibimos el valor actual desde el padre
const props = defineProps<{
  modelValue: SelectionOption;
}>();

// 2. Definimos el evento para avisar al padre del cambio
const emit = defineEmits<{
  (e: "update:modelValue", value: SelectionOption): void;
}>();

const selectOption = (option: SelectionOption) => {
  if (props.modelValue === option) return;

  // 3. En lugar de cambiar una variable local, emitimos el evento
  emit("update:modelValue", option);
};
</script>

<template>
  <div class="toggle-container">
    <button
      @click="selectOption('División')"
      class="toggle-btn"
      :class="{ active: modelValue === 'División' }"
    >
      División
    </button>

    <button
      @click="selectOption('Territorio')"
      class="toggle-btn"
      :class="{ active: modelValue === 'Territorio' }"
    >
      Territorio
    </button>
  </div>
</template>

<style scoped>
/* Tus estilos se mantienen igual */
.toggle-container {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 10px;
  margin: 20px 0 20px 0;
}
.toggle-btn {
  background-color: #f0f2f5;
  color: #a0a5b5;
  border: none;
  padding: 10px 32px;
  border-radius: 50px;
  font-family: sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}
.toggle-btn.active {
  background-color: #e11d2b;
  color: white;
  box-shadow: 0 4px 10px rgba(225, 29, 43, 0.3);
}
.toggle-btn:not(.active):hover {
  background-color: #e4e6ea;
}
</style>
