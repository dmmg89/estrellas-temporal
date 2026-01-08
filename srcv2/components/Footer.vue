<script setup lang="ts"></script>

<template>
  <footer class="footer-container">
    <p class="disclaimer">
      Resultados preliminares, sujetos a cambios<br />por posibles reprocesos en
      la Información.
    </p>

    <p class="copyright">© 2025 Grupo Salinas | Aviso de privacidad de datos</p>
  </footer>
</template>

<style scoped>
.footer-container {
  background-color: #383838;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5px 20px;
  padding-bottom: 20px;
}

.disclaimer {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.1;
}

.copyright {
  font-size: 9px;
  margin: 0;
  opacity: 0.8;
  font-weight: 400;
}
</style>
