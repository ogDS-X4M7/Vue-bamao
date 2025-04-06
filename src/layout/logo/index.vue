<template>
  <div class="logo" v-if="setting.isShow">
    <img :src="setting.logo" alt="" />
    <div v-show="!isFold.fold" class="originp">{{ setting.title }}</div>
  </div>
</template>

<script setup lang="ts">
// 引入设置标题与logo配置文件
import setting from "@/setting";

// 引入折叠信号
import useLayoutStore from "@/store/modules/LayoutStore";
let isFold = useLayoutStore();
</script>

<style scoped lang="scss">
.logo {
  box-sizing: border-box;
  width: 100%;
  height: $base-menu-logo-height;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 20px;
  img {
    width: 40px;
    height: 40px;
  }
  .originp {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
    height: 26px;
    overflow: hidden;
  }
}
</style>