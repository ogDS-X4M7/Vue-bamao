<template>
  <div class="container">
    <div class="screen" ref="screen">
      <top />
      <bottom />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
let screen = ref(); // 拿到实例对象做缩放样式操作
import top from "@/views/screen/components/top/index.vue";
import bottom from "@/views/screen/components/bottom/index.vue";

// 获取缩放比例方法
function getScale() {
  const ww = window.innerWidth / 1920;
  const hh = window.innerHeight / 1080;
  return ww < hh ? ww : hh;
}
// 挂载后就得做大小匹配缩放
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
});
// 监听视口变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
};
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url("./images/bg.png") no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    // background-color: skyblue;
    transform-origin: left top;
  }
}
</style>