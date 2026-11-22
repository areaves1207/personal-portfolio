<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

// The character on its pedestal, like a Guitar Hero character-select screen.
// Shows outfit.model (a .glb scan) when there is one, otherwise a stand-in mannequin dressed in
// outfit.colors. Drag sideways to turn the character; let go and it settles back to an idle sway.
// three.js is imported here, on demand, so it only downloads when this page is opened.
const props = defineProps({
  outfit: { type: Object, required: true },
})

const host = ref(null)
const failed = ref(false) // no WebGL: show a message instead
const loading = ref(false)

let THREE = null
let renderer, scene, camera, figure, current, clock, raf, resizeObserver
let disposed = false
let loadToken = 0

// rotation: yaw eases toward a gentle idle sway unless the visitor is dragging
let yaw = 0
let drag = null
let idleAt = 0

const SKIN = '#bfa58c'
const FIGURE_HEIGHT = 1.8

function material(color) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0.05 })
}

function part(geometry, color, x, y, z = 0) {
  const mesh = new THREE.Mesh(geometry, material(color))
  mesh.position.set(x, y, z)
  return mesh
}

// Faceless stand-in figure, about 1.8 units tall, feet at y = 0.
function buildMannequin(c) {
  const g = new THREE.Group()
  const leg = new THREE.CapsuleGeometry(0.075, 0.7, 6, 16)
  const arm = new THREE.CapsuleGeometry(0.055, 0.56, 6, 16)
  for (const side of [-1, 1]) {
    g.add(part(new THREE.BoxGeometry(0.13, 0.08, 0.28), c.shoes, side * 0.1, 0.04, 0.04))
    g.add(part(leg, c.bottom, side * 0.1, 0.5))
    const a = part(arm, c.top, side * 0.3, 1.17)
    a.rotation.z = side * 0.1
    g.add(a)
    g.add(part(new THREE.SphereGeometry(0.055, 16, 12), SKIN, side * 0.333, 0.83))
  }
  const hips = part(new THREE.CylinderGeometry(0.19, 0.18, 0.2, 24), c.bottom, 0, 0.93)
  hips.scale.z = 0.7
  const torso = part(new THREE.CapsuleGeometry(0.2, 0.3, 8, 24), c.top, 0, 1.2)
  torso.scale.set(1.1, 1, 0.68)
  g.add(hips, torso)
  if (c.tie) g.add(part(new THREE.BoxGeometry(0.05, 0.3, 0.02), c.tie, 0, 1.25, 0.137))
  g.add(part(new THREE.CylinderGeometry(0.05, 0.055, 0.1, 16), SKIN, 0, 1.58))
  const head = part(new THREE.SphereGeometry(0.125, 32, 24), SKIN, 0, 1.71)
  head.scale.y = 1.15
  g.add(head)
  return g
}

// A real scan: scaled to FIGURE_HEIGHT and stood in the middle of the pedestal.
async function loadModel(url) {
  const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js')
  const obj = (await new GLTFLoader().loadAsync(url)).scene
  const box = new THREE.Box3().setFromObject(obj)
  obj.scale.multiplyScalar(FIGURE_HEIGHT / box.getSize(new THREE.Vector3()).y)
  box.setFromObject(obj)
  const center = box.getCenter(new THREE.Vector3())
  obj.position.x -= center.x
  obj.position.z -= center.z
  obj.position.y -= box.min.y
  return obj
}

function disposeObject(obj) {
  obj.traverse((o) => {
    if (!o.isMesh) return
    o.geometry.dispose()
    for (const m of [].concat(o.material)) {
      for (const v of Object.values(m)) if (v?.isTexture) v.dispose()
      m.dispose()
    }
  })
}

async function dress(outfit) {
  const token = ++loadToken
  let next
  if (outfit.model) {
    loading.value = true
    try {
      next = await loadModel(outfit.model)
    } catch (err) {
      console.warn(`Couldn't load ${outfit.model}; showing the stand-in instead.`, err)
      next = buildMannequin(outfit.colors)
    } finally {
      if (token === loadToken) loading.value = false
    }
  } else {
    next = buildMannequin(outfit.colors)
  }
  // a newer outfit was picked while this one loaded, or the page was closed
  if (token !== loadToken || disposed) return disposeObject(next)
  if (current) {
    figure.remove(current)
    disposeObject(current)
  }
  current = next
  figure.add(current)
}

