<template>
  <div class="bottom">
    <left />
    <middle />
    <right />
  </div>
</template>

<script setup lang="ts">
import left from "./left/index.vue";
import middle from "./middle/index.vue";
import right from "./right/index.vue";
</script>

<style scoped lang="scss">
.bottom {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 1040px;
  padding: 20px 30px;
  margin-top: -40px;
  //   background-color: skyblue;
}
</style>