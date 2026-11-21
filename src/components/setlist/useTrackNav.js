import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

// Keyboard control shared by every track list:
// Up/Down move the highlight, Enter opens the highlighted track, Esc calls onBack.
// isActive() lets hidden screens ignore the keyboard.
export function useTrackNav(getTracks, rootRef, onBack, isActive = () => true) {
  const selected = ref(-1)

  function scrollToSelected() {
    nextTick(() => {
      const el = rootRef.value?.querySelectorAll('.track')[selected.value]
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    })
  }

  function open(i) {
    const href = getTracks()[i]?.href
    if (!href) return
    // same rule as Track.vue: everything but mailto opens in a new tab
    if (href.startsWith('mailto:')) window.location.href = href
    else window.open(href, '_blank', 'noopener')
  }

  function onKey(e) {
    if (!isActive()) return
    const n = getTracks().length
    if (e.key === 'ArrowDown') {
      selected.value = selected.value < 0 ? 0 : Math.min(n - 1, selected.value + 1)
    } else if (e.key === 'ArrowUp') {
      selected.value = selected.value < 0 ? 0 : Math.max(0, selected.value - 1)
    } else if (e.key === 'Enter' && selected.value >= 0) {
      open(selected.value)
    } else if (e.key === 'Escape') {
      selected.value = -1
      onBack()
      return
    } else {
      return
    }
    e.preventDefault()
    scrollToSelected()
  }

  onMounted(() => window.addEventListener('keydown', onKey))
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

  return { selected }
}
