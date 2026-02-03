<script setup>
import Intro from "./components/Intro.vue"
import Portfolio from "./components/Portfolio.vue";
import About from "./components/About.vue"
</script>

<template>
  <main class="wrapper">
    <!-- <Intro/> -->
     <About/>
  </main>
</template>

<style scoped>
  .wrapper{
    width: 100%; 
    height: 100vh;
  }
/* @media (min-width: 1024px) {
  
} */
</style>
