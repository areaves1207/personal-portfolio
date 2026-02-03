<script setup>
import Header from "./components/Header.vue"
import Intro from "./components/Intro.vue"
import Portfolio from "./components/Portfolio.vue";
import About from "./components/About.vue"
import Contact from "./components/Contact.vue"

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

</script>

<template>
  <Header @scroll-to="scrollToSection"/>
  <main class="wrapper">
    <section id="intro"><Intro @scroll="scrollToSection('about')"/></section>
    <section id="about"><About/></section>
    <section id="portfolio"><Portfolio/></section>
    <section id="contact"><Contact/></section>
  </main>
</template>

<style scoped>
  .wrapper{
    width: 100%; 
    height: 100vh;
  }

</style>
