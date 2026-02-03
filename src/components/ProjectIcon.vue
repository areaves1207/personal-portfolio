<template>
  <div class="project-card" :class="{ reverse }">
    <div class="info-section">
      <div class="text">
        <h1>{{ title }}</h1>
        <h4>{{ description }}</h4>
      </div>
      <div class="links">
        <a v-if="app_link"  class="button_link" :href="app_link" target="_blank" >LIVE APP</a>
        <a v-if="github_link"  class="button_link" :href="github_link" target="_blank">LEARN MORE</a>
      </div>
    </div>

    

    <a :href="app_link" target="_blank" class="image">
      <img :src="img_location" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    img_location: String,
    app_link: String,
    github_link: String,
    reverse: Boolean,
  },
}
</script>

<style scoped>
.project-card {
  display: flex;
  /* SIZE CONTROL (child’s job) */
  /* width: 10%; */

  align-items: flex-start;
}

.project-card.reverse {
  flex-direction: row-reverse;
  img{
    border-left-width: 0;
    border-right-width: 160px;
  }
  .info-section{
    left: -100px;
  }
}

.info-section{
  position: relative;
  z-index: 1000;
  left: 100px;
  /* align-self: center; */
}

.text {
  color: white;
  padding-top: 50px;
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

.links{
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.button_link {
  position: relative;
  display: inline-flex;
  align-items: start;
  justify-content: space-between;

  background: linear-gradient(135deg, #ff0f80, #ff6aa2);
  color: white;

  padding: 14px 10px;
  border-radius: 12px;
  width: fit-content;

  font-size: 1.2em;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-decoration: none;

  box-shadow: 0 10px 30px rgba(255, 15, 128, 0.35);
  transition: all 0.35s ease;
}

.button_link:hover {
  transform: translateY(-6px);
  box-shadow: 0 0px 45px rgba(255, 15, 128, 0.55);
  background-position: right center;
}

img {
  max-width: 40vw;
  height: auto;
  border: 80px solid rgb(50, 22, 187);
  border-right-width: 0;
  border-left-width: 160px;

  transition: 
    transform 0.35s ease,
    border-width 0.35s ease;
}

.image :hover{
  transform: scale(0.90);
  border-width: 60px;
  border-right-width: 0;
  border-left-width: 120px;
}


</style>
