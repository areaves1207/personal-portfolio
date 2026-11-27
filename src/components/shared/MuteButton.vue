<script setup>
import { muted, toggleMute, playSelect } from '../../audio/sfx.js'

// Mute toggle, pinned to the top right of every screen. Styled like the control pills.
function toggle() {
  toggleMute()
  if (!muted.value) playSelect() // turning sound back on: let it be heard
}
</script>

<template>
  <button
    type="button"
    class="gh-pill mute"
    :aria-pressed="muted"
    :aria-label="muted ? 'Unmute sounds' : 'Mute sounds'"
    :title="muted ? 'Unmute sounds' : 'Mute sounds'"
    @click="toggle"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 9h4l5-4v14l-5-4H3z" fill="currentColor" />
      <g v-if="muted" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
        <path d="M16 9l6 6M22 9l-6 6" />
      </g>
      <g v-else fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
        <path d="M15.5 9a4 4 0 0 1 0 6" />
        <path d="M18.5 6a8 8 0 0 1 0 12" />
      </g>
    </svg>
  </button>
</template>

<style scoped>
/* above every screen, including the full-screen title menu */
.mute {
  position: fixed;
  top: calc(10px + env(safe-area-inset-top));
  right: calc(10px + env(safe-area-inset-right));
  z-index: 100;
  width: 46px;
  height: 46px;
  padding: 0;
  font-size: 16px;
  border-radius: 50%;
}

svg {
  width: 24px;
  height: 24px;
}

/* phones: smaller, so it stays clear of the Downloads tab on the setlist header */
@media (max-width: 560px) {
  .mute {
    top: calc(6px + env(safe-area-inset-top));
    right: 6px;
    width: 36px;
    height: 36px;
  }

  svg {
    width: 20px;
    height: 20px;
  }
}
</style>
