<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import CharacterStage from './CharacterStage.vue'
import ControlBar from '../shared/ControlBar.vue'
import backdropImg from '../../assets/landing/title-backdrop.webp'

// "Who Is Aidan?": a character-select screen. Name card on the left, Aidan on a lit pedestal,
// and an outfit picker underneath (Left/Right arrows, or the arrow buttons).
const props = defineProps({
  profile: { type: Object, required: true },
  outfits: { type: Array, required: true },
})
const emit = defineEmits(['back'])

const index = ref(0)
const outfit = computed(() => props.outfits[index.value])
const step = (d) => (index.value = (index.value + d + props.outfits.length) % props.outfits.length)
const back = () => emit('back')

const controls = [
  { label: 'Outfit', icon: 'strum', keys: '← →', action: () => step(1) },
  { label: 'Back', icon: 'red', keys: 'Esc', action: back },
]

function onKey(e) {
  if (e.key === 'ArrowLeft') step(-1)
  else if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'Escape') back()
  else return
  e.preventDefault()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="who" :style="{ '--backdrop': `url(${backdropImg})` }">
    <div class="layout">
      <header class="info">
        <p class="eyebrow">Who Is Aidan?</p>
        <h1 class="name">{{ profile.name }}</h1>
        <p class="tagline">{{ profile.tagline }}</p>
        <dl class="stats">
          <div v-for="stat in profile.stats" :key="stat.label" class="stat">
            <dt>{{ stat.label }}</dt>
            <dd>{{ stat.value }}</dd>
          </div>
        </dl>
      </header>

      <section class="stage-area" aria-label="Character">
        <CharacterStage class="stage" :outfit="outfit" />
        <div class="outfit-picker">
          <button type="button" class="arrow" aria-label="Previous outfit" @click="step(-1)">◀</button>
          <div class="outfit-name" aria-live="polite">
            <span class="outfit-count">Outfit {{ index + 1 }} / {{ outfits.length }}</span>
            <strong>{{ outfit.name }}</strong>
          </div>
          <button type="button" class="arrow" aria-label="Next outfit" @click="step(1)">▶</button>
        </div>
        <p v-if="!outfit.model" class="note">3D scan coming soon · stand-in model</p>
      </section>
    </div>
    <ControlBar :controls="controls" />
  </div>
</template>

<style scoped>
.who {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  min-height: 100dvh;
  color: #fff;
}

/* the title screen's bricks, blurred and darkened, behind everything (fixed: never scrolls) */
.who::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse 60% 70% at 64% 8%, rgba(255, 226, 160, 0.16), transparent 70%),
    linear-gradient(rgba(16, 10, 26, 0.5), rgba(8, 4, 14, 0.85)),
    #1b1426 var(--backdrop) center / cover no-repeat;
}

.layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.8fr) minmax(0, 1.2fr);
  align-items: center;
  gap: 24px;
  max-width: 1200px;
  min-height: 100vh;
  min-height: 100dvh;
  margin: 0 auto;
  padding: 32px 32px 96px;
}

.eyebrow,
.tagline,
.outfit-name strong {
  font-family: var(--gh-font-controls);
  font-style: italic;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.eyebrow {
  margin-bottom: 4px;
  font-size: 22px;
  color: #ffd21f;
  text-shadow: 0.05em 0.06em 0 #000;
}

.name {
  font-family: var(--gh-font-heading);
  font-weight: normal;
  font-size: clamp(52px, 7vw, 100px);
  line-height: 0.95;
  text-shadow: 0.04em 0.05em 0 #000;
}

.tagline {
  margin: 8px 0 22px;
  font-size: 24px;
  color: #e6defa;
  text-shadow: 0.05em 0.06em 0 #000;
}

/* dark rounded panel, like the control boxes on the title poster */
.stats {
  display: grid;
  gap: 10px;
  padding: 16px 20px;
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: rgba(8, 4, 12, 0.72);
}

.stat dt {
  font-family: var(--gh-font-caps);
  font-size: 15px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #a99cc7;
}

.stat dd {
  margin: 0;
  font-family: var(--gh-font-controls);
  font-style: italic;
  font-weight: 700;
  font-size: 22px;
  line-height: 1.1;
}

.stage-area {
  position: relative;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: min(80vh, 780px);
  height: min(80dvh, 780px);
}

/* spotlight falling on the pedestal */
.stage-area::before {
  content: '';
  position: absolute;
  top: -40px;
  left: 50%;
  width: 72%;
  height: 86%;
  transform: translateX(-50%);
  background: linear-gradient(rgba(255, 236, 190, 0.2), rgba(255, 236, 190, 0) 90%);
  clip-path: polygon(43% 0, 57% 0, 100% 100%, 0 100%);
  pointer-events: none;
}

.stage {
  flex: 1;
  align-self: stretch;
  min-height: 0;
}

.outfit-picker {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(8, 4, 12, 0.72);
  border: 2px solid rgba(255, 255, 255, 0.08);
}

.arrow {
  width: 44px;
  height: 44px;
  border: 0;
  background: none;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

/* same highlight as the main menu: yellow and a little bigger */
.arrow:hover,
.arrow:focus-visible {
  color: #ffd21f;
  transform: scale(1.18);
  outline: none;
}

.outfit-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 11em;
}

.outfit-count {
  font-family: var(--gh-font-caps);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a99cc7;
}

.outfit-name strong {
  font-size: 26px;
  line-height: 1.1;
}

.note {
  margin-top: 8px;
  font-family: var(--gh-font-caps);
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #8f84a8;
}

/* phones and narrow tablets: name card on top, character below */
@media (max-width: 780px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
    align-items: start;
    gap: 8px;
    padding: 24px 16px 84px;
  }

  .info {
    text-align: center;
  }

  .tagline {
    font-size: 20px;
    margin-bottom: 14px;
  }

  .stats {
    grid-template-columns: 1fr 1fr;
    text-align: left;
  }

  .stage-area {
    height: 52vh;
    height: 52dvh;
    min-height: 360px;
  }
}
</style>
