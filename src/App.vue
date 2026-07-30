<script setup>
import { onMounted } from 'vue'
import Header from "./components/Header.vue"
import Intro from "./components/Intro.vue"
import Portfolio from "./components/Portfolio.vue";
import Contact from "./components/Contact.vue"
import ParticleNetwork from "./components/ParticleNetwork.vue"

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
  <ParticleNetwork />
  <Header @scroll-to="scrollToSection"/>
  <main class="wrapper">
    <section id="intro"><Intro @scroll="scrollToSection('portfolio')"/></section><hr>
    <section id="portfolio"><Portfolio/></section>
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
