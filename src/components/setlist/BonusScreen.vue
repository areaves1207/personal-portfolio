<script setup>
import { ref } from 'vue'
import BonusTop from './BonusTop.vue'
import BonusSheet from './BonusSheet.vue'
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
  <main ref="root" class="bonus">
    <BonusTop :title="title" @navigate="emit('navigate', $event)" />
    <BonusSheet>
      <Track
        v-for="(track, i) in tracks"
        :key="track.title"
        v-bind="track"
        variant="bare"
        :selected="selected === i"
        @mousemove="selected = i"
      />
    </BonusSheet>
  </main>
</template>

<style scoped>
.bonus {
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  width: min(100%, 1100px);
  min-height: 100vh;
  margin: 0 auto;
  filter: drop-shadow(0 0 14px rgba(0, 0, 0, 0.65));
}
</style>
