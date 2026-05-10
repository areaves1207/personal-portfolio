<template>
  <canvas ref="canvas" class="bg-canvas" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let rafId = null
let resizeHandler = null
let mouseMoveHandler = null
let scrollHandler = null

onMounted(() => {
  const c = canvas.value
  const ctx = c.getContext('2d')

  let W = (c.width = window.innerWidth)
  let H = (c.height = window.innerHeight)

  const PARTICLE_COUNT = 80
  const STAR_COUNT = 220
  const MAX_DIST = 140
  const MOUSE_DIST = 200
  const P_COLOR = '143, 148, 251'

  const mouse = { x: -9999, y: -9999 }
  let scrollY = window.scrollY
  let t = 0

  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    r: Math.random() * 1.5 + 0.5,
  }))

  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.1 + 0.2,
    baseOpacity: Math.random() * 0.5 + 0.25,
    speed: Math.random() * 0.015 + 0.004,
    phase: Math.random() * Math.PI * 2,
  }))

  resizeHandler = () => {
    W = c.width = window.innerWidth
    H = c.height = window.innerHeight
  }
  mouseMoveHandler = (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }
  scrollHandler = () => { scrollY = window.scrollY }

  window.addEventListener('resize', resizeHandler)
  window.addEventListener('mousemove', mouseMoveHandler)
  window.addEventListener('scroll', scrollHandler, { passive: true })

  const line = (x1, y1, x2, y2, alpha) => {
    ctx.strokeStyle = `rgba(${P_COLOR}, ${alpha})`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }

  const tick = () => {
    ctx.clearRect(0, 0, W, H)
    t++

    // blend: 0 = full particles (intro), 1 = full stars (rest of page)
    // transition happens over half a viewport of scroll
    const blend = Math.min(1, Math.max(0, scrollY / (H * 0.5)))
    const pA = 1 - blend  // particle alpha multiplier
    const sA = blend      // star alpha multiplier

    // --- Particles ---
    if (pA > 0) {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            line(particles[i].x, particles[i].y, particles[j].x, particles[j].y,
              (1 - d / MAX_DIST) * 0.28 * pA)
          }
        }
        const mx = particles[i].x - mouse.x
        const my = particles[i].y - mouse.y
        const md = Math.sqrt(mx * mx + my * my)
        if (md < MOUSE_DIST) {
          line(particles[i].x, particles[i].y, mouse.x, mouse.y,
            (1 - md / MOUSE_DIST) * 0.55 * pA)
        }
      }

      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${P_COLOR}, ${0.65 * pA})`
        ctx.fill()
      }
    }

    // --- Stars ---
    if (sA > 0) {
      for (const s of stars) {
        const twinkle = 0.65 + 0.35 * Math.sin(t * s.speed + s.phase)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${s.baseOpacity * twinkle * sA})`
        ctx.fill()
      }
    }

    rafId = requestAnimationFrame(tick)
  }

  tick()
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', resizeHandler)
  window.removeEventListener('mousemove', mouseMoveHandler)
  window.removeEventListener('scroll', scrollHandler)
})
</script>

<style scoped>
.bg-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
