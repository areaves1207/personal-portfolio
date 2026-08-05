<template>
  <div class="wrapper">
    <div class="section-heading">
      <span class="label">Experience</span>
      <div class="accent-line"></div>
    </div>

    <div class="entries">
      <!-- Flagship entry: self-directed, ongoing, real business impact -->
      <div class="entry entry--featured">
        <span class="badge badge--ongoing">Ongoing</span>
        <h3>Founder &amp; Full-Stack Engineer &mdash; LotManager360</h3>
        <p class="dates">Independent project &middot; in progress</p>
        <p class="context">
          Built independently, outside of my day-to-day role at a family-owned car dealership,
          to replace the dealership's 2007-era legacy DMS with a modern, full-stack platform.
        </p>
        <ul class="bullets">
          <li>Designed and built a full-stack business management platform from the ground up, now ~90% through migrating all operational data off the legacy system.</li>
          <li>Owns the entire stack &mdash; architecture, data migration, and ongoing feature development &mdash; with no team, on a live production system.</li>
          <li>Projected to save the dealership thousands of dollars and hours per year versus commercial DMS alternatives.</li>
        </ul>
      </div>

      <!-- Secondary entry: gated until real employer/role/dates/bullets are supplied.
           Never render fabricated placeholder content. -->
      <div v-if="showInternship" class="entry entry--secondary">
        <h3>{{ internship.role }} &mdash; {{ internship.org }}</h3>
        <p class="dates">{{ internship.dates }}</p>
        <ul class="bullets">
          <li v-for="bullet in internship.bullets" :key="bullet">{{ bullet }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// Set showInternship to true and fill these in once real details are available.
const showInternship = false
const internship = {
  role: "",
  org: "",
  dates: "",
  bullets: [],
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-section) 5vw 0;
}

.entries {
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
}

.entry--featured {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(var(--color-accent-secondary-rgb), 0.25);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-glow-accent);
}

.entry--featured h3 {
  margin-top: var(--space-3);
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.entry--secondary {
  padding: 0 var(--space-2);
}

.entry--secondary h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(235, 235, 235, 0.85);
}

.dates {
  margin-top: var(--space-1);
  font-size: 0.85rem;
  color: rgba(235, 235, 235, 0.5);
}

.context {
  margin-top: var(--space-4);
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(235, 235, 235, 0.72);
}

.bullets {
  margin-top: var(--space-4);
  padding-left: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.bullets li {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(235, 235, 235, 0.72);
}

@media (max-width: 768px) {
  .wrapper {
    padding: var(--space-section-mobile) 20px 0;
  }

  .entry--featured {
    padding: var(--space-6);
  }
}
</style>
