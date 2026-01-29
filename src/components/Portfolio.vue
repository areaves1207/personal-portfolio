<template>
    <div class="wrapper">
        <h1>Portfolio</h1>
        <h4>
            I’m a software engineer with a recent focus in full-stack development using JavaScript and React, with a focus on building reliable, maintainable web applications. I take a continuous-learning approach to my work, regularly refining how I design systems and write code as tools and best practices evolve with each new project I work on. What draws me to web development is the combination of problem-solving, technical depth, and creative expression. Outside of development, I enjoy reading, staying active, and traveling.
        </h4>

        <div class="projects">
            <Project 
            v-for="(project, index) in projects"
                :key="project.id"
                :title="project.title" 
                :img_location="pbn_img"
                :class="index % 2 === 0 ? 'left' : 'right'"
            />
        </div>
    </div>
</template>


<script setup>
import Project from "./ProjectIcon.vue"
import pbn_img from "../assets/images/pbn-pfp.jpg"

const projects = [
  { id: 1, title: "Paint By Numbers Generator", image: pbn_img },
  { id: 2, title: "Project Two", image: pbn_img },
  { id: 3, title: "Project Three", image: pbn_img },
  { id: 4, title: "Project Four", image: pbn_img }
]
</script>


<style scoped>
  .wrapper{
    width: 100%; 
    height: 100vh;
    margin: auto;
    text-align: center;

    align-items: center;
    justify-content: center;

    margin: 0;
    padding: 0;
  }

  h1{

  }

  .projects{
    margin: 0; 
    padding: 0;
  }
</style>