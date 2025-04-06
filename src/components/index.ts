import SvgIcon from "./SvgIcon/index.vue"
import CouShuDe from "./CouShuDe/index.vue"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Category from "./Category/index.vue";
const allGlobalComponent = {
    SvgIcon,
    CouShuDe,
    Category,
}
// 对外暴露插件对象,main.ts引用过去就完成全局组件注册，就可以在以后的任意组件里调用全局组件的内容
export default {
    //@ts-ignore
    install(ap) {
        // .keys取出allGlobalComponent的所有子项，也就是要全局注册的组件
        // 然后foreach分别全局注册
        Object.keys(allGlobalComponent).forEach(key => {
            //@ts-ignore
            ap.component(key, allGlobalComponent[key]);
            // 注册forEach里的所有组件
        })

        // 但是这里看起来是对要全局注册的组件进行遍历内部的组件去全局注册
        // 事实证明的确如此，ElementPlusIconsVue是一个对象，内部有二百多个组件，要把这二百多个组件注册成全局组件
        // 而不是把ElementPlusIconsVue，因此不能用上面的方法去注册
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            ap.component(key, component)
        }
    }
} 