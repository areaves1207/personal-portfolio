<template>
  <header class="site-header">
    <span class="site-name" @click="$emit('scroll-to', 'intro')">Aidan Reaves</span>

    <div class="right-side">
      <nav class="nav-buttons">
        <button @click="$emit('scroll-to', 'intro')">Intro</button>
        <button @click="$emit('scroll-to', 'skills')">Skills</button>
        <button @click="$emit('scroll-to', 'experience')">Experience</button>
        <button @click="$emit('scroll-to', 'projects')">Projects</button>
        <button @click="$emit('scroll-to', 'contact')">Contact</button>
      </nav>

      <div class="nav-divider"></div>

      <div class="social-links">
        <a class="icon-link" href="https://github.com/areaves1207" target="_blank" aria-label="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
          </svg>
        </a>
        <a class="icon-link" href="https://www.linkedin.com/in/aidan-reaves/" target="_blank" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a class="btn btn--outline" href="/resume.pdf" target="_blank">Resume</a>
      </div>
    </div>

    <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Menu">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="mobile-menu" :class="{ open: menuOpen }">
      <button @click="navigate('intro')">Intro</button>
      <button @click="navigate('skills')">Skills</button>
      <button @click="navigate('experience')">Experience</button>
      <button @click="navigate('projects')">Projects</button>
      <button @click="navigate('contact')">Contact</button>
      <a class="btn btn--outline mobile-resume-btn" href="/resume.pdf" target="_blank">Resume</a>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['scroll-to'])
const menuOpen = ref(false)

function navigate(section) {
  emit('scroll-to', section)
  menuOpen.value = false
}
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: var(--header-height);
  background: rgba(11, 11, 15, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  z-index: 1001;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.site-name {
  color: white;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.02em;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.site-name:hover {
  color: var(--color-accent-secondary);
}

.right-side {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-buttons {
  display: flex;
  gap: 0.25rem;
}

.nav-buttons button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.nav-buttons button:hover {
  opacity: 0.65;
}

.nav-divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 0.5rem;
}

.social-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon-link {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.75);
  padding: 6px;
  border-radius: 6px;
  transition: color 0.2s ease;
}

.icon-link:hover {
  color: white;
}

/* Hamburger button — hidden on desktop */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  z-index: 1002;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile dropdown — hidden on desktop */
.mobile-menu {
  display: none;
  position: fixed;
  top: 52px;
  left: 0;
  width: 100%;
  background: rgba(11, 11, 15, 0.98);
  flex-direction: column;
  align-items: stretch;
  padding: 0.5rem 1rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

.mobile-menu.open {
  display: flex;
}

.mobile-menu button {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 0.5rem;
  text-align: left;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  transition: color 0.2s ease;
}

.mobile-menu button:hover {
  opacity: 0.65;
}

.mobile-resume-btn {
  display: block;
  margin-top: 0.75rem;
  text-align: center;
}

@media (max-width: 768px) {
  .right-side {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}
</style>
