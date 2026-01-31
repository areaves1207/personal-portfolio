<template>
  <div class="project-card" :class="{ reverse }">
    <div class="text">
      <h1>{{ title }}</h1>
      <h4>{{ description }}</h4>
      <div class="links">
        <a>LIVE APP</a>
        <a>LEARN MORE</a>
      </div>
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
  /* width: 10%; */

  align-items: flex-start;
}

.project-card.reverse {
  flex-direction: row-reverse;
}

.text {
  position: relative;
  color: rgb(153, 75, 75);
  padding-top: 0px;
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
  max-width: 40vw;
  height: auto;
  border: 4px solid rgb(50, 22, 187);
}
</style>
