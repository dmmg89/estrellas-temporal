<script setup lang="ts">
import {onMounted} from "vue";
import {getComments} from "../api/mockService/ApiMockImpl.ts";

onMounted(async () => {

  const response = await getComments(0, 5, 48, 2025)
  console.log(JSON.stringify( response) )

})

</script>

<template>



</template>

<style scoped>

</style>