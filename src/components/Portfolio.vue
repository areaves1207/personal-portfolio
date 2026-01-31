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
      "Full stack web application built with React and Python...",
    image: pbn_img,
  },
  { id: 2, title: "Project Two", description: "Description", image: pbn_img },
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

/* STACK + SPACING (parent’s job) */
.projects {
  display: flex;
  flex-direction: column;
  gap: 15vh;
}

.project-row {
  width: 100%;
  display: flex;
}

.project-row.left {
  justify-content: flex-start;
  
}

.project-row.right {
  justify-content: flex-end; 
}

.project-row.reverse{
  flex-direction: row-reverse;
}
</style>
