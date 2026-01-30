<template>
  <div class="project-card">
    <div class="text">
        <h1>{{ title }}</h1>
        <h4>{{ description }}</h4>
    </div>

    <div class="links">
      <a>LIVE APP</a>
      <a>LEARN MORE</a>
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
        padding-right: 0%;
        img{
          border-width: 60px 120px 60px 0;
        }
        .text{
          left: -80px;
        }
    }

    .project-card.left {
        justify-content: end;
        padding-left: 0%;
        img{
          border-width: 60px 0 60px 120px;
        }
        .text{
          right: -80px;
        }
    }

    .text{
      position: relative;
      text-align: left;
      align-self: flex-start;
      color: white;
      padding-top: 60px;
      line-height: 1.2;
    }

    h1{
      font-size: 2.5vw;
      font-weight: bold;
      margin-bottom: 3vh;
    }
    h4{
      font-size: 1.5vw;
    }

    img{
      width: 60vw;
      height: auto;
      /* object-fit: contain; */

      border-color: rgb(50,22,187);
      border-style: solid;
    }

</style>