<script setup lang="ts">
import HomeNav from '../assets/icons/ic_home_nav.svg'
import GoBackNav from '../assets/icons/ic_back_arrow.svg';
import CircularIconButton from "./items/CircularIconButton.vue";

import { useRouter, type Router } from 'vue-router';
import {Str} from "../utils/AppConstants.ts";


interface WebkitMessageHandler {
  postMessage(message: string): void;
}

interface WebkitMessageHandlers {
  backModule?: WebkitMessageHandler;
}

interface Webkit {
  messageHandlers?: WebkitMessageHandlers;
}

interface AndroidInterface {
  backModule?(message: string): void;
}


interface RootState {
  [key: string]: any;
}

interface RootGetters {
  initialScreen: string;
}


const router: Router = useRouter();

const headerTitle = Str.headerName

const goBack = (): void => {
    backInitNav();


  // router.go(-1);
  // if (router.currentRoute.value.path === initialScreen) {
  //   backInitNav();
  // } else {
  //   router.go(-1); // Navega una página atrás en el historial del navegador
  // }
};


const backInitNav = (): void => {
  if (window.webkit?.messageHandlers?.backModule) {
    window.webkit.messageHandlers.backModule.postMessage("Clicked Init IOS");
    console.log("Called iOS backModule");
  } else if (window.AndroidInterface?.backModule) {
    window.AndroidInterface.backModule("Clicked Init ANDROID");
    console.log("Called Android backModule");
  } else {
    console.warn("Native backModule interface not found.");
  }
};



</script>

<template>
  <header class="app-header">
    <div class="left-content">
      <CircularIconButton
          class="circular-button"
          :iconSrc="GoBackNav" :clickHandler="goBack"
      />
      <div class="logo">
        <h1>
          {{headerTitle}}
        </h1>
      </div>
    </div>

          <CircularIconButton
              class="circular-button"
              :iconSrc="HomeNav" :clickHandler="backInitNav"/>


    <div class="button-group">
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px;
  background-color: white;
  color: black;
  width: 100%;
  margin: 0 auto;
  margin-top: 3%;
  box-sizing: border-box;
}

.logo{
  flex-grow: 1;
  flex-shrink: 0;
  min-width: 0;
  max-width: 260px;

}

.logo h1 {
  font-family: 'Poppins';
  font-weight: 600;
  text-align: left;
  font-size: 1.1rem;
  margin-left: 5%;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.left-content {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-grow: 1;
}

.circular-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;  /* Define un ancho fijo */
  height: 40px; /* Define un alto fijo (igual al ancho) */
  border-radius: 50%; /* Esto crea el círculo */
  flex-shrink: 0; /* ¡MUY IMPORTANTE! Evita que el botón se encoja */
  overflow: hidden; /* Oculta cualquier parte del icono que se salga */
  cursor: pointer;
  background-color: #E4E8F7; /* Un color de fondo opcional */
  border: none;
}

.circular-button:hover {
  background-color: #ddd;
}


@media (max-width: 768px) {
  .logo h1 {
    font-size: 1.1rem;
  }

  .circle-button {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .app-header {
    padding: 10px 16px;
  }
}
</style>