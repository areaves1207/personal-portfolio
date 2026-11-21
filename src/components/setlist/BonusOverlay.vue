<script setup>
import { ref } from 'vue'
import BonusTop from './BonusTop.vue'
import BonusSheet from './BonusSheet.vue'
import Track from './Track.vue'
import { useTrackNav } from './useTrackNav.js'
import clipImg from '../../assets/bonus/paperclip.webp'

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
  <!-- The blue bonus sheet laid on top of the setlist (rendered inside Setlist's slot).
       Placement mirrors the bonus reference: the sheet covers the setlist from just left of the
       red margin to its right edge, and a paper-clipped cassette card pins its left edge. -->
  <div ref="root" class="bonus-overlay">
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
    <img class="clip" :src="clipImg" alt="" draggable="false" />
  </div>
</template>

<style scoped>
/* Positions are in the setlist's own frame (1800 units wide = 100%, 18 units = 1cqw). */
.bonus-overlay {
  position: absolute;
  left: 9.33%;
  top: 5.33cqw;
  width: 89.4%;
  min-height: calc(100% - 5.33cqw - 90px); /* down to the last setlist row */
  display: flex;
  flex-direction: column;
  pointer-events: none; /* transparent parts let the setlist tabs through */
  filter: drop-shadow(0 0.4cqw 1cqw rgba(0, 0, 0, 0.55));
}

/* cassette card + paperclip, pinning the sheet's left edge to the setlist */
.clip {
  position: absolute;
  left: -15.4%;
  top: 42cqw;
  width: 21.4%;
  transform: rotate(-1deg);
  filter: drop-shadow(0.2cqw 0.35cqw 0.3cqw rgba(0, 0, 0, 0.5));
  pointer-events: none;
  user-select: none;
}
</style>
