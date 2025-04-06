<template>
  <div class="middle">
    <Map />
    <Line />
  </div>
</template>

<script setup lang="ts">
import Map from "./map/index.vue";
import Line from "./line/index.vue";
// 请注意map和line是关键字，弄了半天都不知道为什么没显示，改用首字母大写就好了
</script>

<style scoped lang="scss">
.middle {
  flex: 3;
  display: flex;
  flex-direction: column;
}
</style>