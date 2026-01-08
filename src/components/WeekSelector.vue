<template>
  <div class="selector-container">
    <label class="selector-label">Semana</label>

    <div class="select-wrapper">
      <select
          :value="store.week"
          @change="handleChange"
          class="custom-select"
      >
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <svg class="chevron-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {useStateStore} from "../store/StateStore.ts";
import {generateLabelFromWeek, getCurrentWeekNumber} from "../utils/DateUtils.ts";

const store = useStateStore();

interface WeekOption {
  value: number;
  label: string;
}

const options = ref<WeekOption[]>([]);

onMounted(() => {
  // const currentWeek = getCurrentWeekNumber();
  const currentWeek = 49;
  // const currentYear = new Date().getFullYear();
  const currentYear = 2025;

  for (let i = 0; i <= 2; i++) {
    const w = currentWeek - i;

    if (w > 0) {
      options.value.push({
        value: w,
        label: generateLabelFromWeek(w, currentYear)
      });
    }
  }

  if (!store.week && options.value.length > 0) {
    store.setWeek(options.value[0].value);
  }
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const val = parseInt(target.value, 10);
  store.setWeek(val);
  console.log("Semana numérica en Pinia:", store.week);
};
</script>

<style scoped>
.selector-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.selector-label {
  font-weight: 500;
  color: #555;
  font-size: 12px;
}

.select-wrapper {
  position: relative;
  display: inline-block;
}

.custom-select {
  appearance: none;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 8px 20px;
  padding-right: 50px;
  font-size: 11px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
}

.custom-select:hover {
  border-color: #b0b0b0;
}

.chevron-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #888;
  pointer-events: none;
}
</style>