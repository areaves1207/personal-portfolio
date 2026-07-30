<template>
  <div class="wrapper">
    <div class="section-header">
      <span class="label">Projects</span>
      <div class="accent-line"></div>
    </div>

    <div class="project-list">
      <Project
        v-for="(project, i) in projects"
        :key="project.id"
        :index="i"
        :title="project.title"
        :tagline="project.tagline"
        :description="project.description"
        :tech="project.tech"
        :img_location="project.image"
        :app_link="project.app_link"
        :github_link="project.github_link"
      />
    </div>
  </div>
</template>

<script setup>
import Project from "./ProjectIcon.vue"
import pbn_img from "../assets/images/pbn-pfp.jpg"
import dreamvault_img from "../assets/images/dreamvault-pfp.jpg"
import lot_manager_img from "../assets/images/lotmanager_pfp.png"
import learnnato_img from "../assets/images/learnnato-pfp.png"
import cardtrackr_img from "../assets/images/card-trackr.png"

const projects = [
  {
    id: 1,
    title: "Paint By Numbers Generator",
    tagline: "ML image processing pipeline",
    description:
      "Converts any photo into a paint-by-numbers template in seconds. Built a custom ML pipeline from scratch — Canny edge detector, K-Means clustering, and palette generator.",
    tech: ["React", "Python", "Machine Learning", "Vercel"],
    app_link: "https://pbn-gen.vercel.app",
    github_link: "https://github.com/areaves1207/paintbynumbersgenerator",
    image: pbn_img,
  },
  {
    id: 2,
    title: "LotManager360",
    tagline: "Full-stack business management platform",
    description:
      "End-to-end car dealership management: inventory, sales pipeline, customer records, service scheduling, and printable forms — deployed for real users.",
    tech: ["React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "Supabase"],
    app_link: "https://lotmanager360.com",
    image: lot_manager_img,
  },
  {
    id: 3,
    title: "Dreamvault",
    tagline: "Encrypted personal journaling on AWS",
    description:
      "Full-stack dream journal with end-to-end encryption, custom JWT auth (httponly cookie), and a complete AWS infrastructure stack.",
    tech: ["React", "Node.js", "AWS", "MySQL"],
    app_link: "https://dreamvault.life",
    github_link: "https://github.com/areaves1207/dream-vault",
    image: dreamvault_img,
  },
  {
    id: 4,
    title: "Learn NATO",
    tagline: "Interactive phonetic alphabet trainer",
    description:
      "Helps people memorize the NATO phonetic alphabet through spaced repetition — learning section, flashcards, blitz mode, and a timed quiz.",
    tech: ["JavaScript", "HTML", "CSS"],
    app_link: "https://learnnato.com",
    image: learnnato_img,
  },
  {
    id: 5,
    title: "Card Trackr",
    tagline: "Real-time computer vision system (WIP)",
    description:
      "Detects and catalogs trading cards from a live camera feed using a computer vision pipeline. Currently in active development.",
    tech: ["Computer Vision", "Full Stack"],
    image: cardtrackr_img,
  },
]
</script>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 5vw 120px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 72px;
}

.label {
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
  white-space: nowrap;
}

.accent-line {
  flex: 1;
  height: 1px;
  background: rgba(200, 205, 228, 0.2);
}

.project-list {
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .wrapper {
    padding: 60px 20px 80px;
  }

  .section-header {
    margin-bottom: 48px;
  }

  .label {
    font-size: 1.8rem;
  }
}
</style>
