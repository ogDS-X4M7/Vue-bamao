<template>
  <div class="for404">
    <p>啊噢，您可能没有访问权限</p>
    <p>{{ time }}秒后自动为您跳转到首页</p>
    <span @click="routeto">点击前往首页</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
let $router = useRouter();
let time = ref(5);
let timer;
clearInterval(timer);
timer = setInterval(() => {
  if (time.value > 1) {
    time.value -= 1;
  } else {
    clearInterval(timer);
    $router.push("/");
  }
}, 1000);
const routeto = () => {
  clearInterval(timer);
  $router.push("/");
};
</script>

<style scoped lang="scss">
.for404 {
  width: 800px;
  height: 800px;
  // margin: 0 auto;
  margin-top: 100px;
  padding: 200px;
  background: url("@/assets/images/error_images/404.png") no-repeat;
  color: #279cf9;
  font: normal 700 30px/60px "Microsoft Yahei";
  text-align: right;
  span {
    padding-right: 60px;
  }
}
</style>