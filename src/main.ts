import { createApp } from 'vue'
import App from './App.vue'

// 完整引入
import ElementPlus, { ElNotification } from 'element-plus';
import 'element-plus/dist/index.css'
// 配置element-plus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 引入暗黑模式所需文件
import 'element-plus/theme-chalk/dark/css-vars.css'

// 尝试获取环境变量
// console.log(import.meta.env)

// svg插件需要配置代码
import 'virtual:svg-icons-register';

// 搞出全局组件来集体引用
import globalComponent from "./components"


// 引入模版的全局样式
import '@/styles/index.scss'

// 引入路由进行全局注册
import router from './router'
// 测试代码测试假接口，结果成功
// import axios from 'axios'
// axios({
//     url:'/api/user/login',
//     method:"post",
//     data:{
//         username:"admin",
//         password:'111111'
//     }
// })

// 引入大仓库
import pinia from "./store"
// 引入路由鉴权-进度条文件
import './permission'

// 引入获取路由方法，为异步路由刷新提供数据
import { reqUserInfo } from "@/api/user";
import { constantRoute, asyncRoute, anyRoute } from "@/router/routes";
// 引入lodash的深拷贝方法
import cloneDeep from "lodash/cloneDeep";
const filterAsyncRoute = (asyncRoute: any, routes: any) => {
    return asyncRoute.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {
                item.children = filterAsyncRoute(item.children, routes);
            }
            return true;
        }
    })
}
async function myInit() {
    // 这都是靠token申请的，如果不行就是token有问题或者第一次登录
    let result = await reqUserInfo();
    if (result.code === 200) {
        let userAsyncRoute: any = await filterAsyncRoute(cloneDeep(asyncRoute), result.data.routes);
        let temp = <any>[...constantRoute, ...userAsyncRoute, ...anyRoute];
        temp.forEach((route: any) => {
            router.addRoute(route);
        });
    } else {
        // 报错交给路由守卫，这里不用管
        // ElNotification({
        //     type: "error",
        //     message: result.message,
        // })
    }
}
// 下面的方法尝试过把路由权限存储在本地localstorage，但是compent组件是作为方法存放在原数组里的
// 使用JSON转换全部丢失了，不可行
// import { GET_ROUTES } from "@/utils/userRoutes";
// 作为方法在挂载前调用
// async function myInit() {
//     let temp = JSON.parse(GET_ROUTES());
//     console.log(temp);
//     if (temp) {
//         temp.forEach((route: any) => {
//             console.log(route);
//             router.addRoute(route);
//         });
//     }
// }
// 通过await保证在挂载前调用
async function call() {
    await myInit();
    const app = createApp(App);
    app.use(ElementPlus, { locale: zhCn, });
    app.use(globalComponent);
    app.use(router);
    app.use(pinia)
    app.mount('#app')
}
call();


// 安装使用