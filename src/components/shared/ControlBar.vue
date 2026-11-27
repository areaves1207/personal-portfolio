<script setup>
// Bottom bar of Guitar Hero control pills, shared by every screen.
// Each control: { label, icon, keys?, kbd?, action?, silent? }
//   icon   = fret colour (green/red/yellow/blue/orange) or 'strum'
//   keys   = keyboard equivalent, shown as a tooltip
//   kbd    = keyboard-only hint: hidden on touch screens, where it does nothing
//   action = what clicking the pill does (none = just a hint)
//   silent = no sound on click (e.g. the Setlist/Bonus/Downloads pills)
// Sound: pills with an action play the select sound on click; the red Back pill also plays the
// hover sound on mouse-over.
defineProps({
  controls: { type: Array, required: true },
})
</script>

<template>
  <nav class="bottom-controls" aria-label="Controls">
    <button
      v-for="c in controls"
      v-sfx="c.action && !c.silent ? (c.icon === 'red' ? 'hover' : true) : false"
      :key="c.label"
      type="button"
      class="gh-pill"
      :class="{ 'kbd-only': c.kbd }"
      :title="c.keys ? `${c.label}: ${c.keys}` : c.label"
      @click="c.action && c.action()"
    >
      <span class="gh-icon" :class="c.icon"></span>
      <span class="gh-pill-label">{{ c.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
/* no background of its own: whatever is behind shows through */
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
