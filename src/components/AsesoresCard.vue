<script setup lang="ts">
import { ref, onMounted } from "vue";

const fotoEmp = ref("");

onMounted(async () => {
  const url =
    "https://www.productividadzeus.com/concursos/fotos/colaboradores/?code=1139800";
  const res = await fetch(url);
  const data = await res.json();
  fotoEmp.value = data.file_base64;
});
</script>

<template>
  <section id="equipo">
    <div v-show="" class="equipo-info">
      <div class="info-foto">
        <div class="cont-foto verde">
          <img
            v-if="fotoEmp"
            :src="'data:image/jpeg;base64,' + fotoEmp"
            alt="Foto Empleado"
          />

          <img v-else src="../assets/icons/user.svg" alt="Sin foto" />
        </div>
      </div>
      <div class="info-equipo">
        <div class="perfil-tit">
          <span>Reyes Adan Rodriguez De La Rosa (260704)</span>
        </div>
        <div class="perfil-sub">Asesor de Préstamo</div>
      </div>

      <div class="item-equipo">></div>
    </div>

    <div class="indicadores">
      <div class="item-ind verde">
        <img src="../assets/icons/calificacionamarillo.svg" alt="" />
        <span>Calificación</span>
        <div class="valor">3,09</div>
      </div>
      <div class="item-ind naranja">
        <img src="../assets/icons/ENCUESTAS.svg" alt="" />
        <span>Encuestas</span>
        <div class="valor">3,09</div>
      </div>
      <div class="item-ind amarillo">
        <img src="../assets/icons/esquema.svg" alt="" />
        <span>Esquema</span>
        <div class="valor">3 Semanas</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#equipo {
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 16px 20px #80808021;
  margin: 15px 0;
  border-radius: 15px;
  cursor: pointer;
  color: #333;

  .equipo-info {
    display: flex;
    align-items: center;
    z-index: 10;
    padding: 20px;

    .info-foto {
      width: 62px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .cont-foto {
        width: 65px;
        height: 65px;
        display: flex;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        background-color: #fff;
        border: 0.5px solid rgba(0, 0, 0, 0.12);
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

        &.verde {
          border: 2px solid #6ac63a;
        }

        &.naranja {
          border: 2px solid #ff9d00;
        }

        &.amarillo {
          border: 2px solid #fcde3a;
        }

        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }

    .info-equipo {
      padding-left: 10px;
      width: calc(100% - 72px);

      .perfil-tit {
        font-size: 14px;
        font-weight: 600;
        line-height: 16px;
        padding-right: 50px;
        text-align: left;
      }

      .perfil-sub {
        font-size: 13px;
        font-weight: 300;
        line-height: 15px;
        text-align: left;
        margin-top: 5px;
      }
    }
  }

  .indicadores {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 10px;
    padding: 0 20px;
    margin-bottom: 20px;

    .item-ind {
      flex: 1;
      background-color: #f6f7f9;
      border-radius: 7px;
      padding: 10px 5px;
      display: flex;
      align-items: center;
      flex-direction: column;

      &.verde {
        border: 2px solid #6ac63a;
      }

      &.naranja {
        border: 2px solid #ff9d00;
      }

      &.amarillo {
        border: 2px solid #fcde3a;
      }

      img {
        height: 23px;
        margin-bottom: 3px;
      }

      span {
        font-size: 12px;
      }

      .valor {
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
}
</style>
