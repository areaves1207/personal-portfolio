<template>
  <header class="site-header">
    <nav class="nav-buttons">
      <button @click="$emit('scroll-to', 'intro')">Intro</button>
      <button @click="$emit('scroll-to', 'about')">About</button>
      <button @click="$emit('scroll-to', 'portfolio')">Portfolio</button>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(11, 11, 15, 0.95);
  display: flex;
  justify-content: end;
  padding: 1rem 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.nav-buttons {
  display: flex;
  gap: 1rem;
}

.nav-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background:none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.nav-buttons button:hover {
  color: rgb(255, 57, 57);
  transition: color 0.2s ease-in-out; 
}
</style>
