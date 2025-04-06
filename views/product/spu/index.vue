<template>
  <div>
    <Category style="margin-bottom: 10px" :showflag="showflag" />
    <div v-show="!showflag">
      <el-card>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!AttrData.c2id"
          @click="addPlatAttr"
          >添加SPU</el-button
        >
        <el-table
          :data="AttrData.SPUarr"
          border
          style="width: 100%; margin: 20px 0px"
        >
          <el-table-column
            prop="index"
            label="序号"
            width="80px"
            align="center"
            type="index"
          />
          <!-- :index="myindex(data)" -->
          <el-table-column prop="name" label="SPU名称" width="150px" />
          <el-table-column label="SPU概述">
            <!-- prop="value.tag"实现不了，什么都不会显示 -->
            <template #="{ row }">
              <el-tag
                v-for="item in row.value"
                :key="item.tag"
                style="margin-right: 5px"
                :round="true"
              >
                <!-- closable这个属性,然后设置删除函数close也能实现删除 -->
                {{ item.tag }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="SPU操作" width="150px">
            <template #="{ row, $index }">
              <el-button
                type="primary"
                icon="Edit"
                @click="edit($index)"
              ></el-button>
              <el-popconfirm
                width="220"
                title="确定要删除这条属性吗？"
                icon="DeleteFilled"
                @confirm="del($index)"
              >
                <template #reference>
                  <el-button type="danger" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 其它页面拆分成子组件，因为这部分不想做了，弄个这样的静态页面就可以了 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import useAttrData from "@/store/modules/attr.ts";
import { ElNotification } from "element-plus";
import { ref, reactive, nextTick, onBeforeUnmount, onMounted } from "vue";
let AttrData = useAttrData();
// 创建展示标志，实现两张卡片的切换--属性展示卡片 和 添加修改属性卡片
let showflag = ref(false);
// 设置请求报文所需的内容(请求体)
let changedata = reactive({
  // id修改有，添加无
  name: "",
  value: [],
  categoryid: "",
});

// 序号计算函数
const myindex = (index: number) => {
  return index + 1;
};
// 后面发现组件复用，方法调用需要区分，为了Category能正常使用change，补充信号并在挂载时填写
onMounted(() => {
  AttrData.reqProduct = "SPU";
});

onBeforeUnmount(() => {
  AttrData.$reset();
});

// 这边是外层的方法----for第一张卡片（属性展示卡片）
// 最外层的添加平台属性
const addPlatAttr = () => {
  // ！！！很常用的一个方法，因为不能直接把对象替换给changdata，那样会换引用地址，失去响应式
  // 但assign不会，下面是关于这个方法的讲解：
  // Object.assign() 静态方法将一个或者多个源对象中所有可枚举的自有属性复制到目标对象，并返回修改后的目标对象。
  Object.assign(changedata, {
    name: "",
    value: [],
    categoryid: "",
  });
  showflag.value = !showflag.value;
};

// 编辑,应该与上面的添加去做对比，因为它和上面的添加函数才是打开第二张卡片的方法
const edit = ($index) => {
  Object.assign(
    changedata,
    JSON.parse(JSON.stringify(AttrData.SPUarr[$index]))
  );
  // 单纯用obj的assign方法浅拷贝的话，会出现修改数组就直接修改原数据
  // 比如添加属性但是取消，会看到添加的属性仍然显示，虽然刷新后仍然从后端拿到正确数据
  // 能够刷新掉，但这也是属于bug，应该采用深拷贝来避免
  showflag.value = !showflag.value;
};

// 删除
const del = async ($index) => {
  // 其实只需要一个id就足够了
  await AttrData.delAttr({ id: AttrData.SPUarr[$index].id });
  await AttrData.getend();
};
</script>

<style scoped>
</style>