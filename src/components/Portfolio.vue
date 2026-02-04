<template>
  <div class="wrapper">
    <div class="title">Portfolio</div>

    <div class="projects">
      <div
        class="project-row"
        v-for="(project, index) in projects"
        :key="project.id"
        :class="index % 2 === 0 ? 'right' : 'left'"
      >
      <Project
        :title="project.title"
        :description="project.description"
        :img_location="project.image"
        :app_link="project.app_link"
        :github_link="project.github_link"
        :reverse="index % 2 === 1"
      />

      </div>
    </div>
  </div>
</template>

<script setup>
import Project from "./ProjectIcon.vue"
import pbn_img from "../assets/images/pbn-pfp.jpg"
import dreamvault_img from "../assets/images/dreamvault-pfp.jpg"
import lot_manager_img from "../assets/images/lotmanager_pfp.jpg"
import headshot from "../assets/images/headshot_blank.png"

const projects = [
  {
    id: 1,
    title: "Paint By Numbers Generator",
    description:
      "Full stack web application build with React and Python. The frontend is hosted on Render and the backend is hosted on Vercel. It has my own implemented Canny edge detector, K-Means Clustering algorithm, and palette generator.",
    app_link:"https://pbn-gen.vercel.app",   
    github_link:"https://github.com/areaves1207/paintbynumbersgenerator",
    image: pbn_img,
  },

  { id: 2, title: "Dreamvault", 
    description: "A full stack dream tracking web app hosted on AWS with Route 53, Cloudfront, S3, Elastic Beanstalk, and RDS using MySQL. It uses React/Node JS and features my own implemented JWT generation, stored as a httponly cookie. All dream data is encrypted.",  
    app_link:"https://dreamvault.life",   
    github_link:"https://github.com/areaves1207/dream-vault",
    image: dreamvault_img,
  },

  { id: 3, title: "LotManager", 
  description: "Currently an unpublished WIP. A modular, backend-first car lot management system built on .NET 10 through a stable API. It will feature inventory tracking, financing workflows, reporting, and document generation while remaining UI-agnostic so it can support desktop, web, or mobile clients. My art skills need some brushing up, though", 
  image: lot_manager_img },

  { id: 4, title: "Portfolio", 
  description: "Hey, that's this site! Built on Vue", 
  image: headshot,
  github_link:"https://github.com/areaves1207/personal-portfolio"
  },
]
</script>

<style scoped>
.wrapper {
  width: 100%;
  margin: 0;
  padding: 0;
}
.title{
  text-align: center;
  font-size: 6em;
  padding-top: 4%;
  margin-bottom: 7%;
}

.topper {
  margin: 0 5vw 8vh 5vw;
  text-align: center;
}

.topper h1{
  font-size: 6em;
}

.topper h4{
  font-size: 1em;
  margin-left: 10%;
  margin-right: 10%;
}

/* STACK + SPACING (parent’s job) */
.projects {
  display: flex;
  flex-direction: column;
  gap: 15vh;
  margin-left: 10vw;
  margin-right: 10vw;
}

.project-row {
  width: 100%;
  display: flex;
}

.project-row.left {
  justify-content: flex-start;
  align-items: flex-end;
}

.project-row.right {
  justify-content: flex-end; 
  align-items: flex-end;
}

.project-row.reverse{
  flex-direction: row-reverse;
}
</style>
