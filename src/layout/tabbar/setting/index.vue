<template class="forsetting">
  <el-button :icon="Refresh" circle @click="refreshMain" />
  <el-button :icon="FullScreen" circle @click="fullScreenChange" />
  <!-- <el-button :icon="Setting" circle @click="drawer2 = true" /> -->
  <!-- 抽屉 -->
  <!-- <el-drawer v-model="drawer2" append-to-body size="20%">
    <template #header>
      <h4>主题设置</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            v-model="color"
            show-alpha
            :predefine="predefineColors"
          />
        </el-form-item>
        <el-form-item :label="value1 ? '白天模式' : '黑夜模式'"
          ><el-switch
            v-model="value1"
            active-action-icon="Sunny"
            inactive-action-icon="MoonNight"
            @change="changeTheme"
        /></el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="confirmClick">确定</el-button>
        <el-button @click="cancelClick">取消</el-button>
      </div>
    </template>
  </el-drawer> -->
  <!-- 关于这里抽屉和气泡弹出框，都有各自会出现的问题，我都已经找到解决方案：
  1.对于抽屉，打开后弹出抽屉因为这个组件只在tabbar的右上角，而打开的抽屉是占据了窗口的20%的宽度
  导致打开的抽屉会被tabbar下面main里的card遮挡住，这种时候需要给抽屉添加append-to-body属性，让它直接加在body里
  而不是作为tabbar的一部分被card挡住，问题解决
  2.对于气泡弹出框，在选择颜色时，因为使用el-color-picker取色器，取色器会弹出额外页面提供颜色选择，el-popover并没有
  把取色器弹出的页面认为是自己的页面，如果使用hover触发，那么鼠标移动到取色器弹出页面时就会整个气泡框消失(包括取色器页面)
  当然click触发，就是鼠标点击选择颜色时，气泡框消失，因此需要给气泡框添加:teleported="false"

  经查阅teleported：是否将popover的下拉列表插入至 body 元素 默认值为true，原来popover的下拉列表被默认放到body里，那当然
  会让el-popover不把取色器弹出的页面认为是自己的页面，因为它在setting，另一个却在body，问题解决 -->
  <!-- 气泡弹出框 -->
  <el-popover
    placement="bottom"
    title="主题设置"
    style="width: 300px; height: 100px"
    trigger="click"
  >
    <!-- :width="200" -->
    <template #reference>
      <el-button :icon="Setting" circle @click="drawer2 = true" />
    </template>
    <el-form size="small">
      <el-form-item label="主题颜色" style="height: 30px; margin: 5px 0px">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          :teleported="false"
          @change="changeColor"
        />
      </el-form-item>
      <el-form-item
        :label="value1 ? '白天模式' : '黑夜模式'"
        style="height: 30px; margin: 5px 0px"
        ><el-switch
          v-model="value1"
          active-action-icon="Sunny"
          inactive-action-icon="MoonNight"
          @change="changeTheme"
      /></el-form-item>
    </el-form>
  </el-popover>
  <img
    :src="userStore.avatar"
    class="userhead"
    style="vertical-align: middle"
  />
  <el-dropdown style="vertical-align: middle">
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="exitlogin">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Refresh, FullScreen, Setting } from "@element-plus/icons-vue";
// 引用仓库，传递刷新数据
import useLayoutStore from "@/store/modules/LayoutStore";
let LayoutStore = useLayoutStore();

// 引用仓库，传递用户信息
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();

// 引入计算主题色的自定义方法
import { getLightColor, getDarkColor } from "@/utils/color.ts";

// console.log(userStore);
function refreshMain() {
  LayoutStore.fresh = !LayoutStore.fresh;
}
function fullScreenChange() {
  // 实现全屏的方法如下
  let isFull = document.fullscreenElement;
  if (isFull) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}
// 引用路由实现编程式路由push方法跑回登录界面
import { useRouter } from "vue-router";
let $router = useRouter();
import { useRoute } from "vue-router";
let $route = useRoute();
// 退出登录
function exitlogin() {
  userStore.userExit();
  $router.push({ path: "/login", query: { redirect: $route.path } });
}

// 抽屉属性设置
const drawer2 = ref(false);
function cancelClick() {
  drawer2.value = false;
}
function confirmClick() {
  drawer2.value = false;
}
// 主题设置
// 取色器所需数据
// 默认颜色
const color = ref("#1e90ff");
// 预定义可选色
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);

// 主题颜色获取,可以自动拿到color.value
const changeColor = () => {
  // console.log(color.value);
  getColor(color.value);
  // 主题颜色永久化
  localStorage.setItem("ThemeColor", color.value);
};

// 切换主题颜色方法
const getColor = (colorValue) => {
  const html = document.documentElement;
  html.style.setProperty("--el-color-primary", colorValue);
  let baseProperty = "--el-color-primary-";
  for (let i = 1; i < 10; i++) {
    // console.log(getLightColor(colorValue, i));
    // 浅色
    let newProperty = `${baseProperty}light-${i}`;
    html.style.setProperty(newProperty, getLightColor(colorValue, i));
    // 深色
    newProperty = `${baseProperty}dark-${i}`;
    html.style.setProperty(newProperty, getDarkColor(colorValue, i));
  }
};

// 挂载时获取主题颜色,并切换
onMounted(() => {
  let ThemeColor = localStorage.getItem("ThemeColor");
  if (ThemeColor) {
    getColor(ThemeColor);
    color.value = ThemeColor;
  }
});

// 日夜模式所需数据
const value1 = ref(true);
// 日夜模式切换
const changeTheme = () => {
  let html = document.documentElement;
  value1.value ? (html.className = "") : (html.className = "dark");
};
</script>

<style scoped lang="scss">
.userhead {
  width: 32px;
  height: 32px;
  margin-left: 10px;
  border-radius: 50%;
}
.forsetting {
  vertical-align: middle;
}
.demo-color-block {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
</style>