import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "./router";

function initializeAndMountVueApp() {
    console.log("Inicializando aplicación Vue...");
    const app = createApp(App);
    const pinia = createPinia();
    app.use(pinia);
    app.use(router);
    app.mount('#app');
    console.log("Aplicación Vue montada en #app.");
}


initializeAndMountVueApp();