<template>
  <div class="wrapper">
    <div class="section-heading">
      <span class="label">Skills</span>
      <div class="accent-line"></div>
    </div>

    <div class="groups">
      <div v-for="group in skillGroups" :key="group.name" class="group">
        <span class="group-label">{{ group.name }}</span>
        <div class="skill-row">
          <div v-for="item in group.items" :key="item.name" class="skill-item">
            <img :src="item.logo" :alt="item.name" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import cpp from "../assets/logos/cpp.png"
import csharp from "../assets/logos/cs.png"
import css from "../assets/logos/css.png"
import docker from "../assets/logos/docker.png"
import git from "../assets/logos/git.png"
import github from "../assets/logos/github.png"
import html from "../assets/logos/html.png"
import java from "../assets/logos/java.png"
import javascript from "../assets/logos/javascript.png"
import kotlin from "../assets/logos/kotlin.png"
import python from "../assets/logos/python.png"
import react from "../assets/logos/react.png"
import sql from "../assets/logos/sql.png"
import typescript from "../assets/logos/typescript.png"

const skillGroups = [
  {
    name: "Languages",
    items: [
      { name: "Python", logo: python },
      { name: "Java", logo: java },
      { name: "JavaScript", logo: javascript },
      { name: "TypeScript", logo: typescript },
      { name: "C++", logo: cpp },
      { name: "C#", logo: csharp },
      { name: "Kotlin", logo: kotlin },
      { name: "SQL", logo: sql },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React", logo: react },
      { name: "HTML", logo: html },
      { name: "CSS", logo: css },
    ],
  },
  {
    name: "Tools & Platforms",
    items: [
      { name: "Git", logo: git },
      { name: "GitHub", logo: github },
      { name: "Docker", logo: docker },
    ],
  },
]
</script>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-section) 5vw 0;
}

.groups {
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
}

.group-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(235, 235, 235, 0.5);
  margin-bottom: var(--space-4);
}

.skill-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.skill-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(200, 205, 228, 0.14);
  border-radius: var(--radius-pill);
  color: rgb(227, 227, 227);
  font-size: 0.9rem;
  font-weight: 500;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.skill-item:hover {
  border-color: rgba(var(--color-accent-secondary-rgb), 0.4);
  background: rgba(255, 255, 255, 0.05);
}

.skill-item img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .wrapper {
    padding: var(--space-section-mobile) 20px 0;
  }

  .groups {
    gap: var(--space-6);
  }
}
</style>
