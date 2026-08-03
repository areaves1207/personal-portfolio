<template>
  <div class="project-card" :class="{ reverse: index % 2 !== 0 }">

    <a
      class="image-wrap"
      :href="app_link || github_link"
      :target="app_link || github_link ? '_blank' : undefined"
      :tabindex="app_link || github_link ? 0 : -1"
    >
      <img :src="img_location" :alt="title" />
    </a>

    <div class="info">
      <h2>{{ title }}</h2>
      <p class="tagline">{{ tagline }}</p>
      <p class="description">{{ description }}</p>

      <div class="tech-pills">
        <span v-for="t in tech" :key="t" class="pill">{{ t }}</span>
      </div>

      <div class="links">
        <a v-if="app_link"    :href="app_link"    target="_blank" class="link">Live App</a>
        <a v-if="github_link" :href="github_link" target="_blank" class="link">GitHub</a>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    index:       Number,
    title:       String,
    tagline:     String,
    description: String,
    tech:        Array,
    img_location: String,
    app_link:    String,
    github_link: String,
  },
}
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 60px;
  padding: 64px 0;
  border-bottom: 1px solid rgba(200, 205, 228, 0.12);
}

.project-card.reverse {
  flex-direction: row-reverse;
}

/* ── Image ────────────────────────────────────── */
.image-wrap {
  flex: 0 0 48%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(200, 205, 228, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-wrap:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
}

img {
  width: 100%;
  height: auto;
  max-height: calc((100vh - var(--header-height)) * 0.8);
  display: block;
  object-fit: contain;
  border: 1px solid white;
}

/* ── Info ─────────────────────────────────────── */
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.index {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: rgba(200, 205, 228, 0.35);
  text-transform: uppercase;
}

h2 {
  font-size: 1.9rem;
  font-weight: 700;
  color: white;
  line-height: 1.2;
  margin: 0;
}

.tagline {
  font-size: 0.88rem;
  color: #8f94fb;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.02em;
}

.description {
  font-size: 0.95rem;
  line-height: 1.75;
  color: rgba(235, 235, 235, 0.72);
  margin: 4px 0 0;
}

/* ── Tech pills ───────────────────────────────── */
.tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.pill {
  background: rgba(143, 148, 251, 0.1);
  color: #8f94fb;
  border: 1px solid rgba(143, 148, 251, 0.28);
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 0.76rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}

/* ── Links ────────────────────────────────────── */
.links {
  display: flex;
  gap: 24px;
  margin-top: 8px;
}

.link {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  min-width: 80px;
  padding: 6px 12px;
  background: transparent;
  color: white;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.25s ease;
}

.link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4px;
  z-index: -1;
  background: var(--button-color);
  transition: height 0.25s ease;
}

.link:hover {
  color: #fff;
}

.link:hover::after {
  height: 100%;
}

/* ── Mobile ───────────────────────────────────── */
@media (max-width: 768px) {
  .project-card,
  .project-card.reverse {
    flex-direction: column;
    gap: 28px;
    padding: 48px 0;
  }

  .image-wrap {
    flex: none;
    width: 100%;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>
