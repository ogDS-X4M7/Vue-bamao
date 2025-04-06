<template>
  <!-- <h1>{{ menuList }}</h1> -->
  <template v-for="(item, index) in menuList" :key="item.path">
    <template v-if="item.meta.isShow">
      <!-- 没有孩子最简单，直接放就行 -->
      <el-menu-item v-if="!item.children" :index="item.path" @click="routeto">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 补充：这里的折叠指的是点击layout顶部tabaar面包屑里的折叠按钮传递参数给menu的collapse参数实现的折叠 -->
        <!-- 设置折叠的话是把插槽内的东西收起来，所以图标放插槽外，文字插槽内
        但对于el-sub-menu又不同，得把东西放插槽里才会显示，并且自动折叠文字不折叠图标 -->
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>

      <!-- 如果只有一个孩子，直接孩子放上来就好了，没必要弄成列表一样 -->
      <el-menu-item
        v-else-if="item.children.length === 1"
        :index="item.children[0].path"
        @click="routeto"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>

      <!-- 如果有多个孩子 -->
      <el-sub-menu v-else :index="item.path">
        <template #title>
          <!-- el-sub-menu又不同，得把东西放插槽里才会显示，并且自动折叠文字不折叠图标
          如果把图标放插槽外，图标会跑到折叠内容里去显示，很奇怪 -->
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 多个孩子相当于二级的这个Menu,直接递归把孩子当menuList传进去，再遍历操作 -->
        <!-- 要注意观察，官网写法上面那个插槽就是单纯用来写标题，另外展开的内容是不在插槽里写的
      之前我把Menu写到上面template过，结果就是没有缩进，全在一行，都算成标题了，现在写在下面才是对的 -->
        <Menu :menuList="item.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
const props = defineProps(["menuList"]);
import { useRouter } from "vue-router";
let $router = useRouter();
function routeto(vc) {
  // console.log("跳转到", vc.index);
  $router.push(vc.index);
  // console.log(vc);
}
</script>
// 两个script必须用相同语言
<script lang="ts">
export default {
  // 递归组件必须要有名字
  name: "Menu",
};
</script>

<style scoped lang="scss">
</style>