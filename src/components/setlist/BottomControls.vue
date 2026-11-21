<script setup>
import { computed } from 'vue'

// Up/Down = arrow keys, Select = Enter, Back = Esc (handled by each screen).
// Like the game, the last two pills name the two screens you're not on.
const props = defineProps({
  screen: { type: String, default: 'setlist' },
})
const emit = defineEmits(['navigate'])

const SCREENS = {
  setlist: { label: 'Setlist', icon: 'yellow', to: 'setlist' },
  bonus: { label: 'Bonus', icon: 'blue', to: 'bonus' },
  downloads: { label: 'Downloads', icon: 'orange', to: 'downloads' },
}

const controls = computed(() => [
  // keyboard-only hints: hidden on touch screens, where they do nothing
  { label: 'Up/Down', icon: 'strum', keys: '↑ ↓', kbd: true },
  { label: 'Select', icon: 'green', keys: 'Enter', kbd: true },
  { label: 'Back', icon: 'red', keys: 'Esc', to: props.screen === 'setlist' ? null : 'setlist' },
  ...Object.keys(SCREENS)
    .filter((s) => s !== props.screen)
    .map((s) => SCREENS[s]),
])
</script>

<template>
  <nav class="bottom-controls" aria-label="Controls">
    <button
      v-for="c in controls"
      :key="c.label"
      type="button"
      class="gh-pill"
      :class="{ 'kbd-only': c.kbd }"
      :title="c.keys ? `${c.label}: ${c.keys}` : c.label"
      @click="c.to && emit('navigate', c.to)"
    >
      <span class="gh-icon" :class="c.icon"></span>
      <span class="gh-pill-label">{{ c.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
/* no background of its own: the wood shows through */
.bottom-controls {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: 10px 8px calc(10px + env(safe-area-inset-bottom));
}

.gh-pill {
  flex: 0 1 11.5em;
}

@media (max-width: 560px) {
  .bottom-controls { padding: 8px 4px calc(8px + env(safe-area-inset-bottom)); }
}

/* touch screens: drop the keyboard hints and give the rest comfortable tap targets */
@media (hover: none) and (pointer: coarse) {
  .kbd-only { display: none; }
  .gh-pill { flex-basis: 10em; height: 44px; font-size: min(17px, 3.8vw); }
}
</style>
