<template>
<div>
       <!-- 搜索 -->
    <el-card style="margin-bottom: 20px;height:88px">
      <el-form :inline="true" style="margin: 5px 0px 15px 0px">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="keyword"</el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="searchRole"
            :disabled="!keyword"
          >
            搜索
          </el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 角色展示 -->
    <el-card>
      <el-button type="primary" style="margin-left: 10px" @click="addRole" icon="Plus">
        添加角色
      </el-button>
      <el-table
        :data="rolearr"
        border
        style="width: 100%; margin: 10px 0px"
      >

        <el-table-column
          width="50"
          align="center"
          label="#"
          type="index"
          :index="myindex"
        ></el-table-column>

        <el-table-column
          width="200"
          align="center"
          label="id"
          prop="id"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          width="200"
          align="center"
          label="职位名称"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          width="200"
          align="center"
          label="创建时间"
          prop="createdate"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          width="200"
          align="center"
          label="更新时间"
          prop="updatedate"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column align="center" label="操作">
          <template #="{ row }">
            <!-- 超级管理员权限不可修改 -->
            <el-button
              type="warning"
              icon="Lock"
              size="small"
              @click="setRole(row)"
              :disabled = "row.id===1"
              >分配权限</el-button
            >
            <el-button
              type="primary"
              icon="Edit"
              @click="editRole(row)"
              size="small"
            >
              编辑
            </el-button>
            <el-popconfirm
              width="220"
              icon="InfoFilled"
              icon-color="#626AEF"
              :title="`确定删除${row.roleName}吗`"
              @confirm="delRole(row)"
              confirm-button-text="确定"
              cancel-button-text="取消"
            >
              <template #reference>
                <el-button type="danger" icon="Delete" size="small" :disabled = "row.id===1">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="data.currentPage"
          v-model:page-size="data.pageSize"
          :page-sizes="[1, 3, 5, 7, 9, 11]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total  "
          :total="total"
          @change="getRoleData(data)"
        />
      </div>
    </el-card>
    <!-- 对话框 -->
   <el-dialog v-model="dialogFormVisible" :title="title" width="500">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
        <el-input v-model="form.roleName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
         <el-button type="primary" @click="save">
          确定
        </el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 抽屉--角色权限管理 -->
  <el-drawer v-model="drawer2">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <div>
        <el-tree
          style="max-width: 600px"
          :data="permissionData"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :default-checked-keys="selectedIds"
          :props="defaultProps"
          ref="treeRef"
        />
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="confirmClick">确认</el-button>
        <el-button @click="cancelClick">取消</el-button>
      </div>
    </template>
  </el-drawer>
</div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from "vue";
import {
  reqRoleData,
  uploadRoleData,
  delRoleData,
  reqPermissionData,
  changePermissionData,
} from "@/api/acl/role/index.ts";
import { ElNotification } from "element-plus";
import useUserStore from "@/store/modules/user.ts";

let userStore = useUserStore(); //把用户仓库拿过来调用数据进行对比
// console.log(userStore.userRole);
let userroleName = userStore.userRole.split(",");
// console.log(userroleName);
let needFresh = false;

// 对话框属性
const dialogFormVisible = ref(false);
const formLabelWidth = "80px";
// 对话框收集到的数据
const form = reactive({
  roleName: "",
});
// 设置不同情况：添加/修改时的对话框标题
let title = ref("");

// 按页面大小请求数据所需参数data
let data = reactive({
  currentPage: 1,
  pageSize: 5,
  keyword: "",
});
// 页面角色数据展示
let rolearr = ref([]);
// 分页器总条目数展示
let total = ref(0);
// 获取数据，封装起来以供分页器变化时可调用
const getRoleData = async (data) => {
  try {
    let result = await reqRoleData(data);
    rolearr.value = result.data.roleData;
    total.value = result.data.total;
  } catch (error) {
    ElNotification({
      type: "error",
      message: error.message,
    });
  }
};
// 挂载时就要获取数据
onMounted(async () => {
  getRoleData(data);
});
// 自定义序号方法
const myindex = ($index: number) => {
  return (data.currentPage - 1) * data.pageSize + $index + 1;
};

