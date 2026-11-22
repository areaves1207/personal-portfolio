<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue'
import LandingMenu from './components/menu/LandingMenu.vue'
import Setlist from './components/setlist/Setlist.vue'
import BonusOverlay from './components/setlist/BonusOverlay.vue'
import DownloadsOverlay from './components/setlist/DownloadsOverlay.vue'
import BottomControls from './components/setlist/BottomControls.vue'
import SkillsPage from './components/skills/SkillsPage.vue'
import { sections, aboutMe, resume } from './data/setlist.js'
import { skills } from './data/skills.js'
import { profile, outfits } from './data/whoIsAidan.js'
import { features } from './data/menu.js'

// loaded on demand (it pulls in three.js), and only reachable while the feature is switched on
const WhoIsAidan = defineAsyncComponent(() => import('./components/who/WhoIsAidan.vue'))

const CALENDLY_URL = 'https://calendly.com/areaves-mines/30min'

// Screens and their URL hashes. The title menu lives at the bare URL; Careers is the setlist,
// with Bonus and Downloads as sheets laid on top of it (kept mounted, shown/hidden).
// Hashes keep the browser's Back/Forward buttons and shared links working.
const HASHES = {
  menu: '',
  setlist: 'careers',
  bonus: 'bonus',
  downloads: 'downloads',
  skills: 'skills',
  who: 'who-is-aidan',
}
const TITLES = {
  menu: 'Aidan Reaves Portfolio',
  setlist: 'Careers · Aidan Reaves',
  bonus: 'About Me · Aidan Reaves',
  downloads: 'Resume · Aidan Reaves',
  skills: 'Skills · Aidan Reaves',
  who: 'Who Is Aidan? · Aidan Reaves',
}
const CAREERS = ['setlist', 'bonus', 'downloads']

const screenFromUrl = () => {
  const h = window.location.hash.slice(1)
  if (h === 'setlist') return 'setlist' // older links
  const s = Object.keys(HASHES).find((key) => HASHES[key] === h) ?? 'menu'
  return s === 'who' && !features.whoIsAidan ? 'menu' : s
}
const screen = ref(screenFromUrl())
const inCareers = computed(() => CAREERS.includes(screen.value))
// which page is showing (Bonus/Downloads count as Careers): changing it starts at the top
const page = computed(() => (inCareers.value ? 'careers' : screen.value))

const urlFor = (s) => (HASHES[s] ? `#${HASHES[s]}` : window.location.pathname)

function navigate(to) {
  if (to === screen.value) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  // Going back to the screen we just came from: step back in history instead of piling up
  // entries, so the browser's Back button and the in-page Back pill agree.
  if (history.state?.prev === to) {
    history.back()
    return
  }
  history.pushState({ screen: to, prev: screen.value }, '', urlFor(to))
  screen.value = to
  // the sheets lie at the top of the setlist; bring them into view when one is put down
  if (to === 'bonus' || to === 'downloads') window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onPop = () => (screen.value = screenFromUrl())

watch(page, () => window.scrollTo(0, 0), { flush: 'post' })
watch(screen, (s) => (document.title = TITLES[s]), { immediate: true })

onMounted(() => {
  window.addEventListener('popstate', onPop)
  // first load: tag the entry, and drop a hash that doesn't lead anywhere (e.g. a switched-off page)
  if (!history.state) history.replaceState({ screen: screen.value, prev: null }, '', urlFor(screen.value))

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
  <LandingMenu v-if="screen === 'menu'" @navigate="navigate" />

  <template v-else-if="inCareers">
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

  <SkillsPage
    v-else-if="screen === 'skills'"
    :title="skills.title"
    :groups="skills.groups"
    @back="navigate('menu')"
  />

  <WhoIsAidan v-else-if="screen === 'who'" :profile="profile" :outfits="outfits" @back="navigate('menu')" />
</template>
