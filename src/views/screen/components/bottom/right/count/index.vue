<template>
  <div class="count">
    <p class="title">预约渠道数据统计</p>
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
  // 通过把想要展示的数据名称单独列出来，然后传给legend当data
  // 否则legend会从series里自己拿name作为data，这样就会把空格的gap也显示出来
  // 所以必须在trafficWay装入gap之前单独做处理得到legendData，
  // 然后再给legend当data，这样展示的图例就不会有gap了
  let trafficWay = [
    {
      name: "智慧文旅平台···40%",
      value: 40,
    },
    {
      name: "携程···10%",
      value: 10,
    },
    {
      name: "飞猪···20%",
      value: 20,
    },
    {
      name: "其他渠道···30%",
      value: 30,
    },
  ];
  // 在trafficWay装入gap之前单独做处理得到legendData作为图例数据展示
  // 注意legend的data中的值必须等于某系列的name值（如果是饼图，也可以是饼图单个数据的 name）：官方文档
  let legendData = trafficWay.map((item) => item.name);
  console.log(legendData);

  let data = []; //主数据
  let dataOutline = []; //外边框数据
  let color = ["#0174dc", "#ff8a4a", "#e984d8", "#fc5769"];
  // 添加数据与间隔
  data.push({
    // 最开始最大的空格
    silent: true,
    name: "gap",
    value: 15,
    itemStyle: {
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      color: "transparent",
    },
  });
  trafficWay.forEach((item, index) => {
    data.push(
      {
        value: item.value,
        name: item.name,
        itemStyle: {
          borderWidth: 2, //圆弧宽度
          shadowBlur: 2, // 圆弧阴影
          borderColor: color[index],
          shadowColor: color[index],
        },
      },
      {
        // 每一项中间的空格
        silent: true,
        name: "gap",
        value: 2,
        itemStyle: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          color: "transparent",
        },
      }
    );
  });
  // 添加外边框与间隔
  for (let i = 3; i > 0; i--) {
    dataOutline.push(
      {
        value: 50,
        name: "",
        itemStyle: {
          borderWidth: 1,
          borderColor: "rgba(25, 64, 133,1)",
        },
      },
      {
        silent: true,
        value: 70,
        name: "",
        itemStyle: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          color: "transparent",
        },
      }
    );
  }
  let option = {
    color: color,
    title: [{}],
    tooltip: {
      show: true,
      trigger: "item",
      textStyle: {
        color: "#fff",
      },
      backgroundColor: "rgba(16, 32, 40, 0.88)",
      borderRadius: 4,
      borderColor: "#20749e",
      formatter: (params) => {
        let result;
        // gap或无名不要显示内容
        if (params.name === "gap" || !params.name) {
          result = "";
        } else {
          result = `${params.name}:${params.value}%`;
        }
        return result;
      },
    },

    legend: {
      orient: "vertical",
      left: "5%",
      top: "30%",
      icon: "circle",
      show: true,
      itemWidth: 12,
      itemHeight: 20,
      itemGap: 15,
      // padding: [60, 0, 0, 0],
      textStyle: {
        color: "#7cc4ec",
      },
      data: legendData,
    },
    toolbox: {
      show: false,
    },
    series: [
      {
        name: "",
        type: "pie",
        startAngle: 126,
        radius: ["66%", "79%"],
        // radius: '70%',
        center: ["70%", "50%"],
        emphasis: {
          scale: true, //鼠标移入变大
        },
        label: {
          show: false,
          // formatter: ['{c|{d}%}', '{b|{b}}'].join('\n'),
          formatter: (params) => {
            // console.log(params)
            if (params.name !== "") {
              return [`{c|${params.percent}%}`, `{b|${params.name}}`].join(
                "\n"
              );
            }
          },
        },

        data: data,
      },
      {
        name: "外边框",
        type: "pie",
        clockwise: false, //顺时加载
        emphasis: {
          scale: false, //鼠标移入变大
        },
        center: ["70%", "50%"],
        radius: ["88%", "88%"],
        label: {
          show: false,
        },
        data: dataOutline,
      },
      {
        name: "内部点边框",
        type: "pie",
        clockwise: false, //顺时加载
        emphasis: {
          scale: false, //鼠标移入变大
        },
        center: ["70%", "50%"],
        radius: ["48%", "48%"],
        label: {
          show: false,
        },
        data: [
          {
            value: 0,
            itemStyle: {
              borderWidth: 1,
              borderColor: "#eff8fe",
              borderType: [1, 10],
            },
          },
        ],
      },
      {
        name: "内部托盘边框",
        type: "pie",
        startAngle: 140,
        clockwise: false, //顺时加载
        emphasis: {
          scale: false, //鼠标移入变大
        },
        center: ["70%", "50%"],
        radius: ["18%", "28%"],
        label: {
          show: false,
        },
        data: [
          {
            value: 55,
            itemStyle: {
              color: "#eff8fe",
            },
          },
          {
            value: 45,
            itemStyle: {
              color: "#eff8fe",
              opacity: 0, //上部透明
            },
          },
        ],
      },
      {
        name: "内部中空扇形",
        type: "pie",
        startAngle: 10,
        clockwise: false, //顺时加载
        emphasis: {
          scale: false, //鼠标移入变大
        },
        center: ["70%", "50%"],
        radius: ["0%", "28%"],
        label: {
          show: false,
        },
        data: [
          {
            value: 22,
            itemStyle: {
              color: "transparent",
              borderWidth: 4,
              borderColor: "#eff8fe",
            },
          },
          {
            value: 80,
            itemStyle: {
              color: "#eff8fe",
              opacity: 0, //上部透明
            },
          },
        ],
      },
    ],
  };
  mycharts.setOption(option);
});
</script>

<style scoped lang="scss">
.count {
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
    height: 230px;
    // height: 100%;
    // background-color: #fff;
    text-align: center;
    margin-top: 10px;
    // margin-left: -40px;
  }
}
</style>