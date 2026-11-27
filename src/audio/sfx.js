// Menu sound effects, played through Web Audio (low latency, and sounds can overlap).
//
//   playHover()  - an option gets highlighted (mouse or arrow keys); at most once per
//                  HOVER_COOLDOWN_MS, so sweeping the mouse over a list doesn't machine-gun it
//   playSelect() - an option is picked (click, tap or Enter)
//   v-sfx        - directive for plain buttons/links (tabs, pills): select sound on click only.
//                  Hover sounds are just for list options (title menu, setlist, About Me).
//                  v-sfx="'hover'" also plays the hover sound on mouse-over (the red Back pill).
//                  v-sfx="false" switches it off (e.g. hint pills that do nothing).
//
// Browsers only allow sound after the visitor has interacted with the page (a click, tap or key
// press), so hovering before the first click is silent. The audio is set up on that first
// interaction.
//
//   muted / toggleMute() - the mute button (top right of every screen). Remembered per browser.
//
// A crowd cheering loops quietly underneath everything (CROWD_VOLUME). It starts with the rest of
// the audio on the first interaction, fades in, and pauses while the tab is hidden.
import { ref, watch } from 'vue'
import selectUrl from '../assets/audio/select.mp3'
import hoverUrl from '../assets/audio/hover.mp3'
import crowdUrl from '../assets/audio/crowd.mp3'

const FILES = { select: selectUrl, hover: hoverUrl }
const VOLUME = 1
const HOVER_COOLDOWN_MS = 120
const CROWD_VOLUME = 0.25 // well under the menu sounds
const CROWD_FADE_IN_S = 2
const CROWD_SEAM_S = 4 // the recording ends loud and starts quiet: blend the end into the start

let ctx = null
let output = null
const buffers = {}
let ready = null // promise: all sounds decoded
let pending = null // a sound asked for while the audio was still starting up
let lastPointer = 'mouse'
let lastHoverAt = -Infinity
let crowdGain = null

const MUTE_KEY = 'sfx-muted'
function loadMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === '1'
  } catch {
    return false
  }
}
export const muted = ref(loadMuted())
export function toggleMute() {
  muted.value = !muted.value
  try {
    localStorage.setItem(MUTE_KEY, muted.value ? '1' : '0')
  } catch {
    // storage blocked (private mode etc.): mute still works for this visit
  }
}

// fetch the files right away (cheap, ~17 KB total); decoding waits for the audio context
const raw = Object.fromEntries(
  Object.entries(FILES).map(([name, url]) => [name, fetch(url).then((r) => r.arrayBuffer())]),
)

function start() {
  if (ctx) {
    if (ctx.state === 'suspended') ctx.resume()
    return
  }
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return
  ctx = new AC()
  output = ctx.createGain()
  output.gain.value = VOLUME
  output.connect(ctx.destination)
  startCrowd()
  ready = Promise.all(
    Object.entries(raw).map(async ([name, data]) => {
      buffers[name] = await ctx.decodeAudioData((await data).slice(0))
    }),
  ).then(() => {
    // play the sound that triggered startup (e.g. the very first click's select sound)
    if (pending && performance.now() - pending.at < 400) play(pending.name)
    pending = null
  })
}

// Loads the crowd recording (1 MB, so only once the visitor has interacted) and loops it with
// no audible seam: the last CROWD_SEAM_S seconds are crossfaded onto the start, and the loop
// ends where that tail began.
async function startCrowd() {
  crowdGain = ctx.createGain()
  crowdGain.gain.value = 0
  crowdGain.connect(output)
  try {
    const data = await fetch(crowdUrl).then((r) => r.arrayBuffer())
    const buffer = seamless(await ctx.decodeAudioData(data))
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true
    source.connect(crowdGain)
    source.start()
    setCrowd(muted.value ? 0 : CROWD_VOLUME, CROWD_FADE_IN_S)
  } catch {
    // no crowd if it can't load; the menu sounds still work
  }
}

function seamless(buffer) {
  const seam = Math.floor(Math.min(CROWD_SEAM_S, buffer.duration / 4) * buffer.sampleRate)
  const length = buffer.length - seam
  const out = ctx.createBuffer(buffer.numberOfChannels, length, buffer.sampleRate)
  for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
    const src = buffer.getChannelData(ch)
    const dst = out.getChannelData(ch)
    dst.set(src.subarray(0, length))
    for (let i = 0; i < seam; i++) {
      const t = (i / seam) * (Math.PI / 2) // equal-power crossfade
      dst[i] = src[i] * Math.sin(t) + src[length + i] * Math.cos(t)
    }
  }
  return out
}

function setCrowd(volume, seconds = 0.3) {
  if (!crowdGain) return
  const g = crowdGain.gain
  g.cancelScheduledValues(ctx.currentTime)
  g.setValueAtTime(g.value, ctx.currentTime)
  g.linearRampToValueAtTime(volume, ctx.currentTime + seconds)
}

function play(name) {
  if (muted.value) return
  if (!ctx || !buffers[name]) {
    if (ctx) pending = { name, at: performance.now() }
    return
  }
  if (ctx.state !== 'running') ctx.resume()
  const source = ctx.createBufferSource()
  source.buffer = buffers[name]
  source.connect(output)
  source.start()
}

export function playHover() {
  // a tap fires a fake mouse-over right before the click: only the select sound should play
  if (lastPointer === 'touch') return
  const now = performance.now()
  if (now - lastHoverAt < HOVER_COOLDOWN_MS) return
  lastHoverAt = now
  play('hover')
}

export function playSelect() {
  play('select')
}

watch(muted, (m) => setCrowd(m ? 0 : CROWD_VOLUME))

if (typeof window !== 'undefined') {
  // nobody's looking: pause the crowd (and everything else) until the tab comes back
  document.addEventListener('visibilitychange', () => {
    if (!ctx) return
    if (document.hidden) ctx.suspend()
    else ctx.resume()
  })
  // the first interaction unlocks audio
  for (const type of ['pointerdown', 'keydown', 'touchstart']) {
    window.addEventListener(type, start, { capture: true, passive: true })
  }
  window.addEventListener('pointerover', (e) => (lastPointer = e.pointerType), { capture: true, passive: true })
  window.addEventListener('keydown', () => (lastPointer = 'keyboard'), { capture: true, passive: true })
}

export const vSfx = {
  mounted(el, binding) {
    if (binding.value === false) return
    el._sfx = true
    if (binding.value === 'hover') el.addEventListener('mouseenter', playHover)
    el.addEventListener('click', playSelect)
  },
  unmounted(el) {
    if (!el._sfx) return
    el.removeEventListener('mouseenter', playHover)
    el.removeEventListener('click', playSelect)
  },
}
