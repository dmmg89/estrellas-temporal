<script setup lang="ts">
import NavigationHeader from "./components/NavigationHeader.vue";
import ErrorLottie from "./components/ErrorLottie.vue";
import { RouterLink, RouterView } from 'vue-router'






</script>

<template>
  <NavigationHeader />
  <RouterView />


</template>

<style>

html, body {
  max-width: 100%;
  overflow-x: hidden;
}
body {
  background-color: #ffffff;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}
</style>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.main-image {
  width: 200px; /* ajusta el tamaño de la imagen según necesites */
  height: auto;
  margin-bottom: 2em; /* Espacio entre la imagen y el texto */
}

p {
  font-size: 1.1rem;
  color: #333;
  font-weight: bold;
}


* {
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  overflow: hidden;
}

body {
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

::-webkit-scrollbar-thumb {
  background: transparent;
}

</style>