<template>
  <!-- <h1>我是home一级路由,展示登录成功以后的数据</h1> -->
  <div>
    <!-- 包这最外层的div是防报警告,避免影响过度动画 -->
    <el-card>
      <div class="box">
        <img :src="userStore.avatar" />
        <div class="message">
          <h4>{{ getTime() }}&nbsp;&nbsp;{{ userStore.username }}</h4>
          <i>八毛甄选运营平台</i>
        </div>
      </div>
    </el-card>
    <div class="bottom">
      <svg-icon name="welcome" width="600px" height="600px"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useUserStore from "@/store/modules/user";
import { ElNotification } from "element-plus";
import { getTime } from "@/utils/time";
let userStore = useUserStore();
// 直接交给路由守卫处理，这边不需要做了
// let userStore = useUserStore();
// onMounted(async () => {
//   try {
//     console.log(userStore.username);
//     await userStore.userInfo();
//     console.log(userStore.username);
//     // 注意使用await要在异步函数里，上面的箭头函数加上async修饰
//   } catch (error) {
//     ElNotification({
//       title: "提示",
//       message: error.message,
//       type: "warning",
//     });
//   }
// });
</script>

<style scoped lang="scss">
.box {
  display: flex;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 18px;
  }
  .message {
    margin-top: 20px;
    i {
      display: block;
      margin-top: 20px;
      font-size: 12px;
      color: #aea9a5;
    }
  }
}
.bottom {
  display: flex;
  justify-content: center;
}
</style>