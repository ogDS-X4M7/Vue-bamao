<template>
  <div>
    <!-- <svg :style="{ width: w, height: h }"> -->
    <!-- 经过上面的测试，下面的写法的确是width: width, height: height的简写 -->
    <svg :style="{ width, height }">
      <use :href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
defineProps({
  // 自带的默认头
  prefix: {
    type: String,
    default: "#icon-",
  },
  //   接收名字使用不同svg
  name: String,
  //   接收颜色
  color: {
    type: String,
    default: "",
  },
  //   接收宽度
  width: {
    type: String,
    default: "16px",
  },
  height: {
    type: String,
    default: "16px",
  },
});
</script>

<style scoped>
</style>