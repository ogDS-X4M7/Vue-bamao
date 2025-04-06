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
          >添加平台属性</el-button
        >
        <el-table
          :data="AttrData.Attrarr"
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
          <el-table-column prop="name" label="属性名称" width="150px" />
          <el-table-column label="属性值名称">
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
          <el-table-column label="操作" width="150px">
            <template #="{ row, $index }">
              <el-button
                type="primary"
                icon="Edit"
                @click="edit($index)"
                title="编辑"
              ></el-button>
              <el-popconfirm
                width="220"
                title="确定要删除这条属性吗？"
                icon="DeleteFilled"
                @confirm="del($index)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    icon="Delete"
                    title="删除"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div v-show="showflag">
      <el-card>
        <el-form>
          <el-form-item label="属性名称">
            <el-input
              v-model="changedata.name"
              style="width: 120px"
              placeholder="请输入属性名称"
            />
          </el-form-item>
          <el-button
            type="primary"
            icon="Plus"
            @click="addAttr"
            :disabled="!changedata.name"
            ><!-- 如果还没写属性名称，就不能添加属性值 -->
            添加属性值
          </el-button>
          <el-table :data="changedata.value" style="margin: 10px 0px" border>
            <el-table-column
              label="序号"
              width="80"
              align="center"
              type="index"
              :index="myindex"
            ></el-table-column>
            <el-table-column label="属性值名称">
              <!-- 除了传递table绑定的数组row(遍历的元素，感觉类似let的作用域效果)，还可以传递当前遍历的index -->
              <template #="{ row, $index }">
                <el-input
                  v-show="row.flag"
                  v-model="row.tag"
                  placeholder="请输入属性值名称"
                  @blur="inputcheck(row, $index)"
                  :ref="(vc:any)=>inputArr[$index]=vc"
                ></el-input>
                <!-- 把自己的vc实例放进数组，只有拿到实例，才能使用focus函数，这也是这里处理起来的麻烦所在 -->
                <div v-show="!row.flag" @click="divToInput(row, $index)">
                  {{ row.tag }}
                </div>
                <!-- autofocus居然在有多个el-input时会失效，刚了解到 -->
              </template>
            </el-table-column>
            <el-table-column label="属性值操作">
              <template #="{ row, $index }">
                <el-button type="danger" icon="Delete" @click="delInput($index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="primary"
            @click="save"
            :disabled="!changedata.value.length || !changedata.name.trim()"
          >
            保存
          </el-button>
          <el-button type="primary" @click="cancel"> 取消 </el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAttrData from "@/store/modules/attr.ts";
import { ElNotification } from "element-plus";
import { ref, reactive, nextTick, onBeforeUnmount, onMounted } from "vue";
let AttrData = useAttrData();
// 这里是要实现AttrData.c2id变化时使用getend方法，最后放在前面文件用change完成了
// 最后发现想法没错，前面文件字母打错了而已
// let tableData = ref([]);
// tableData.value = AttrData.Attrarr;
// 输出发现没有响应式效果，尝试使用watch
// watch([() => AttrData.c2id], async () => {
//   if (AttrData.c2id) {
//     await AttrData.getend();
//     tableData.value = AttrData.Attrarr;
//     console.log(tableData);
//     console.log(AttrData);
//     console.log(AttrData.c2id);
//     console.log(AttrData.Attrarr);
//     console.log(AttrData.Attrarr.value);
//   }
// });
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
  AttrData.reqProduct = "attr";
});
// 销毁时清空方法：老师认为切换路由到别的地方时，回来应该把东西销毁
// 但是他视频里是只有category，也就是顶部有数据，下面没有
// 但我发现我的是有的，而且我认为使用过程中，切换到别的路由，再回来的时候
// 大概率用户还是要看之前看过的东西，根本没必要删除，我又没有他那样的显示bug，
// 故这里只是学习以下$reset方法，最后注释掉
// 最后又发现category是多个组件共用，所以应该每个组件使用前都必须清空
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
    id: "",
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
    JSON.parse(JSON.stringify(AttrData.Attrarr[$index]))
  );
  // 单纯用obj的assign方法浅拷贝的话，会出现修改数组就直接修改原数据
  // 比如添加属性但是取消，会看到添加的属性仍然显示，虽然刷新后仍然从后端拿到正确数据
  // 能够刷新掉，但这也是属于bug，应该采用深拷贝来避免
  showflag.value = !showflag.value;
};

// 删除
const del = async ($index) => {
  // 其实只需要一个id就足够了
  await AttrData.delAttr({ id: AttrData.Attrarr[$index].id });
  await AttrData.getend();
};

// 以下是内层的方法----for第二张卡片（添加修改属性卡片）
// 添加
const addAttr = () => {
  changedata.value.push({ tag: "", flag: true });
  // 添加后创造出输入属性框，需要自动聚焦
  nextTick(() => {
    inputArr[changedata.value.length - 1].focus();
  });
};

// 保存
const save = async () => {
  changedata.categoryid = AttrData.c2id;
  await AttrData.changeAttr(changedata);
  await AttrData.getend();
  showflag.value = !showflag.value;
};

const cancel = () => {
  showflag.value = !showflag.value;
};

// 检测输入属性值是否合法的方法
const inputcheck = (row, $index: number) => {
  row.flag = false;
  if (row.tag.trim()) {
    // 获取一个消去要检查是否重复元素的数组,
    // let tempdata = changedata.value;
    // 这里又犯了之前的错误，直接赋值变成引用，相当于浅拷贝！！！
    // 掌握一下下面三种深拷贝数组的方法
    // let tempdata = changedata.value.slice();//不传参或者0就是全部切下来返回，相当于深拷贝
    // let tempdata = changedata.value.concat();//用于合并两个或多个数组，此处不传入参数，即可实现数组的深拷贝
    // let tempdata = [...changedata.value]; //es6展开运算符，也可以实现深拷贝
    // 最后发现深拷贝无效果，才想起来这里数组里面存储的是对象，而上面的方法相当于一层深拷贝
    // 是无法拷贝到对象内部的内容的，其实还可以用json字符串实现深度深拷贝，
    // 但看到的文章说不推荐这种写法，可能有数据丢失，因此放弃使用我自己想的方法了
    // 后来：（在上面的edit中老师使用了json深度深拷贝，以供学习了，不过这里的确用find就足够解决了
    // 这边这里的思路比我自己的更好，值得学习）
    // 检查该数组还有没有和要检测元素相同的数值
    let repeat = changedata.value.find((item) => {
      // 这里其实相当于foreach，每一个item不等于row的
      // 都进行tag内容的判断
      if (item !== row) {
        return item.tag === row.tag;
      }
    });
    // 重复就输出提示信息，然后把它删掉
    if (repeat) {
      ElNotification({
        message: "属性值不能重复",
        type: "error",
      });
      changedata.value.splice($index, 1);
    }
  } else {
    ElNotification({
      message: "属性值不能为空",
      type: "error",
    });
    // 为空输出提示信息，然后把它删掉
    changedata.value.splice($index, 1);
  }
};

// 从div变回输入框，并实现自动聚焦
const divToInput = (row, $index: number) => {
  row.flag = true;
  nextTick(() => {
    inputArr[$index].focus();
  });
};

// 用于存储输入框，操作它们实现自动聚焦，
// 因为autofocus在el-input被div包起来时会失效
let inputArr = [];

// 删除,既要删掉输入属性框的一行，也要记得删掉inputArr里的内容
const delInput = ($index: number) => {
  changedata.value.splice($index, 1);
  inputArr.splice($index, 1);
};
</script>

<style scoped>
</style>