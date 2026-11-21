<script setup>
import PaperOverlay from './PaperOverlay.vue'
import ResumeView from './ResumeView.vue'
import { useTrackNav } from './useTrackNav.js'

const props = defineProps({
  title: { type: String, required: true },
  pdf: { type: String, required: true },
  fileName: { type: String, required: true },
  active: { type: Boolean, default: true },
})
const emit = defineEmits(['navigate'])

// no tracks here; Esc still goes back to the setlist
useTrackNav(() => [], { value: null }, () => emit('navigate', 'setlist'), () => props.active)
</script>

<template>
  <!-- Downloads: the resume printed on the sheet, with a button to download the PDF. -->
  <PaperOverlay :title="title" plain>
    <div class="downloads">
      <a class="gh-pill download" :href="pdf" :download="fileName">
        <span class="gh-icon orange"></span>
        <span class="gh-pill-label">Download PDF</span>
      </a>
      <a class="open-tab" :href="pdf" target="_blank" rel="noopener">or open in new tab</a>
      <ResumeView :src="pdf" :active="active" />
    </div>
  </PaperOverlay>
</template>

<style scoped>
.downloads {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5cqw;
  padding: 0 5.5%;
}

.download {
  font-size: min(17px, 2.2cqw);
}

.open-tab {
  margin-top: -1.6cqw; /* sits just under the button */
  font-family: var(--gh-font-caps);
  font-size: max(12px, 1.9cqw);
  letter-spacing: 0.03em;
  color: var(--gh-artist);
  text-transform: uppercase;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.open-tab:hover {
  color: var(--gh-ink);
}

@media (max-width: 560px) {
  .download { font-size: 3.6vw; height: 44px; padding: 0 1.2em; }
  .open-tab { margin-top: 0; padding: 6px 10px; } /* bigger tap area */
}
</style>
