<script setup>
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
  background: var(--button-color);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.25s ease;
}

.calendly-button:hover {
  background: var(--button-color-accent);
}
</style>
