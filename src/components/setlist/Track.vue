<script setup>
import trackA from '../../assets/setlist/track-a.webp'
import trackB from '../../assets/setlist/track-b.webp'

const props = defineProps({
  title: { type: String, required: true },
  date: { type: String, default: '' },
  // optional "artist" text shown before the date, like "FOGHAT, 1975"
  meta: { type: String, default: '' },
  href: { type: String, default: '' },
  selected: { type: Boolean, default: false },
})

// Two hand-cropped row variants; each track picks one at random so the sheet doesn't repeat.
const variants = [
  { src: trackA, ratio: '1800 / 153' },
  { src: trackB, ratio: '1800 / 160' },
]
const row = variants[Math.floor(Math.random() * variants.length)]

const subline = [props.meta, props.date].filter(Boolean).join(', ')
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    class="track"
    :class="{ selected }"
    :href="href || undefined"
    :target="href && href.startsWith('http') ? '_blank' : undefined"
    :rel="href && href.startsWith('http') ? 'noopener' : undefined"
    :style="{ backgroundImage: `url(${row.src})`, aspectRatio: row.ratio }"
  >
    <span class="title">{{ title }}</span>
    <span v-if="subline" class="subline">{{ subline }}</span>
  </component>
</template>

<style scoped>
.track {
  position: relative;
  display: block;
  width: 100%;
  background-size: 100% 100%;
  text-decoration: none;
  cursor: default;
}

a.track {
  cursor: pointer;
}

.track.selected::before {
  content: '';
  position: absolute;
  inset: 0 0 4% 0;
  background: var(--gh-highlight);
  pointer-events: none;
}

.title,
.subline {
  position: absolute;
  white-space: nowrap;
  line-height: 1;
}

.title {
  left: 18.6%;
  bottom: calc(50% - 0.56cqw); /* offsets the padding below */
  /* stop before the stars (they start at ~80% of the row) */
  max-width: 61%;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 0.12em;
  font-family: var(--gh-font-title);
  font-size: 4.7cqw;
  color: var(--gh-ink);
}

.selected .title {
  color: var(--gh-selected);
  text-shadow: 0.03em 0.03em 0 rgba(60, 30, 5, 0.55);
}

.subline {
  left: 25.4%;
  top: 56%;
  font-family: var(--gh-font-caps);
  font-size: 3.1cqw;
  color: var(--gh-artist);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  -webkit-text-stroke: 0.025em var(--gh-artist);
}
</style>
