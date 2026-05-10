<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="overlay" @click.self="$emit('close')">
        <div class="modal">
          <div class="modal-header">
            <span class="modal-title">Aidan Reaves — Resume</span>
            <div class="modal-actions">
              <a
                href="/resume.pdf"
                download="Aidan_Reaves_Resume.pdf"
                class="download-btn"
              >
                ↓ Download PDF
              </a>
              <button class="close-btn" @click="$emit('close')" aria-label="Close">✕</button>
            </div>
          </div>
          <iframe
            src="/resume.pdf"
            class="pdf-frame"
            title="Resume preview"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const onKey = (e) => { if (e.key === 'Escape') emit('close') }
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal {
  display: flex;
  flex-direction: column;
  width: min(860px, 100%);
  height: min(90vh, 1000px);
  background: #1a1a22;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: #13131a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.modal-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
}

.modal-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.download-btn {
  padding: 8px 18px;
  border-radius: 8px;
  background: linear-gradient(135deg, #4e54c8, #8f94fb);
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(78, 84, 200, 0.45);
}

.close-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: color 0.2s ease, background 0.2s ease;
  line-height: 1;
}

.close-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.08);
}

.pdf-frame {
  flex: 1;
  width: 100%;
  border: none;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
