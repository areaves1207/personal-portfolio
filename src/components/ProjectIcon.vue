<template>
  <div class="project-card">

    <div class="info-section">
      <div class="text">
        <h1>{{ title }}</h1>
        <h4>{{ description }}</h4>
      </div>
      <div class="links">
        <a v-if="app_link"    class="button_link" :href="app_link"    target="_blank">LIVE APP</a>
        <a v-if="github_link" class="button_link" :href="github_link" target="_blank">GITHUB REPO</a>
      </div>
    </div>

    <a :href="app_link || github_link" target="_blank" class="image">
      <img :src="img_location" />
    </a>

  </div>
</template>

<script>
export default {
  props: {
    title:        String,
    description:  String,
    img_location: String,
    app_link:     String,
    github_link:  String,
  },
}
</script>

<style scoped>
/* ── Card ──────────────────────────────────────── */
.project-card {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 48px;
}

/* ── Left: text + buttons ───────────────────────── */
.info-section {
  flex: 0 0 38%;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.text {
  color: white;
  line-height: 1.3;
}

h1 {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 2vh;
}

h4 {
  font-size: 0.95rem;
  line-height: 1.6;
}

.links {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.button_link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--button-color);
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  width: fit-content;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: background 0.25s ease;
}

.button_link:hover {
  background: var(--button-color-accent);
}

/* ── Right: image ───────────────────────────────── */
.image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
}

img {
  max-width: 100%;
  max-height: 56vh; /* 80% of the 70vh carousel box */
  width: auto;
  height: auto;
  display: block;
  border: 14px solid rgb(50, 22, 187);
  border-left: 80px solid rgb(50, 22, 187);
  border-radius: 4px;
  transition: transform 0.35s ease;
}

.image:hover img {
  transform: scale(0.85);
}

/* ── Mobile ─────────────────────────────────────── */
@media (max-width: 600px) {
  .project-card {
    flex-direction: column;
    gap: 24px;
  }

  .info-section {
    flex: none;
    width: 100%;
    text-align: center;
    align-items: center;
  }

  .image {
    width: 100%;
  }

  img {
    max-height: none;
    border-width: 8px;
  }
}
</style>
