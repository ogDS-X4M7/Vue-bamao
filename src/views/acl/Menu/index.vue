<template>
  <div>
    <!-- 菜单数据展示 -->
    <el-table
      :data="MenuData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <!-- default-expand-all -->
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="value" label="权限值" />
      <el-table-column prop="updateDate" label="修改时间" />
      <el-table-column label="操作">
        <template #="{ row, $index }">
          <div>
            <el-button
              type="warning"
              size="small"
              :disabled="!row.children"
              @click="addMenu(row)"
              >{{ row.level >= 3 ? "添加功能" : "添加菜单" }}</el-button
            >
            <el-button
              type="primary"
              size="small"
              :disabled="row.level === 1"
              @click="editMenu(row)"
              >编辑</el-button
            >
            <el-popconfirm
              width="220"
              icon="InfoFilled"
              icon-color="#626AEF"
              :title="`确定删除${row.name}吗`"
              @confirm="delMenuData(row)"
              confirm-button-text="确定"
              cancel-button-text="取消"
            >
              <template #reference>
                <el-button
                  type="danger"
                  icon="Delete"
                  size="small"
                  :disabled="row.level === 1"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加菜单对话框 -->
    <el-dialog v-model="dialogFormVisible" title="添加菜单" width="500">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入菜单名称"
          />
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-input
            v-model="form.permissionValue"
            autocomplete="off"
            placeholder="请输入权限值"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="save"> 确定 </el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import {
  reqMenuData,
  uploadMenuData,
  deleteMenuData,
} from "@/api/acl/Menu/index.ts";
import { ElNotification } from "element-plus";
// 菜单数据
let MenuData = ref([]);
let title = ref("添加菜单");
// 对话框数据设置
const dialogFormVisible = ref(false);
const formLabelWidth = "50px";
const form = reactive({
  name: "",
  permissionValue: "",
  level: "",
  pid: "",
});

// 菜单数据请求方法
const getMenuData = async () => {
  try {
    let result = await reqMenuData();
    // console.log(result.data.menuData);
    MenuData.value = result.data.menuData;
  } catch (error) {
    ElNotification({
      type: "error",
      message: error.message,
    });
  }
};

// （添加菜单按钮）----添加菜单
const addMenu = (row) => {
  Object.assign(form, {
    id: "",
    name: "",
    permissionValue: "",
    level: "",
    pid: "",
  });
  dialogFormVisible.value = true;
  form.pid = row.id;
  form.level = row.level;
};

// 编辑按钮----更新菜单
const editMenu = (row) => {
  /*console.log(row);*/
  Object.assign(form, {
    id: row.id,
    name: row.name,
    permissionValue: row.value,
    level: row.level,
    pid: row.pid,
  });
  dialogFormVisible.value = true;
};

// （确定按钮）---添加或更新菜单
const save = async () => {
  dialogFormVisible.value = false;
  try {
    let result = await uploadMenuData(form);
    ElNotification({
      type: "success",
      message: result.message,
    });
  } catch (error) {
    ElNotification({
      type: "error",
      message: error.message,
    });
  }
  getMenuData();
};

// (删除按钮) ----删除菜单
const delMenuData = async (row) => {
  try {
    await deleteMenuData({ id: row.id });
  } catch (error) {
    ElNotification({
      type: "error",
      message: error.message,
    });
  }
  getMenuData();
};
// 挂载完毕获取数据
onMounted(() => {
  getMenuData();
});
</script>

<style scoped>
</style>