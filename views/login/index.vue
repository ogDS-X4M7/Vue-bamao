<template>
  <div class="login">
    <!-- <h1>我是一级路由</h1> -->
    <el-row>
      <el-col :span="12"></el-col>
      <!-- 上面是用来占位的，因为el-col是栅栏布局，共24列 -->
      <el-col :span="12">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginFormRef"
        >
          <h1>Hello</h1>
          <h2>欢迎来到八毛甄选</h2>
          <el-form-item prop="userNumber">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.userNumber"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="loginbtn"
              type="primary"
              @click="userlogin"
              :loading="isLoading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
// 引入仓库
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getTime } from "@/utils/time";
let $router = useRouter();
let $route = useRoute();
let useStore = useUserStore();
let loginForm = reactive({ userNumber: "", password: "" });
let isLoading = ref(false);
// 拿到表单组件
const loginFormRef = ref();
// 自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  // rule校验规则对象，value表单元素文本内容，
  // 符合callback放行，不符合注入错误提示
  if (value.length >= 4) {
    callback();
  } else {
    callback(new Error("账号长度至少4位"));
  }
};
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length < 6 || value.length > 15) {
    callback(new Error("密码长度为6到15位"));
  } else {
    callback();
  }
};
// 定义表单校验需要配置对象
const rules = {
  // required代表这个字段务必要校验的
  // min/max文本长度至少/最多多少位
  // message:错误的提示信息
  // trigger:触发校验表单的时机：change文本变化时触发校验；blur失去焦点时触发校验
  userNumber: [
    // { required: true, message: "用户名不能为空", trigger: "blur" },
    // {
    //   required: true,
    //   min: 5,
    //   max: 10,
    //   message: "账号长度为5到10位",
    //   trigger: "change",
    // },
    // 上面是element有的校验方法，下面则是提供自定义校验方法
    { trigger: "change", validator: validatorUserName },
  ],
  password: [
    // {
    //   required: true,
    //   min: 6,
    //   max: 15,
    //   message: "密码的长度为6到15位",
    //   trigger: "change",
    // },
    { trigger: "change", validator: validatorPassword },
  ],
};
async function userlogin() {
  await loginFormRef.value.validate();
  try {
    // 逻辑比较绕，使用store里的useUserStore小仓库，小仓库里有actions方法userLogin
    // userLogin这个方法使用了api封装的reqLogin，reqLogin是(api设置好发请求的基础路径后，调用二次封装axios的request)的方法
    // request是utils里二次封装axios，返回响应报文的响应体(成功，几乎都是成功)或Promise.reject(error)带有失败原因的promise(http错误，基本不会有)
    // 因为是http错误，所以除了网络有问题，权限有问题之类的以外，其实都是会返回成功的响应体的
    // 但是在mock中，成功的响应体其实是经过判断，可能顺利登录，可能账号或密码不正确
    // 所以请区分好！成功是指网络正常报文成功传输的成功，而不是登录成功的成功！！！

    // 所以调用了api的小仓库方法userLogin中的result，最终肯定是顺利得到响应报文的响应体
    // 随后它根据响应体中的code是否等于200知道登录是否成功，登录成功返回'ok',失败则返回return Promise.reject(new Error(result.data.message));
    // 也就是这里会收到的信息了。

    // 经过验证下面的log，可以知道try catch等的就是await useStore.userLogin(loginForm);的返回内容
    // 主要是想知道有没有出错，是不是error，至于正确返回的是notok，fail，什么字符串都行，只要不是error都不管（当然现在的情况有些例外，ai解答在下面）
    // 使用 await 关键字等待一个 Promise 时，try…catch 语句是在专门等待 Promise 的解决（resolution）或拒绝（rejection）。
    // 以下是关键点：
    // await 关键字：它会暂停当前函数的执行，直到等待的 Promise 被解决或拒绝。
    // Promise.reject()：无论你传递给 Promise.reject() 的是什么（一个 Error 对象、一个字符串、或者其他任何值），
    // 只要 Promise 被拒绝了，await 表达式就会抛出一个错误。
    // try…catch：catch 块会捕获 try 块中抛出的任何错误。这意味着，如果 await 等待的 Promise 被拒绝了，无论拒绝的原因是什么，catch 块都会执行。

    // 因此可以说上面的等待error是对的，但是这里使用了await，等待的是promise的resolution或者reject，只要reject，就会抛出一个error
    // 又圆回上面等待error的说法了，不过要绕一个弯子
    // 另外error会是Promise.reject里面所写的失败原因，也就是说这里error= new Error(result.data.message)，所以可以使用message
    isLoading.value = true;
    await useStore.userLogin(loginForm);
    // console.log("如果失败应该就不会输出我这句话了");
    // 经过验证的确如此
    isLoading.value = false;
    let redirect = $route.query.redirect;
    if (redirect) {
      // 通过输出，意识到push是自带有检测当前路由是否存在的，因此想在路由守卫里动态添加是不现实的
      // 这里作为登录界面，只会触发一次，在这里先获取用户信息去匹配路由是没有问题的
      await useStore.userInfo();
      // console.log("部署之前");
      $router.push(redirect);
      // console.log("完毕之后");
    } else {
      $router.push("/");
    }
    ElNotification({
      type: "success",
      message: "欢迎回来",
      title: `HI, ${getTime()}`,
    });
  } catch (error) {
    isLoading.value = false;
    ElNotification({ type: "error", message: error.message });
  }
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
  /* 学会这个bgs，可以不用担心缩放问题！！ */
  .login_form {
    position: relative;
    top: 30vh;
    width: 70%;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      font-size: 20px;
      margin: 20px 0px;
      color: white;
      font-weight: normal;
    }
    .loginbtn {
      width: 100%;
    }
  }
}
</style>