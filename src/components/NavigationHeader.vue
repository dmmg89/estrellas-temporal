<script setup lang="ts">
import HomeNav from '../assets/icons/ic_home_nav.svg'
import GoBackNav from '../assets/icons/ic_back_arrow.svg';
import CircularIconButton from "./items/CircularIconButton.vue";

import { useRouter, type Router } from 'vue-router';
import {Str} from "../utils/AppConstants.ts";
import {ProfilePath} from "../router";
import {useStateStore} from "../store/StateStore.ts";


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

const store = useStateStore();


const router: Router = useRouter();

const headerTitle = Str.headerName

const goBack = (): void => {
    // backInitNav();


  if (router.currentRoute.value.path === ProfilePath.corpoScreen) {
    backInitNav();
  } else {
    store.drillUp();
    router.go(-1);
  }
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
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: white;
  color: black;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo{
  flex-grow: 1;
  flex-shrink: 0;
  min-width: 0;
  max-width: 260px;

}

.logo h1 {
  font-weight: 600;
  text-align: left;
  font-size: 16px;
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







</style>