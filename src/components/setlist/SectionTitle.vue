<script setup>
import rowImg from '../../assets/setlist/section.webp'

defineProps({
  number: { type: Number, required: true },
  title: { type: String, required: true },
})
</script>

<template>
  <!-- "1. | STARTING OUT SMALL": number left of the red margin, title right of it. -->
  <h2 class="section-title" :style="{ backgroundImage: `url(${rowImg})` }">
    <span class="num">{{ number }}.</span>
    <span class="text">{{ title }}</span>
  </h2>
</template>

<style scoped>
.section-title {
  position: relative;
  width: 100%;
  aspect-ratio: 1800 / 93;
  margin: 0;
  background-size: 100% 100%;
  font-family: var(--gh-font-caps);
  font-weight: normal;
  font-size: 4.6cqw;
  line-height: 1;
  color: var(--gh-section);
  text-transform: uppercase;
  -webkit-text-stroke: 0.04em var(--gh-section);
  letter-spacing: 0.01em;
}

.num,
.text {
  position: absolute;
  bottom: 13%;
}

/* red margin line sits at 300/1800 = 16.67% */
.num {
  right: calc(100% - 16.1%);
}

.text {
  left: 18%;
  white-space: nowrap;
}
</style>
