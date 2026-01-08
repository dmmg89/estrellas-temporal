<script setup lang="ts">
import { ref } from 'vue';

type SelectionOption = 'División' | 'Territorio';

const currentSelection = ref<SelectionOption>('División');

const selectOption = (option: SelectionOption) => {
  if (currentSelection.value === option) return;

  currentSelection.value = option;
  console.log(`Opción seleccionada: ${option}`);
};
</script>

<template>
  <div class="toggle-container">
    <button
        @click="selectOption('División')"
        class="toggle-btn"
        :class="{ 'active': currentSelection === 'División' }"
    >
      División
    </button>

    <button
        @click="selectOption('Territorio')"
        class="toggle-btn"
        :class="{ 'active': currentSelection === 'Territorio' }"
    >
      Territorio
    </button>
  </div>
</template>

<style scoped>
.toggle-container {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 10px;
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