// 搜索相应的关键词绑定
let keyword = ref("");
// (搜索按钮)搜索用户名字
const searchRole = async () => {
  data.keyword = keyword;
  data.currentPage = 1;
  await getRoleData(data);
};
// 重置
const resetSearch = async () => {
  keyword.value = "";
  data.keyword = "";
  await getRoleData(data);
};

// 添加角色
const addRole = () => {
  title.value = "添加角色";
  Object.assign(form, {
    roleName: "",
    id: "",
  });
  dialogFormVisible.value = true;
  nextTick(() => {
    formRef.value.clearValidate("roleName");
  });
};
// 编辑角色
const editRole = (row) => {
  title.value = "修改角色";
  dialogFormVisible.value = true;
  nextTick(() => {
    formRef.value.resetFields();
    Object.assign(form, row);
    //  这里专门写两种，而且在编辑这边用reset，强化一下对nextTick的理解
  });
};

// 确定---上传角色信息
const save = async () => {
  try {
    await formRef.value.validate();
    let result = await uploadRoleData(form);
    //  console.log(result);
    ElNotification({
      type: "success",
      message: result.message,
    });
    dialogFormVisible.value = false;
    getRoleData(data);
  } catch (error) {}
};

// 添加编辑对话框校验
// 获取校验表单实例对象，从而进行表单全部内容校验
let formRef = ref();
// 自定义校验方法
const validateRoleName = (rule: any, value: any, callback: any) => {
  if (value.length < 2) {
    callback(new Error("角色名称至少两位"));
  } else {
    callback();
  }
};
// 校验规则
const rules = reactive({
  roleName: [{ required: true, trigger: "blur", validator: validateRoleName }],
});

// 抽屉管理信息
const drawer2 = ref(false);
// 取消按钮
function cancelClick() {
  drawer2.value = false;
}
// 确定按钮-----修改权限
async function confirmClick() {
  permissionChangeData.selected = treeRef.value.getCheckedKeys(true);
  // console.log(permissionChangeData);
  try {
    let result = await changePermissionData(permissionChangeData);
    drawer2.value = false;
    userroleName.forEach((item) => {
      // 检查当前用户是否正在修改自己有使用的角色
      if (item === permissionChangeData.roleName) {
        // 权限修改完毕，当更改的是自己的权限时，刷新页面
        needFresh = true;
      }
    });
    if (needFresh) {
      window.location.reload();
      needFresh = false;
    }
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
}
// 抽屉内的树形结构识别属性
const defaultProps = {
  children: "children",
  label: "name",
};
// 拿到树形结构的实例对象
let treeRef = ref();
// 角色分配权限所需数据
let permissionData = ref([]);
// 角色已分配权限自动选择----:default-checked-keys绑定一个由被选中选项的id构成的数组
let selectedIds = ref([]);
// 角色修改权限请求所需数据
let permissionChangeData = reactive({
  id: "",
  selected: [],
  roleName: "", //额外加一个名字去和用户信息作对比
});
// 收集已分配权限(最底部选项id)的方法
const getSelected = (permissionArray) => {
  permissionArray.forEach((item) => {
    if (item.children) {
      getSelected(item.children); // 有孩子就不是最底部,直接孩子去递归进最底部
    } else {
      //没有孩子就是最底部，如果权限给的是true就把id给数组收集起来
      if (item.select) {
        selectedIds.value.push(item.id);
      }
    }
  });
  return;
};
// (权限分配按钮)角色分配权限
const setRole = async (row) => {
  // console.log(row.id);
  permissionChangeData.id = row.id;
  permissionChangeData.roleName = row.roleName; //收集名字给用户数据作对比
  let result = await reqPermissionData({ id: row.id });
  permissionData = result.data.permissionData;
  selectedIds.value = []; //因为用的是push，一定要先清空
  getSelected(permissionData);
  drawer2.value = true;
};

// 删除按钮----删除角色
const delRole = async (row) => {
  try {
    let result = await delRoleData({ id: row.id });
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
  getRoleData(data);
};
</script>

<style scoped>
</style>