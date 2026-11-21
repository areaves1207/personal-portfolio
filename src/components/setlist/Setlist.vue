<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import SetlistTop from './SetlistTop.vue'
import SectionTitle from './SectionTitle.vue'
import Track from './Track.vue'
import Spacer from './Spacer.vue'
import BottomControls from './BottomControls.vue'

const props = defineProps({
  sections: { type: Array, required: true },
})

// Flat list of tracks so Up/Down moves across section boundaries.
const flat = computed(() => props.sections.flatMap((s) => s.tracks))
const selected = ref(-1)
const paper = ref(null)

function trackIndex(si, ti) {
  let n = 0
  for (let i = 0; i < si; i++) n += props.sections[i].tracks.length
  return n + ti
}

function scrollToSelected() {
  nextTick(() => {
    const el = paper.value?.querySelectorAll('.track')[selected.value]
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  })
}

function open(i) {
  const href = flat.value[i]?.href
  if (!href) return
  if (href.startsWith('http')) window.open(href, '_blank', 'noopener')
  else window.location.href = href
}

function onKey(e) {
  const n = flat.value.length
  if (e.key === 'ArrowDown') {
    selected.value = selected.value < 0 ? 0 : Math.min(n - 1, selected.value + 1)
  } else if (e.key === 'ArrowUp') {
    selected.value = selected.value < 0 ? 0 : Math.max(0, selected.value - 1)
  } else if (e.key === 'Enter' && selected.value >= 0) {
    open(selected.value)
  } else if (e.key === 'Escape') {
    selected.value = -1
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  } else {
    return
  }
  e.preventDefault()
  scrollToSelected()
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="stage">
    <main ref="paper" class="paper">
      <SetlistTop />
      <template v-for="(section, si) in sections" :key="section.title">
        <Spacer v-if="si > 0" />
        <SectionTitle :number="si + 1" :title="section.title" />
        <Track
          v-for="(track, ti) in section.tracks"
          :key="track.title"
          v-bind="track"
          :selected="selected === trackIndex(si, ti)"
          @mousemove="selected = trackIndex(si, ti)"
        />
      </template>
    </main>
    <BottomControls />
  </div>
</template>

<style scoped>
.stage {
  min-height: 100vh;
  padding: 0 0 90px;
  background: #2a160c url('../../assets/setlist/wood.jpg') repeat;
  background-size: 270px auto;
}

.paper {
  container-type: inline-size;
  width: min(100%, 1100px);
  margin: 0 auto;
  filter: drop-shadow(0 0 14px rgba(0, 0, 0, 0.65));
}
</style>
