<template>
  <el-card>
    <el-button type="primary" icon="Plus" @click="addTrademark">
      添加品牌
    </el-button>
    <el-table :data="tableData" border style="width: 100%; margin: 20px 0px">
      <el-table-column
        prop="index"
        label="序号"
        width="80px"
        align="center"
        type="index"
        :index="myindex(data)"
      />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column label="品牌LOGO">
        <template #="{ row }">
          <!-- <h5>{{row}}</h5> -->
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row }">
          <!-- <h5>{{row}}</h5> -->
          <el-button
            type="primary"
            icon="Edit"
            @click="edit(row)"
            title="编辑"
          ></el-button>
          <el-popconfirm
            :title="`确定要删除${row.tmName}吗？`"
            width="200px"
            icon="Delete"
            icon-color="#f56c6c"
            @confirm="delTrademark(row)"
          >
            <template #reference>
              <el-button type="danger" icon="Delete" title="删除"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="demo-pagination-block">
      <div class="demonstration"></div>
      <el-pagination
        v-model:current-page="data.currentPage"
        v-model:page-size="data.pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @change="getBrandData(data)"
      />
    </div>

    <!-- 对话框,通过设置保证只能通过取消按钮来关闭对话框 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="title"
      width="600"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <!-- 校验规则的使用流程：把要校验的表单form使用ref获取实例对象
    model绑定对象，对于底下要校验的item里面的值绑定prop，是model所绑定的form里的值才行
    从而触发校验，:rules定义校验规则，在下面写reactive绑定这里的prop，
    给出参数，是否必填、触发校验方式、使用的校验方法
    再定义校验方法，它可以自动获得value，这里prop：name的文本内容，logoUrl的url 
    同时注意callback是必须使用的，不论正确错误都是需要返回告知的，之前想偷懒
    判断条件只写了错误的时候callback把错误信息传回，但这会导致正确的时候也没有接着执行
    会一直等callback等不到，比如之前就会出现，写了name，没写url，点提交的确没通过（估计全部正确当时也不会通过）
    而且图片下也没有显示已经写好的报错信息，这就是因为name没有callback，它有写name符合规范
    但是因为没写正确时候的callback()，导致它卡在那里，正确的不返回，后面错误的也不会执行了-->
      <el-form :model="form" style="width: 90%" :rules="rules" ref="formref">
        <el-form-item
          label="品牌名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item
          label="品牌logo"
          :label-width="formLabelWidth"
          prop="logoUrl"
        >
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action="/api/uploadPhotoData"
            :headers="{ token: userStore.token }"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirm"> 确认 </el-button>
          <el-button @click="cancel"> 取消 </el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>



<script setup lang="ts">
// import { Plus } from "@element-plus/icons-vue";
// 一直误会自己全局组件没生效，是因为习惯性icon加了引号，但是
// 这个算常量不是变量不需要变化，根本不用冒号
import { ref, onMounted, reactive } from "vue";
// // 当前页码
// let currentPage = ref<number>(1);
// // 每一页展示多少条数据
// let limit = ref<number>(3);
// 引入接口方法
import {
  reqBrandData,
  reqBrandImg,
  reqBrandName,
  reqDelBrand,
} from "@/api/product/trademark";

// 定义请求时需要的请求体对象
let data = reactive({
  currentPage: 1,
  pageSize: 3,
});
let tableData = ref([]);
let total = ref(1);

// 引用仓库传token
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();

// 样式设置
let dialogFormVisible = ref(false);
const formLabelWidth = "90px";

// 添加传递参数
let form = reactive({
  name: "",
  logoUrl: "",
});

// 设置不同情况：添加/修改时的对话框标题
let title = ref("");

