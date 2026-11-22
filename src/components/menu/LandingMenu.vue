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

// Nothing on the title screen scrolls. Locking the page also keeps a phone's address bar from
// sliding away, which would change the screen height under the poster.
onMounted(() => {
  window.addEventListener('keydown', onKey)
  document.documentElement.classList.add('lock-scroll')
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.documentElement.classList.remove('lock-scroll')
})
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
  touch-action: none; /* swipes do nothing (taps still work) */
  overscroll-behavior: none;
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

/* Portrait (phones, upright tablets): the whole poster is stretched to the screen, ignoring its
   aspect ratio, so nothing is cropped and there are no bars. Only the image stretches; the menu
   text is real text, kept upright and sized up so it stays readable in the narrow box.
   Height is svh (the screen with the address bar showing), which never changes while the page is
   open, pinned to the top, so the poster doesn't re-stretch or move if the bar slides. */
@media (max-aspect-ratio: 6 / 5) {
  .stage {
    top: 0;
    transform: translateX(-50%);
    width: 100vw;
    height: 100vh;
    height: 100svh;
    aspect-ratio: auto;
  }

  .stage .option {
    font-size: 6.4cqw;
  }

  .stage .menu {
    gap: 2.4cqw;
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
