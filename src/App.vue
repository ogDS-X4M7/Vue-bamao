<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit } from "@element-plus/icons-vue";
</script>

<style scpoed lang="scss">
.box h2 {
  width: 100px;
  height: 100px;
  background-color: #f1f1f1;
  // color: $base-color;
  // 这里尝试使用sass全局变量，可行，常识：sass用的是$,less用的是@
}
</style>
