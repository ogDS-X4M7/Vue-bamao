import { defineStore } from "pinia";
// 引入api接口
import { reqLogin, reqUserInfo } from "@/api/user";
import type { loginFromData, loginResponseData, UserInfoResponseData } from "@/api/user/type";
import type { UserState } from './types/types';
import { SET_TOKEN, GET_TOKEN, DEL_TOKEN } from "@/utils/token";
import { constantRoute, asyncRoute, anyRoute } from "@/router/routes";
import router from "../../router";
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
let useUserStore = defineStore('User', {
    state: (): UserState => {
        // console.log('至少创建我是需要被调用的把？');
        // 经过验证整个state就是只有创建时才执行
        return {
            token: GET_TOKEN(),
            useRoutes: constantRoute,
            username: '',
            avatar: '',
            userRole: '',
        }
    },
    actions: {
        // 在login/index.vue里可看到是先执行仓库这边的登录再跳转路由，所以完全可以在这边登录函数
        // 先操作好路由，就可以实现正常的query参数，从登录页直接登录进入权限路由页了
        // 但是经过检测，登录发送get请求拿到的只有token，想要拿到权限路由数据需要提供用户信息
        // 根据用户信息来判断，所以就得改成post请求等，比较复杂不值得这么做
        // 而且路由守卫通过login/index.vue和permission.ts的输出判断，发现使用push方法是会
        // 自己先检查要进入的路由是否存在然后报错的，这比路由守卫更快，因此不可能通过路由守卫
        // 动态添加要push的路由
        async userLogin(data: loginFromData) {
            let result: loginResponseData = await reqLogin(data);
            if (result.code === 200) {
                this.token = (result.token as string);
                SET_TOKEN((result.token as string));
                return 'ok'
            } else {
                // return result.message;
                return Promise.reject(new Error(result.message));
            }
        },
        async userInfo() {
            let result: UserInfoResponseData = await reqUserInfo();
            // console.log(result);
            if (result.code === 200) {
                this.username = result.data.username;
                this.avatar = result.data.avatar;
                this.userRole = result.data.userRole;
                let userAsyncRoute: any = await filterAsyncRoute(cloneDeep(asyncRoute), result.data.routes);
                this.useRoutes = <any>[...constantRoute, ...userAsyncRoute, ...anyRoute];
                // console.log(this.useRoutes);//数组类型
                this.useRoutes.forEach((route: any) => {
                    router.addRoute(route);
                });
                // console.log(router.getRoutes());//这个方法能获取当前拥有的所有路由
                return 'ok'
            } else {
                // return result.data.message;
                // console.log(result.data.message);
                return Promise.reject(new Error(result.message));
            }
        },
        userExit() {
            // let result = await xxx();
            // 本来应该像上面一样发送请求去做退出登录，但是这里mock假服务端没这个接口，也就没法request做axios二次封装，没有xxx可以调用
            this.username = '';
            this.avatar = '';
            DEL_TOKEN();
            // console.log('这里的token是', this.token);
            // 经过测试，如果这里的this.token不赋值为空的话是不会调用gettoken改变的
            // 整个state只有创建时才执行一次，我在GET_TOKEN方法里做了输出标志得出的结论
            this.token = '';
            //route、router退出都要恢复成基本内容
            this.useRoutes = constantRoute;
            router.clearRoutes();
            let temp = <any>[...constantRoute, ...anyRoute];
            temp.forEach((route: any) => {
                router.addRoute(route);
            });
            // console.log(router);
        }
    },
    getters: {

    }
})
export default useUserStore;