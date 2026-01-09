<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { EmpleadoData } from "../models/EmpleadoData.ts";
import { useRouter } from "vue-router";
import { ProfilePath } from "../router";
import { useStateStore } from "../store/StateStore.ts";

const router = useRouter();
const stateStore = useStateStore();

const navigateToEmployee = (id: string) => {
  // stateStore.setId(id);
  router.push(ProfilePath.employee);
};

const props = defineProps<{
  item: EmpleadoData;
}>();

const fotoEmp = ref("");

const nombreFormateado = computed(() => {
  if (props.item.idEmpleado === 0) return "Vacante";

  if (!props.item.nombre) return "";
  return props.item.nombre
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
});


const posicionFormateada = computed(() => {
  // Si es vacante → solo el nombre de la posición
  if (props.item.idEmpleado === 0) {
    return props.item.nombre
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") ?? "";
  }

  // Si es empleado → Nombre + Posición
  const posicion = props.item.posicionNombre ?? "";
  return `${posicion}`
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
});



const formatNumber = (num: number) => {
  return num ? num.toFixed(2).replace(".", ",") : "0,00";
};

const getColorClass = (val: number) => {
  if (val >= 4.5) return "verde";
  if (val >= 3) return "amarillo";
  return "naranja";
};

const esquemaSemanas = computed(() => {
  return "0 Semanas";
});

onMounted(async () => {
  const numero = props.item.idEmpleado;
  const url = `https://www.productividadzeus.com/concursos/fotos/colaboradores/?code=${String(
    numero
  )}`;
  const res = await fetch(url);
  const data = await res.json();
  fotoEmp.value = data.file_base64;
});
</script>

<template>
  <section id="equipo" @click="navigateToEmployee">
    <div class="equipo-info">
      <div class="info-foto">
        <div class="cont-foto verde">
          <img
            v-if="fotoEmp"
            :src="'data:image/jpeg;base64,' + fotoEmp"
            alt="Foto Empleado"
          />

          <img
            class="user"
            v-else
            src="../assets/icons/user.svg"
            alt="Sin foto"
          />
        </div>
      </div>
      <div class="info-equipo">
        <div class="perfil-tit">
          <span>{{ nombreFormateado }} ({{ item.idEmpleado }})</span>
        </div>
        <div class="perfil-sub">
          {{ posicionFormateada }}
        </div>
      </div>

      <div class="item-equipo">></div>
    </div>

    <div class="indicadores">
      <div class="item-ind verde">
        <img src="../assets/icons/calificacionamarillo.svg" alt="" />
        <span>Calificación</span>
        <div class="valor">
          {{ formatNumber(item.metricas_semana.calificacion_semana) }}
        </div>
      </div>
      <div class="item-ind naranja">
        <img src="../assets/icons/ENCUESTAS.svg" alt="" />
        <span>Encuestas</span>
        <div class="valor">
          {{ item.metricas_semana.num_encuestas_trimestre }}
        </div>
      </div>
      <div class="item-ind amarillo">
        <img src="../assets/icons/esquema.svg" alt="" />
        <span>Esquema</span>
        <div class="valor">
          {{ esquemaSemanas }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#equipo {
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 3px 6px #00000029 !important;
  margin: 10px 0;
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

          &.user {
            margin-bottom: -5px;
          }
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
