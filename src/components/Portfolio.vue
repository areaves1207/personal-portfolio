<template>
  <div class="wrapper">
    <div class="title">Portfolio</div>

    <div class="carousel-container">
      <button class="nav-btn" @click="prev">&#8592;</button>

      <div class="carousel-box">
        <Transition :name="slideDir" mode="out-in">
          <Project
            :key="current"
            :title="projects[current].title"
            :description="projects[current].description"
            :img_location="projects[current].image"
            :app_link="projects[current].app_link"
            :github_link="projects[current].github_link"
          />
        </Transition>
      </div>

      <button class="nav-btn" @click="next">&#8594;</button>
    </div>

    <div class="dots">
      <span
        v-for="(p, i) in projects"
        :key="i"
        class="dot"
        :class="{ active: i === current }"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Project from "./ProjectIcon.vue"
import pbn_img from "../assets/images/pbn-pfp.jpg"
import dreamvault_img from "../assets/images/dreamvault-pfp.jpg"
import lot_manager_img from "../assets/images/lotmanager_pfp.png"
import headshot from "../assets/images/me.jpg"
import learnnato_img from "../assets/images/learnnato-pfp.png"

const current = ref(0)
const slideDir = ref('slide-left')

const projects = [
  {
    id: 1,
    title: "Paint By Numbers Generator",
    description:
      "Full stack web application build with React and Python. The frontend is hosted on Render and the backend is hosted on Vercel. It has my own implemented Canny edge detector, K-Means Clustering algorithm, and palette generator.",
    app_link: "https://pbn-gen.vercel.app",
    github_link: "https://github.com/areaves1207/paintbynumbersgenerator",
    image: pbn_img,
  },
  {
    id: 2,
    title: "Dreamvault",
    description:
      "A full stack dream tracking web app hosted on AWS with Route 53, Cloudfront, S3, Elastic Beanstalk, and RDS using MySQL. It uses React/Node JS and features my own implemented JWT generation, stored as a httponly cookie. All dream data is encrypted.",
    app_link: "https://dreamvault.life",
    github_link: "https://github.com/areaves1207/dream-vault",
    image: dreamvault_img,
  },
  {
    id: 3,
    title: "LotManager360",
    description:
      "A simple car lot management system that manages inventory, tracks sales, saves customer information, monitors finances, schedules services, and creates printable forms. The frontend is built with React, TypeScript, and Tailwind CSS and is hosted on Cloudflare. The backend runs on Node.js with Express, hosted on Railway. The database is PostgreSQL on Supabase.",
    image: lot_manager_img,
    app_link: "https://lotmanager360.com"
  },
  {
    id: 4,
    title: "Learn NATO",
    description:
      "A static site built with just JS, HTML, and CSS to help people memorize the NATO phonetic alphabet. It features a learning section, flashcards, blitz, and a quiz.",
    image: learnnato_img,
    app_link: "https://learnnato.com",
  },
  {
    id: 5,
    title: "Portfolio",
    description: "Hey, that's this site! Built on Vue.",
    image: headshot,
    github_link: "https://github.com/areaves1207/personal-portfolio",
  },
]

function prev() {
  slideDir.value = 'slide-right'
  current.value = (current.value - 1 + projects.length) % projects.length
}

function next() {
  slideDir.value = 'slide-left'
  current.value = (current.value + 1) % projects.length
}

function goTo(i) {
  slideDir.value = i > current.value ? 'slide-left' : 'slide-right'
  current.value = i
}

function onKey(e) {
  if (e.key === 'ArrowLeft')  prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(()   => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.wrapper {
  width: 100%;
  padding: 0;
  margin: 0;
}

.title {
  text-align: center;
  font-size: 6em;
  padding-top: 4%;
  margin-bottom: 4%;
}

/* ── Carousel shell ─────────────────────────────── */
.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 0 4vw;
}

.carousel-box {
  flex: 1;
  max-width: 80%;
  background: rgba(200, 205, 228, 0.10);
  border: 1px solid rgba(200, 205, 228, 0.20);
  border-radius: 22px;
  padding: 52px 60px;
  min-height: 500px;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  height: 70vh;
}

/* Transition wrapper + card must fill the full box width */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active,
.carousel-box > * {
  width: 100%;
}

/* ── Arrow buttons ──────────────────────────────── */
.nav-btn {
  background: #ff0f80;
  border: none;
  color: white;
  font-size: 1.6rem;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover {
  transition: background 0.35s ease;
  background: #ff0062;
}

/* ── Dot indicators ─────────────────────────────── */
.dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
  padding-bottom: 60px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(200, 205, 228, 0.3);
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

.dot.active {
  background: #ff0f80;
  transform: scale(1.35);
}

/* ── Slide transitions ──────────────────────────── */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.slide-left-enter-from  { opacity: 0; transform: translateX(50px);  }
.slide-left-leave-to    { opacity: 0; transform: translateX(-50px); }

.slide-right-enter-from { opacity: 0; transform: translateX(-50px); }
.slide-right-leave-to   { opacity: 0; transform: translateX(50px);  }

/* ── Mobile ─────────────────────────────────────── */
@media (max-width: 600px) {
  .carousel-container {
    gap: 10px;
    padding: 0 12px;
  }

  .carousel-box {
    padding: 28px 16px;
    min-height: unset;
    border-radius: 14px;
  }

  .nav-btn {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
}
</style>
