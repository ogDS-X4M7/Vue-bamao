<template>
  <!-- <el-icon>
    <Expand />
  </el-icon> -->
  <el-icon @click="isFold.fold = !isFold.fold">
    <component :is="isFold.fold ? Expand : Fold"></component>
  </el-icon>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="route in $route.matched"
      :key="route.path"
      :to="{ name: route.name }"
      v-show="route.meta.title"
    >
      <!-- 这里上面尝试过v-if一直报错，实际上v-for应该就是内含v-if，遍历到没有就false不生成，所以不能用两个
    只能用v-show!!! -->
      <el-icon>
        <component :is="route.meta.icon"></component>
      </el-icon>
      {{ route.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight, Expand, Fold } from "@element-plus/icons-vue";
import useLayoutStore from "@/store/modules/LayoutStore";
let isFold = useLayoutStore();
import { useRoute, useRouter } from "vue-router";
let $route = useRoute();
</script>

<style scoped lang="scss">
.el-breadcrumb {
  margin-left: 10px;
  .el-icon {
    vertical-align: center;
  }
}
</style>