<script setup>
// Up/Down = arrow keys, Select = Enter, Back = Esc (handled by the setlist page).
// Bonus and Downloads are visual only for now.
const controls = [
  { label: 'Up/Down', icon: 'strum', keys: '↑ ↓' },
  { label: 'Select', icon: 'green', keys: 'Enter' },
  { label: 'Back', icon: 'red', keys: 'Esc' },
  { label: 'Bonus', icon: 'blue' },
  { label: 'Downloads', icon: 'orange' },
]
</script>

<template>
  <nav class="bottom-controls" aria-label="Controls">
    <button
      v-for="c in controls"
      :key="c.label"
      type="button"
      class="pill"
      :title="c.keys ? `${c.label}: ${c.keys}` : c.label"
    >
      <span class="icon" :class="c.icon"></span>
      <span class="label">{{ c.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
.bottom-controls {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: 10px 8px;
  background: #fff;
}

.pill {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45em;
  min-width: 0;
  flex: 0 1 11.5em;
  height: 2.6em;
  margin-left: -0.35em;
  padding: 0 0.9em;
  font-size: min(17px, 3.1vw);
  border: 0.17em solid #2b2b2b;
  border-radius: 1.3em;
  background: linear-gradient(#ededed 0%, #d2d2d2 55%, #b8b8b8 100%);
  box-shadow: inset 0 0.12em 0 rgba(255, 255, 255, 0.8);
  color: #262626;
  cursor: pointer;
}

.pill:first-child {
  margin-left: 0;
}

.pill:active {
  background: linear-gradient(#cfcfcf, #e4e4e4);
}

.label {
  font-family: var(--gh-font-controls);
  font-weight: 700;
  font-style: italic;
  font-size: 1.35em;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

/* fret-button icons: small capsules with a dark rim, like the tab icons on the sheet */
.icon {
  flex: none;
  width: 0.75em;
  height: 1.15em;
  border: 0.12em solid #222;
  border-radius: 0.4em 0.4em 0.15em 0.15em;
}

.icon.green { background: linear-gradient(90deg, #2f7d3a, #6fc277 45%, #2f7d3a); }
.icon.red { background: linear-gradient(90deg, #9b2b2b, #e07272 45%, #9b2b2b); }
.icon.blue { background: linear-gradient(90deg, #5c5f9e, #b7b9ea 45%, #5c5f9e); }
.icon.orange { background: linear-gradient(90deg, #a5521a, #f0a25c 45%, #a5521a); }

.icon.strum {
  width: 2.6em;
  height: 0.9em;
  border-radius: 0.15em;
  background: linear-gradient(#333 0 30%, #9a9a9a 30% 70%, #333 70%);
}

@media (max-width: 560px) {
  .bottom-controls { padding: 8px 4px; }
  .icon.strum { width: 1.2em; }
  .pill { font-size: 2.6vw; padding: 0 0.5em; gap: 0.3em; }
}
</style>
