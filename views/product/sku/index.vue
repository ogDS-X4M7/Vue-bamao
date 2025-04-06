<template>
  <el-card>
    <el-table
      :data="AttrData.SKUarr"
      border
      style="width: 100%; margin: 20px 0px"
    >
      <el-table-column label="序号" width="80" align="center" />
      <el-table-column label="名称" width="180" />
      <el-table-column label="描述" width="180" />
      <el-table-column label="默认图片" width="180" />
      <el-table-column label="重量(g)" width="180" />
      <el-table-column label="价格(元)" width="180" />
      <el-table-column label="操作" width="300" fixed="right" />
    </el-table>
    <div class="demo-pagination-block">
      <div class="demonstration"></div>
      <el-pagination
        v-model:current-page="data.currentPage"
        v-model:page-size="data.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="prev, pager, next, jumper, ->,sizes, total"
        :total="40"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useAttrData from "@/store/modules/attr";
import { ElNotification } from "element-plus";
import { reactive, onMounted } from "vue";
let AttrData = useAttrData();
let data = reactive({
  currentPage: 1,
  pageSize: 10,
});
onMounted(() => {
  ElNotification({
    type: "success",
    message: "模块开发中,暂无数据...",
  });
});
</script>

<style scoped>
</style>