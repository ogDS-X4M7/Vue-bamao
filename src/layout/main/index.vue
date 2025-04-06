<template>
  <!-- 从vue3官网了解：生态系统-官方库下的vuerouter-教程-进阶下的routerview插槽 -->
  <!-- 这里是让main有了一个动画效果 -->
  <router-view v-slot="{ Component }" v-if="isRefresh">
    <transition name="fortrans" appear>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayoutStore from "@/store/modules/LayoutStore";
import { watch, ref, nextTick } from "vue";
let LayoutStore = useLayoutStore();
let isRefresh = ref(true);
watch([() => LayoutStore.fresh], () => {
  isRefresh.value = false;
  nextTick(() => {
    isRefresh.value = true;
  });
});
</script>

<style scoped lang="scss">
.fortrans-enter-from {
  opacity: 0;
}
.fortrans-enter-to {
  opacity: 1;
}
.fortrans-enter-active {
  transition: all 1s;
}
</style>