<template>
  <div class="year">
    <p class="title">年度游客量对比</p>
    <img src="../../../../images/dataScreen-title.png" alt="" />
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
let charts = ref();
let mycharts;
onMounted(() => {
  mycharts = echarts.init(charts.value);
  mycharts.setOption({
    title: {},
    legend: {
      right: 10,
      top: 10,
      icon: "rect", //图例默认中间会有个圆圈，这个就是用来设计样式icon的属性！
      // 改成了矩形，下面是设计图例标记图形的宽高
      // itemWidth:,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
      },
    },
    tooltip: {
      trigger: "axis",
      // 后面发现只要给x轴写好data，就能使用自动配置的提示框，更好看，因此下面注释掉的写法仅供学习
      //#region
      // formatter: `&nbsp;&nbsp;年/月&nbsp;&nbsp;:游客量<br />{a0}/{b0}: {c0}<br />{a1}/{b1}: {c1}<br />{a2}/{b2}: {c2}`,
      // formatter: function (params) {
      //   let result = "&nbsp;&nbsp;年/月&nbsp;&nbsp;:游客量<br />";
      //   params.forEach(function (item, index) {
      //     // 假设 item.data[0] 是年份，item.data[1] 是月份（需要加一）
      //     let year = item.seriesName;
      //     let month = item.dataIndex + 1; // 加一以修正月份
      //     result += `${year}/${month}: ${item.value}<br />`;
      //   });
      //   return result;
      // },
      //#endregion
    },
    xAxis: {
      name: "月份",
      nameTextStyle: {
        color: "#fff",
      },
      type: "category",
      boundaryGap: false,
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      axisLabel: {
        color: "#fff",
      },
      // axisLabel: {
      //   color: "#fff",
      //   formatter: function (params) {
      //     return parseInt(params) + 1;
      //   },
      // },
      splitLine: { show: false },
    },
    yAxis: {
      name: "人数/k",
      type: "value",
      show: true,
      nameTextStyle: {
        color: "#fff",
      },
      axisLabel: {
        color: "#fff",
        formatter: function (value) {
          return parseInt(value / 1000);
        },
      },
      // 经查阅：从 v5.0.0 开始，数值轴 (type: 'value') 默认不显示轴线，需要显式配置。axisTick同理
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
      splitLine: { show: false },
    },
    grid: {
      top: 55,
      bottom: 20,
      left: 30,
      right: 45,
    },
    series: [
      {
        name: "2022",
        type: "line",
        smooth: true,
        symbol: "none",
        data: [
          21232, 18256, 22122, 25446, 28555, 29112, 34231, 30012, 26653, 13551,
          15533, 16994,
        ],
        areaStyle: {
          color: "rgba(255, 152, 0,0.2)",
        },
        itemStyle: {
          color: "rgb(255, 152, 0)",
        },
      },
      {
        name: "2023",
        type: "line",
        smooth: true,
        symbol: "none",
        data: [
          31232, 33256, 41122, 37446, 38555, 39112, 44231, 40012, 36653, 33551,
          35533, 36994,
        ],
        areaStyle: {
          color: "rgba(183, 6, 24,0.2)",
        },
        itemStyle: {
          color: "rgb(183, 6, 24)",
        },
      },
      {
        name: "2024",
        type: "line",
        smooth: true,
        symbol: "none",
        data: [
          31232, 18256, 52122, 34446, 18555, 69112, 34231, 50012, 56653, 43551,
          45533, 40994,
        ],
        areaStyle: {
          color: "rgba(61, 143, 255,0.2)",
        },
        itemStyle: {
          color: "rgb(61, 143, 255)",
        },
      },
    ],
  });
});
</script>

<style scoped lang="scss">
.year {
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
  .charts {
    width: 100%;
    // height: 32px;
    height: 232px;
    // background-color: #fff;
    text-align: center;
  }
}
</style>