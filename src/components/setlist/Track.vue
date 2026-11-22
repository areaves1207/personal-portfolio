<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import trackA from '../../assets/setlist/track-a.webp'
import trackB from '../../assets/setlist/track-b.webp'
import starsImg from '../../assets/bonus/stars.webp'

const props = defineProps({
  title: { type: String, required: true },
  date: { type: String, default: '' },
  // optional "artist" text on the second line, like "FOGHAT" in the game
  meta: { type: String, default: '' },
  // optional language/technology, shown under the stars (before the date, if any)
  tech: { type: String, default: '' },
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
const right = [props.tech, props.date].filter(Boolean).join(' · ')
const style =
  props.variant === 'row'
    ? { backgroundImage: `url(${row.src})`, aspectRatio: row.ratio }
    : {}

// Shrink-to-fit: a title too long for the space before the stars, or a second line that would run
// into the text under the stars, is scaled down just enough to fit. Rows that fit are untouched.
const root = ref(null)
let observer = null

function fit() {
  const el = root.value?.$el ?? root.value
  if (!el || !el.clientWidth) return // hidden (e.g. a sheet that isn't open)
  el.style.setProperty('--title-fit', 1)
  el.style.setProperty('--meta-fit', 1)
  const t = el.querySelector('.title')
  if (t.scrollWidth > t.clientWidth) {
    el.style.setProperty('--title-fit', ((t.clientWidth / t.scrollWidth) * 0.98).toFixed(3))
  }
  const sub = el.querySelector('.subline')
  const right = el.querySelector('.date')
  if (sub && right) {
    sub.style.maxWidth = ''
    let s = sub.getBoundingClientRect()
    let r = right.getBoundingClientRect()
    const gap = () => parseFloat(getComputedStyle(right).fontSize) * 0.8
    if (s.right + gap() > r.left) {
      // shrink both, but never below 80% (stays readable on phones)
      const ratio = Math.max(0.8, ((r.right - s.left - gap()) / (s.width + r.width)) * 0.98)
      el.style.setProperty('--meta-fit', ratio.toFixed(3))
      s = sub.getBoundingClientRect()
      r = right.getBoundingClientRect()
      // still too long (narrow phones): trim the second line with an ellipsis before the stars text
      if (s.right + gap() > r.left) sub.style.maxWidth = `${r.left - gap() - s.left}px`
    }
  }
}

onMounted(() => {
  document.fonts.ready.then(fit)
  observer = new ResizeObserver(fit)
  observer.observe(root.value?.$el ?? root.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    ref="root"
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
    <span v-if="right" class="date">{{ right }}</span>
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
  /* floor keeps phones readable; --title-fit shrinks overlong titles (see fit()) */
  font-size: calc(max(4.7cqw, 18px) * var(--title-fit, 1));
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
  font-size: calc(max(3.1cqw, 12.5px) * var(--meta-fit, 1));
  color: var(--gh-artist);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  -webkit-text-stroke: 0.025em var(--gh-artist);
}

.subline {
  left: 25.4%;
  overflow: hidden;
  text-overflow: ellipsis;
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
