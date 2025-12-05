<script setup lang="ts">
import NavigationHeader from "./components/NavigationHeader.vue";
import ErrorLottie from "./components/ErrorLottie.vue";



const backInitNav = (): void => {

  console.log("Ejecutando Salida");

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
  <NavigationHeader/>

  <div class="error-container"> <div class="error-content">
    <ErrorLottie/>
    <p class="error-title">Lo sentimos</p>
    <div>
      <p>
        Estamos <b>experimentando intermitencias</b>. Por favor, inténtelo de nuevo más tarde.
      </p>
    </div>
    <div>
      <b class="error-bottom">Gracias.</b>
    </div>

    <button class="exit-button"  @click="backInitNav">Salir</button>

  </div>
  </div>
</template>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  padding-bottom: 15vh;
}

.error-content {
  max-width: 600px;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
}

.error-title {
  color: darkblue;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  margin-top: 25px;

}

/* Estilos para el párrafo del mensaje */
.error-content p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
}

.error-bottom{
  font-size: 16px;
}

.exit-button{
  outline: none;
  border: none;
  background-color: #E71618;
  color: white;
  font-weight: bold;
  font-size: 18px;
  margin: 10%;
  padding: 3%  15%;
  border-radius: 16px;

}

</style>