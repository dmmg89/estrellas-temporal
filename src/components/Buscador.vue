<script setup lang="ts">
import { ref } from "vue";

const texto = ref("");
const mostrar = ref(false);

function onInput() {
  mostrar.value = texto.value.length >= 3;
}
</script>

<template>
  <section id="buscador" :class="{ abierto: mostrar }">
    <div class="lupa">P</div>
    <div class="entrada">
      <input
        type="text"
        placeholder="Buscar Nombre de la Región o CECO"
        v-model="texto"
        @input="onInput"
      />
    </div>
    <div class="icono">
      <img src="../assets/icons/informacion.svg" alt="" />
    </div>
    <div class="respuesta" v-if="mostrar">
      <ul>
        <li>Fernando Robles Cortes</li>
        <li>Alberto Miguel Hernández Ramírez</li>
        <li>José Ricardo Martínez López</li>
        <li>Carlos Eduardo Ramírez Hernández</li>
        <li>Jorge Sebastián Vargas Torres</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
#buscador {
  color: #333;
  width: calc(100vw - 40px);
  margin: 10px auto 20px auto;
  background-color: #fff;
  height: 35px;
  border-radius: 20px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  position: relative;

  &.abierto {
    border-radius: 20px 20px 0 0;
  }

  .lupa {
    width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .entrada {
    width: calc(100% - 80px);
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      width: 100%;
      background-color: transparent;
      border: none;
      font-size: 13px;
      color: #333;

      &:focus {
        outline: none;
      }
    }
  }

  .icono {
    width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 80%;
    }
  }

  .respuesta {
    position: absolute;
    background-color: #fff;
    box-shadow: 0px 3px 6px #00000029;
    top: 35px;
    width: 100%;
    z-index: 999;
    border-top: 0.5px solid #333;
    border-radius: 0 0 10px 10px;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: left;
      padding: 0 20px;

      li {
        margin: 10px 0;
        font-size: 12px;
        border-bottom: 1 solid #333;
      }
    }
  }
}
</style>
