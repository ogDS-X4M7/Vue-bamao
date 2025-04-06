<template>
  <div class="layout_container">
    <!-- <h1>一级路由组件</h1> -->
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: isFold.fold }">
      <Logo />
      <el-scrollbar class="scrollbar">
        <!-- <p v-for="item in 2000" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p> -->
        <el-menu
          :default-active="$route.path"
          background-color="#001529"
          text-color="#e1f0f1"
          :collapse="isFold.fold"
        >
          <!-- collapse可以实现折叠，default-active能页面加载时默认激活菜单的index，这里把被激活的路由传给它就能实现激活路由所在菜单展开 -->
          <!-- 注意这里官网要求样式用十六进制，我一开始还用全局变量，结果到递归组件就失效了，还是按官网来比较好 -->
          <Menu :menuList="useStore.useRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ fold: isFold.fold }">
      <Tabbar />
    </div>
    <!-- 内容展示区,这里封装成组件，添加动画效果 -->
    <div class="layout_main" :class="{ fold: isFold.fold }">
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
// 引入仓库
import useUserStore from "@/store/modules/user";
let useStore = useUserStore();
import Main from "./main/index.vue";

// 引入激活的路由
import { useRoute } from "vue-router";
let $route = useRoute();

// 引入封装的顶部bar
import Tabbar from "./tabbar/index.vue";
// 引入折叠信息
import useLayoutStore from "@/store/modules/LayoutStore";
let isFold = useLayoutStore();
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  // background: #f1f1f1;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.6s;
    &.fold {
      width: $base-menu-min-width;
    }
  }
  .scrollbar {
    width: 100%;
    height: calc(100vh - $base-menu-logo-height);
    color: $base-menu-color;
    // --el-menu-bg-color: $base-menu-background;
    // --el-menu-text-color: $base-menu-color;

    // 了解一下官网所说的建议使用样式--el-menu-bg-color是什么意思,最终测试没有效果，还是得用backgroundColor
    // 以及注意下面.el-menu需要用类选择器，原因暂时不明
    .el-menu {
      border-right: none;
    }
  }
  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    // background: #e3e2e1;
    transition: all 0.6s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    box-sizing: border-box;
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    // background: url("@/assets/images/background.jpg") no-repeat;
    background-size: cover;
    overflow: auto; //这样可以实现这个部分滚动其他不动
    transition: all 0.6s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>