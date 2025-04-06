<template>
  <div class="right">
    <Rank />
    <YearCompare />
    <Count />
  </div>
</template>

<script setup lang="ts">
import Rank from "./rank/index.vue";
import YearCompare from "./yearCompare/index.vue";
import Count from "./count/index.vue";
</script>

<style scoped lang="scss">
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  //   background-color: #000;
}
</style>