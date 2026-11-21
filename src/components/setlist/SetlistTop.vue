<script setup>
import topImg from '../../assets/setlist/setlist-top.webp'

defineEmits(['navigate'])
</script>

<template>
  <!-- Torn "Setlist" header sheet with the setlist / bonus / downloads tabs.
       Image is 1800x769; the hit areas below are percentages of that. -->
  <div class="setlist-top">
    <img :src="topImg" alt="Setlist" draggable="false" />
    <button type="button" class="tab tab-setlist" aria-label="Setlist" @click="$emit('navigate', 'setlist')"></button>
    <button type="button" class="tab tab-bonus" aria-label="Bonus" @click="$emit('navigate', 'bonus')"></button>
    <button type="button" class="tab tab-downloads" aria-label="Downloads"></button>
  </div>
</template>

<style scoped>
.setlist-top {
  position: relative;
  width: 100%;
  aspect-ratio: 1800 / 769;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  user-select: none;
}

.tab-setlist {
  left: 9%;
  top: 15%;
  width: 18%;
  height: 16%;
}

.tab-bonus {
  left: 43.5%;
  top: 19%;
  width: 28%;
  height: 20%;
}

.tab-downloads {
  left: 72.5%;
  top: 29%;
  width: 23%;
  height: 13.5%;
}
</style>
