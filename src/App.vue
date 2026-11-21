<script setup>
import { onMounted } from 'vue'
import Setlist from './components/setlist/Setlist.vue'
import { sections } from './data/setlist.js'

const CALENDLY_URL = 'https://calendly.com/areaves-mines/30min'

// Keep the /schedule link working: it opens the Calendly popup.
onMounted(() => {
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
</script>

<template>
  <Setlist :sections="sections" />
</template>
