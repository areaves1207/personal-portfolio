<script setup>
import leftImg from '../../assets/bonus/bonus-left.webp'
import paperImg from '../../assets/bonus/bonus-paper.webp'
import rightImg from '../../assets/bonus/bonus-right.webp'
</script>

<template>
  <!-- Body of the bonus sheet, continuing below BonusTop: lined setlist sheet peeking out on the
       left, crumpled blue sheet in the middle (holds the slot), gray downloads sheet on the right.
       Column widths come from the 1403-wide header: 135 | 1175 | 93. -->
  <div class="bonus-sheet">
    <div class="col left" :style="{ backgroundImage: `url(${leftImg})` }"></div>
    <div class="col paper" :style="{ backgroundImage: `url(${paperImg})` }">
      <slot />
    </div>
    <div class="col right" :style="{ backgroundImage: `url(${rightImg})` }"></div>
  </div>
</template>

<style scoped>
.bonus-sheet {
  display: grid;
  grid-template-columns: 135fr 1175fr 93fr;
  flex: 1;
}

.col {
  background-size: 100% auto;
  background-repeat: repeat-y;
}

.paper {
  padding: 3cqw 0 calc(6cqw + 80px); /* clear the fixed control bar */
}
</style>
