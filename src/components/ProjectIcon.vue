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
}

.text {
  color: white;
  padding-top: 50px;
  line-height: 1.2;
  
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 3vh;
}

h4 {
  font-size: 1rem;
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

  font-size: 1.2rem;
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
  max-height: 60vh;
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

@media(max-width: 600px){
  .project-card{
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    left:0; right:0;
    position:static;
  }

  img{
    align-self: center;
    border: none;
    width: 100%;
    height: auto;
  }

  .button_link {
    position:static;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;

    padding: 14px 10px;
    margin: 0;
    border-radius: 12px;
    width: fit-content;
  }

  .info-section{
    text-align: center;
    position: static;
    align-items: center;
    justify-content: center;
    display: contents;
    flex-direction: column;
  }

  .text {
    order: 1; /* Title + Description */
  }

  .image {
    margin-top: 20px;
    order: 2; /* Image */
    width: 100%;
  }

  .image img{
        width: 100%;
    max-width: 100%;
    height: auto;

  }

  .links {
    order: 3; /* Buttons */
  }

  .project-card.reverse{
    flex-direction: column;
    img{
      border-left-width: 0;
      border-right-width: 0px;
    }
    .info-section{
      left: 0px;
    }
  }

}


</style>
