<script setup>
import { ref } from 'vue'
import PaperOverlay from './PaperOverlay.vue'
import Track from './Track.vue'
import { useTrackNav } from './useTrackNav.js'

const props = defineProps({
  title: { type: String, required: true },
  tracks: { type: Array, required: true },
  active: { type: Boolean, default: true },
})
const emit = defineEmits(['navigate'])

const root = ref(null)
const { selected } = useTrackNav(
  () => props.tracks,
  root,
  () => emit('navigate', 'setlist'),
  () => props.active,
)
</script>

<template>
  <!-- Bonus: About Me tracks written on the blue sheet. -->
  <div ref="root">
    <PaperOverlay :title="title">
      <Track
        v-for="(track, i) in tracks"
        :key="track.title"
        v-bind="track"
        variant="bare"
        :selected="selected === i"
        @mousemove="selected = i"
      />
    </PaperOverlay>
  </div>
</template>
