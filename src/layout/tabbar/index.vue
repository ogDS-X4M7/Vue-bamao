<template>
  <div class="tabbarbox">
    <div class="tabbar_left">
      <Breadcrumb />
    </div>
    <div class="tabber_right">
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "./breadcrumb/index.vue";
import Setting from "./setting/index.vue";
</script>

<style scoped lang="scss">
.tabbarbox {
  display: flex;
  height: 100%;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  .tabbar_left {
    display: flex;
  }
  .tabbar_right {
    display: flex;
  }
}
</style>