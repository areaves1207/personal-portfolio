<script setup>
const openCalendly = () => {
  window.Calendly.showPopupWidget('https://calendly.com/areaves-mines/30min');
};
</script>

<template>
  <button class="btn btn--primary" @click="openCalendly">
    Schedule time with me
  </button>
</template>
