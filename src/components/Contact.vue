<template>
  <section id="contact" class="contact">
    <h2>Contact</h2>

    <p class="contact-text">
      Want to get in touch? Email is the best way to reach me.
    </p>

    <a
      class="contact-button"
      href="mailto:areaves@mines.edu"
    >
      areaves@mines.edu
    </a>
  </section>
</template>

<script setup>
</script>

<style scoped>
.contact {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 80px 20px;
  text-align: center;
}

.contact h2 {
  font-size: 6em;
  font-weight: 700;
}

.contact-text {
  max-width: 500px;
  line-height: 1.6;
  opacity: 0.85;
}

.contact-button {
  display: inline-block;
  padding: 16px 32px;
  border-radius: 10px;
  background: linear-gradient(135deg, #4e54c8, #8f94fb);
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.contact-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 18px rgba(78, 84, 200, 0.45);
}
</style>
