<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import SheetTop from '../setlist/SheetTop.vue'
import SheetBody from '../setlist/SheetBody.vue'
import ControlBar from '../shared/ControlBar.vue'

// Skills: a plain list on the blue sheet, for now. The only way out is the red Back pill
// (or Esc, its keyboard key) and the browser's own Back button.
defineProps({
  title: { type: String, required: true },
  groups: { type: Array, required: true },
})
const emit = defineEmits(['back'])

const back = () => emit('back')
const controls = [{ label: 'Back', icon: 'red', keys: 'Esc', action: back }]

const onKey = (e) => e.key === 'Escape' && back()
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="skills-page">
    <main class="frame">
      <div class="sheet">
        <SheetTop :title="title" plain />
        <SheetBody>
          <section v-for="group in groups" :key="group.title" class="group">
            <h2 class="group-title">{{ group.title }}</h2>
            <ul class="items">
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
          </section>
        </SheetBody>
      </div>
    </main>
    <ControlBar :controls="controls" />
  </div>
</template>

<style scoped>
/* Same frame as the setlist (1100px max, 18 units = 1cqw), so the sheet matches the Bonus one. */
.frame {
  container-type: inline-size;
  width: min(100%, 1100px);
  margin: 0 auto;
  padding: 2cqw 0 90px;
}

.sheet {
  position: relative;
  width: 89.4%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  isolation: isolate;
}

/* shadow along the straight sides (the torn top has its shadow baked in) */
.sheet::before {
  content: '';
  position: absolute;
  inset: 9.9cqw 0 0 0;
  z-index: -1;
  box-shadow: 0 0.4cqw 1cqw rgba(0, 0, 0, 0.55);
}

/* text lines up with the About Me tracks on the Bonus sheet */
.group {
  padding: 0 7% 2.4cqw 10.4%;
}

.group-title {
  margin: 0 0 0.6cqw;
  font-family: var(--gh-font-caps);
  font-weight: normal;
  font-size: max(3.4cqw, 15px);
  line-height: 1.1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gh-section);
  -webkit-text-stroke: 0.02em var(--gh-section);
}

.items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2em 1.1em;
  padding: 0;
  list-style: none;
  font-family: var(--gh-font-title);
  font-size: max(4cqw, 17px);
  line-height: 1.3;
  color: var(--gh-ink);
}

.items li {
  white-space: nowrap;
}
</style>
