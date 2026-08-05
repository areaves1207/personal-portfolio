<template>
  <div class="wrapper">
    <div class="section-heading">
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
        :featured="project.featured"
        :offline="project.offline"
      />
    </div>

    <p class="other-projects">
      Also built:
      <a href="https://learnnato.com" target="_blank">Learn NATO</a>,
      a NATO phonetic alphabet trainer.
    </p>
  </div>
</template>

<script setup>
import Project from "./ProjectIcon.vue"
import pbn_img from "../assets/images/pbn-pfp.jpg"
import dreamvault_img from "../assets/images/dreamvault-pfp.jpg"
import lot_manager_img from "../assets/images/lotmanager_pfp.png"
import cardtrackr_img from "../assets/images/card-trackr.png"

const projects = [
    {
    id: 1,
    title: "LotManager360",
    featured: true,
    tagline: "Full-stack business management platform, saving thousands of dollars and hours yearly",
    description:
      "In my free time at the car dealership, I have been developing a new system for them to manage everything in one platform. I am currently working on migrating data from the 2007 legacy software to my own system. This will save the company thousands of hours and dollars a year compared to other DMS platforms and the problems of the legacy system.",
    app_link: "https://lotmanager360.com",
    image: lot_manager_img,
    tech: [],
  },
  {
    id: 2,
    title: "Paint By Numbers Generator",
    tagline: "AI / ML image processing pipeline",
    description:
      "Written entirely from scratch, I created a paint by numbers generator to print onto canvases to paint anything I wanted. You can upload any photos and select the number of colors to generate a canvas. It includes my own Canny edge detector, K-Means clustering algorithm, and palette generator.",
    app_link: "https://pbn-gen.vercel.app",
    github_link: "https://github.com/areaves1207/paintbynumbersgenerator",
    image: pbn_img,
    tech: [],
  },
  {
    id: 3,
    title: "Dreamvault",
    offline: true,
    tagline: "Encrypted dream journaling on AWS",
    description:
      "Full-stack dream journal with end-to-end encryption, custom JWT auth (httponly cookie), and a complete AWS infrastructure stack.",
    github_link: "https://github.com/areaves1207/dream-vault",
    image: dreamvault_img,
    tech: [],
  },
  // {
  //   id: 5,
  //   title: "Card Trackr",
  //   tagline: "Real-time computer vision system (WIP)",
  //   description:
  //     "Detects and catalogs trading cards from a live camera feed using a computer vision pipeline. Currently in active development.",
  //   image: cardtrackr_img,
  // },
]
</script>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-section) 5vw var(--space-section);
}

.project-list {
  display: flex;
  flex-direction: column;
}

.other-projects {
  margin-top: var(--space-6);
  font-size: 0.9rem;
  color: rgba(235, 235, 235, 0.55);
}

.other-projects a {
  color: var(--color-accent-secondary);
  text-decoration: none;
}

.other-projects a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .wrapper {
    padding: var(--space-section-mobile) 20px var(--space-section-mobile);
  }
}
</style>
