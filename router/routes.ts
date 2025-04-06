// 对外暴露配置的路由(常量路由)
export const constantRoute = [
    {
        // 登录
        path: '/login',
        component: () => import('@/views/login/index.vue'),//路由懒加载
        name: 'login',//命名路由,根据用户信息匹配路由动态追加
        meta: {
            title: '登录',
            isShow: false,
            icon: "Promotion",
        }
    },
    {
        // 登陆成功过后展示数据的路由
        path: '/',
        // component: () => import('@/views/home/index.vue'),
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                name: 'home',
                meta: {
                    title: '主页',
                    isShow: true,
                    icon: "House",
                }
            },
        ],
        meta: {
            // title: '展示',
            isShow: true,
            icon: "User",
        }
    },
    {
        // 404
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            isShow: false,
            icon: "CloseBold",
        }
    },
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'Screen',
        meta: {
            title: '数据大屏',
            isShow: true,
            icon: "Platform",
        }
    },
]
// 异步路由
export const asyncRoute = [{
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'acl',
    redirect: '/acl/user',
    meta: {
        title: '权限管理',
        isShow: true,
        icon: "Lock",
    },
    children: [
        {
            path: '/acl/user',
            component: () => import('@/views/acl/user/index.vue'),
            name: 'user',
            meta: {
                title: '用户管理',
                isShow: true,
                icon: "UserFilled",
            }
        },
        {
            path: '/acl/role',
            component: () => import('@/views/acl/role/index.vue'),
            name: 'role',
            meta: {
                title: '角色管理',
                isShow: true,
                icon: "Avatar",
            }
        },
        {
            path: '/acl/Menu',
            component: () => import('@/views/acl/Menu/index.vue'),
            name: 'Menu',
            meta: {
                title: '菜单管理',
                isShow: true,
                icon: "Monitor",
            }
        },
    ]
},
{
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'product',
    redirect: '/product/trademark',
    meta: {
        title: '商品管理',
        isShow: true,
        icon: "Goods",
    },
    children: [
        {
            path: '/product/trademark',
            component: () => import('@/views/product/trademark/index.vue'),
            name: 'trademark',
            meta: {
                title: '品牌管理',
                isShow: true,
                icon: "ShoppingCartFull",
            }
        },
        {
            path: '/product/attr',
            component: () => import('@/views/product/attr/index.vue'),
            name: 'attr',
            meta: {
                title: '属性管理',
                isShow: true,
                icon: "ChromeFilled",
            }
        },
        {
            path: '/product/spu',
            component: () => import('@/views/product/spu/index.vue'),
            name: 'spu',
            meta: {
                title: 'SPU管理',
                isShow: true,
                icon: "Iphone",
            }
        },
        {
            path: '/product/sku',
            component: () => import('@/views/product/sku/index.vue'),
            name: 'sku',
            meta: {
                title: 'SKU管理',
                isShow: true,
                icon: "Cellphone",
            }
        },
    ]
},]
// 任意路由
export const anyRoute = [{
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
        title: '任意',
        isShow: false,
        icon: "QuestionFilled",
    }
}]