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

        gap: 10px;
    }

    .project-card.right {
        flex-direction: row-reverse;
        justify-content: start;
        padding-right: 40%;
        img{
          border-width: 10vh 15vh 10vh 0;
        }
        .text{
          left: -5vw;
        }
    }

    .project-card.left {
        justify-content: end;
        padding-left: 40%;
        img{
          border-width: 10vh 0px 10vh 15vh;
        }
        .text{
          right: -5vw;
        }
    }

    .text{
      position: relative;
      text-align: left;
      align-self: flex-start;
      color: white;
      padding-top: 40px;
    }

    h1{
      font-size: 2.5vw;
      margin-bottom: 5vh;
    }
    h4{
      font-size: 1vw;
    }

    img{
      width: 40vw;
      height: auto;
      object-fit: contain;

      border-color: rgb(50,22,187);
      border-style: solid;
    }

</style>