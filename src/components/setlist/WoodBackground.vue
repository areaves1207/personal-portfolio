<template>
  <!-- One continuous wood surface pinned behind every screen (never tiles). -->
  <div class="wood" aria-hidden="true"></div>
</template>

<style scoped>
.wood {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: #2a160c url('../../assets/setlist/wood.jpg') center / cover no-repeat;
}
</style>
