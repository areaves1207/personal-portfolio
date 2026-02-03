<template>
 <div class="wrapper">
      <h1>About</h1>
      <div class="info">
        <h4 class="bio">
            I’m a software engineer with a recent focus in full-stack development using JavaScript and React, and a focus on building reliable, maintainable software. I love to learn continuously and am regularly refining how I design systems and write code with best practices in mind, evolving with each new project I work on. What draws me to software engineering is the combination of problem-solving, technical depth, and creative expression. I just think it's so fun and rewarding to do. Outside of development, I enjoy reading, staying active, and traveling.
        </h4>
        <div class="tech-grid">
            <div
            v-for="tech in techs"
            :key="tech.name"
            class="tech-card"
            >
            <img :src="tech.icon" :alt="tech.name" />
            <span>{{ tech.name }}</span>
            </div>
        </div>
      </div>
    </div>
</template>


<script setup>
import cpp from '@/assets/logos/cpp.png'
import cs from '@/assets/logos/cs.png'
import css from '@/assets/logos/css.png'
import docker from '@/assets/logos/docker.png'
import git from '@/assets/logos/git.png'
import github from '@/assets/logos/github.png'
import html from '@/assets/logos/html.png'
import java from '@/assets/logos/java.png'
import javascript from '@/assets/logos/javascript.png'
import kotlin from '@/assets/logos/kotlin.png'
import python from '@/assets/logos/python.png'
import react from '@/assets/logos/react.png'
import sql from '@/assets/logos/sql.png'
import typescript from '@/assets/logos/typescript.png'

const techs = [
  { name: 'C++', icon: cpp },
  { name: 'C#', icon: cs },
  { name: 'CSS', icon: css },
  { name: 'Docker', icon: docker },
  { name: 'Git', icon: git },
  { name: 'GitHub', icon: github },
  { name: 'HTML', icon: html },
  { name: 'Java', icon: java },
  { name: 'JavaScript', icon: javascript },
  { name: 'Kotlin', icon: kotlin },
  { name: 'Python', icon: python },
  { name: 'React', icon: react },
  { name: 'SQL', icon: sql },
  { name: 'TypeScript', icon: typescript }
]
</script>


<style scoped>
.wrapper {
    text-align: center;
}

.bio{
    text-align: left;
}

.info{
    display: flex;
    flex-direction: row;
}

img{
    width: 200px;
    max-width: 30vw;
    height: auto;
}
</style>
