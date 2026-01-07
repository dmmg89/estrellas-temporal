<template>
  <Transition name="fade">
    <div v-if="isLoading" class="loading-container">
      <div class="lottie-animation" ref="lottieContainer"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import lottie from 'lottie-web';
import type { AnimationItem } from 'lottie-web';
import animationData from '../assets/animations/loading-zeus.json';

import { useStateStore } from "../store/StateStore";
import { storeToRefs } from "pinia";

const store = useStateStore();
const { isLoading } = storeToRefs(store);

const lottieContainer: Ref<HTMLDivElement | null> = ref(null);
let animationInstance: AnimationItem | null = null;

const destroyAnimation = () => {
  if (animationInstance) {
    animationInstance.destroy();
    animationInstance = null;
  }
};

watch(isLoading, async (newValue) => {
  if (newValue) {
    await nextTick();

    if (lottieContainer.value) {
      destroyAnimation();

      const animData = (animationData as any).default ? (animationData as any).default : animationData;

      try {
        animationInstance = lottie.loadAnimation({
          container: lottieContainer.value,
          animationData: JSON.parse(JSON.stringify(animData)),
          renderer: 'svg',
          loop: true,
          autoplay: true,
        });
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    destroyAnimation();
  }
});

onUnmounted(() => {
  destroyAnimation();
});
</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  z-index: 9999;
}

.lottie-animation {
  width: 150px;
  height: 150px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>