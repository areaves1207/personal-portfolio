<script setup>
import SheetTop from './SheetTop.vue'
import SheetBody from './SheetBody.vue'
import clipImg from '../../assets/bonus/paperclip.webp'

defineProps({
  title: { type: String, required: true },
  plain: { type: Boolean, default: false },
})
</script>

<template>
  <!-- A crumpled blue sheet laid on top of the setlist (rendered inside Setlist's slot).
       Placement mirrors the bonus reference: the sheet covers the setlist from just left of the
       red margin to its right edge, and a paper-clipped cassette card pins its left edge. -->
  <div class="paper-overlay">
    <SheetTop :title="title" :plain="plain" />
    <SheetBody><slot /></SheetBody>
    <img class="clip" :src="clipImg" alt="" draggable="false" />
  </div>
</template>

<style scoped>
/* Positions are in the setlist's own frame (1800 units wide = 100%, 18 units = 1cqw). */
.paper-overlay {
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
