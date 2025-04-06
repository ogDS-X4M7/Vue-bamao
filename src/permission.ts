import router from "@/router";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import useUserStore from "@/store/modules/user";
nprogress.configure({ showSpinner: false });
import { ElNotification } from "element-plus"
// import { useRouter } from "vue-router";
// let $router = useRouter();
// import pinia from "./store";
// let userStore = useUserStore(pinia);
// 本来要按上面写的，但是有弹幕反映这样会让pinia持久化失效，放到路由守卫函数里
// 调用就可以不需要引入pinia了
// 全局路由前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
    nprogress.start();
    // nprogress是用来设置进度条的一个外部库
    let userStore = useUserStore();
    // let token = userStore.token;
    // if (token) {
    //     if (to.path === '/login') {
    //         next({ path: '/home' })
    //     } else {
    //         next();
    //     }
    // } else {
    //     // 未登录就只能去登录页面
    //     if (to.path === '/login') {
    //         next();
    //     } else {
    //         next({ path: '/login', query: { redirect: to.path } })
    //     }
    // }

    // 对登录页和其他页做出区分，登录页只有没登录没信息或者过期token才能进
    try {
        // console.log('请求用户数据，同时部署权限路由');
        await userStore.userInfo();
        // console.log('权限路由也部署完毕了');

        if (to.path === '/login') {
            // 对于登录页，没问题就只能去首页
            next({ path: '/home' });
        } else {
            // 其他页面没问题放行
            // 去其他页面的话，有可能在异步路由，异步路由如果刷新，
            // 就要重新获取用户信息、异步路由权限信息，就要重新加载异步路由
            // await获取到用户信息的时候，异步路由还没加载完毕，就会出现空白页面
            next();
            // 因此不再直接使用next，而是使用{...to}，等加载完再放行
            // console.log(1);
            // next({ ...to, replace: true });
            // console.log(2);
        }
    } catch (error: any) {
        if (to.path === '/login') {
            // 对登录页而言，发现有问题，放行
            next();
        } else {
            // 对其他页面，发现有问题，去登录页
            ElNotification({ type: 'warning', message: error.message });
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})
// 全局路由后置守卫
router.afterEach(async (to, from) => {
    nprogress.done();
    // let userStore = useUserStore();
    // if (!userStore.username) {
    //     if (to.path !== '/login') {
    //         // 如果能进到这里说明肯定有token，直接拿就行了,但是有可能token过期
    //         try {
    //             await userStore.userInfo();
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }
    // 最后发现"这句话是错的"，于是得到结论登录检查过期不能传送登录，就放行即可
    // 我也想过过期应该传去登录
    // 但是你得检查数据才知道过期，如果过期就传去登录
    // 那又会触发检查，循环出不去是不行的，
    // 过期有token，检查到token不让去登录页
    // 发现过期又要去登录页，
    // 想走出循环就得要求，去登录页时不检查token是否过期
    // 这样"页面发现过期，传递登录页"这个举动才不会发生在登录页本身
    // 所以首要条件应该是判断是不是去登录页，是的话不能看token是否过期

    // 但是逻辑上要实现有token，token对就去首页，
    // 意味着在进入登录页的时候，必须检查token是否正常
    // 不然不正常还从登录页直接去首页，被首页查出来又到登录页，也是循环

    // 经过上面分析，这两个需求是冲突的(过期应该传去登录,有正常token直接跳过登录)
    // 一个要求登录检查过期不能传送登录所以不能检查(这句话是错的)，一个要求检查过期
})
