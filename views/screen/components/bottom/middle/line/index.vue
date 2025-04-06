<template>
  <div class="line">
    <p class="title">近7天游客量趋势图</p>
    <img src="../../../../images/dataScreen-title.png" alt="" />
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
let charts = ref();
let mycharts;
onMounted(() => {
  const today = new Date();
  // 生成最近14天的日期列表
  const dates = [];
  for (let i = 14; i > 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    // setDate() 方法能够正确处理月份和年份超出范围的情况。当使用 setDate() 方法设置一个小于1的日期时，
    // JavaScript 的 Date 对象会自动将日期调整为前一个月的最后一天。同样地，
    // 如果设置的日期超出了当前月份的天数，Date 对象也会自动调整到下一个月。
    // 格式化日期
    dates.push(`${date.getMonth() + 1}/${date.getDate()}`);
  }
  mycharts = echarts.init(charts.value);
  mycharts.setOption({
    title: {},
    grid: {
      left: 50,
      right: 50,
      top: 30,
      bottom: 20,
    },
    // legend: { data: ["近期游客数"] },//图例小标题
    // 提示框，这里触发trigger: "axis"即鼠标滑到坐标轴上显示提示框：内有相应x轴，y轴的name以及data
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      name: "日期",
      type: "category",
      boundaryGap: false,
      splitLine: false,
      data: dates, // 设置x轴数据为日期列表
    },
    yAxis: {
      type: "value",
      splitLine: false,
      // 经查阅：从 v5.0.0 开始，数值轴 (type: 'value') 默认不显示轴线，需要显式配置。axisTick同理
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
    series: [
      {
        name: "游客数",
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: {
          color: "rgb(233, 226, 226)",
          width: 1,
        },
        data: [
          720, 1240, 766, 2299, 333, 888, 2222, 1200, 1240, 966, 2099, 733, 888,
          1111,
        ],
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(229, 154, 65,1)",
              },
              // {
              //   offset: 0.5,
              //   color: "rgba(26, 183, 183,1)",
              // },
              {
                offset: 1,
                color: "rgba(229, 154, 65,0.1)",
              },
            ],
            globalCoord: false,
          },
        },
      },
    ],
  });
});
</script>

<style scoped lang="scss">
.line {
  flex: 1;
  box-sizing: border-box;
  margin: 0px 30px;
  background: url("../../../../images/dataScreen-main-cb.png") no-repeat;
  background-size: cover;
  .title {
    font: normal 700 20px/25px "Microsoft Yahei";
    color: rgb(233, 226, 226);
  }
  .charts {
    width: 100%;
    height: 190px;
    // height: 100%;
    // background-color: #fff;
    text-align: center;
  }
}
</style>