<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import WoodBackground from './components/setlist/WoodBackground.vue'
import Setlist from './components/setlist/Setlist.vue'
import BonusScreen from './components/setlist/BonusScreen.vue'
import BottomControls from './components/setlist/BottomControls.vue'
import { sections, aboutMe } from './data/setlist.js'

const CALENDLY_URL = 'https://calendly.com/areaves-mines/30min'

// Two screens, both kept mounted so switching is instant (no image reload).
// #bonus in the URL keeps the browser Back button working.
const screenFromUrl = () => (window.location.hash === '#bonus' ? 'bonus' : 'setlist')
const screen = ref(screenFromUrl())

function navigate(to) {
  if (to === screen.value) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  screen.value = to
  history.pushState(null, '', to === 'bonus' ? '#bonus' : window.location.pathname)
  window.scrollTo({ top: 0 })
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
  <WoodBackground />
  <Setlist
    v-show="screen === 'setlist'"
    :active="screen === 'setlist'"
    :sections="sections"
    @navigate="navigate"
  />
  <BonusScreen
    v-show="screen === 'bonus'"
    :active="screen === 'bonus'"
    :title="aboutMe.title"
    :tracks="aboutMe.tracks"
    @navigate="navigate"
  />
  <BottomControls :screen="screen" @navigate="navigate" />
</template>

