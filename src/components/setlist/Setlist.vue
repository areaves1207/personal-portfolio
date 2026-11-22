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

// Flat list of selectable tracks so Up/Down moves across section boundaries.
// `static` sections (School Projects) are display only and never selectable.
const flat = computed(() => props.sections.filter((s) => !s.static).flatMap((s) => s.tracks))
const paper = ref(null)
const { selected } = useTrackNav(
  () => flat.value,
  paper,
  () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  () => props.active,
)

function trackIndex(si, ti) {
  let n = 0
  for (let i = 0; i < si; i++) if (!props.sections[i].static) n += props.sections[i].tracks.length
  return n + ti
}

// Only what a row displays goes to Track, so extra data (e.g. school project descriptions kept
// for a future popup) never reaches the page.
function rowProps(track, section) {
  return {
    title: track.title,
    meta: track.meta ?? [track.course, track.courseName].filter(Boolean).join(' · '),
    tech: track.tech,
    date: track.date,
    href: section.static ? '' : track.href,
  }
}
</script>

<template>
  <main ref="paper" class="paper">
    <SetlistTop @navigate="emit('navigate', $event)" />
    <template v-for="(section, si) in sections" :key="section.title">
      <Spacer v-if="si > 0" />
      <SectionTitle :number="si + 1" :title="section.title" />
      <template v-if="section.static">
        <Track v-for="track in section.tracks" :key="track.title" v-bind="rowProps(track, section)" />
      </template>
      <template v-else>
        <Track
          v-for="(track, ti) in section.tracks"
          :key="track.title"
          v-bind="rowProps(track, section)"
          :selected="selected === trackIndex(si, ti)"
          @mousemove="active && (selected = trackIndex(si, ti))"
        />
      </template>
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
  isolation: isolate;
}

/* Shadow for the straight-edged rows (the torn header has its shadow baked into its image).
   A painted box-shadow instead of filter: drop-shadow, which re-blurred the whole sheet on
   every hover change. Starts where the header's sides become solid (500 of 1800 units). */
.paper::before {
  content: '';
  position: absolute;
  inset: 27.8cqw 0 90px 0;
  z-index: -1;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.65);
  pointer-events: none;
}
</style>
