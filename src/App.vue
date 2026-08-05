<script setup>
import { onMounted } from 'vue'
import Header from "./components/Header.vue"
import Intro from "./components/Intro.vue"
import Skills from "./components/Skills.vue"
import Experience from "./components/Experience.vue"
import Portfolio from "./components/Portfolio.vue";
import Contact from "./components/Contact.vue"

const CALENDLY_URL = 'https://calendly.com/areaves-mines/30min'

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

onMounted(() => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://assets.calendly.com/assets/external/widget.css'
  document.head.appendChild(link)

  const script = document.createElement('script')
  script.src = 'https://assets.calendly.com/assets/external/widget.js'
  script.async = true
  script.onload = () => {
    if (window.location.pathname === '/schedule') {
      window.Calendly.showPopupWidget(CALENDLY_URL)
    }
  }
  document.head.appendChild(script)
})
</script>

<template>
  <Header @scroll-to="scrollToSection"/>
  <main class="wrapper">
    <section id="intro"><Intro @scroll="scrollToSection('projects')"/></section>
    <section id="skills"><Skills/></section>
    <section id="experience"><Experience/></section>
    <section id="projects"><Portfolio/></section>
    <section id="contact"><Contact/></section>
  </main>
</template>

<style scoped>
  .wrapper{
    width: 100%;
    height: auto;
    position: relative;
    z-index: 1;
  }
</style>
