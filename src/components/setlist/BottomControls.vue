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
  { label: 'Up/Down', icon: 'strum', keys: '↑ ↓' },
  { label: 'Select', icon: 'green', keys: 'Enter' },
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
  padding: 10px 8px;
}

.gh-pill {
  flex: 0 1 11.5em;
}

@media (max-width: 560px) {
  .bottom-controls { padding: 8px 4px; }
}
</style>
