<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

// Draws the PDF's pages onto canvases, printed onto the paper underneath (multiply blend makes the
// page's white disappear into the crumpled texture). pdf.js only loads the first time it's shown,
// and it always reads the live PDF, so replacing public/resume.pdf updates this automatically.
const props = defineProps({
  src: { type: String, required: true },
  active: { type: Boolean, default: true },
})

const box = ref(null)
const pages = ref([])
const failed = ref(false)
let doc = null
let observer = null
let lastWidth = 0

async function load() {
  const [pdfjs, worker] = await Promise.all([
    import('pdfjs-dist'),
    import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
  ])
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default
  doc = await pdfjs.getDocument(props.src).promise
  pages.value = Array.from({ length: doc.numPages }, (_, i) => i + 1)
}

async function draw() {
  const width = box.value?.clientWidth
  if (!doc || !width || width === lastWidth) return
  lastWidth = width
  const dpr = Math.min(window.devicePixelRatio || 1, 3)
  const canvases = box.value.querySelectorAll('canvas')
  for (let i = 0; i < doc.numPages; i++) {
    const page = await doc.getPage(i + 1)
    const base = page.getViewport({ scale: 1 })
    const viewport = page.getViewport({ scale: (width / base.width) * dpr })
    const canvas = canvases[i]
    canvas.width = Math.floor(viewport.width)
    canvas.height = Math.floor(viewport.height)
    canvas.style.aspectRatio = `${base.width} / ${base.height}`
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
  }
}

watch(
  () => props.active,
  async (on) => {
    if (!on) return
    try {
      if (!doc) await load()
      await new Promise(requestAnimationFrame)
      await draw()
      if (!observer) {
        observer = new ResizeObserver(() => draw())
        observer.observe(box.value)
      }
    } catch (e) {
      failed.value = true
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="box" class="resume">
    <canvas v-for="n in pages" :key="n" class="page" :aria-label="`Resume page ${n}`"></canvas>
    <p v-if="failed" class="fallback">The resume couldn't be shown here. Use Download PDF above.</p>
  </div>
</template>

<style scoped>
.resume {
  align-self: stretch; /* full sheet width, even inside a centred column */
  display: flex;
  flex-direction: column;
  gap: 2cqw;
}

.page {
  display: block;
  width: 100%;
  mix-blend-mode: multiply;
}

.fallback {
  font-family: var(--gh-font-caps);
  font-size: 3.1cqw;
  color: var(--gh-artist);
  text-transform: uppercase;
}
</style>
