<script setup>
import { ref, computed } from 'vue'
import SetlistTop from './SetlistTop.vue'
import SectionTitle from './SectionTitle.vue'
import Track from './Track.vue'
import Spacer from './Spacer.vue'
import { useTrackNav } from './useTrackNav.js'

const props = defineProps({
  sections: { type: Array, required: true },
  active: { type: Boolean, default: true },
})
const emit = defineEmits(['navigate'])

// Flat list of tracks so Up/Down moves across section boundaries.
const flat = computed(() => props.sections.flatMap((s) => s.tracks))
const paper = ref(null)
const { selected } = useTrackNav(
  () => flat.value,
  paper,
  () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  () => props.active,
)

function trackIndex(si, ti) {
  let n = 0
  for (let i = 0; i < si; i++) n += props.sections[i].tracks.length
  return n + ti
}
</script>

<template>
  <main ref="paper" class="paper">
    <SetlistTop @navigate="emit('navigate', $event)" />
    <template v-for="(section, si) in sections" :key="section.title">
      <Spacer v-if="si > 0" />
      <SectionTitle :number="si + 1" :title="section.title" />
      <Track
        v-for="(track, ti) in section.tracks"
        :key="track.title"
        v-bind="track"
        :selected="selected === trackIndex(si, ti)"
        @mousemove="active && (selected = trackIndex(si, ti))"
      />
    </template>
    <!-- things laid on top of the setlist (the Bonus sheet) -->
    <slot />
  </main>
</template>

<style scoped>
.paper {
  position: relative;
  container-type: inline-size;
  width: min(100%, 1100px);
  margin: 0 auto;
  padding-bottom: 90px;
  filter: drop-shadow(0 0 14px rgba(0, 0, 0, 0.65));
}
</style>
