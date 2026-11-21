<script setup>
import topImg from '../../assets/bonus/bonus-sheet-top.webp'

defineProps({
  title: { type: String, required: true },
})
defineEmits(['navigate'])
</script>

<template>
  <!-- Top of the blue bonus sheet: its "bonus" tab, the tape, and the heading.
       Image is 1175x530 with transparent surroundings, so the setlist tabs show through. -->
  <div class="bonus-top">
    <img :src="topImg" alt="" draggable="false" />
    <h1 class="heading">{{ title }}</h1>
    <button type="button" class="tab tab-bonus" aria-label="Bonus" @click="$emit('navigate', 'bonus')"></button>
  </div>
</template>

<style scoped>
.bonus-top {
  position: relative;
  width: 100%;
  aspect-ratio: 1175 / 530;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  user-select: none;
}

/* heading sits where "BONUS SONGS" was */
.heading {
  position: absolute;
  left: 9.3%;
  bottom: 19.2%;
  margin: 0;
  font-family: var(--gh-font-heading);
  font-weight: normal;
  font-size: 12.4cqw;
  line-height: 1;
  color: var(--gh-heading);
  text-transform: uppercase;
  text-shadow: 0.015em 0.02em 0 rgba(255, 255, 255, 0.35);
  white-space: nowrap;
}

.tab-bonus {
  left: 33%;
  top: 3%;
  width: 40%;
  height: 25%;
  pointer-events: auto;
}
</style>
