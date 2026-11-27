// Menu sound effects, played through Web Audio (low latency, and sounds can overlap).
//
//   playHover()  - an option gets highlighted (mouse or arrow keys); at most once per
//                  HOVER_COOLDOWN_MS, so sweeping the mouse over a list doesn't machine-gun it
//   playSelect() - an option is picked (click, tap or Enter)
//   v-sfx        - directive for plain buttons/links (tabs, pills): select sound on click only.
//                  Hover sounds are just for list options (title menu, setlist, About Me).
//                  v-sfx="false" switches it off (e.g. hint pills that do nothing).
//
// Browsers only allow sound after the visitor has interacted with the page (a click, tap or key
// press), so hovering before the first click is silent. The audio is set up on that first
// interaction.
import selectUrl from '../assets/audio/select.mp3'
import hoverUrl from '../assets/audio/hover.mp3'

const FILES = { select: selectUrl, hover: hoverUrl }
const VOLUME = 1
const HOVER_COOLDOWN_MS = 120

let ctx = null
let output = null
const buffers = {}
let ready = null // promise: all sounds decoded
let pending = null // a sound asked for while the audio was still starting up
let lastPointer = 'mouse'
let lastHoverAt = -Infinity

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

function play(name) {
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

if (typeof window !== 'undefined') {
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
    el.addEventListener('click', playSelect)
  },
  unmounted(el) {
    if (!el._sfx) return
    el.removeEventListener('click', playSelect)
  },
}
