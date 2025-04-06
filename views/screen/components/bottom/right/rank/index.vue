<template>
  <div class="rank">
    <p class="title">热门景区排行</p>
    <img src="../../../../images/dataScreen-title.png" alt="" />
    <div class="rankCaption">
      <span class="caption1">排名</span>
      <span class="caption2">景区</span>
      <span class="caption3">预约数量</span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
let charts = ref();
let mycharts;
onMounted(() => {
  let information = {
    color: "#069DFD",
    area: ["武当山", "长城", "故宫", "灵隐寺", "鼓浪屿"],
    dataArray: [8.01, 6.02, 5.03, 4.04, 3.05],
    barcolor: ["#0881E8", "#FF7B7C", "#52C5E2", "#FCB345", "#A599FD"],
  };

  let style = {
    width: 32,
    height: 24,
    padding: [5, 6, 0, 0],
    fontSize: 20,
    align: "center",
    color: "#ffffff",
  };

  let option = {
    // 提示面板
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(9,40,84,0.8)",
      borderColor: "rgba(9,40,84,0.8)",
      textStyle: {
        fontSize: 20,
        color: "#fff",
      },
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        return (
          params[0].name +
          "&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-weight:bold;'>" +
          params[0].value +
          "w</span>"
        );
      },
    },
    // 布局
    grid: {
      left: "5%",
      right: "5%",
      top: "10%",
      bottom: "0%", // 特殊
      containLabel: true,
    },
    // x轴展示数值，轴隐藏
    xAxis: [
      {
        type: "value",
        show: false,
      },
    ],
    // y轴展示排名，设置复杂样式，设置显示字符串内容
    yAxis: [
      {
        type: "category",
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        inverse: true, //y 轴的数据反向显示，即数据的顺序是从上到下，而不是默认的从下到上。
        data: information.area,
        axisLabel: {
          // y 轴标签的样式和内容。
          color: "#fff",
          margin: 10,
          formatter: (name, index) => {
            const id = index + 1;
            if (id < 4) {
              return `{rank${id}|${id}}{nameStyle|${name}}`;
            } else {
              return `{rank|${id}}{nameStyle|${name}}`;
            }
          },
          rich: {
            nameStyle: {
              width: 45,
              align: "center",
              padding: [0, 10, 0, 20],
              fontSize: 20,
            },
            rank1: {
              ...style,
              backgroundColor: {
                image:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAmCAYAAACGeMg8AAAAAXNSR0IArs4c6QAAAvlJREFUWEdjZMAFZp5hZWB7zM3Azc7K8OMPDwMbMytOtdSQYGX8xvCd4RPD18ffGdLTf5NqJCOGhob9LAzqvyQZGP9wIsuVnjwiTqrhpKjvNrd5CVcP8tSbxy9J8RCqR9bvF2D4+U0MZODqTav17R7f9Rf4/tOG7d8feVIcRY7aL6ysh66Kiq9bq6p9Duypn+xvGeJd3hJrFsIji3ZyM7D9kQZp/NzfNJvn9287Yg2hprpfTCwPa2ydY0n1DMQjoOSk8U0JlHy6Du48RE2HkWPWPUHhLuXUgrlgvR+f3CcmiUE8smqnIsO/P6wDGRPoHoZ7BlQAJHq/IBQgjAzbtrEzfPovf2LJTE/zZ08mENJAT/kye3c7YpMYI8PcjbwM3CySd2dPSFZ6/7aMng4lZBcpSYyRYfEOSQbWv7yDKVkhexDuGQJFMiPD0l2qDMy/Gf931d4kFEIDJU9MEmNkWLFVDeTAwewRUB3TZOVUA84vOEqxIeERUEDDkxgTy2+G9w+eoBfJQ8YjIM/gS2JDyiMotT5aEhtSHsGXxIacR3AlsSHpEdQk9u8JQ7rvtyHpEWxJbMh6BOSZNRp6YaF+oRdBfZfh4RFWxmGStMLc7w/JGAFldvaSejdIx2sIZ3Z43kDqdA25GEFpc4W534e1yIeUR7AlqSHpEeTiFn2oaMjECK4kNaRiBF+SQnhk0SZF0Ljuz57GXfQYUSSnu0xcV3f5TlnQOO9g9QihJIWIkfnrBRg42cReTu2oE/v6NZqcEKOVHlBfnbewLpWYEUdGBtD0Af9LxcE2QIeSL4gY0IYMmUKT12CKlYMyisUOUUlbGEDjWcFeTwjFOsQj0GFTBiaW3z+7avcPdKaHJynQiAlS7Y3PMxjTCqAR+ZIzR9IHKr+QmqQQmR3Zm0u28TGw/JcACYEmejzuXs9h+/sfPMlD61h6w8F55K6Q8BqLmPTtYCcRmaSwewQkOhim3oicSkCOA8w5RJgsqDRjecrBwMbOw/D/F8dgnwwFAHUo8lwbJ9efAAAAAElFTkSuQmCC",
              },
            },
            rank2: {
              ...style,
              backgroundColor: {
                image:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAmCAYAAACGeMg8AAAAAXNSR0IArs4c6QAAA9tJREFUWEftWW1oU1cYfs5JcpPc296bTtTOtmxrqSJMxqBjY7MO0dmhLs6vlIA4Yyv+2tiP1ZEho4zNj82PH8JYaUUs6dDgB5K2Uj/+WP9svybzh3YgSbXdjLomWdKkaXPPOI1ira25iU3qHcuvS877Pud9zvu+5+N9Cab7tbSYIFVYITARBiZilBinlZ2JAZpKIJaKIHAtguZmNVtI8pSC12sArKVQqZQt2IzIp1QGokbgtAdBCNOK+SSR9h4JwlgZV3YnvHNdIxfXlbDoApnElgos9YpW0Fzkhmhx72X6xpHNRe5r4/pJYwhb64JasR4TmUCiL7yzsZrdadIKMpNyMWK+ssvS0Pyjec0AksYBbK2LacFPE+HhpEpV/DMc2tQmI16rRTlfMrdo6fdV8tGjYMkknOv9WuZ5SMRXxnNiNj0x2djdwpb3vhOd90HJEByr72UiQ8B3J6X8NZ4TexLHr2ZSKNT4MDEHmiwNrvEQC6t3sPOj4WfNTeDplmFkpX3hHY3VbHBW8mI6A/8gC35YqLS2gW/NDnv/s4l4u0qhQh6K1LfZ1Ois5sZUhn5l+WTpXovjHgTzA2xY+WA6MgSnOyv5YZcM2W+akCpU5GieJwJrr2I71TiuEBf74VqemEqZ4ETXQj7AQmtuakYvsOANWn5gsdzSCmaMw1l3W7dEGAjcVlftfvPGIKjhPhwf/j2ZjC48wo0OQeotsXnTIRYkAXy2emQiGd0Q4UbfoBUHFss/tYJaYnCsGNAtERUUuyyu9w9aNvwFsxjE+uWhR2R05RFu9CAp2VemeI6B35IXvexHTc0o/193RLjRvxgXff5O0aHzYKYonKsGdUskBepvEhu2HRY+/hNUuAvHB2FdeiQdYnP2lSntx0DHVMyV/bolwsn4TG9vsktf/45Rwz//EynwLeWp6YLU1jFf7vhG16HFk91o61wJMIOuk73L8NbGtcXN13W9/Q7Rot6X5JONuj4QVRC/odi3AgZi1PUV5T9xacx8jT91oRpjo+RFfiHyuqnbuj3Dw6qjs5LH3ItMRNtT9+dL80FHlJGw/UK+67u5HKIxYgkUKadXZS4++HwiYrRc/+UgTrWjs7J/ePu3FamgM5dVy5dOdgU6boWnW3aPnVyyJ3HcA+DVfBmWDS4vmUrKmXRIaSqZPkJv75nXF2/4YrbaCZNJek3L6uulL3/TXsSeiNDeMy8aX/erxBJ5bepk8kzubYWJyJ5uuS+249NqNsBrSAUPszgRAqJyNh1SWTd6pliiEy3vVtWQW7VzWHStyOJvCkhVZlrJ5xnn74sr9PVzubbe/gXTndois1EjpQAAAABJRU5ErkJggg==",
              },
            },
            rank3: {
              ...style,
              backgroundColor: {
                image:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAmCAYAAACGeMg8AAAAAXNSR0IArs4c6QAAA+VJREFUWEftWW1MU2cUft7bSwutK6IRO4FsowGs8SNLWDSbuBidLH7U75ImRq1g/KXxx3DpYhaybE433X4sWUbAGElZtNEZU8Dgxx/RH/pLgtFSlLQICEUo1H5A23vv8sKMDMHeVlq8xv666XvO857nPee8H+cQTPWrrEyBKicNckEJmaBEmLBTyk7HAMMNw8954Wr2oqKCjxWSvKJgtcqANA14RhUr2LTIc7wAwnth1LtBiCAW8/9EahpVkEeyqLJ5jnWeKePa5gzWt0DN+FfKCfeRWNB45Dz8B003Asv+2Nlhbh7VD7GD2F3sFov1ksg4Eg7tgbI8RWe5WJDplPNziptHeksr/hzc0IUQ24XdxX4x+GNEaDjxKi39HMrfUa1mg0VilBMl0x7W/KJtO30aQigE41anmHn+I2LLojkxk56YaOzRvl1f/NRnfAaGeGBY3xeNDAHdndKzP6E5cUxz9lY0hWSNB3iFq7yn1DQaYkN8Jw5sCrxubgJLgxqsoHFo95flKbpnJC+mMrBtZMGv+Y+rqkG3ZoO+4/VErPUa8FB7FpZUz2Z8M5obkxn6Xc+elT8PGPogV/Rj29r+qcgQXKzLpYddSKdvTSFcsiJH9DzeSFpTuuNC2ahCUNkB0+rhyZQJztXn0wFh0YZW0ehJFrQPZ5/UtVdWQWCDMBY/kSwRAQTmXlPRif7tbjCyZzB8PTCRjCQ8Qo0e5FVNGXbrWIi5iQuH1o+MJyMZItRoeyjnpO7RX1VgUv0wrOmSLBEeDI48NX15yrOtBwqlG1tXD74gIymPUKO7QxnHsx5ZzoDekgs+dKKwMEz/lxwRavSdQMHhFc7frkBI8cG4rluyRDgwzvKe0r2/D2x5CkbeC8NXQ5L0yGiIReYez3LUnAET4TFP7ZQsEUrGFli+Q+/8vgVh2fP3RJJ8S3llOjc3u3Z+a+0Pkg4tmuzsg7q1gCCTdLLX+z/bvtFVcV/S26+Hn9U0x36+TNIHIg/ilLXY1kBGWElfUd6JS2P0a/yFq3mIhMnb/EKkdVNz774oD6vaulwac28zEXFP3b+vzwczkj6i019NdH03nkPUz6e6ZtkvrotefLDZlPAz2dIvB1GqtXW5Hbp9P+awbmM8q5YondgKdNQKS4PanHl+yTHNWQuAjxNlWCy4tGSqsv8zFlKiSqYv0GsaMx260m9mqp0wkaTVu6qkpPPbe+KL2OMRahozfUs331Uxwwlt6kTzTPxthfHIlga1o2D/wTxFF60hJT3MgoLcpXx4aSykYm70TLJE525/ri1MaS+aK/dtVJLgp3LC5UZbyTcZp++Lm8HFl+Ntvf0L8ffwIg9/63EAAAAASUVORK5CYII=",
              },
            },
            rank: {
              ...style,
              backgroundColor: {
                image:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAmCAYAAACGeMg8AAAAAXNSR0IArs4c6QAAA7lJREFUWEftWUtMU1kY/s65ty1toY4PaFGUsUTZ6MKEsOARYlBQ4mgcTSfdmDEhceVkFronxoVRV7oyYkwImAkZF4aHgmYmWm0cokYyJlIzo71VrF6oILU82t5zzUGMiNTeVkq9xq5uev7/O993zv+fx38IEv3OnDHAutoMo2qBoFoQI2JC24VooMokIsoYpP4xNDWxVCHJJw7t7QJgdoBRa6pgC2KvMBWEjcG9UwYhqlbMj4W09FhhjK/izmvelOQ7xot2UdWwUmBiFQUt1gqajp1CY56QIXTat+xe/7R/VBzFvnpZK9YHIbNElA/XNJpi1sNaQRbSjhHlhj9voGnQKg0iKg5iX31EC/47ITycmLWEf1YE65oFiNVanDNlMyVOHO/L//sc1GgU7t1+Lf3MCOlYxXMimzMxl2zAOlAp2R4Pg5IRuBqGkokh4KvTkqK1PCeKw6U3kzksVrtCmSTlPtw/HWKv2TMc+Gn8c30TtHbbIKqOcrmm0aRkJy8SEZwyRE70rbjeDL40u3YGPi+kvcsBBlvFy7pmgWU3N+YjKuX5qgK5/w/BaArh5y2hRGIILnY6+WZXFdzuI/h0W1msUErUj4K4x1vY2zjdPmEJYP/myflsCf7oWs8bqoMNvmyTTtT/uBg+eTffcxaqOAF3/VPdCuHEJduj6oD1PxlUGIZr26u5YnQxI5y0QuMer30mxGQi4beGqdlidCOEkx43Rk7eXX79LGhOBK7aQd0KUaFCyhuoeZr75AVMFhm7N4++F6OrGeGko3Ty2D/2v86Dn5JLC/0oK4vx/3UnhJMOG0d/v7/cexmq4Q3cdc91K4QR1S/ZfL8+szwOghpfwrX1tS5n5KMQo3GGfJtft0K4mKEcee/A0jv/IiaEvwvJ9nEmRqNtt+3XjkDPocWT/ZbjyhZAFXSd7CNmec+DH+480PXyy6stXvvVRr1viH5PQVctBCLq+ojyTRwakx/j/+xdh3iMfM03RG0Xq7ZOJ4+5r1mItqvuhWt20KkllcFtvZmu76aziSpUkbz2nrrkxYeODgsitEj/5SAuta3TWR6qPWpSctzpjFqmfFIr0HEWrd22NZPOjcXh0lYAP2aKWCq4vGTqtV95F1KaSqbv0Vt6CsrHKg9l6zlhrkg558UvvqX37msvYs9GaOkpqBip7ROYkNFHnWQzk/6zwmzk1m5bWajmoJlZeJly0cNMAZO8hTMhlfJDzzxDtOFUoMSMZdUCM+0QVbqJgDqTjeSXtPP7xYjh1aV0n97eAuRE6iINCWonAAAAAElFTkSuQmCC",
              },
            },
          },
        },
      },
      {
        inverse: true,
        axisTick: "none",
        axisLine: "none",
        show: true,
        axisLabel: {
          color: "#fff",
          fontSize: 20,
          margin: 20,
          formatter: function (value) {
            return value + "w";
          },
        },
        data: information.dataArray,
      },
    ],
    series: [
      {
        type: "bar",
        barWidth: 18, // 柱子宽度
        label: {
          show: true,
          color: "#fff",
          // position: "inside-left",
          position: [12, 4], //对左上角的相对像素位移，感觉比较实用
          fontSize: 14,
          formatter: (params) => {
            let percentage = parseInt((params.value / 10) * 100) + "%";
            return percentage;
          },
        },
        MaxSize: 0,
        showBackground: true,
        backgroundStyle: {
          color: "transparent",
          borderColor: "#286493",
          borderWidth: 3,
          borderRadius: 8, //设置背景的圆角
        },
        data: information.dataArray.map((item, index) => {
          return {
            value: item.toFixed(2),
            itemStyle: {
              borderRadius: 8,
              color: information.barcolor[index], //因为上面已经用map，这里不需要写函数找数据
              borderColor: "transparent",
              borderWidth: 6,
              borderRadius: 8, //设置背景的圆角
            },
          };
        }),
      },
    ],
  };
  mycharts = echarts.init(charts.value);
  mycharts.setOption(option);
});
</script>

<style scoped lang="scss">
.rank {
  flex: 1.3;
  margin-bottom: 20px;
  background: url("../../../../images/dataScreen-main-rt.png") no-repeat;
  background-size: cover;
  .title {
    font: normal 700 20px/25px "Microsoft Yahei";
    color: rgb(233, 226, 226);
  }
  .rankCaption {
    position: relative;
    box-sizing: border-box;
    top: 20px;
    margin: 0 10px;
    height: 50px;
    background: url("../../../../images/rankingChart-bg.png") no-repeat;
    background-size: cover;
    color: #f9ac27;
    font-weight: 700;
    font-size: 18px;
    line-height: 50px;
    .caption1 {
      margin-left: 10px;
      margin-right: 20px;
    }
    .caption2 {
      margin-right: 86px;
    }
  }
  .charts {
    width: 100%;
    height: 282px;
    // height: 100%;
    // background-color: #fff;
    text-align: center;
  }
}
</style>