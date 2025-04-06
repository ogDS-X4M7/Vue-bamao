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
            @click="searchUser"
            :disabled="!keyword"
          >
            搜索
          </el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 用户展示 -->
    <el-card>
      <el-button type="primary" style="margin-left: 10px" @click="addUser">
        添加
      </el-button>
      <el-button type="danger" @click="delUsers" :disabled="!delIdsLength"
        >批量删除</el-button
      >
      <el-table
        :data="userarr"
        border
        style="width: 100%; margin: 10px 0px"
        @selection-change="selectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>

        <el-table-column
          width="50"
          align="center"
          label="#"
          type="index"
          :index="myindex"
        ></el-table-column>

        <el-table-column
          width="120"
          align="center"
          label="id"
          prop="id"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          width="120"
          align="center"
          label="用户名字"
          prop="username"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          width="120"
          align="center"
          label="用户昵称"
          prop="userNumber"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          width="120"
          align="center"
          label="用户角色"
          prop="userRole"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          width="120"
          align="center"
          label="创建时间"
          prop="createdate"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          width="120"
          align="center"
          label="更新时间"
          prop="updatedate"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column align="center" label="操作">
          <template #="{ row }">
            <el-button
              type="warning"
              icon="Avatar"
              size="small"
              @click="setRole(row)"
              >分配角色</el-button
            >
            <el-button
              type="primary"
              icon="Edit"
              @click="editUser(row)"
              size="small"
            >
              编辑
            </el-button>
            <el-popconfirm
              width="220"
              icon="InfoFilled"
              icon-color="#626AEF"
              :title="`确定删除${row.userNumber}吗`"
              @confirm="delUser(row)"
              confirm-button-text="确定"
              cancel-button-text="取消"
            >
              <template #reference>
                <el-button type="danger" icon="Delete" size="small">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="demo-pagination-block">
        <div class="demonstration"></div>
        <el-pagination
          v-model:current-page="data.currentPage"
          v-model:page-size="data.pageSize"
          :page-sizes="[1, 3, 5, 7, 9, 11]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total  "
          :total="total"
          @change="getAclUserData(data)"
        />
      </div>
    </el-card>

    <!-- 抽屉--添加与编辑 -->
    <el-drawer v-model="drawer" :direction="'rtl'">
      <template #header>
        <h4>{{ drawerTitle }}</h4>
      </template>
      <template #default>
        <el-form :model="drawerUserData" :rules="rules" ref="drawerForm">
          <el-form-item label="用户姓名" prop="username">
            <el-input
              placeholder="请输入用户姓名"
              v-model="drawerUserData.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="userNumber">
            <el-input
              placeholder="请输入用户昵称"
              v-model="drawerUserData.userNumber"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input
              placeholder="请输入用户密码"
              v-model="drawerUserData.password"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="confirmClick">确认</el-button>
          <el-button @click="cancelClick">取消</el-button>
        </div>
      </template>
    </el-drawer>

    <!-- 抽屉--分配角色 -->
    <el-drawer v-model="drawerRole" :direction="'rtl'">
      <template #header>
        <h4>分配角色(职位)</h4>
      </template>
      <template #default>
        <el-form :model="drawerUserData">
          <el-form-item label="用户姓名">
            <el-input
              v-model="drawerUserData.username"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="checkedRoles"
              @change="handleCheckedRolesChange"
            >
              <el-checkbox
                v-for="(role, index) in roles"
                :key="index"
                :value="role"
              >
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="drawerRoleconfirm">确认</el-button>
          <el-button @click="cancelClick">取消</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from "vue";
import {
  reqAclUserData,
  createAclUserData,
  editAclUserData,
  deleteAclUserData,
  changeAclUserState,
  reqUserRoleData,
  uploadUserRoleData,
} from "@/api/acl/user/index.ts";
import { ElNotification } from "element-plus";
// 用于识别当前使用账号是否是被修改的账号
import useUserStore from "@/store/modules/user.ts";
let userStore = useUserStore();

// 按页面大小请求数据所需参数data
let data = reactive({
  currentPage: 1,
  pageSize: 5,
  keyword: "",
});
// 页面用户数据展示
let userarr = ref([]);
// 分页器总条目数展示
let total = ref(0);

// 获取数据，封装起来以供分页器变化时可调用
const getAclUserData = async (data) => {
  try {
    let result = await reqAclUserData(data);
    userarr.value = result.data.userData;
    // console.log(userarr.value);
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
  getAclUserData(data);
});

