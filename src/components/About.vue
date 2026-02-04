<template>
  <div class="wrapper">
    <div class="title">About</div>

    <div class="info">

      <div class="personal">
        <img class="pfp" :src="pfp">
        <h4 class="bio">
          I’m a software engineer with a recent focus in full-stack development
          using JavaScript and React, and a focus on building reliable,
          maintainable software. I enjoy continuously refining how I design
          systems and write code, and I’m drawn to the mix of problem-solving,
          technical depth, and creative expression that software engineering
          offers.
        </h4>
      </div>

      <div class="tech-grid">
        <div
          v-for="tech in techs"
          :key="tech.name"
          class="tech-card"
        >
          <div class="tech-inner">
            <img :src="tech.icon" :alt="tech.name" />
            <span>{{ tech.name }}</span>
          </div>
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
import python from '@/assets/logos/python.png'
import react from '@/assets/logos/react.png'
import typescript from '@/assets/logos/typescript.png'
import pfp from '@/assets/images/default_pfp.png'


const techs = [
  { name: 'C++', icon: cpp }, 
  { name: 'C#', icon: cs },
  { name: 'CSS', icon: css },
  { name: 'HTML', icon: html },
  { name: 'Java', icon: java },
  { name: 'JavaScript', icon: javascript },
  { name: 'React', icon: react },
  { name: 'Python', icon: python },
  { name: 'Git', icon: git }, 
  { name: 'Docker', icon: docker }
]
</script>

<style scoped>
/* Page layout */
.wrapper {
  text-align: center;
}

.info {
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  padding: 0 10% 0 10%;
}

.title{
  padding-top: 4%;
  font-size: 6em;
}

.personal{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.bio {
  max-width: 500px;
  text-align: left;
  line-height: 1.6;
  align-self: center;
}

.pfp{
  max-width: 30%;
  height: auto;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  justify-content: center;
  align-items: center;
  gap: 12px 12px;
  --hex-offset: 50px;
  max-width: 100%;
  max-height: 70%;
  top: -50px;
}


.tech-card:nth-child(1)  { grid-column: 1; grid-row: 2; }
.tech-card:nth-child(2)  { grid-column: 1; grid-row: 3; }
.tech-card:nth-child(3)  { grid-column: 1; grid-row: 4; }

.tech-card:nth-child(4)  { grid-column: 2; grid-row: 1; transform: translateY(var(--hex-offset));}
.tech-card:nth-child(5)  { grid-column: 2; grid-row: 2; transform: translateY(var(--hex-offset));}
.tech-card:nth-child(6)  { grid-column: 2; grid-row: 3; transform: translateY(var(--hex-offset));}
.tech-card:nth-child(7)  { grid-column: 2; grid-row: 4; transform: translateY(var(--hex-offset));}

.tech-card:nth-child(8) { grid-column: 3; grid-row: 2; }
.tech-card:nth-child(9) { grid-column: 3; grid-row: 3; }
.tech-card:nth-child(10) { grid-column: 3; grid-row: 4; }


.tech-card {
  aspect-ratio: 1 / 1;
  clip-path: polygon(
    25% 0%,
    75% 0%,
    100% 50%,
    75% 100%,
    25% 100%,
    0% 50%
  );
  background: linear-gradient(
    135deg,
    #ff0080,
    #ff8c00,
    #40e0d0,
    #7b68ee
  );
  padding: 3px;
}

/* Inner */
.tech-inner {
  width: 100%;
  height: 100%;
  background: #0b0b0f;
  clip-path: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: white;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.tech-card:hover .tech-inner {
  transform: translateY(-4px);
  box-shadow: 0 0 24px rgba(255, 110, 196, 0.35);
}

.tech-inner img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.tech-inner span {
  font-size: 0.85rem;
  font-weight: 600;
}


@media (max-width: 600px) {
  .personal{
    width: 100%;
    text-align: center;
  }

  .bio{
    text-align: center;
  }
  
  .info{
    display: flex;
    gap: 0;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin:0; padding-left: 20px; padding-right: 20px;
    text-align: center;
    margin-bottom: 50px;
  }
}

</style>
