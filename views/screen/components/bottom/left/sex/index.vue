<template>
  <div class="sex">
    <p class="title">男女比例</p>
    <img src="../../../../images/dataScreen-title.png" alt="" />
    <div class="proportion">
      <div class="man">
        <p>男士</p>
        <img src="../../../../images/man.png" />
      </div>
      <div class="woman">
        <p>女士</p>
        <img src="../../../../images/woman.png" />
      </div>
    </div>
    <div class="chartsmessage">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
let charts = ref();
let mycharts;
onMounted(() => {
  mycharts = echarts.init(charts.value);
  mycharts.setOption({
    title: {},
    xAxis: { show: false, min: 0, max: 100 },
    yAxis: {
      type: "category",
      show: false,
    },
    // 通过两个bar柱状条显示
    // 下面的短条移上来覆盖上面的100%长条就实现占比了
    series: [
      {
        type: "bar",
        data: [100],
        barWidth: 20,
        grid: {
          top: "top",
        },
        z: 2,
        itemStyle: {
          borderRadius: 20,
          color: "#FF4B7A",
        },
      },
      {
        type: "bar",
        data: [58],
        barWidth: 20,
        grid: {
          top: "top",
        },
        z: 3,
        barGap: "-100%",
        itemStyle: {
          color: "#007AFE",
          borderRadius: 20,
        },
      },
    ],
  });
});
</script>

<style scoped lang="scss">
.sex {
  flex: 1;
  // background-color: #000;
  margin-bottom: 20px;
  background: url("../../../../images/dataScreen-main-lc.png") no-repeat;
  background-size: cover;
  color: #c8d4eb;
  .title {
    font: normal 700 20px/25px "Microsoft Yahei";
    color: rgb(233, 226, 226);
  }
  .proportion {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 32px;
    div img {
      margin-top: 16px;
    }
    .man {
      width: 111px;
      height: 116px;
      margin-right: 30px;
      background: url("../../../../images/man-bg.png") no-repeat;
    }
    .woman {
      width: 111px;
      height: 116px;
      background: url("../../../../images/woman-bg.png") no-repeat;
    }
  }
  .chartsmessage {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0px 44px;
    font-size: 16px;
  }
  .charts {
    width: 100%;
    height: 32px;
    // height: 100%;
    // background-color: #fff;
  }
}
</style>