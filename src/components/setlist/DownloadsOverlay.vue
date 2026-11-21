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

@media (max-width: 560px) {
  .download { font-size: 3.2vw; }
}
</style>
