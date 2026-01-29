<template>
  <div class="project-card">
    <div class="text">
        <h1>{{ title }}</h1>
        <h4>{{ title }}</h4>
    </div>

    <img :src="img_location"/>
  </div>
</template>



<script>
export default {
  props: {
    title: String,
    description: String,
    img_location: String,
  }
}
</script>



<style scoped>
    .project-card {
        display: flex;
        flex-direction: row;
        align-items: end;

        gap: 25px;
        margin: 0 5% 10% 5%;
    }

    .project-card.right {
        flex-direction: row-reverse;
        justify-content: start;
    }

    .project-card.left {
        justify-content: end;
    }

  .text{
    text-align: left;
    align-self: flex-start;
  }

  img{
    width: 40vw;
    height: auto;
    object-fit: contain;
  }
</style>