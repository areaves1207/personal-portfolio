import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { vSfx } from './audio/sfx.js'

createApp(App).directive('sfx', vSfx).mount('#app')
