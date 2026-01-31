<template>
  <div class="wrapper">
    <div class="topper">
      <h1>Portfolio</h1>
      <h4>
        I’m a software engineer with a recent focus in full-stack development using JavaScript and React...
      </h4>
    </div>

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
  { id: 2, title: "Project Two", description: "Description",  image: pbn_img },
  { id: 3, title: "Project Three", description: "Description", image: pbn_img },
  { id: 4, title: "Project Four", description: "Description", image: pbn_img },
]
</script>

<style scoped>
.wrapper {
  width: 100%;
  margin: 0;
  padding: 0;
}

.topper {
  margin: 0 5vw 8vh 5vw;
  text-align: center;
}

.topper h1{
  font-size: 8em;
}

.topper h4{
  font-size: 2em;
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
