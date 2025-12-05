<script setup lang="ts">
// En <script setup lang="ts">, defineProps es una macro y no necesita ser importada.

// 1. Define una interfaz para describir la forma de las props
interface Props {
  // Función que se ejecutará al hacer clic.
  // No recibe argumentos (o no los usa) y no devuelve valor (void).
  // Si necesitaras el evento: (event: MouseEvent) => void
  clickHandler: () => void;

  // La ruta o URL del icono a mostrar. Debe ser una cadena de texto.
  iconSrc: string;
}

// 2. Usa la interfaz con defineProps para declarar las props y sus tipos.
// Las props definidas aquí estarán disponibles directamente en el <template>.
// Si necesitaras acceder a las props dentro del <script> (p.ej. para un watch),
// asignarías el resultado: const props = defineProps<Props>();
// En este caso, como solo se usan en el template, no es estrictamente necesario asignarlo,
// pero es buena práctica hacerlo si anticipas necesitarlo.
const props = defineProps<Props>();

// Nota: Como 'required: true' estaba implícito en la versión JS al no tener 'default'
// y no marcarse como opcional, en TS simplemente no usamos el modificador `?`
// en la interfaz, haciendo que sean requeridas por defecto.

</script>

<template>
  <button @click="props.clickHandler" class="navigation-button">
    <img :src="props.iconSrc" alt="Icon Button" class="icon" />
  </button>
</template>

<style scoped>
/* Los estilos permanecen iguales */
.navigation-button {
  width: 48px;
  height: 48px;
  background-color: #E4E8F7;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Corregido: El selector original era .nav-button:hover, pero la clase es .navigation-button */
.navigation-button:hover {
  background-color: #d0d7f0; /* Ligeramente diferente para mostrar el hover */
}

.icon {
  width: 24px;
  height: 24px;
}
</style>