// round pedestal with a yellow rim and a soft shadow under the feet
function buildPedestal() {
  const g = new THREE.Group()
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.85, 0.92, 0.14, 64),
    new THREE.MeshStandardMaterial({ color: '#1d1527', roughness: 0.55, metalness: 0.35 }),
  )
  base.position.y = -0.07
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(0.855, 0.014, 8, 128),
    new THREE.MeshBasicMaterial({ color: '#ffd21f' }),
  )
  rim.rotation.x = Math.PI / 2
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 128
  const ctx = canvas.getContext('2d')
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(0,0,0,0.6)')
  grad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 128, 128)
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.55, 48),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthWrite: false }),
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = 0.002
  g.add(base, rim, shadow)
  return g
}

function resize() {
  const { clientWidth: w, clientHeight: h } = host.value
  if (!w || !h) return
  renderer.setSize(w, h, false) // CSS sizes the canvas; this only sets its resolution
  camera.aspect = w / h
  // back the camera off far enough that the figure and pedestal always fit
  const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
  const dist = Math.max(1.2 / t, 1.05 / (t * camera.aspect))
  camera.position.set(0, 1.1, dist)
  camera.lookAt(0, 0.88, 0)
  camera.updateProjectionMatrix()
}

function frame() {
  raf = requestAnimationFrame(frame)
  const dt = Math.min(clock.getDelta(), 0.05)
  const t = clock.elapsedTime
  if (!drag && t > idleAt) {
    const sway = 0.45 * Math.sin(t * 0.45)
    yaw += (sway - yaw) * (1 - Math.pow(0.03, dt))
  }
  figure.rotation.y = yaw
  renderer.render(scene, camera)
}

function onPointerDown(e) {
  drag = { x: e.clientX, yaw }
  e.currentTarget.setPointerCapture(e.pointerId)
}
function onPointerMove(e) {
  if (drag) yaw = drag.yaw + (e.clientX - drag.x) * 0.012
}
function onPointerUp() {
  if (!drag) return
  drag = null
  idleAt = clock.elapsedTime + 1.5 // hold the pose a moment before swaying again
}

onMounted(async () => {
  try {
    THREE = await import('three')
    if (disposed) return
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  } catch (err) {
    console.warn('3D stage unavailable', err)
    failed.value = true
    return
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  const canvas = renderer.domElement
  canvas.addEventListener('pointerdown', onPointerDown)
  canvas.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerup', onPointerUp)
  canvas.addEventListener('pointercancel', onPointerUp)
  host.value.appendChild(canvas)

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50)

  scene.add(new THREE.HemisphereLight('#8f7fb0', '#1a1020', 1.1))
  const key = new THREE.DirectionalLight('#fff0d8', 2.4) // warm stage light, front-right
  key.position.set(2, 4, 5)
  const rim = new THREE.DirectionalLight('#b48cff', 3) // purple back light outlines the figure
  rim.position.set(-3, 3, -4)
  scene.add(key, rim, buildPedestal())

  figure = new THREE.Group()
  scene.add(figure)
  clock = new THREE.Clock()

  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host.value)
  resize()
  await dress(props.outfit)
  if (!disposed) frame()
})

// new outfit: spin once (eased) while changing, like flipping through styles in the game
watch(
  () => props.outfit,
  (outfit) => {
    if (!figure) return
    yaw -= Math.PI * 2
    idleAt = 0
    dress(outfit)
  },
)

onBeforeUnmount(() => {
  disposed = true
  cancelAnimationFrame(raf)
  resizeObserver?.disconnect()
  if (!renderer) return
  scene.traverse((o) => o !== scene && o.isMesh && disposeObject(o))
  renderer.dispose()
  renderer.domElement.remove()
})
</script>

<template>
  <div ref="host" class="character-stage">
    <p v-if="failed" class="message">The 3D view needs WebGL, which this browser has turned off.</p>
    <p v-else-if="loading" class="message">Loading…</p>
  </div>
</template>

<style scoped>
.character-stage {
  position: relative;
  width: 100%;
  height: 100%;
}

/* the canvas three.js adds */
.character-stage {
  overflow: hidden;
}

.character-stage :deep(canvas) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  cursor: grab;
  touch-action: pan-y; /* vertical swipes still scroll the page on phones */
}

.character-stage :deep(canvas:active) {
  cursor: grabbing;
}

.message {
  position: absolute;
  inset: auto 0 45%;
  text-align: center;
  font-family: var(--gh-font-caps);
  font-size: 18px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #cfc4e6;
}
</style>
