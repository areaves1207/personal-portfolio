<script setup>
import topImg from '../../assets/bonus/bonus-top.webp'

defineProps({
  title: { type: String, required: true },
})
defineEmits(['navigate'])
</script>

<template>
  <!-- Bonus header: blue sheet on top of the setlist/downloads sheets, with the heading.
       Image is 1403x600; hit areas and heading position are percentages of that. -->
  <div class="bonus-top">
    <img :src="topImg" alt="" draggable="false" />
    <h1 class="heading">{{ title }}</h1>
    <button type="button" class="tab tab-setlist" aria-label="Setlist" @click="$emit('navigate', 'setlist')"></button>
    <button type="button" class="tab tab-bonus" aria-label="Bonus" @click="$emit('navigate', 'bonus')"></button>
    <button type="button" class="tab tab-downloads" aria-label="Downloads"></button>
  </div>
</template>

<style scoped>
.bonus-top {
  position: relative;
  width: 100%;
  aspect-ratio: 1403 / 600;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  user-select: none;
}

.heading {
  position: absolute;
  left: 17.4%;
  bottom: 17%;
  margin: 0;
  font-family: var(--gh-font-heading);
  font-weight: normal;
  font-size: 11.6cqw;
  line-height: 1;
  color: var(--gh-heading);
  text-transform: uppercase;
  text-shadow: 0.015em 0.02em 0 rgba(255, 255, 255, 0.35);
  white-space: nowrap;
}

.tab-setlist {
  left: 9%;
  top: 14%;
  width: 26%;
  height: 18%;
}

.tab-bonus {
  left: 37%;
  top: 15%;
  width: 32%;
  height: 20%;
}

.tab-downloads {
  left: 70%;
  top: 26%;
  width: 28%;
  height: 17%;
}
</style>
