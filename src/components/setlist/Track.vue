<script setup>
import trackA from '../../assets/setlist/track-a.webp'
import trackB from '../../assets/setlist/track-b.webp'
import starsImg from '../../assets/bonus/stars.webp'

const props = defineProps({
  title: { type: String, required: true },
  date: { type: String, default: '' },
  // optional "artist" text on the second line, like "FOGHAT" in the game
  meta: { type: String, default: '' },
  href: { type: String, default: '' },
  selected: { type: Boolean, default: false },
  // 'row'  = lined setlist row (beige paper, red margin, baked-in stars)
  // 'bare' = no row art, for tracks written straight onto another sheet (Bonus screen)
  variant: { type: String, default: 'row' },
})

// Two hand-cropped row variants; each track picks one at random so the sheet doesn't repeat.
const variants = [
  { src: trackA, ratio: '1800 / 153' },
  { src: trackB, ratio: '1800 / 160' },
]
const row = variants[Math.floor(Math.random() * variants.length)]

// every link except mailto opens in a new tab (including the resume PDF)
const external = !!props.href && !props.href.startsWith('mailto:')
const style =
  props.variant === 'row'
    ? { backgroundImage: `url(${row.src})`, aspectRatio: row.ratio }
    : {}
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    class="track"
    :class="[variant, { selected }]"
    :href="href || undefined"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener' : undefined"
    :style="style"
  >
    <span class="title">{{ title }}</span>
    <span v-if="meta" class="subline">{{ meta }}</span>
    <img v-if="variant === 'bare'" class="stars" :src="starsImg" alt="" draggable="false" />
    <span v-if="date" class="date">{{ date }}</span>
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

.track.bare {
  aspect-ratio: 1175 / 120;
}

.track.selected::before {
  content: '';
  position: absolute;
  inset: 0 0 4% 0;
  background: var(--gh-highlight);
  pointer-events: none;
}

.title,
.subline,
.date {
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
  font-size: max(4.7cqw, 18px); /* floor keeps phones readable; still fits the row */
  color: var(--gh-ink);
}

.selected .title {
  color: var(--gh-selected);
  text-shadow: 0.03em 0.03em 0 rgba(60, 30, 5, 0.55);
}

.subline,
.date {
  top: 56%;
  font-family: var(--gh-font-caps);
  font-size: max(3.1cqw, 12.5px);
  color: var(--gh-artist);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  -webkit-text-stroke: 0.025em var(--gh-artist);
}

.subline {
  left: 25.4%;
}

/* date sits under the star rating, right-aligned like the score in the game */
.date {
  right: 6.4%;
}

/* bare variant: positions measured from the bonus sheet (1175 units wide) */
.bare .title {
  left: 10.4%;
  max-width: 68%;
}

.bare .subline {
  left: 17.9%;
}

.stars {
  position: absolute;
  left: 80.6%;
  bottom: 52%;
  width: 15.3%;
  user-select: none;
}

.bare .date {
  right: 5.5%;
}
</style>
