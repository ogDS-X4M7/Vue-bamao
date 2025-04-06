// 通过router插件实现模板路由配置
import { createRouter, createWebHashHistory } from "vue-router"
import { constantRoute } from "./routes"
// 创建路由器
let router = createRouter({
    // 路由模式hash
    history: createWebHashHistory(),
    routes: constantRoute,
    // 滚动行为,实现切换路由的时候是顶部
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})
export default router