// 获取表单对象，用于使用校验方法,callback是必须使用的
let formref = ref();
// 自定义校验函数
const validatorName = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 2) {
    callback(new Error("品牌名称长度至少两位"));
  } else {
    callback();
  }
};
const validatorUrl = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("品牌图片必须上传"));
  } else {
    callback();
  }
};
// 设置校验规则
const rules = reactive({
  // 这里使用blur最好，因为直接在取消里面做校验的清空，而取消里面同时还对这里绑定校验的对象属性做了清空
  // 如果用change，校验的清空和属性清空是同步执行，但是校验函数会是异步执行，被放到最后
  // 结果校验清空执行后，还执行了一次校验函数
  // 另外对于图片不需要写触发方式，写了也不会触发，没有用的，它属于文件，不像文本那样获取然后触发
  name: [{ required: true, trigger: "blur", validator: validatorName }],
  logoUrl: [{ required: true, validator: validatorUrl }],
});

// 传送前做检查，规定传递文件类型，大小等（传送前）
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type !== "image/jpeg" &&
    rawFile.type !== "image/gif" &&
    rawFile.type !== "image/png"
  ) {
    ElMessage.error("传递的图片必须是jpg/png/gif格式");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("传送图片大小不能超过2MB");
    return false;
  }
  return true;
};

// 照片传给服务器后，显示到本地（传送后）
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  form.logoUrl = URL.createObjectURL(uploadFile.raw!);
  formref.value.clearValidate("logoUrl");
};

// 添加标题
const addTrademark = () => {
  title.value = "添加品牌";
  dialogFormVisible.value = true;
};

// 确认
const confirm = async () => {
  // 确认时先校验，没过后面都不执行
  try {
    await formref.value.validate();
    dialogFormVisible.value = false;
    await reqBrandImg(form);
    await reqBrandName(form);
    // 其实封装成一个函数一个接口就够，
    // 但是写后端的人有的功能没实现，实现的也不好
    // 我就做了很多更改了，至于他实现的这个改名功能，
    // 就偶尔尊重他一下吧，也体验一下配合后端工作的感受
    // 不用前后端全靠自己写了
    form.name = "";
    form.logoUrl = "";
    form.id = "";
    getBrandData(data);
    // 添加或修改后都及时更新数据，重新获取
  } catch (error) {
    // 什么都不用做，只是为了不让控制台显示报错
    // 之前不敢try catch担心破坏validate的自带报错
    // 但实际上这样是不会影响的，因为那个自带报错是validate方法内部的
    // 我调用了validate方法就会执行，至于try catch是对返回的promise错误进行处理
    // 二者并不冲突，处理错误肯定不会影响函数内部的执行
  }
};

// 取消
function cancel() {
  dialogFormVisible.value = false;
  form.name = "";
  form.logoUrl = "";
  form.id = "";
  formref.value.clearValidate("name");
  formref.value.clearValidate("logoUrl");
}

// 编辑
function edit(row) {
  title.value = "修改品牌";
  dialogFormVisible.value = true;
  // console.log(row);
  // console.log(row.id);
  form.name = row.tmName;
  form.logoUrl = row.logoUrl;
  form.id = row.id;
}

// 删除
const delTrademark = async (row) => {
  form.name = row.tmName;
  form.logoUrl = row.logoUrl;
  form.id = row.id;
  await reqDelBrand(form);
  form.name = "";
  form.logoUrl = "";
  form.id = "";
  getBrandData(data);
};

// 获取整个面板数据
async function getBrandData(data) {
  // 现在才知道异步语句的重要性，如果不用异步，没有await去阻塞
  // 输出的语句会比reqBrandData这个异步任务先执行，因为内部有很多次封装
  // 还要做axios请求，所以只有用异步拦住，才能正常输出结果
  let result = await reqBrandData(data);
  // console.log(result);
  tableData.value = result.data.tableData;
  total.value = result.data.total;
}
onMounted(() => {
  getBrandData(data);
});

// 后来自己看api文档尝试弄自定义索引
const myindex = (data) => {
  return (data.currentPage - 1) * data.pageSize + 1;
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style scoped>
.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>