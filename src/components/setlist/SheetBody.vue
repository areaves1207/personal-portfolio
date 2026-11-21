<script setup>
import paperImg from '../../assets/bonus/bonus-paper.webp'
</script>

<template>
  <!-- Body of the blue sheet, continuing seamlessly below SheetTop. Holds the slot. -->
  <div class="sheet-body" :style="{ backgroundImage: `url(${paperImg})` }">
    <slot />
  </div>
</template>

<style scoped>
.sheet-body {
  flex: 1;
  padding: 3.2cqw 0 4cqw;
  background-size: 100% auto;
  background-repeat: repeat-y;
  pointer-events: auto; /* the sheet blocks the setlist underneath */
}
</style>
