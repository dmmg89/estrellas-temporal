<script setup lang="ts">
</script>

<template>
  <footer class="footer-container">
    <div class="content-wrapper">
      <p class="disclaimer">
        Resultados preliminares, sujetos a cambios por
        posibles reprocesos en la Información.
      </p>

      <p class="copyright">
        © 2025 Grupo Salinas | Aviso de privacidad de datos
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
  background-color: #383838;
  color: #ffffff;
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-wrapper {
  text-align: center;
}

.disclaimer {
  font-size: 12px;
  font-weight: 500;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.copyright {
  font-size: 12px;
  margin: 0;
  opacity: 0.8;
  font-weight: 400;
}
</style>