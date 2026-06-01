<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://assets.calendly.com/assets/external/widget.css';
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  script.async = true;
  document.head.appendChild(script);
});

const openCalendly = () => {
  window.Calendly.showPopupWidget('https://calendly.com/areaves-mines/30min');
};
</script>

<template>
  <button class="calendly-button" @click="openCalendly">
    Schedule time with me
  </button>
</template>

<style scoped>
.calendly-button {
  padding: 16px 32px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #4e54c8, #8f94fb);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.calendly-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 18px rgba(78, 84, 200, 0.45);
}
</style>
