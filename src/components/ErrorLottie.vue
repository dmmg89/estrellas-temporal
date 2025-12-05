<template>
  <div  class="loading-container">
    <div class="lottie-animation" ref="lottieContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import lottie from 'lottie-web';
import type { AnimationItem } from 'lottie-web';
import animationData from '../assets/animations/engranes-lottie.json';



// 2. Tipado del template ref y de la instancia de la animación
const lottieContainer: Ref<HTMLDivElement | null> = ref(null);
let animationInstance: AnimationItem | null = null;

// 3. Uso de watchEffect para reaccionar a los cambios
watchEffect(() => {
  // Se ejecuta cuando el div aparece en el DOM gracias al v-if
  if ( lottieContainer.value) {
    animationInstance = lottie.loadAnimation({
      container: lottieContainer.value,
      animationData: animationData, // Se usa el JSON importado
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });
  } else {
    // Si isLoading es false, el v-if elimina el div,
    // y si la animación existe, se destruye para liberar memoria.
    if (animationInstance) {
      animationInstance.destroy();
      animationInstance = null;
    }
  }
});

// 4. Limpieza final al desmontar el componente
onUnmounted(() => {
  if (animationInstance) {
    animationInstance.destroy();
    animationInstance = null;
  }
});
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

.lottie-animation {
  width: 150px;
  height: 150px;
}
</style>