<script setup>
import withTab from '../../assets/bonus/bonus-sheet-top.webp'
import plain from '../../assets/bonus/sheet-top-plain.webp'

defineProps({
  title: { type: String, required: true },
  // true = same sheet without its "bonus" tab (used for Downloads)
  plain: { type: Boolean, default: false },
})
</script>

<template>
  <!-- Top of the blue sheet (optionally with its "bonus" tab), the tape, and the heading.
       Image is 1175x530 with transparent surroundings, so the setlist tabs show through. -->
  <div class="sheet-top">
    <img :src="plain ? plain : withTab" alt="" draggable="false" />
    <h1 class="heading">{{ title }}</h1>
  </div>
</template>

<style scoped>
.sheet-top {
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

/* heading sits where "BONUS SONGS" was on the reference sheet */
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
</style>
