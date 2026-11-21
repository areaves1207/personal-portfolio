<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Setlist from './components/setlist/Setlist.vue'
import BonusOverlay from './components/setlist/BonusOverlay.vue'
import DownloadsOverlay from './components/setlist/DownloadsOverlay.vue'
import BottomControls from './components/setlist/BottomControls.vue'
import { sections, aboutMe, resume } from './data/setlist.js'

const CALENDLY_URL = 'https://calendly.com/areaves-mines/30min'

// The setlist never changes; Bonus and Downloads are sheets laid on top of it (kept mounted,
// shown/hidden). #bonus / #downloads in the URL keep the browser Back button working.
const OVERLAYS = ['bonus', 'downloads']
const screenFromUrl = () => {
  const h = window.location.hash.slice(1)
  return OVERLAYS.includes(h) ? h : 'setlist'
}
const screen = ref(screenFromUrl())

function navigate(to) {
  if (to === screen.value) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  screen.value = to
  history.pushState(null, '', OVERLAYS.includes(to) ? `#${to}` : window.location.pathname)
  // the sheets lie at the top of the setlist; bring them into view when one is put down
  if (OVERLAYS.includes(to)) window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onPop = () => (screen.value = screenFromUrl())

onMounted(() => {
  window.addEventListener('popstate', onPop)

  // Keep the /schedule link working: it opens the Calendly popup.
  if (window.location.pathname !== '/schedule') return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://assets.calendly.com/assets/external/widget.css'
  document.head.appendChild(link)

  const script = document.createElement('script')
  script.src = 'https://assets.calendly.com/assets/external/widget.js'
  script.async = true
  script.onload = () => window.Calendly.showPopupWidget(CALENDLY_URL)
  document.head.appendChild(script)
})
onBeforeUnmount(() => window.removeEventListener('popstate', onPop))
</script>

<template>
  <Setlist :active="screen === 'setlist'" :sections="sections" @navigate="navigate">
    <BonusOverlay
      v-show="screen === 'bonus'"
      :active="screen === 'bonus'"
      :title="aboutMe.title"
      :tracks="aboutMe.tracks"
      @navigate="navigate"
    />
    <DownloadsOverlay
      v-show="screen === 'downloads'"
      :active="screen === 'downloads'"
      :title="resume.title"
      :pdf="resume.pdf"
      :file-name="resume.fileName"
      @navigate="navigate"
    />
  </Setlist>
  <BottomControls :screen="screen" @navigate="navigate" />
</template>

