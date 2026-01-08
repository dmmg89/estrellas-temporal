<script setup lang="ts">
import NavigationHeader from "./components/NavigationHeader.vue";
import ErrorLottie from "./components/ErrorLottie.vue";
import { RouterLink, RouterView } from "vue-router";
import WeekSelector from "./components/WeekSelector.vue";
</script>

<template>
  <NavigationHeader />

  <div class="sub-header-wrapper">
    <WeekSelector />
  </div>
  <RouterView />
</template>

<style>
html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}
body {
  background-color: #ffffff;
  margin: 0;
  font-family: "Poppins", sans-serif;
}
</style>

<style scoped>
.sub-header-wrapper {
  background-color: #f6f7f9;
  box-shadow: 0px 3px 6px #00000029;
  position: fixed;
  top: 63px;
  left: 0;
  width: 100%;
  z-index: 990;
  padding: 10px 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 30px;
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.main-image {
  width: 200px;
  height: auto;
  margin-bottom: 1em;
}

p {
  font-size: 0.8rem;
  color: #333;
  font-weight: bold;
}

* {
  margin: 0;
  padding: 0;
}

html,
body {
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
