<template>
  <div class="tourlist">
    <p class="title">实时游客统计</p>
    <img src="../../../../images/dataScreen-title.png" alt="" />
    <p class="Booking">
      可预约总量<span>{{ forBooking }}</span>
      人
    </p>
    <div class="tourNumber">
      <span v-for="(item, index) in tournumber" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
let forBooking = ref(99999);
let tournumber = ref("216908人");
import * as echarts from "echarts";
import "echarts-liquidfill";
// console.log(echarts);
let charts = ref();
let mycharts;
onMounted(() => {
  // 获取echarts类的实例
  mycharts = echarts.init(charts.value);
  // console.log(mycharts);
  // 设置实例的配置项
  mycharts.setOption({
    // 标题组件
    title: {
      // text: "水球图",
    },
    // // x|y轴组件
    // xAxis: {},
    // yAxis: {},
    // 系列：决定展示什么样的图形图标
    // series: [
    //   {
    //     type: "bar",
    //     data: [10, 20, 30, 40],
    //   },
    // ],
    series: [
      // 水球
      {
        type: "liquidFill",
        data: [0.4, 0.35],
        // itemStyle: {
        //   opacity: 0.6,
        // },
        // emphasis: {
        //   itemStyle: {
        //     opacity: 0.9,
        //   },
        // },
        // color: ["rgba(36, 209, 182,1)", "rgba(27, 153, 174,0.5)"], //波浪色,修改前后波浪的颜色
        // 波浪色也可以写渐变效果
        color: [
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(36, 209, 182,1)",
              },
              {
                offset: 0.5,
                color: "rgba(26, 183, 183,1)",
              },
              {
                offset: 1,
                color: "rgba(27, 153, 174,1)",
              },
            ],
            globalCoord: false,
          },
        ],

        center: ["50%", "50%"], //水球相对容器的位置
        radius: "90%", //图表的半径
        amplitude: "8%", //振幅
        shape: "circle", //图表形状
        outline: {
          //边框
          show: true,
          borderDistance: 8,
          // borderBottom: solid,
          // borderTopStyle: dotted,
          itemStyle: {
            color: "none",
            borderColor: "#28c9d7",
            borderWidth: 2,
            borderType: [10, 10], //设置虚线边框，3为虚线长度，10为虚线间距
            // 有和没有的都看不出效果
            // shadowBlur: 20,
            // shadowColor: "rgba(f, f, f, 0.25)",
          },
        },
        backgroundStyle: {
          color: {
            // 设置球内渐变色
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.55,
            colorStops: [
              {
                offset: 0.75, //如果想拆三份，这里就写0.5
                color: "rgb(12,36,70)", //0%处颜色
              },
              // {
              //   offset: 0.75,
              //   color: "rgb(25,95,108)", //50%处颜色
              // },
              {
                offset: 0.95,
                color: "rgb(48,143,155)", //100%处颜色
              },
            ],
            // globalCoord: false,//缺省默认false
          },
          // borderWidth: 6,
          // borderColor: "rgba(26, 99, 110,0.5)",
          // 有和没有的都看不出效果
          // itemStyle: {
          //   shadowBlur: 20,
          //   shadowColor: "rgba(27, 192, 209,1)",
          // },
        },
        itemStyle: {
          opacity: 0.95,
          shadowBlur: 50,
          shadowColor: "rgba(0, 0, 0, 0.4)",
        },
        // 标签文本---40%在球内那些文本
        label: {
          formatter: "游客容量",
          show: true,
          color: "#b9c4d5",
          insideColor: "#294D99",
          fontSize: 14,
          fontWeight: "400",
          align: "center",
          baseline: "bottom",
          position: "inside",
        },
        emphasis: {
          itemStyle: {
            opacity: 0.8,
          },
        },
      },
      // 水球边框托盘--饼状图实现
      {
        type: "pie",
        radius: ["87.5%", "94%"],
        silent: true, //取消点击造成饼状图动态变化
        clockwise: true,
        itemStyle: {
          color: "#1acaba",
          borderRadius: 10,
          borderColor: "#1acaba",
        },
        startAngle: 350, //边框开始位置
        // 360对应下面第一个value:50
        data: [
          { value: 45 },
          {
            value: 55,
            itemStyle: {
              color: "#1acaba",
              opacity: 0, //上部透明
            },
          },
        ],
        label: {
          show: false,
        },
      },
    ],
  });
  // 之前一直出现不了表格，添加了这个resize之后出现了
  // 后来注释掉代码也能正常运行,相当于代码没改动却从不能运行到能运行了,
  // 虽然很诡异,但是暂时也不管了
  // window.addEventListener("resize", () => {
  //   mycharts.resize();
  // });
});
// onUnmounted(() => {
//   window.removeEventListener("resize", () => {
//     mycharts.resize();
//   });
// });
</script>

<style scoped lang="scss">
.tourlist {
  flex: 1.3;
  margin-bottom: 20px;
  background: url("../../../../images/dataScreen-main-lt.png") no-repeat;
  background-size: cover;
  .Booking {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    font: normal 400 14px/14px "Microsoft Yahei";
    color: #fff;
    span {
      color: #feb600;
    }
  }
  .title {
    font: normal 700 20px/25px "Microsoft Yahei";
    color: rgb(233, 226, 226);
  }
  .tourNumber {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    color: #69ddeb;
    text-align: center;
    font: normal 400 30px/56px "Microsoft Yahei";
    padding: 20px 10px;
    span {
      flex: 1;
      height: 56px;
      margin: 0px 1px;
      background: url("../../../../images/total.png") no-repeat;
      background-size: cover;
    }
  }
  // 设置好高度是非常重要的，卡了两次应该都是因为这个
  .charts {
    width: 100%;
    height: 232px;
    // height: 100%;
    // background-color: #fff;
    text-align: center;
  }
}
</style>