// 自定义序号方法
const myindex = ($index: number) => {
  return (data.currentPage - 1) * data.pageSize + $index + 1;
};

// 抽屉标题
let drawerTitle = ref("添加用户");
// 通过抽屉添加/修改用户所需参数（顺便与分配角色共用好了）
let drawerUserData = reactive({
  id: "",
  // 账号、昵称
  userNumber: "",
  // 用户名字
  username: "",
  password: "",
});

// (添加按钮)添加用户
const addUser = () => {
  Object.assign(drawerUserData, {
    id: "",
    // 账号、昵称
    userNumber: "",
    // 用户名字
    username: "",
    password: "",
  });
  // 新方法，可取代clearValidate，clearValidate要一个字段一个字段地清空
  // nextTick(() => {
  //   drawerForm.value.clearValidate("username");
  //   drawerForm.value.clearValidate("userNumber");
  //   drawerForm.value.clearValidate("password");
  // });
  drawerTitle = "添加用户";
  drawer.value = true;
  // 这里有一个可能的报错，如果我的nextTick没有写在这里最底部，写在drawer.value = true;之前
  // 那么第一次使用这个addUser的时候就会因为drawer没有被渲染过，没有实例对象，而使用其不存在的实例对象drawerForm
  // 出现报错，所以放到最下面可以解决该问题，而且必须使用nextTick，因为正如上面所说，要渲染后操作才不会报错，
  // 不用nextTick，就会先执行同步语句才去渲染，那还是会报错，nextTick起到等渲染完毕才执行，避免报错的作用，
  // 但还是必须写在drawer.value = true;之后！！！
  nextTick(() => {
    drawerForm.value.resetFields();
  });
};
// (编辑按钮)修改用户
const editUser = (row) => {
  drawerTitle = "修改用户";
  drawer.value = true;
  nextTick(() => {
    drawerForm.value.resetFields();
    Object.assign(drawerUserData, row);
    // 包括这里也是一样的体现，防止第一次点击就是编辑，nextTick放到drawer.value = true;下面
    // 然后由于nextTick等渲染完毕才执行，避免Object.assign(drawerUserData, row);作为同步语句反而优先执行
    // 就得把Object.assign(drawerUserData, row);也放到nextTick里，否则像下面注释掉的那句去执行，
    // 就导致Object.assign执行后才执行resetFields，编辑页面打开将是被清空的输入栏
  });
  // Object.assign(drawerUserData, row);
};

// --------抽屉的使用
// 编辑按钮抽屉
// 参数，用于标志抽屉显隐
const drawer = ref(false);
// 抽屉关闭按钮
const handleClose = (done: () => void) => {
  drawer.value = false;
  drawerRole.value = false;
};
// 抽屉取消按钮
function cancelClick() {
  drawer.value = false;
  drawerRole.value = false;
}
// 抽屉确认按钮
async function confirmClick() {
  try {
    await drawerForm.value.validate();
    let result = await createAclUserData(drawerUserData);
    // console.log(result);
    if (result.code === 200) {
      ElNotification({
        type: "success",
        message: result.message,
      });
    } else {
      ElNotification({
        type: "error",
        message: result.message,
      });
    }
    // 上传完数据后要关闭抽屉，请求新数据
    drawer.value = false;
    getAclUserData(data);
    // 如果修改了当前账号信息，应该提示，让token失效，重新登陆
    await userStore.userInfo(); //重新更新信息，避免用于判断的用户名被修改无法识别
    if (drawerUserData.username === userStore.username) {
      //相同则说明当前账号修改了自己的信息
      ElNotification({
        type: "info",
        message: "当前账号信息变更,请重新登陆",
      });
      // 删token和信息，退出登录
      await userStore.userExit();
      // 浏览器自动刷新方法,看了一下弹幕有提到不建议用，我这里移除token和账号信息之后其实就可以了
      // 因为下一步不论做什么操作都会被退到登录页了
      // window.location.reload();
    }
  } catch (error) {}
}

// 获取表单实例对象，才能确认时进行校验
let drawerForm = ref();
// 校验函数
const validatename = (rule: any, value: any, callback: any) => {
  // console.log(value);
  if (value.trim()) {
    callback();
  } else {
    callback(new Error("用户姓名不可为空"));
  }
};
const validateNumber = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 4) {
    callback(new Error("用户昵称至少4位"));
  } else {
    callback();
  }
};
const validatepassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 6) {
    callback(new Error("用户密码至少6位"));
  } else {
    callback();
  }
};
// 校验规则
const rules = reactive({
  username: [{ required: true, trigger: "blur", validator: validatename }],
  userNumber: [{ required: true, trigger: "blur", validator: validateNumber }],
  password: [{ required: true, trigger: "blur", validator: validatepassword }],
});

