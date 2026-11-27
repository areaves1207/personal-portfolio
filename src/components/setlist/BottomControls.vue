<script setup>
import { computed } from 'vue'
import ControlBar from '../shared/ControlBar.vue'

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

const go = (to) => () => emit('navigate', to)

const controls = computed(() => [
  { label: 'Up/Down', icon: 'strum', keys: '↑ ↓', kbd: true },
  { label: 'Select', icon: 'green', keys: 'Enter', kbd: true },
  // Back closes a sheet; on the setlist itself it returns to the main menu
  { label: 'Back', icon: 'red', keys: 'Esc', action: go(props.screen === 'setlist' ? 'menu' : 'setlist') },
  ...Object.keys(SCREENS)
    .filter((s) => s !== props.screen)
    // switching between the setlist and its sheets is silent
    .map((s) => ({ ...SCREENS[s], action: go(SCREENS[s].to), silent: true })),
])
</script>

<template>
  <ControlBar :controls="controls" />
</template>
