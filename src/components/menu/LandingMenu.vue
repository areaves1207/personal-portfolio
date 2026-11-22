<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import posterImg from '../../assets/landing/title-poster.webp'
// same poster with the CONTINUE / UP/DOWN hints painted out; portrait screens would only show a sliver of them
import posterPortraitImg from '../../assets/landing/title-poster-portrait.webp'
import { mainMenu } from '../../data/menu.js'

// Title screen: the gig poster with the main menu written in its dark box.
// Mouse: hover highlights, click picks. Keyboard: Up/Down highlight, Enter picks
// (the CONTINUE and UP/DOWN hints are part of the poster art).
const emit = defineEmits(['navigate'])

const selected = ref(-1)

function pick(i) {
  if (mainMenu[i]) emit('navigate', mainMenu[i].to)
}

function onKey(e) {
  const n = mainMenu.length
  if (e.key === 'ArrowDown') selected.value = selected.value < 0 ? 0 : (selected.value + 1) % n
  else if (e.key === 'ArrowUp') selected.value = selected.value < 0 ? n - 1 : (selected.value - 1 + n) % n
  else if (e.key === 'Enter' && selected.value >= 0) pick(selected.value)
  else return
  e.preventDefault()
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="landing">
    <div class="stage">
      <picture>
        <source media="(max-aspect-ratio: 6 / 5)" :srcset="posterPortraitImg" />
        <img class="poster" :src="posterImg" alt="" draggable="false" />
      </picture>
      <h1 class="visually-hidden">Aidan Reaves</h1>
      <nav class="menu" aria-label="Main menu">
        <button
          v-for="(option, i) in mainMenu"
          :key="option.to"
          type="button"
          class="option"
          :class="{ selected: selected === i }"
          @mouseenter="selected = i"
          @mouseleave="selected = -1"
          @focus="selected = i"
          @blur="selected = -1"
          @click="pick(i)"
        >
          {{ option.label }}
        </button>
      </nav>
    </div>
  </div>
</template>

<style scoped>
/* Full screen, black behind the poster (the letterbox bars). */
.landing {
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: #000;
}

/* The 1920x1080 poster, centred and never cropped: if the screen isn't 16:9, black bars fill
   the sides (or top and bottom), like a PS2 game on a TV.
   Portrait screens are handled below. */
.stage {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  container-type: inline-size;
  width: min(100vw, 177.78vh);
  width: min(100vw, 177.78dvh);
  aspect-ratio: 16 / 9;
}

/* Portrait (phones, upright tablets): fill the whole screen, no bars. The poster is zoomed until
   the logo and menu box span the screen's width (sides cropped), then stretched to the full
   height: ~1.3x taller than true on a typical phone, none on a tablet. Only the image stretches;
   the menu text is real text and keeps its shape. */
@media (max-aspect-ratio: 6 / 5) {
  .stage {
    width: min(300vw, 177.78vh);
    width: min(300vw, 177.78dvh);
    height: 100vh;
    height: 100dvh;
    aspect-ratio: auto;
    /* centre on the logo and menu box (x ≈ 975 of 1920), slightly right of the poster's middle */
    transform: translate(-50.8%, -50%);
  }
}

picture {
  display: contents; /* the img sizes against the stage */
}

.poster {
  display: block;
  width: 100%;
  height: 100%;
  user-select: none;
}

/* the dark box under the logo (665–1275 x 555–850 on the 1920x1080 poster) */
.menu {
  position: absolute;
  left: 34.6%;
  top: 51.4%;
  width: 31.8%;
  height: 27.3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.3cqw;
}

.option {
  padding: 0.08em 0.4em;
  border: 0;
  background: none;
  font-family: var(--gh-font-controls);
  font-style: italic;
  font-weight: 700;
  font-size: 3.7cqw;
  line-height: 1.05;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  white-space: nowrap;
  color: #fff;
  text-shadow: 0.05em 0.06em 0 #000;
  cursor: pointer;
}

/* hovered / highlighted: yellow and slightly bigger. Snaps instantly, no easing, like the PS2 menus. */
.option.selected {
  color: #ffd21f;
  transform: scale(1.14);
}

.option:focus-visible {
  outline: none;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>
