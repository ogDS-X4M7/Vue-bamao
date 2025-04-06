<template>
  <div class="age">
    <p class="title">年龄比例</p>
    <img src="../../../../images/dataScreen-title.png" alt="" />
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
// console.log(echarts);
let charts = ref();
let mycharts;
onMounted(() => {
  mycharts = echarts.init(charts.value);
  let option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "15%",
      //   left: "center",
      right: 20,
      orient: "vertical",
      textStyle: {
        color: "#c8d4eb",
        fontSize: 12,
      },
      formatter: function (name) {
        // 遍历 series 数据，找到对应的百分比
        let total = 0;
        let targetValue = 0;
        for (let i = 0; i < option.series[0].data.length; i++) {
          total += option.series[0].data[i].value;
          if (option.series[0].data[i].name === name) {
            targetValue = option.series[0].data[i].value;
          }
        }
        let percentage = (targetValue / total) * 100; // 计算百分比并保留两位小数
        return name + " " + percentage + "%"; // 返回自定义的图例文本
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "95%"], //内半径和外半径
        left: "-30%", //让饼状图表放到左边去
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          //   borderColor: "#fff",
          //   borderWidth: 2,
        },
        label: {
          // 把数据展示放到每个饼图扇形的内部
          show: true,
          position: "inside",
          formatter: "{d}%", // 使用 {c} 来表示 value
          //formatter: '{b}: {c}'
          //其中{b}是数据项的name，而{c}是数据项的value。如果只想显示value，就像上面一样改为formatter:'{c}'。（echarts内部规定的参数格式）
        },
        // 被指向时内部数据高亮、放大
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold",
          },
        },
        // labelLine: {
        //   show: false,
        // },
        data: [
          { value: 160, name: "10岁以下" },
          { value: 80, name: "10-18岁" },
          { value: 120, name: "19-29岁" },
          { value: 240, name: "30-39岁" },
          { value: 200, name: "40-60岁" },
          { value: 200, name: "60岁以上" },
        ],
      },
    ],
  };
  mycharts.setOption(option);
});
</script>

<style scoped lang="scss">
.age {
  flex: 1;
  // background-color: #fff;
  background: url("../../../../images/dataScreen-main-lb.png") no-repeat;
  background-size: cover;
  .title {
    font: normal 700 20px/25px "Microsoft Yahei";
    color: rgb(233, 226, 226);
  }
  .charts {
    width: 100%;
    height: 200px;
    // height: 100%;
    // background-color: #fff;
    text-align: center;
    margin-top: 28px;
    // margin-left: -40px;
  }
}
</style>