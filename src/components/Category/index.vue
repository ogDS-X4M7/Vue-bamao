<template>
  <div>
    <!-- 三级分类全局组件 -->
    <el-card>
      <!-- 虽然可以直接:disabled="props.showflag，但是会报错期待的是布尔类型，所以写成三元
      后来直接把showflag改成布尔值了，不需要三元了 -->
      <el-form :inline="true" :disabled="props.showflag">
        <el-form-item label="一级分类">
          <el-select
            style="width: 240px"
            v-model="AttrData.c1id"
            @change="change"
          >
            <el-option
              v-for="item in AttrData.c1arr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            style="width: 240px"
            v-model="AttrData.c2id"
            @change="changeEnd"
          >
            <el-option
              v-for="item in AttrData.c2arr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="三级分类">
          <el-select title="手机" style="width: 240px">
            <el-option label="北京"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useAttrData from "@/store/modules/attr.ts";
import { ElNotification } from "element-plus";
import { onMounted } from "vue";
let props = defineProps(["showflag"]);
let AttrData = useAttrData();

const change = async () => {
  AttrData.c2id = "";
  AttrData.Attrarr = [];
  await AttrData.getc2();
};
const changeEnd = async () => {
  if (AttrData.c2id) {
    AttrData.Attrarr = [];
    // 本来也觉得不需要清空，很快get重置了，但观感上发现前面的标签都不会立马消失
    // 而是有卡顿，因此选择先清空
    if (AttrData.reqProduct === "attr") {
      await AttrData.getend();
    } else if (AttrData.reqProduct === "SPU") {
      ElNotification({
        type: "success",
        message: "模块开发中,暂无数据...",
      });
    } else {
      console.log("未来的其他组件传递信号执行的其他方法");
    }
  }
};
onMounted(async () => {
  await AttrData.getc1();
});
</script>

<style scoped>
</style>