// 角色分配抽屉
// 参数，用于标志抽屉显隐
const drawerRole = ref(false);
// (分配角色按钮)分配角色
const setRole = async (row) => {
  drawerRole.value = true;
  Object.assign(drawerUserData, row);
  let result = await reqUserRoleData({ id: row.id });
  // console.log(result);
  roles.value = result.data.allRolesList;
  checkedRoles.value = result.data.assignRoles;
};
// 确定，取消按钮不用写，共用就行
const drawerRoleconfirm = async () => {
  let dataForRole = {
    id: drawerUserData.id,
    userRole: checkedRoles.value,
    // 这里之前忘了用value，卡了很久，请务必小心使用ref调用它们的值的时候记得要用value！！！！
  }; //临时创建接口需要接收的请求体
  try {
    // console.log(dataForRole);
    let result = await uploadUserRoleData(dataForRole);
    ElNotification({
      type: "success",
      message: result.message,
    });
    // 分配发送完毕，关闭窗口，重新获取数据
    drawerRole.value = false;
    getAclUserData(data);
  } catch (error) {
    ElNotification({
      type: "error",
      message: error.message,
    });
  }
};

// 全选多选复选框的使用---角色分配
import type { CheckboxValueType } from "element-plus";
let checkAll = ref(false);
let isIndeterminate = ref(true);
// 已勾选选项
let checkedRoles = ref([]);
// 可选项目(全部项目)
let roles = ref([]);

// 使用全选框时处理函数--取消不确定状态
const handleCheckAllChange = (val: CheckboxValueType) => {
  console.log(val);
  checkedRoles.value = val ? roles.value : [];
  isIndeterminate.value = false;
};
// 使用复选框时处理函数--选择是否切换不确定状态
const handleCheckedRolesChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === roles.value.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < roles.value.length;
};

// (删除按钮)删除用户、账号
const delUser = async (row) => {
  // console.log(row);
  try {
    let result = await deleteAclUserData({ id: row.id });
    ElNotification({
      type: "success",
      message: result.message,
    });
    // 发完请求删完数据记得重新获取页面数据
    getAclUserData(data);
  } catch (error) {
    ElNotification({
      type: "error",
      message: error.message,
    });
  }
};

// 收集被勾选将要批量删除用户id
let deleteIds = [];
// 设置响应式数据收集长度，用于给批量删除按钮作为禁用标识
let delIdsLength = ref(0);
// 通过table的change事件将勾选项传给数组
const selectionChange = (val) => {
  // console.log(val[0].id);
  deleteIds = []; //每次都应该清空再处理，否则先1后2，1选中放入一次，2选中的时候1还会再次被放入，会重复
  val.forEach((item) => {
    deleteIds.push(item.id);
  });
  delIdsLength.value = deleteIds.length;
  // console.log(deleteIds);
};
// (批量删除按钮) 批量删除用户、账号
const delUsers = async () => {
  try {
    let result = await deleteAclUserData({ idArr: deleteIds });
    ElNotification({
      type: "success",
      message: result.message,
    });
    // 发完请求删完数据记得重新获取页面数据
    getAclUserData(data);
  } catch (error) {
    ElNotification({
      type: "error",
      message: error.message,
    });
  }
};

// 搜索相应的关键词绑定
let keyword = ref("");
// (搜索按钮)搜索用户名字
const searchUser = async () => {
  data.keyword = keyword;
  data.currentPage = 1; //同时让页面跳到第一页
  await getAclUserData(data);
  // 原本考虑需不需要及时清空data.keyword以避免干扰其他使用getAclUserData(data)的地方
  // 后来思考了一下，重置的时候才需要清空，其他调用getAclUserData(data)如果在重置前，搜索后
  // 大概率本来就是只想要看到搜索词相关的数据，但keyword还是得专门重新创建变量，
  // 因为直接放data里的话，上面是考虑了重置前，搜索后和重置后(清空了当然不用担心)
  // 但还有搜索前，如果用户只是搜索框里填了内容，但还没有搜索，这时候是不能把内容读取进data里的
  // 所以务必创建一个关键词绑定，并且在搜索按钮被点击后才能赋给的data
};
// 重置
const resetSearch = async () => {
  keyword.value = "";
  data.keyword = "";
  await getAclUserData(data);
};
</script>

<style scoped>
</style>