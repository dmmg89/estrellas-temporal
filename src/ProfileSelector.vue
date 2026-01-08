<script setup lang="ts">

import {onMounted, ref, type Ref} from "vue";
import router, {ProfilePath} from "./router";

const code: Ref<string | null> = ref(null);
const ceco: Ref<string | null> = ref(null);
let decryptedString: Ref<string | null> = ref<string | null>(null);

// try{
//
// }catch(e){
//
// }

onMounted(()=>{
  console.log("Profile mounted.");
  router.push(ProfilePath.assesorScreen)
})

</script>

<template>

</template>

<style scoped>

</style>