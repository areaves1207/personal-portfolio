<script setup>
import rowImg from '../../assets/setlist/spacer.webp'
</script>

<template>
  <!-- Empty song row: separates the last track of one section from the next section title. -->
  <div class="spacer" :style="{ backgroundImage: `url(${rowImg})` }" aria-hidden="true"></div>
</template>

<style scoped>
.spacer {
  width: 100%;
  aspect-ratio: 1800 / 152;
  background-size: 100% 100%;
}
</style>
