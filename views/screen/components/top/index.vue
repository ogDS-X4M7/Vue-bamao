<template>
  <div class="top">
    <div class="left">
      <span @click="routetoHome">首页</span>
    </div>
    <div class="middle">
      <h1>智慧旅游可视化大数据展示平台</h1>
    </div>
    <div class="right">
      <span>统计报告</span><i>当前时间：{{ titleTime }}</i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import moment from "moment";
import { useRouter } from "vue-router";
let $router = useRouter();
// 跳转回首页方法
function routetoHome() {
  $router.push("/");
}
let titleTime = ref("");
// 创建定时器
let timer;
// 这里获取时间写了两种方法，方法一：用Date获取然后写格式
// 方法二：使用moment()外部库的方法获取当前时间
// 获取当前时间函数
// const getTime = () => {
//   let datenow = new Date();
//   let y = datenow.getFullYear();
//   let mon = datenow.getMonth() + 1;
//   let d = datenow.getDate();
//   let h = datenow.getHours();
//   h = h > 9 ? h : "0" + h;
//   let m = datenow.getMinutes();
//   m = m > 9 ? m : "0" + m;
//   let s = datenow.getSeconds();
//   s = s > 9 ? s : "0" + s;
//   return `${y}年${mon}月${d}日 ${h}:${m}:${s}`;
// };
// 避免创建多个定时器
// clearInterval(timer);
// timer = setInterval(() => {
//   titleTime.value = getTime();
// }, 1000);
timer = setInterval(() => {
  titleTime.value = moment().format("YYYY年MM月DD日 HH:mm:ss");
}, 1000);
onMounted(() => {
  //   titleTime.value = getTime();
  titleTime.value = moment().format("YYYY年MM月DD日 HH:mm:ss");
});
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped lang="scss">
.top {
  display: flex;
  width: 100%;
  text-align: center;
  .left {
    flex: 1;
    height: 40px;
    background: url("../../images/dataScreen-header-left-bg.png") no-repeat;
    background-size: cover;
    span {
      float: right;
      width: 140px;
      line-height: 40px;
      background: url("../../images/dataScreen-header-btn-bg-l.png") no-repeat;
      color: #30adc9;
      cursor: pointer;
      &:hover {
        color: #29fcff;
      }
    }
  }
  .middle {
    flex: 2;
    height: 80px;
    background: url("../../images/dataScreen-header-center-bg.png") no-repeat;
    background-size: cover;
    color: #00afd3;
    h1 {
      line-height: 80px;
      font-weight: 400;
    }
  }
  .right {
    flex: 1;
    height: 40px;
    background: url("../../images/dataScreen-header-right-bg.png") no-repeat;
    background-size: cover;
    background-position: right;
    color: #30adc9;
    line-height: 40px;
    span {
      float: left;
      width: 140px;
      background: url("../../images/dataScreen-header-btn-bg-r.png") no-repeat;
    }
    i {
      font-style: normal;
    }
  }
}
</style>