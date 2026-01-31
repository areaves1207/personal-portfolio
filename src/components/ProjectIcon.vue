<template>
  <div class="project-card" :class="{ reverse }">
    <div class="text">
      <h1>{{ title }}</h1>
      <h4>{{ description }}</h4>
    </div>

    <div class="links">
      <a>LIVE APP</a>
      <a>LEARN MORE</a>
    </div>

    <img :src="img_location" />
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    img_location: String,
    reverse: Boolean,
  },
}
</script>

<style scoped>
.project-card {
  display: flex;
  gap: 10px;

  /* SIZE CONTROL (child’s job) */
  max-width: clamp(320px, 40vw, 800px);
  width: 100%;

  align-items: flex-end;
}

.project-card.reverse {
  flex-direction: row-reverse;
}

.text {
  position: relative;
  color: white;
  padding-top: 60px;
  line-height: 1.2;
}

h1 {
  font-size: 2.5vw;
  font-weight: bold;
  margin-bottom: 3vh;
}

h4 {
  font-size: 1.5vw;
}

img {
  width: 100%;
  height: auto;
  border: 4px solid rgb(50, 22, 187);
}
</style>
