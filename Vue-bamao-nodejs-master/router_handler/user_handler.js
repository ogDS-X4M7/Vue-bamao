// 引入模块
const { formidable } = require('formidable')
const path = require('path')
const fs = require('fs')


// 随机唯一值id
var uuid = require('node-uuid');
// console.log(uuid.v1());  // 根据时间
// console.log(uuid.v4()); // 根据随机数
// 品牌管理数据
let tableData = [
    {
        "id": 1,
        "tmName": "小米",
        "logoUrl": "https://pic.nximg.cn/file/20220226/32246715_112355614103_2.jpg"
    },
    {
        "id": 2,
        "tmName": "苹果",
        "logoUrl": "https://ts1.tc.mm.bing.net/th/id/R-C.f7d842073d5219ff1d1ec4b7f7c87473?rik=3fdW%2bq%2bo3rtjNA&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2021%2f10-13%2f110981%2fwater_110981_698_698_.png&ehk=3LX893M262OOGfJpTNmlxgxYLZ0YmdKz4UQUacsW5CM%3d&risl=&pid=ImgRaw&r=0"
    },
    {
        "id": 3,
        "tmName": "华为",
        "logoUrl": "https://ts1.tc.mm.bing.net/th/id/R-C.e1e236fec112863c49732461af61cbec?rik=fDouZ6Iu2QDn8A&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2020%2f06-10%2f85020%2fwater_85020_698_698_.png&ehk=Hp97CkUc1gJBkAt72cRtW0cJViOQQYBozls0Qy5xgLk%3d&risl=&pid=ImgRaw&r=0"
    },
    {
        "id": 4,
        "tmName": "戴尔",
        "logoUrl": "https://pic.nximg.cn/20100705/2001393_174927013041_2.jpg"
    },
    {
        "id": 5,
        "tmName": "联想",
        "logoUrl": "https://ts1.tc.mm.bing.net/th/id/R-C.ee53eaa6a2a7f2f1bc66bd317236463d?rik=LADvPSdw5KLbuQ&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2020%2f06-16%2f85781%2fwater_85781_698_698_.png&ehk=Jt0JDHw%2bPgf3n5rQiZaK5m1%2fiwXWgmqp2BJSY2glaTw%3d&risl=&pid=ImgRaw&r=0"
    },
    {
        "id": 6,
        "tmName": "惠普",
        "logoUrl": "https://tse3-mm.cn.bing.net/th/id/OIP-C.qfDsjAwJoA_XA4DeesGezQAAAA?rs=1&pid=ImgDetMain"
    },
    {
        "id": 7,
        "tmName": "清华",
        "logoUrl": "https://p1.ssl.qhmsg.com/t01e4a295415f50d6a9.jpg"
    },
    {
        "id": 8,
        "tmName": "中科大",
        "logoUrl": "https://ts1.tc.mm.bing.net/th/id/R-C.18a037450ff4cda148108135b6851c7f?rik=Wpo1kjnk9EThww&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2022%2f05-30%2f125673%2fwater_125673_698_698_.png&ehk=Nxu2AawFJ%2fazLXOBLgWi5Stqm6WdPctSRUouzVcWm%2bw%3d&risl=&pid=ImgRaw&r=0"
    },
    {
        "id": 9,
        "tmName": "合工大",
        "logoUrl": "https://tse1-mm.cn.bing.net/th/id/OIP-C.KeCC5cZeiopwMK4f7OYHqAHaG0?rs=1&pid=ImgDetMain"
    },
]

// 属性管理一级数据
let AttrDataOne = [
    { id: 1, name: '图书' },
    { id: 2, name: '手机' },
    { id: 3, name: '家电' },
    { id: 4, name: '数码' },
    { id: 5, name: '家居' },
    { id: 6, name: '电脑' },
    { id: 7, name: '厨具' },
    { id: 8, name: '化妆' },
    { id: 9, name: '钟表' },
]
// 属性管理二级数据
let AttrDataTwo = [
    { categoryid: 1, name: '图书1', id: 10 },
    { categoryid: 1, name: '图书2', id: 11 },
    { categoryid: 1, name: '图书3', id: 12 },
    { categoryid: 1, name: '图书4', id: 13 },
    { categoryid: 2, name: '手机通讯', id: 14 },
    { categoryid: 2, name: '运营商', id: 15 },
    { categoryid: 2, name: '手机配件', id: 16 },
    { categoryid: 2, name: '手机系统', id: 17 },
    { categoryid: 3, name: '家电1', id: 18 },
    { categoryid: 3, name: '家电2', id: 19 },
    { categoryid: 3, name: '家电3', id: 20 },
    { categoryid: 4, name: '数码1', id: 21 },
    { categoryid: 4, name: '数码2', id: 22 },
    { categoryid: 5, name: '家居1', id: 23 },
    { categoryid: 5, name: '家居2', id: 24 },
    { categoryid: 6, name: '笔记本电脑', id: 25 },
    { categoryid: 6, name: '台式电脑', id: 26 },
    { categoryid: 7, name: '厨具1', id: 27 },
    { categoryid: 8, name: '化妆1', id: 28 },
    { categoryid: 9, name: '钟表1', id: 29 },
]
// 属性管理最终数据，name用于放属性栏展示，value里foreach后tag放属性值栏展示
let AttrDataEnd = [
    // 属性1
    { id: 30, name: '图书1属性1', value: [{ tag: '书1属1签1' }, { tag: '书1属1签2' }, { tag: '书1属1签3' }], categoryid: 10 },
    { id: 31, name: '图书2属性1', value: [{ tag: '书2属1签1' }, { tag: '书2属1签2' }, { tag: '书2属1签3' }], categoryid: 11 },
    { id: 32, name: '图书3属性1', value: [{ tag: '书3属1签1' }, { tag: '书3属1签2' }, { tag: '书3属1签3' }], categoryid: 12 },
    { id: 33, name: '图书4属性1', value: [{ tag: '书4属1签1' }, { tag: '书4属1签2' }, { tag: '书4属1签3' }], categoryid: 13 },
    { id: 34, name: '手机类型', value: [{ tag: '安卓手机' }, { tag: '苹果手机' }, { tag: '未来手机' }], categoryid: 14 },
    { id: 35, name: '手机2属性1', value: [{ tag: '机2属1签1' }, { tag: '机2属1签2' }, { tag: '机2属1签3' }], categoryid: 15 },
    { id: 36, name: 'CPU型号', value: [{ tag: '骁龙730G' }, { tag: '麒麟990' }, { tag: '骁龙439' }, { tag: '骁龙845' }], categoryid: 16 },
    { id: 37, name: '手机4属性1', value: [{ tag: '机4属1签1' }, { tag: '机4属1签2' }, { tag: '机4属1签3' }], categoryid: 17 },
    { id: 38, name: '家电1属性1', value: [{ tag: '电1属1签1' }, { tag: '电1属1签2' }, { tag: '电1属1签3' }], categoryid: 18 },
    { id: 39, name: '家电2属性1', value: [{ tag: '电2属1签1' }, { tag: '电2属1签2' }, { tag: '电2属1签3' }], categoryid: 19 },
    { id: 40, name: '家电3属性1', value: [{ tag: '电3属1签1' }, { tag: '电3属1签2' }, { tag: '电3属1签3' }], categoryid: 20 },
    { id: 41, name: '数码1属性1', value: [{ tag: '码1属1签1' }, { tag: '码1属1签2' }, { tag: '码1属1签3' }], categoryid: 21 },
    { id: 42, name: '数码2属性1', value: [{ tag: '码2属1签1' }, { tag: '码2属1签2' }, { tag: '码2属1签3' }], categoryid: 22 },
    { id: 43, name: '家居1属性1', value: [{ tag: '居1属1签1' }, { tag: '居1属1签2' }, { tag: '居1属1签3' }], categoryid: 23 },
    { id: 44, name: '家居2属性1', value: [{ tag: '居2属1签1' }, { tag: '居2属1签2' }, { tag: '居2属1签3' }], categoryid: 24 },
    { id: 45, name: '笔记本CPU', value: [{ tag: '14代i5' }, { tag: '13代i7' }, { tag: '12代i9' }], categoryid: 25 },
    { id: 46, name: '主机CPU', value: [{ tag: '14代i7' }, { tag: '13代i9' }, { tag: '14代i9' }], categoryid: 26 },
    { id: 47, name: '厨具1属性1', value: [{ tag: '具1属1签1' }, { tag: '具1属1签2' }, { tag: '具1属1签3' }], categoryid: 27 },
    { id: 48, name: '化妆1属性1', value: [{ tag: '妆1属1签1' }, { tag: '妆1属1签2' }, { tag: '妆1属1签3' }], categoryid: 28 },
    { id: 49, name: '钟表1属性1', value: [{ tag: '表1属1签1' }, { tag: '表1属1签2' }, { tag: '表1属1签3' }], categoryid: 29 },
    // 属性2
    { id: 50, name: '图书1属性2', value: [{ tag: '书1属2签1' }, { tag: '书1属2签2' }, { tag: '书1属2签3' }], categoryid: 10 },
    { id: 51, name: '图书2属性2', value: [{ tag: '书2属2签1' }, { tag: '书2属2签2' }, { tag: '书2属2签3' }], categoryid: 11 },
    { id: 52, name: '图书3属性2', value: [{ tag: '书3属2签1' }, { tag: '书3属2签2' }, { tag: '书3属2签3' }], categoryid: 12 },
    { id: 53, name: '图书4属性2', value: [{ tag: '书4属2签1' }, { tag: '书4属2签2' }, { tag: '书4属2签3' }], categoryid: 13 },
    { id: 54, name: '电池容量', value: [{ tag: '1200mAh以下' }, { tag: '1200mAh到3000mAh' }, { tag: '3000mAh以上' }], categoryid: 14 },
    { id: 55, name: '手机2属性2', value: [{ tag: '机2属2签1' }, { tag: '机2属2签2' }, { tag: '机2属2签3' }], categoryid: 15 },
    { id: 56, name: '屏幕尺寸', value: [{ tag: '6.55-6.64英寸' }, { tag: '6.65-6.74英寸' }, { tag: '6.75-6.84英寸' }, { tag: '6.85-6.94英寸' }, { tag: '6.95及以上' }], categoryid: 16 },
    { id: 57, name: '手机4属性2', value: [{ tag: '机4属2签1' }, { tag: '机4属2签2' }, { tag: '机4属2签3' }], categoryid: 17 },
    { id: 58, name: '家电1属性2', value: [{ tag: '电1属2签1' }, { tag: '电1属2签2' }, { tag: '电1属2签3' }], categoryid: 18 },
    { id: 59, name: '家电2属性2', value: [{ tag: '电2属2签1' }, { tag: '电2属2签2' }, { tag: '电2属2签3' }], categoryid: 19 },
    { id: 60, name: '家电3属性2', value: [{ tag: '电3属2签1' }, { tag: '电3属2签2' }, { tag: '电3属2签3' }], categoryid: 20 },
    { id: 61, name: '数码1属性2', value: [{ tag: '码1属2签1' }, { tag: '码1属2签2' }, { tag: '码1属2签3' }], categoryid: 21 },
    { id: 62, name: '数码2属性2', value: [{ tag: '码2属2签1' }, { tag: '码2属2签2' }, { tag: '码2属2签3' }], categoryid: 22 },
    { id: 63, name: '家居1属性2', value: [{ tag: '居1属2签1' }, { tag: '居1属2签2' }, { tag: '居1属2签3' }], categoryid: 23 },
    { id: 64, name: '家居2属性2', value: [{ tag: '居2属2签1' }, { tag: '居2属2签2' }, { tag: '居2属2签3' }], categoryid: 24 },
    { id: 65, name: '笔记本显卡', value: [{ tag: 'MX570' }, { tag: 'GTX 1050Ti' }, { tag: 'RTX 3060' }], categoryid: 25 },
    { id: 66, name: '主机显卡', value: [{ tag: 'RTX 4080SUPER' }, { tag: 'RTX 4090' }, { tag: 'RTX 5090' }], categoryid: 26 },
    // 属性3
    { id: 67, name: '图书1属性3', value: [{ tag: '书1属3签1' }, { tag: '书1属3签2' }, { tag: '书1属3签3' }], categoryid: 10 },
    { id: 68, name: '图书2属性3', value: [{ tag: '书2属3签1' }, { tag: '书2属3签2' }, { tag: '书2属3签3' }], categoryid: 11 },
    { id: 69, name: '图书3属性3', value: [{ tag: '书3属3签1' }, { tag: '书3属3签2' }, { tag: '书3属3签3' }], categoryid: 12 },
    { id: 70, name: '图书4属性3', value: [{ tag: '书4属3签1' }, { tag: '书4属3签2' }, { tag: '书4属3签3' }], categoryid: 13 },
    { id: 71, name: '运行内存', value: [{ tag: '6GB' }, { tag: '8GB' }, { tag: '12GB' }, { tag: '16GB' }], categoryid: 14 },
    { id: 72, name: '手机2属性3', value: [{ tag: '机2属3签1' }, { tag: '机2属3签2' }, { tag: '机2属3签3' }], categoryid: 15 },
    { id: 73, name: '颜色', value: [{ tag: '黑色' }, { tag: '白色' }, { tag: '蓝色' }], categoryid: 16 },
    { id: 74, name: '手机4属性3', value: [{ tag: '机4属3签1' }, { tag: '机4属3签2' }, { tag: '机4属3签3' }], categoryid: 17 },
    { id: 75, name: '家电1属性3', value: [{ tag: '电1属3签1' }, { tag: '电1属3签2' }, { tag: '电1属3签3' }], categoryid: 18 },
    { id: 76, name: '家电2属性3', value: [{ tag: '电2属3签1' }, { tag: '电2属3签2' }, { tag: '电2属3签3' }], categoryid: 19 },
    { id: 77, name: '家电3属性3', value: [{ tag: '电3属3签1' }, { tag: '电3属3签2' }, { tag: '电3属3签3' }], categoryid: 20 },
    // 属性4
    { id: 78, name: '图书1属性4', value: [{ tag: '书1属4签1' }, { tag: '书1属4签2' }, { tag: '书1属4签3' }], categoryid: 10 },
    { id: 79, name: '图书2属性4', value: [{ tag: '书2属4签1' }, { tag: '书2属4签2' }, { tag: '书2属4签3' }], categoryid: 11 },
    { id: 80, name: '图书3属性4', value: [{ tag: '书3属4签1' }, { tag: '书3属4签2' }, { tag: '书3属4签3' }], categoryid: 12 },
    { id: 81, name: '图书4属性4', value: [{ tag: '书4属4签1' }, { tag: '书4属4签2' }, { tag: '书4属4签3' }], categoryid: 13 },
    { id: 82, name: '机身内存', value: [{ tag: '128GB' }, { tag: '256GB' }, { tag: '512GB' }, { tag: '1TB' }], categoryid: 14 },
    { id: 83, name: '手机2属性4', value: [{ tag: '机2属4签1' }, { tag: '机2属4签2' }, { tag: '机2属4签3' }], categoryid: 15 },
    { id: 84, name: '相机像素', value: [{ tag: '1200万' }, { tag: '4800万' }, { tag: '1亿' }, { tag: '2亿' }], categoryid: 16 },
    { id: 85, name: '手机4属性4', value: [{ tag: '机4属4签1' }, { tag: '机4属4签2' }, { tag: '机4属4签3' }], categoryid: 17 },
];

// 图片需要和内容拆分开提交
let PhotoData = [];
// 用户管理数据
let userData = [
    {
        userNumber: 'admin',
        username: 'admin管理员',
        avatar: 'https://s1.aigei.com/src/img/gif/55/55b350e10abd4c8ba30c6d9b52dfb0a6.gif?imageMogr2/auto-orient/thumbnail/!282x282r/gravity/Center/crop/282x282/quality/85/%7CimageView2/2/w/282&e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:9LwRzS85OCVcWUOHaJ83sDwd1ys=',
        userSex: '男',
        userPhone: '110',
        userRole: '超级管理员',
        createdate: '2024-01-01',
        updatedate: '2024-01-01',
        state: false,
        id: uuid.v4(),
        Email: '2qq@w.com',
        section: '地区',
        brief: '简介11111',
        password: '111111',
        token: 'tokenAdmin',
    },
    {
        userNumber: 'test',
        username: '测试用户',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        userSex: '女',
        userPhone: '119',
        userRole: '超级管理员',
        createdate: '2022-01-01',
        updatedate: '2022-01-01',
        state: false,
        id: uuid.v4(),
        Email: '2qq@w.com',
        section: '地区',
        brief: '简介22222',
        password: '123456',
        token: 'tokenTest',
    },
    {
        userNumber: 'bamao',
        username: '八毛大王',
        avatar: 'https://s1.aigei.com/src/img/gif/55/55b350e10abd4c8ba30c6d9b52dfb0a6.gif?imageMogr2/auto-orient/thumbnail/!282x282r/gravity/Center/crop/282x282/quality/85/%7CimageView2/2/w/282&e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:9LwRzS85OCVcWUOHaJ83sDwd1ys=',
        userRole: '超级管理员',
        createdate: '2022-01-01',
        updatedate: '2022-01-01',
        id: uuid.v4(),
        password: '123456',
        token: 'tokenBamao',
    },
    {
        userNumber: 'ximao',
        username: '细毛小王',
        avatar: 'https://s1.aigei.com/src/img/gif/63/63f0037d7c6c42b8a6b2bdb33fecad94.gif?e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:KuFfvOUtggB7h_uGuHrPanMOKFI=',
        userRole: '超级管理员',
        createdate: '2022-01-01',
        updatedate: '2022-01-01',
        id: uuid.v4(),
        password: '123456',
        token: 'tokenXimao',
    },
    {
        userNumber: 'test2',
        username: '测试用户',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        userRole: '前端',
        createdate: '2022-01-01',
        updatedate: '2022-01-01',
        id: uuid.v4(),
        password: '123456',
        token: 'tokenTest2',
    },
    {
        userNumber: 'test3',
        username: '测试用户',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        userRole: '后端',
        createdate: '2022-01-01',
        updatedate: '2022-01-01',
        id: uuid.v4(),
        password: '123456',
        token: 'tokenTest3',
    },
    {
        userNumber: 'test4',
        username: '测试用户',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        userRole: '测试',
        createdate: '2022-01-01',
        updatedate: '2022-01-01',
        id: uuid.v4(),
        password: '123456',
        token: 'tokenTest4',
    },
]
// 角色数据----初始(routes和这个数据紧密相关但并未绑定，这里变化routes就要变化
// 如果要修改routes,记得让userData重新跑一遍角色数据:修改角色也是需要重跑，添加可以不用，因为添加不修改的话默认无权限
// 删除也需要，因为routes只执行一次，删除角色很有可能对routes有影响需要修改，要改就得重跑角色数据)
let roleData = [
    { id: 1, roleName: "超级管理员", createdate: '2024-01-01', updatedate: '2024-01-01', routes: ['product', 'trademark', 'sku', 'spu', 'attr', 'acl', 'user', 'role', 'Menu'] },
    { id: 2, roleName: "前台", createdate: '2024-01-01', updatedate: '2024-01-01', routes: [] },
    { id: 3, roleName: "运营", createdate: '2024-01-01', updatedate: '2024-01-01', routes: [] },
    { id: 4, roleName: "前端", createdate: '2024-01-01', updatedate: '2024-01-01', routes: ['product', 'trademark', 'attr', 'acl', 'Menu'] },
    { id: 5, roleName: "后端", createdate: '2024-01-01', updatedate: '2024-01-01', routes: ['product', 'trademark', 'attr', 'acl', 'Menu'] },
    { id: 6, roleName: "测试", createdate: '2024-01-01', updatedate: '2024-01-01', routes: ['product', 'trademark', 'attr', 'acl', 'Menu'] },
    { id: 7, roleName: "产品", createdate: '2024-01-01', updatedate: '2024-01-01', routes: [] },
    { id: 8, roleName: "财务", createdate: '2024-01-01', updatedate: '2024-01-01', routes: [] },
    { id: 9, roleName: "运维", createdate: '2024-01-01', updatedate: '2024-01-01', routes: [] },
    { id: 10, roleName: "销售", createdate: '2024-01-01', updatedate: '2024-01-01', routes: [] },
    { id: 11, roleName: "程序鼓励师", createdate: '2024-01-01', updatedate: '2024-01-01', routes: [] },
]
// 角色权限数据,直接按角色id作为这里的index去分配权限：我觉得这样写很麻烦，但是观察老师那边的后端传递数据就是这样的，没办法
// 最后这部分数据基本只为了展示使用，但得根据里面select的情况决定roleData动态路由数据的分配
let permissionData = [
    // 超级管理员
    [{
        id: 1, name: '全部数据', level: 1, select: true,
        children: [
            {
                id: 2, name: '权限管理', level: 2, select: true,
                children: [
                    {
                        id: 7, name: '用户管理', level: 3, select: true,
                        children: [
                            { id: 19, name: '添加用户', level: 4, select: true, },
                            { id: 20, name: '删除用户', level: 4, select: true, },
                            { id: 21, name: '修改用户', level: 4, select: true, },
                            { id: 22, name: '分配角色', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 8, name: '角色管理', level: 3, select: true,
                        children: [
                            { id: 23, name: '分配权限', level: 4, select: true, },
                            { id: 24, name: '添加角色', level: 4, select: true, },
                            { id: 25, name: '修改角色', level: 4, select: true, },
                            { id: 26, name: '删除角色', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 9, name: '菜单管理', level: 3, select: true,
                        children: [
                            { id: 27, name: '添加', level: 4, select: true, },
                            { id: 28, name: '修改', level: 4, select: true, },
                            { id: 29, name: '删除', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 3, name: '商品管理', level: 2, select: true,
                children: [
                    {
                        id: 10, name: 'SKU管理', level: 3, select: true,
                        children: [
                            { id: 30, name: '添加SKU', level: 4, select: true, },
                            { id: 31, name: '修改SKU', level: 4, select: true, },
                            { id: 32, name: '删除SKU', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 11, name: '平台属性管理', level: 3, select: true,
                        children: [
                            { id: 33, name: '添加属性', level: 4, select: true, },
                            { id: 34, name: '更新属性', level: 4, select: true, },
                            { id: 35, name: '删除属性', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 12, name: '品牌管理', level: 3, select: true,
                        children: [
                            { id: 36, name: '添加品牌', level: 4, select: true, },
                            { id: 37, name: '修改品牌', level: 4, select: true, },
                            { id: 38, name: '删除品牌', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 13, name: 'SPU管理', level: 3, select: true,
                        children: [
                            { id: 39, name: '添加SPU', level: 4, select: true, },
                            { id: 40, name: '添加SKU', level: 4, select: true, },
                            { id: 41, name: '更新Spu', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 4, name: '订单管理', level: 2, select: true,
                children: [
                    {
                        id: 14, name: '订单列表', level: 3, select: true,
                        children: [
                            { id: 42, name: '查看订单详情', level: 4, select: true, },
                            { id: 43, name: '退款', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 15, name: '退款管理', level: 3, select: true, children: [],
                    },
                ],
            },
            {
                id: 5, name: '客户管理', level: 2, select: true,
                children: [
                    {
                        id: 16, name: '客户列表', level: 3, select: true,
                        children: [
                            { id: 44, name: '锁定客户', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 6, name: '优惠管理', level: 2, select: true,
                children: [
                    {
                        id: 17, name: '优惠活动管理', level: 3, select: true,
                        children: [
                            { id: 45, name: '添加活动', level: 4, select: true, },
                            { id: 46, name: '修改活动', level: 4, select: true, },
                            { id: 47, name: '活动规则', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 18, name: '优惠券管理', level: 3, select: true,
                        children: [
                            { id: 48, name: '添加优惠券', level: 4, select: true, },
                            { id: 49, name: '修改优惠券', level: 4, select: true, },
                        ],
                    },
                ],
            }
        ],
    }],
    // 前台
    [{
        id: 1, name: '全部数据', level: 1, select: true,
        children: [
            {
                id: 2, name: '权限管理', level: 2, select: true,
                children: [
                    {
                        id: 7, name: '用户管理', level: 3, select: true,
                        children: [
                            { id: 19, name: '添加用户', level: 4, select: false, },
                            { id: 20, name: '删除用户', level: 4, select: false, },
                            { id: 21, name: '修改用户', level: 4, select: false, },
                            { id: 22, name: '分配角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 8, name: '角色管理', level: 3, select: true,
                        children: [
                            { id: 23, name: '分配权限', level: 4, select: false, },
                            { id: 24, name: '添加角色', level: 4, select: false, },
                            { id: 25, name: '修改角色', level: 4, select: false, },
                            { id: 26, name: '删除角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 9, name: '菜单管理', level: 3, select: true,
                        children: [
                            { id: 27, name: '添加', level: 4, select: false, },
                            { id: 28, name: '修改', level: 4, select: false, },
                            { id: 29, name: '删除', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 3, name: '商品管理', level: 2, select: true,
                children: [
                    {
                        id: 10, name: '分类管理', level: 3, select: true,
                        children: [
                            { id: 30, name: '添加子分类', level: 4, select: false, },
                            { id: 31, name: '修改分类', level: 4, select: false, },
                            { id: 32, name: '删除分类', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 11, name: '平台属性管理', level: 3, select: true,
                        children: [
                            { id: 33, name: '添加属性', level: 4, select: false, },
                            { id: 34, name: '更新属性', level: 4, select: false, },
                            { id: 35, name: '删除属性', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 12, name: '品牌管理', level: 3, select: true,
                        children: [
                            { id: 36, name: '添加品牌', level: 4, select: false, },
                            { id: 37, name: '修改品牌', level: 4, select: false, },
                            { id: 38, name: '删除品牌', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 13, name: 'SPU管理', level: 3, select: true,
                        children: [
                            { id: 39, name: '添加SPU', level: 4, select: false, },
                            { id: 40, name: '添加SKU', level: 4, select: false, },
                            { id: 41, name: '更新Spu', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 4, name: '订单管理', level: 2, select: true,
                children: [
                    {
                        id: 14, name: '订单列表', level: 3, select: true,
                        children: [
                            { id: 42, name: '查看订单详情', level: 4, select: true, },
                            { id: 43, name: '退款', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 15, name: '退款管理', level: 3, select: false, children: [],
                    },
                ],
            },
            {
                id: 5, name: '客户管理', level: 2, select: true,
                children: [
                    {
                        id: 16, name: '客户列表', level: 3, select: true,
                        children: [
                            { id: 44, name: '锁定客户', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 6, name: '优惠管理', level: 2, select: true,
                children: [
                    {
                        id: 17, name: '优惠活动管理', level: 3, select: true,
                        children: [
                            { id: 45, name: '添加活动', level: 4, select: false, },
                            { id: 46, name: '修改活动', level: 4, select: false, },
                            { id: 47, name: '活动规则', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 18, name: '优惠券管理', level: 3, select: true,
                        children: [
                            { id: 48, name: '添加优惠券', level: 4, select: true, },
                            { id: 49, name: '修改优惠券', level: 4, select: false, },
                        ],
                    },
                ],
            }
        ],
    }],
    // 运营
    [{
        id: 1, name: '全部数据', level: 1, select: true,
        children: [
            {
                id: 2, name: '权限管理', level: 2, select: true,
                children: [
                    {
                        id: 7, name: '用户管理', level: 3, select: true,
                        children: [
                            { id: 19, name: '添加用户', level: 4, select: false, },
                            { id: 20, name: '删除用户', level: 4, select: false, },
                            { id: 21, name: '修改用户', level: 4, select: false, },
                            { id: 22, name: '分配角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 8, name: '角色管理', level: 3, select: true,
                        children: [
                            { id: 23, name: '分配权限', level: 4, select: false, },
                            { id: 24, name: '添加角色', level: 4, select: false, },
                            { id: 25, name: '修改角色', level: 4, select: false, },
                            { id: 26, name: '删除角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 9, name: '菜单管理', level: 3, select: true,
                        children: [
                            { id: 27, name: '添加', level: 4, select: false, },
                            { id: 28, name: '修改', level: 4, select: false, },
                            { id: 29, name: '删除', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 3, name: '商品管理', level: 2, select: true,
                children: [
                    {
                        id: 10, name: '分类管理', level: 3, select: true,
                        children: [
                            { id: 30, name: '添加子分类', level: 4, select: false, },
                            { id: 31, name: '修改分类', level: 4, select: false, },
                            { id: 32, name: '删除分类', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 11, name: '平台属性管理', level: 3, select: true,
                        children: [
                            { id: 33, name: '添加属性', level: 4, select: false, },
                            { id: 34, name: '更新属性', level: 4, select: false, },
                            { id: 35, name: '删除属性', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 12, name: '品牌管理', level: 3, select: true,
                        children: [
                            { id: 36, name: '添加品牌', level: 4, select: false, },
                            { id: 37, name: '修改品牌', level: 4, select: false, },
                            { id: 38, name: '删除品牌', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 13, name: 'SPU管理', level: 3, select: true,
                        children: [
                            { id: 39, name: '添加SPU', level: 4, select: false, },
                            { id: 40, name: '添加SKU', level: 4, select: false, },
                            { id: 41, name: '更新Spu', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 4, name: '订单管理', level: 2, select: true,
                children: [
                    {
                        id: 14, name: '订单列表', level: 3, select: true,
                        children: [
                            { id: 42, name: '查看订单详情', level: 4, select: true, },
                            { id: 43, name: '退款', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 15, name: '退款管理', level: 3, select: true, children: [],
                    },
                ],
            },
            {
                id: 5, name: '客户管理', level: 2, select: true,
                children: [
                    {
                        id: 16, name: '客户列表', level: 3, select: true,
                        children: [
                            { id: 44, name: '锁定客户', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 6, name: '优惠管理', level: 2, select: true,
                children: [
                    {
                        id: 17, name: '优惠活动管理', level: 3, select: true,
                        children: [
                            { id: 45, name: '添加活动', level: 4, select: true, },
                            { id: 46, name: '修改活动', level: 4, select: true, },
                            { id: 47, name: '活动规则', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 18, name: '优惠券管理', level: 3, select: true,
                        children: [
                            { id: 48, name: '添加优惠券', level: 4, select: true, },
                            { id: 49, name: '修改优惠券', level: 4, select: true, },
                        ],
                    },
                ],
            }
        ],
    }],
    // 前端
    [{
        id: 1, name: '全部数据', level: 1, select: true,
        children: [
            {
                id: 2, name: '权限管理', level: 2, select: true,
                children: [
                    {
                        id: 7, name: '用户管理', level: 3, select: true,
                        children: [
                            { id: 19, name: '添加用户', level: 4, select: false, },
                            { id: 20, name: '删除用户', level: 4, select: false, },
                            { id: 21, name: '修改用户', level: 4, select: false, },
                            { id: 22, name: '分配角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 8, name: '角色管理', level: 3, select: true,
                        children: [
                            { id: 23, name: '分配权限', level: 4, select: false, },
                            { id: 24, name: '添加角色', level: 4, select: false, },
                            { id: 25, name: '修改角色', level: 4, select: false, },
                            { id: 26, name: '删除角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 9, name: '菜单管理', level: 3, select: true,
                        children: [
                            { id: 27, name: '添加', level: 4, select: true, },
                            { id: 28, name: '修改', level: 4, select: true, },
                            { id: 29, name: '删除', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 3, name: '商品管理', level: 2, select: true,
                children: [
                    {
                        id: 10, name: 'SKU管理', level: 3, select: true,
                        children: [
                            { id: 30, name: '添加SKU', level: 4, select: true, },
                            { id: 31, name: '修改SKU', level: 4, select: true, },
                            { id: 32, name: '删除SKU', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 11, name: '平台属性管理', level: 3, select: true,
                        children: [
                            { id: 33, name: '添加属性', level: 4, select: true, },
                            { id: 34, name: '更新属性', level: 4, select: true, },
                            { id: 35, name: '删除属性', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 12, name: '品牌管理', level: 3, select: true,
                        children: [
                            { id: 36, name: '添加品牌', level: 4, select: true, },
                            { id: 37, name: '修改品牌', level: 4, select: true, },
                            { id: 38, name: '删除品牌', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 13, name: 'SPU管理', level: 3, select: true,
                        children: [
                            { id: 39, name: '添加SPU', level: 4, select: true, },
                            { id: 40, name: '添加SKU', level: 4, select: true, },
                            { id: 41, name: '更新Spu', level: 4, select: true, },
                        ],
                    },

                ],
            },
            {
                id: 4, name: '订单管理', level: 2, select: true,
                children: [
                    {
                        id: 14, name: '订单列表', level: 3, select: true,
                        children: [
                            { id: 42, name: '查看订单详情', level: 4, select: true, },
                            { id: 43, name: '退款', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 15, name: '退款管理', level: 3, select: false, children: [],
                    },
                ],
            },
            {
                id: 5, name: '客户管理', level: 2, select: false,
                children: [
                    {
                        id: 16, name: '客户列表', level: 3, select: false,
                        children: [
                            { id: 44, name: '锁定客户', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 6, name: '优惠管理', level: 2, select: false,
                children: [
                    {
                        id: 17, name: '优惠活动管理', level: 3, select: false,
                        children: [
                            { id: 45, name: '添加活动', level: 4, select: false, },
                            { id: 46, name: '修改活动', level: 4, select: false, },
                            { id: 47, name: '活动规则', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 18, name: '优惠券管理', level: 3, select: false,
                        children: [
                            { id: 48, name: '添加优惠券', level: 4, select: false, },
                            { id: 49, name: '修改优惠券', level: 4, select: false, },
                        ],
                    },
                ],
            }
        ],
    }],
    // 后端
    [{
        id: 1, name: '全部数据', level: 1, select: true,
        children: [
            {
                id: 2, name: '权限管理', level: 2, select: true,
                children: [
                    {
                        id: 7, name: '用户管理', level: 3, select: true,
                        children: [
                            { id: 19, name: '添加用户', level: 4, select: false, },
                            { id: 20, name: '删除用户', level: 4, select: false, },
                            { id: 21, name: '修改用户', level: 4, select: false, },
                            { id: 22, name: '分配角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 8, name: '角色管理', level: 3, select: true,
                        children: [
                            { id: 23, name: '分配权限', level: 4, select: false, },
                            { id: 24, name: '添加角色', level: 4, select: false, },
                            { id: 25, name: '修改角色', level: 4, select: false, },
                            { id: 26, name: '删除角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 9, name: '菜单管理', level: 3, select: true,
                        children: [
                            { id: 27, name: '添加', level: 4, select: true, },
                            { id: 28, name: '修改', level: 4, select: true, },
                            { id: 29, name: '删除', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 3, name: '商品管理', level: 2, select: true,
                children: [
                    {
                        id: 10, name: 'SKU管理', level: 3, select: true,
                        children: [
                            { id: 30, name: '添加SKU', level: 4, select: true, },
                            { id: 31, name: '修改SKU', level: 4, select: true, },
                            { id: 32, name: '删除SKU', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 11, name: '平台属性管理', level: 3, select: true,
                        children: [
                            { id: 33, name: '添加属性', level: 4, select: true, },
                            { id: 34, name: '更新属性', level: 4, select: true, },
                            { id: 35, name: '删除属性', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 12, name: '品牌管理', level: 3, select: true,
                        children: [
                            { id: 36, name: '添加品牌', level: 4, select: true, },
                            { id: 37, name: '修改品牌', level: 4, select: true, },
                            { id: 38, name: '删除品牌', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 13, name: 'SPU管理', level: 3, select: true,
                        children: [
                            { id: 39, name: '添加SPU', level: 4, select: true, },
                            { id: 40, name: '添加SKU', level: 4, select: true, },
                            { id: 41, name: '更新Spu', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 4, name: '订单管理', level: 2, select: true,
                children: [
                    {
                        id: 14, name: '订单列表', level: 3, select: true,
                        children: [
                            { id: 42, name: '查看订单详情', level: 4, select: true, },
                            { id: 43, name: '退款', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 15, name: '退款管理', level: 3, select: false, children: [],
                    },
                ],
            },
            {
                id: 5, name: '客户管理', level: 2, select: false,
                children: [
                    {
                        id: 16, name: '客户列表', level: 3, select: false,
                        children: [
                            { id: 44, name: '锁定客户', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 6, name: '优惠管理', level: 2, select: false,
                children: [
                    {
                        id: 17, name: '优惠活动管理', level: 3, select: false,
                        children: [
                            { id: 45, name: '添加活动', level: 4, select: false, },
                            { id: 46, name: '修改活动', level: 4, select: false, },
                            { id: 47, name: '活动规则', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 18, name: '优惠券管理', level: 3, select: false,
                        children: [
                            { id: 48, name: '添加优惠券', level: 4, select: false, },
                            { id: 49, name: '修改优惠券', level: 4, select: false, },
                        ],
                    },
                ],
            }
        ],
    }],
    // 测试
    [{
        id: 1, name: '全部数据', level: 1, select: true,
        children: [
            {
                id: 2, name: '权限管理', level: 2, select: true,
                children: [
                    {
                        id: 7, name: '用户管理', level: 3, select: true,
                        children: [
                            { id: 19, name: '添加用户', level: 4, select: false, },
                            { id: 20, name: '删除用户', level: 4, select: false, },
                            { id: 21, name: '修改用户', level: 4, select: false, },
                            { id: 22, name: '分配角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 8, name: '角色管理', level: 3, select: true,
                        children: [
                            { id: 23, name: '分配权限', level: 4, select: false, },
                            { id: 24, name: '添加角色', level: 4, select: false, },
                            { id: 25, name: '修改角色', level: 4, select: false, },
                            { id: 26, name: '删除角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 9, name: '菜单管理', level: 3, select: true,
                        children: [
                            { id: 27, name: '添加', level: 4, select: true, },
                            { id: 28, name: '修改', level: 4, select: true, },
                            { id: 29, name: '删除', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 3, name: '商品管理', level: 2, select: true,
                children: [
                    {
                        id: 10, name: 'SKU管理', level: 3, select: true,
                        children: [
                            { id: 30, name: '添加SKU', level: 4, select: true, },
                            { id: 31, name: '修改SKU', level: 4, select: true, },
                            { id: 32, name: '删除SKU', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 11, name: '平台属性管理', level: 3, select: true,
                        children: [
                            { id: 33, name: '添加属性', level: 4, select: true, },
                            { id: 34, name: '更新属性', level: 4, select: true, },
                            { id: 35, name: '删除属性', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 12, name: '品牌管理', level: 3, select: true,
                        children: [
                            { id: 36, name: '添加品牌', level: 4, select: true, },
                            { id: 37, name: '修改品牌', level: 4, select: true, },
                            { id: 38, name: '删除品牌', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 13, name: 'SPU管理', level: 3, select: true,
                        children: [
                            { id: 39, name: '添加SPU', level: 4, select: true, },
                            { id: 40, name: '添加SKU', level: 4, select: true, },
                            { id: 41, name: '更新Spu', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 4, name: '订单管理', level: 2, select: true,
                children: [
                    {
                        id: 14, name: '订单列表', level: 3, select: true,
                        children: [
                            { id: 42, name: '查看订单详情', level: 4, select: true, },
                            { id: 43, name: '退款', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 15, name: '退款管理', level: 3, select: false, children: [],
                    },
                ],
            },
            {
                id: 5, name: '客户管理', level: 2, select: false,
                children: [
                    {
                        id: 16, name: '客户列表', level: 3, select: false,
                        children: [
                            { id: 44, name: '锁定客户', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 6, name: '优惠管理', level: 2, select: false,
                children: [
                    {
                        id: 17, name: '优惠活动管理', level: 3, select: false,
                        children: [
                            { id: 45, name: '添加活动', level: 4, select: false, },
                            { id: 46, name: '修改活动', level: 4, select: false, },
                            { id: 47, name: '活动规则', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 18, name: '优惠券管理', level: 3, select: false,
                        children: [
                            { id: 48, name: '添加优惠券', level: 4, select: false, },
                            { id: 49, name: '修改优惠券', level: 4, select: false, },
                        ],
                    },
                ],
            }
        ],
    }],
    // 产品
    [{
        id: 1, name: '全部数据', level: 1, select: true,
        children: [
            {
                id: 2, name: '权限管理', level: 2, select: true,
                children: [
                    {
                        id: 7, name: '用户管理', level: 3, select: true,
                        children: [
                            { id: 19, name: '添加用户', level: 4, select: false, },
                            { id: 20, name: '删除用户', level: 4, select: false, },
                            { id: 21, name: '修改用户', level: 4, select: false, },
                            { id: 22, name: '分配角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 8, name: '角色管理', level: 3, select: true,
                        children: [
                            { id: 23, name: '分配权限', level: 4, select: false, },
                            { id: 24, name: '添加角色', level: 4, select: false, },
                            { id: 25, name: '修改角色', level: 4, select: false, },
                            { id: 26, name: '删除角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 9, name: '菜单管理', level: 3, select: true,
                        children: [
                            { id: 27, name: '添加', level: 4, select: false, },
                            { id: 28, name: '修改', level: 4, select: false, },
                            { id: 29, name: '删除', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 3, name: '商品管理', level: 2, select: true,
                children: [
                    {
                        id: 10, name: 'SKU管理', level: 3, select: true,
                        children: [
                            { id: 30, name: '添加SKU', level: 4, select: true, },
                            { id: 31, name: '修改SKU', level: 4, select: true, },
                            { id: 32, name: '删除SKU', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 11, name: '平台属性管理', level: 3, select: true,
                        children: [
                            { id: 33, name: '添加属性', level: 4, select: true, },
                            { id: 34, name: '更新属性', level: 4, select: true, },
                            { id: 35, name: '删除属性', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 12, name: '品牌管理', level: 3, select: true,
                        children: [
                            { id: 36, name: '添加品牌', level: 4, select: true, },
                            { id: 37, name: '修改品牌', level: 4, select: true, },
                            { id: 38, name: '删除品牌', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 13, name: 'SPU管理', level: 3, select: true,
                        children: [
                            { id: 39, name: '添加SPU', level: 4, select: true, },
                            { id: 40, name: '添加SKU', level: 4, select: true, },
                            { id: 41, name: '更新Spu', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 4, name: '订单管理', level: 2, select: true,
                children: [
                    {
                        id: 14, name: '订单列表', level: 3, select: true,
                        children: [
                            { id: 42, name: '查看订单详情', level: 4, select: false, },
                            { id: 43, name: '退款', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 15, name: '退款管理', level: 3, select: false, children: [],
                    },
                ],
            },
            {
                id: 5, name: '客户管理', level: 2, select: true,
                children: [
                    {
                        id: 16, name: '客户列表', level: 3, select: true,
                        children: [
                            { id: 44, name: '锁定客户', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 6, name: '优惠管理', level: 2, select: true,
                children: [
                    {
                        id: 17, name: '优惠活动管理', level: 3, select: true,
                        children: [
                            { id: 45, name: '添加活动', level: 4, select: true, },
                            { id: 46, name: '修改活动', level: 4, select: true, },
                            { id: 47, name: '活动规则', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 18, name: '优惠券管理', level: 3, select: true,
                        children: [
                            { id: 48, name: '添加优惠券', level: 4, select: false, },
                            { id: 49, name: '修改优惠券', level: 4, select: false, },
                        ],
                    },
                ],
            }
        ],
    }],
    // 财务
    [{
        id: 1, name: '全部数据', level: 1, select: true,
        children: [
            {
                id: 2, name: '权限管理', level: 2, select: true,
                children: [
                    {
                        id: 7, name: '用户管理', level: 3, select: true,
                        children: [
                            { id: 19, name: '添加用户', level: 4, select: false, },
                            { id: 20, name: '删除用户', level: 4, select: false, },
                            { id: 21, name: '修改用户', level: 4, select: false, },
                            { id: 22, name: '分配角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 8, name: '角色管理', level: 3, select: true,
                        children: [
                            { id: 23, name: '分配权限', level: 4, select: false, },
                            { id: 24, name: '添加角色', level: 4, select: false, },
                            { id: 25, name: '修改角色', level: 4, select: false, },
                            { id: 26, name: '删除角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 9, name: '菜单管理', level: 3, select: true,
                        children: [
                            { id: 27, name: '添加', level: 4, select: false, },
                            { id: 28, name: '修改', level: 4, select: false, },
                            { id: 29, name: '删除', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 3, name: '商品管理', level: 2, select: true,
                children: [
                    {
                        id: 10, name: '分类管理', level: 3, select: true,
                        children: [
                            { id: 30, name: '添加子分类', level: 4, select: false, },
                            { id: 31, name: '修改分类', level: 4, select: false, },
                            { id: 32, name: '删除分类', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 11, name: '平台属性管理', level: 3, select: true,
                        children: [
                            { id: 33, name: '添加属性', level: 4, select: false, },
                            { id: 34, name: '更新属性', level: 4, select: false, },
                            { id: 35, name: '删除属性', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 12, name: '品牌管理', level: 3, select: true,
                        children: [
                            { id: 36, name: '添加品牌', level: 4, select: false, },
                            { id: 37, name: '修改品牌', level: 4, select: false, },
                            { id: 38, name: '删除品牌', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 13, name: 'SPU管理', level: 3, select: true,
                        children: [
                            { id: 39, name: '添加SPU', level: 4, select: false, },
                            { id: 40, name: '添加SKU', level: 4, select: false, },
                            { id: 41, name: '更新Spu', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 4, name: '订单管理', level: 2, select: true,
                children: [
                    {
                        id: 14, name: '订单列表', level: 3, select: true,
                        children: [
                            { id: 42, name: '查看订单详情', level: 4, select: true, },
                            { id: 43, name: '退款', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 15, name: '退款管理', level: 3, select: true, children: [],
                    },
                ],
            },
            {
                id: 5, name: '客户管理', level: 2, select: true,
                children: [
                    {
                        id: 16, name: '客户列表', level: 3, select: true,
                        children: [
                            { id: 44, name: '锁定客户', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 6, name: '优惠管理', level: 2, select: true,
                children: [
                    {
                        id: 17, name: '优惠活动管理', level: 3, select: true,
                        children: [
                            { id: 45, name: '添加活动', level: 4, select: true, },
                            { id: 46, name: '修改活动', level: 4, select: true, },
                            { id: 47, name: '活动规则', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 18, name: '优惠券管理', level: 3, select: true,
                        children: [
                            { id: 48, name: '添加优惠券', level: 4, select: true, },
                            { id: 49, name: '修改优惠券', level: 4, select: true, },
                        ],
                    },
                ],
            }
        ],
    }],
    // 运维
    [{
        id: 1, name: '全部数据', level: 1, select: true,
        children: [
            {
                id: 2, name: '权限管理', level: 2, select: true,
                children: [
                    {
                        id: 7, name: '用户管理', level: 3, select: true,
                        children: [
                            { id: 19, name: '添加用户', level: 4, select: false, },
                            { id: 20, name: '删除用户', level: 4, select: false, },
                            { id: 21, name: '修改用户', level: 4, select: false, },
                            { id: 22, name: '分配角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 8, name: '角色管理', level: 3, select: true,
                        children: [
                            { id: 23, name: '分配权限', level: 4, select: false, },
                            { id: 24, name: '添加角色', level: 4, select: false, },
                            { id: 25, name: '修改角色', level: 4, select: false, },
                            { id: 26, name: '删除角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 9, name: '菜单管理', level: 3, select: true,
                        children: [
                            { id: 27, name: '添加', level: 4, select: false, },
                            { id: 28, name: '修改', level: 4, select: false, },
                            { id: 29, name: '删除', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 3, name: '商品管理', level: 2, select: true,
                children: [
                    {
                        id: 10, name: 'SKU管理', level: 3, select: true,
                        children: [
                            { id: 30, name: '添加SKU', level: 4, select: true, },
                            { id: 31, name: '修改SKU', level: 4, select: true, },
                            { id: 32, name: '删除SKU', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 11, name: '平台属性管理', level: 3, select: true,
                        children: [
                            { id: 33, name: '添加属性', level: 4, select: true, },
                            { id: 34, name: '更新属性', level: 4, select: true, },
                            { id: 35, name: '删除属性', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 12, name: '品牌管理', level: 3, select: true,
                        children: [
                            { id: 36, name: '添加品牌', level: 4, select: true, },
                            { id: 37, name: '修改品牌', level: 4, select: true, },
                            { id: 38, name: '删除品牌', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 13, name: 'SPU管理', level: 3, select: true,
                        children: [
                            { id: 39, name: '添加SPU', level: 4, select: true, },
                            { id: 40, name: '添加SKU', level: 4, select: true, },
                            { id: 41, name: '更新Spu', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 4, name: '订单管理', level: 2, select: true,
                children: [
                    {
                        id: 14, name: '订单列表', level: 3, select: true,
                        children: [
                            { id: 42, name: '查看订单详情', level: 4, select: false, },
                            { id: 43, name: '退款', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 15, name: '退款管理', level: 3, select: false, children: [],
                    },
                ],
            },
            {
                id: 5, name: '客户管理', level: 2, select: true,
                children: [
                    {
                        id: 16, name: '客户列表', level: 3, select: true,
                        children: [
                            { id: 44, name: '锁定客户', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 6, name: '优惠管理', level: 2, select: true,
                children: [
                    {
                        id: 17, name: '优惠活动管理', level: 3, select: true,
                        children: [
                            { id: 45, name: '添加活动', level: 4, select: true, },
                            { id: 46, name: '修改活动', level: 4, select: true, },
                            { id: 47, name: '活动规则', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 18, name: '优惠券管理', level: 3, select: true,
                        children: [
                            { id: 48, name: '添加优惠券', level: 4, select: false, },
                            { id: 49, name: '修改优惠券', level: 4, select: false, },
                        ],
                    },
                ],
            }
        ],
    }],
    // 销售
    [{
        id: 1, name: '全部数据', level: 1, select: true,
        children: [
            {
                id: 2, name: '权限管理', level: 2, select: true,
                children: [
                    {
                        id: 7, name: '用户管理', level: 3, select: true,
                        children: [
                            { id: 19, name: '添加用户', level: 4, select: false, },
                            { id: 20, name: '删除用户', level: 4, select: false, },
                            { id: 21, name: '修改用户', level: 4, select: false, },
                            { id: 22, name: '分配角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 8, name: '角色管理', level: 3, select: true,
                        children: [
                            { id: 23, name: '分配权限', level: 4, select: false, },
                            { id: 24, name: '添加角色', level: 4, select: false, },
                            { id: 25, name: '修改角色', level: 4, select: false, },
                            { id: 26, name: '删除角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 9, name: '菜单管理', level: 3, select: true,
                        children: [
                            { id: 27, name: '添加', level: 4, select: false, },
                            { id: 28, name: '修改', level: 4, select: false, },
                            { id: 29, name: '删除', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 3, name: '商品管理', level: 2, select: true,
                children: [
                    {
                        id: 10, name: 'SKU管理', level: 3, select: true,
                        children: [
                            { id: 30, name: '添加SKU', level: 4, select: true, },
                            { id: 31, name: '修改SKU', level: 4, select: true, },
                            { id: 32, name: '删除SKU', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 11, name: '平台属性管理', level: 3, select: true,
                        children: [
                            { id: 33, name: '添加属性', level: 4, select: true, },
                            { id: 34, name: '更新属性', level: 4, select: true, },
                            { id: 35, name: '删除属性', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 12, name: '品牌管理', level: 3, select: true,
                        children: [
                            { id: 36, name: '添加品牌', level: 4, select: true, },
                            { id: 37, name: '修改品牌', level: 4, select: true, },
                            { id: 38, name: '删除品牌', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 13, name: 'SPU管理', level: 3, select: true,
                        children: [
                            { id: 39, name: '添加SPU', level: 4, select: true, },
                            { id: 40, name: '添加SKU', level: 4, select: true, },
                            { id: 41, name: '更新Spu', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 4, name: '订单管理', level: 2, select: true,
                children: [
                    {
                        id: 14, name: '订单列表', level: 3, select: true,
                        children: [
                            { id: 42, name: '查看订单详情', level: 4, select: false, },
                            { id: 43, name: '退款', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 15, name: '退款管理', level: 3, select: false, children: [],
                    },
                ],
            },
            {
                id: 5, name: '客户管理', level: 2, select: true,
                children: [
                    {
                        id: 16, name: '客户列表', level: 3, select: true,
                        children: [
                            { id: 44, name: '锁定客户', level: 4, select: true, },
                        ],
                    },
                ],
            },
            {
                id: 6, name: '优惠管理', level: 2, select: true,
                children: [
                    {
                        id: 17, name: '优惠活动管理', level: 3, select: true,
                        children: [
                            { id: 45, name: '添加活动', level: 4, select: true, },
                            { id: 46, name: '修改活动', level: 4, select: true, },
                            { id: 47, name: '活动规则', level: 4, select: true, },
                        ],
                    },
                    {
                        id: 18, name: '优惠券管理', level: 3, select: true,
                        children: [
                            { id: 48, name: '添加优惠券', level: 4, select: false, },
                            { id: 49, name: '修改优惠券', level: 4, select: false, },
                        ],
                    },
                ],
            }
        ],
    }],
    // 程序鼓励师
    [{
        id: 1, name: '全部数据', level: 1, select: true,
        children: [
            {
                id: 2, name: '权限管理', level: 2, select: true,
                children: [
                    {
                        id: 7, name: '用户管理', level: 3, select: true,
                        children: [
                            { id: 19, name: '添加用户', level: 4, select: false, },
                            { id: 20, name: '删除用户', level: 4, select: false, },
                            { id: 21, name: '修改用户', level: 4, select: false, },
                            { id: 22, name: '分配角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 8, name: '角色管理', level: 3, select: true,
                        children: [
                            { id: 23, name: '分配权限', level: 4, select: false, },
                            { id: 24, name: '添加角色', level: 4, select: false, },
                            { id: 25, name: '修改角色', level: 4, select: false, },
                            { id: 26, name: '删除角色', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 9, name: '菜单管理', level: 3, select: true,
                        children: [
                            { id: 27, name: '添加', level: 4, select: false, },
                            { id: 28, name: '修改', level: 4, select: false, },
                            { id: 29, name: '删除', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 3, name: '商品管理', level: 2, select: true,
                children: [
                    {
                        id: 10, name: '分类管理', level: 3, select: true,
                        children: [
                            { id: 30, name: '添加子分类', level: 4, select: false, },
                            { id: 31, name: '修改分类', level: 4, select: false, },
                            { id: 32, name: '删除分类', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 11, name: '平台属性管理', level: 3, select: true,
                        children: [
                            { id: 33, name: '添加属性', level: 4, select: false, },
                            { id: 34, name: '更新属性', level: 4, select: false, },
                            { id: 35, name: '删除属性', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 12, name: '品牌管理', level: 3, select: true,
                        children: [
                            { id: 36, name: '添加品牌', level: 4, select: false, },
                            { id: 37, name: '修改品牌', level: 4, select: false, },
                            { id: 38, name: '删除品牌', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 13, name: 'SPU管理', level: 3, select: true,
                        children: [
                            { id: 39, name: '添加SPU', level: 4, select: false, },
                            { id: 40, name: '添加SKU', level: 4, select: false, },
                            { id: 41, name: '更新Spu', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 4, name: '订单管理', level: 2, select: true,
                children: [
                    {
                        id: 14, name: '订单列表', level: 3, select: true,
                        children: [
                            { id: 42, name: '查看订单详情', level: 4, select: false, },
                            { id: 43, name: '退款', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 15, name: '退款管理', level: 3, select: false, children: [],
                    },
                ],
            },
            {
                id: 5, name: '客户管理', level: 2, select: true,
                children: [
                    {
                        id: 16, name: '客户列表', level: 3, select: true,
                        children: [
                            { id: 44, name: '锁定客户', level: 4, select: false, },
                        ],
                    },
                ],
            },
            {
                id: 6, name: '优惠管理', level: 2, select: true,
                children: [
                    {
                        id: 17, name: '优惠活动管理', level: 3, select: true,
                        children: [
                            { id: 45, name: '添加活动', level: 4, select: false, },
                            { id: 46, name: '修改活动', level: 4, select: false, },
                            { id: 47, name: '活动规则', level: 4, select: false, },
                        ],
                    },
                    {
                        id: 18, name: '优惠券管理', level: 3, select: true,
                        children: [
                            { id: 48, name: '添加优惠券', level: 4, select: false, },
                            { id: 49, name: '修改优惠券', level: 4, select: false, },
                        ],
                    },
                ],
            }
        ],
    }]
]

// 菜单管理权限数值
// 后面设置函数的话，添加就遍历permissionData，根据id找位置，每个都添加相同内容就行
let menuData = [{
    id: 1, name: '全部数据', level: 1, updateDate: '2024-12-25', value: '',
    children: [
        {
            id: 2, name: '权限管理', level: 2, updateDate: '2024-12-25', value: 'acl',
            children: [
                {
                    id: 7, name: '用户管理', level: 3, updateDate: '2024-12-25', value: 'User',
                    children: [
                        { id: 19, name: '添加用户', level: 4, updateDate: '2024-12-25', value: 'btn.User.add', },
                        { id: 20, name: '删除用户', level: 4, updateDate: '2024-12-25', value: 'btn.User.remove', },
                        { id: 21, name: '修改用户', level: 4, updateDate: '2024-12-25', value: 'btn.User.update', },
                        { id: 22, name: '分配角色', level: 4, updateDate: '2024-12-25', value: 'btn.User.assign', },
                    ],
                },
                {
                    id: 8, name: '角色管理', level: 3, updateDate: '2024-12-25', value: 'Role',
                    children: [
                        { id: 23, name: '分配权限', level: 4, updateDate: '2024-12-25', value: 'btn.Permission.assign', },
                        { id: 24, name: '添加角色', level: 4, updateDate: '2024-12-25', value: 'btn.Role.add', },
                        { id: 25, name: '修改角色', level: 4, updateDate: '2024-12-25', value: 'btn.Role.update', },
                        { id: 26, name: '删除角色', level: 4, updateDate: '2024-12-25', value: 'btn.Role.delete', },
                    ],
                },
                {
                    id: 9, name: '菜单管理', level: 3, updateDate: '2024-12-25', value: 'Menu',
                    children: [
                        { id: 27, name: '添加', level: 4, updateDate: '2024-12-25', value: 'btn.Menu.add', },
                        { id: 28, name: '修改', level: 4, updateDate: '2024-12-25', value: 'btn.Menu.update', },
                        { id: 29, name: '删除', level: 4, updateDate: '2024-12-25', value: 'btn.Menu.delete', },
                    ],
                },
            ],
        },
        {
            id: 3, name: '商品管理', level: 2, updateDate: '2024-12-25', value: 'product',
            children: [
                {
                    id: 10, name: '分类管理', level: 3, updateDate: '2024-12-25', value: 'Sort',
                    children: [
                        { id: 30, name: '添加子分类', level: 4, updateDate: '2024-12-25', value: 'btn.Sort.add', },
                        { id: 31, name: '修改分类', level: 4, updateDate: '2024-12-25', value: 'btn.Sort.update', },
                        { id: 32, name: '删除分类', level: 4, updateDate: '2024-12-25', value: 'btn.Sort.delete', },
                    ],
                },
                {
                    id: 11, name: '平台属性管理', level: 3, updateDate: '2024-12-25', value: 'Plat',
                    children: [
                        { id: 33, name: '添加属性', level: 4, updateDate: '2024-12-25', value: 'btn.Plat.add', },
                        { id: 34, name: '更新属性', level: 4, updateDate: '2024-12-25', value: 'btn.Plat.update', },
                        { id: 35, name: '删除属性', level: 4, updateDate: '2024-12-25', value: 'btn.Plat.delete', },
                    ],
                },
                {
                    id: 12, name: '品牌管理', level: 3, updateDate: '2024-12-25', value: 'Brand',
                    children: [
                        { id: 36, name: '添加品牌', level: 4, updateDate: '2024-12-25', value: 'btn.Brand.add', },
                        { id: 37, name: '修改品牌', level: 4, updateDate: '2024-12-25', value: 'btn.Brand.update', },
                        { id: 38, name: '删除品牌', level: 4, updateDate: '2024-12-25', value: 'btn.Brand.delete', },
                    ],
                },
                {
                    id: 13, name: 'SPU管理', level: 3, updateDate: '2024-12-25', value: 'SPU',
                    children: [
                        { id: 39, name: '添加SPU', level: 4, updateDate: '2024-12-25', value: 'btn.SPU.add', },
                        { id: 40, name: '添加SKU', level: 4, updateDate: '2024-12-25', value: 'btn.SPU.update', },
                        { id: 41, name: '更新Spu', level: 4, updateDate: '2024-12-25', value: 'btn.SPU.delete', },
                    ],
                },
            ],
        },
        {
            id: 4, name: '订单管理', level: 2, updateDate: '2024-12-25', value: 'Indent',
            children: [
                {
                    id: 14, name: '订单列表', level: 3, updateDate: '2024-12-25', value: 'IndentList',
                    children: [
                        { id: 42, name: '查看订单详情', level: 4, updateDate: '2024-12-25', value: 'btn.Indent.detail', },
                        { id: 43, name: '退款', level: 4, updateDate: '2024-12-25', value: 'btn.Indent.refund', },
                    ],
                },
                {
                    id: 15, name: '退款管理', level: 3, updateDate: '2024-12-25', value: 'Refund', children: [],
                },
            ],
        },
        {
            id: 5, name: '客户管理', level: 2, updateDate: '2024-12-25', value: 'Guest',
            children: [
                {
                    id: 16, name: '客户列表', level: 3, updateDate: '2024-12-25', value: 'GuestList',
                    children: [
                        { id: 44, name: '锁定客户', level: 4, updateDate: '2024-12-25', value: 'btn.GuestList.lock', },
                    ],
                },
            ],
        },
        {
            id: 6, name: '优惠管理', level: 2, updateDate: '2024-12-25', value: 'Discount',
            children: [
                {
                    id: 17, name: '优惠活动管理', level: 3, updateDate: '2024-12-25', value: 'Activity',
                    children: [
                        { id: 45, name: '添加活动', level: 4, updateDate: '2024-12-25', value: 'btn.Activity.add', },
                        { id: 46, name: '修改活动', level: 4, updateDate: '2024-12-25', value: 'btn.Activity.update', },
                        { id: 47, name: '活动规则', level: 4, updateDate: '2024-12-25', value: 'btn.Activity.delete', },
                    ],
                },
                {
                    id: 18, name: '优惠券管理', level: 3, updateDate: '2024-12-25', value: 'Coupon',
                    children: [
                        { id: 48, name: '添加优惠券', level: 4, updateDate: '2024-12-25', value: 'btn.Coupon.add', },
                        { id: 49, name: '修改优惠券', level: 4, updateDate: '2024-12-25', value: 'btn.Coupon.update', },
                    ],
                },
            ],
        }
    ],
}]

// 对应用户路由权限---没用
// let userRoutes = [
//     {
//         token: 'tokenAdmin',
//         routes: ['product', 'trademark', 'sku', 'spu', 'attr', 'acl', 'user', 'role', 'Menu']
//     },
//     {
//         token: 'tokenTest',
//         routes: ['product', 'trademark', 'sku', 'acl', 'user']
//     },
//     {
//         token: 'tokenBamao',
//         routes: ['product', 'trademark', 'sku', 'spu', 'attr', 'acl', 'user', 'role', 'Menu']
//     },
//     {
//         token: 'tokenXimao',
//         routes: ['product', 'trademark', 'sku', 'acl', 'user']
//     },
//     {
//         token: 'tokenTest1',
//         routes: ['product', 'trademark', 'sku', 'acl', 'user']
//     },
//     {
//         token: 'tokenTest2',
//         routes: ['product', 'trademark', 'sku', 'acl', 'user']
//     },
//     {
//         token: 'tokenTest3',
//         routes: ['product', 'trademark', 'sku', 'acl', 'user']
//     },
//     {
//         token: 'tokenTest4',
//         routes: ['product', 'trademark', 'sku', 'acl', 'user']
//     },

// ]

// 根据用户是什么角色从而决定分配什么路由权限 userRole: '超级管理员',每次修改角色或删除角色就得重跑一遍，还得记得清空
userData.forEach((item) => {
    // item.routes = [];
    if (item.userRole) {//如果已经分配角色
        let assignroles = item.userRole.split(',');//按逗号拆分
        assignroles.forEach((littleItem) => {
            roleData.some((role) => {//对角色数据去找littleitem对应角色，并把route交给item.routes
                if (littleItem === role.roleName) {
                    if (item.routes) {
                        let temp = item.routes
                        item.routes = [...temp, ...role.routes];
                    } else {
                        item.routes = [...role.routes];
                    }
                }
            })
        })
    } else { item.routes = []; }//没角色就没异步路由

})

// 根据用户是什么角色从而决定分配什么按钮权限 userRole: '超级管理员',
// 逻辑和写法已经基本和路由一致，不过变成在roleData里添加button，根据menuData里的val赋值
// 然后有权限就拿到这个值，然后修改角色权限、删除角色的时候再清空重跑一遍
// 在用户获取数据的时候交给前端
// 套路一致就不重复写了
// 但是定义成自定义指令然后控制的思路很好------142集 16:38

// 异步路由数据---没用
// const asyncRoutes = [
//     // 商品管理
//     {
//         path: '/product',
//         redirect: '/product/trademark',
//         name: 'product',
//         label: '商品管理',
//         component: () => import('@/layout/Layout.vue'),
//         meta: {
//             title: 'menu.product.title',
//             icon: 'ShoppingBag',
//             hidden: false
//         },
//         children: [
//             {
//                 path: '/product/trademark',
//                 name: 'trademark',
//                 component: () => import('@/views/product/trademark/index.vue'),
//                 label: '品牌管理',
//                 meta: {
//                     title: 'menu.product.brand',
//                     icon: 'Shop',
//                     hidden: false
//                 },
//             },
//             {
//                 path: '/product/spu',
//                 name: 'spu',
//                 label: 'SPU管理',
//                 component: () => import('@/views/product/spu/index.vue'),
//                 meta: {
//                     title: 'menu.product.spu',
//                     icon: 'Shop',
//                     hidden: false
//                 },
//             },
//             {
//                 path: '/product/sku',
//                 name: 'sku',
//                 label: 'SKU管理',
//                 component: () => import('@/views/product/sku/index.vue'),
//                 meta: {
//                     title: 'menu.product.sku',
//                     icon: 'Shop',
//                     hidden: false
//                 },
//             },
//             {
//                 path: '/product/attr',
//                 component: () => import('@/views/product/attr/index.vue'),
//                 name: 'attr',
//                 meta: {
//                     title: '属性管理',
//                     isShow: true,
//                     icon: "ChromeFilled",
//                     hidden: false
//                 }
//             },
//         ]
//     },

//     // 权限管理
//     {
//         path: '/acl',
//         redirect: '/acl/user',
//         name: 'acl',
//         label: '权限管理',
//         component: () => import('@/layout/Layout.vue'),
//         meta: {
//             title: 'menu.acl.title',
//             icon: 'Histogram',
//             hidden: false
//         },
//         children: [
//             {
//                 path: '/acl/user',
//                 name: 'user',
//                 label: '用户管理',
//                 component: () => import('@/views/acl/user/index.vue'),
//                 meta: {
//                     title: 'menu.acl.user',
//                     icon: 'User',
//                     hidden: false
//                 },
//             },
//             {
//                 path: '/acl/role',
//                 name: 'role',
//                 label: '角色管理',
//                 component: () => import('@/views/acl/role/index.vue'),
//                 meta: {
//                     title: 'menu.acl.role',
//                     icon: 'UserFilled',
//                     hidden: false
//                 },
//             },
//             {
//                 path: '/acl/menus',
//                 name: 'Menu',
//                 label: '菜单管理',
//                 component: () => import('@/views/acl/menus/index.vue'),
//                 meta: {
//                     title: 'menu.acl.menu',
//                     icon: 'List',
//                     hidden: false
//                 },
//             },
//         ]
//     },
// ]
//  留言板数据
let messageData = []



// 登录接口方法
exports.login_handler = (req, res) => {
    const data = req.body;
    const result = userData.some(item => {
        if (item.userNumber == data.userNumber) {
            if (item.password == data.password) {
                res.send({
                    code: 200,
                    status: 1,
                    message: '登录成功',
                    token: item.token
                })
            } else {
                res.send({
                    code: 201,
                    status: 0,
                    message: '密码错误',
                })
            }
            return true
        }
    })
    if (!result) {
        res.send({
            code: 201,
            status: 0,
            message: '账号不存在',
        })
    }
}
// 获取用户基本信息方法
exports.getUserinfo_handler = (req, res) => {
    let idx
    if (req.headers.token) {
        // 判断用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const result = userData.some((item, index) => {
            if (item.token == req.headers.token) {
                idx = index
                return true
            }
        })
        if (result) {
            res.send({
                code: 200,
                status: 1,
                message: '获取用户数据成功',
                data: {
                    username: userData[idx].username,
                    // avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                    avatar: userData[idx].avatar,
                    routes: userData[idx].routes,
                    userId: userData[idx].id,
                    userRole: userData[idx].userRole,
                }
            })
        } else {
            res.send({
                code: 201,
                status: 0,
                message: '获取用户数据失败',
            })
        }
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}

// 获取品牌管理数据方法
exports.getBrandData_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body
        const currentPage = data.currentPage // 前端传递过来的的当前页数
        const pageSize = data.pageSize // 前端传递过来的当前一页展示数量
        const startIdx = (currentPage - 1) * pageSize // 截取的初始下标
        const endIdx = startIdx + pageSize // 截取的初始下标
        const arr = tableData.slice(startIdx, endIdx)
        res.send({
            code: 200,
            status: 1,
            message: '获取品牌管理数据成功',
            data: {
                // 这里出现重名，上面是传递回去参数的名字
                // 下面是上面的数组名
                tableData: arr,
                total: tableData.length
            }
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}

// 传递照片信息给服务器的方法
exports.uploadPhotoData_handler = (req, res) => {
    // console.log(req.headers);
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const incomingForm = formidable({
            uploadDir: path.resolve(__dirname, '../public/images'),
            keepExtensions: true
        })
        incomingForm.parse(req, (err, fileBody, { file }) => {
            // console.log(file[0].newFilename);
            // console.log(path.resolve(__dirname, '../public/images'));
            if (err) {
                next()
                return
            }
            // 添加
            while (PhotoData.length !== 0) {
                PhotoData.pop();
            }
            PhotoData.push({
                logoUrl: 'http://127.0.0.1:8080/images/' + file[0].newFilename,
            })
            res.send({
                code: 200,
                status: 1,
                message: '上传成功',
            })
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
            // message: `${req.headers}`
        })
    }
}

// 添加或修改品牌数据方法
exports.uploadImg_handler = (req, res) => {
    // console.log(req.headers);
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            // console.log('是被查token拦截了吗');
            // 不是，这里通过了
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body;
        // console.log(PhotoData);
        // 编辑
        if (data.id) {
            let idx
            const result = tableData.some((item, index) => {
                if (item.id == data.id) {
                    idx = index
                    return true
                }
            })
            if (result) {
                // 如果编辑时没有修改图像，那么不会有新图像入栈，也不需要更改
                if (PhotoData[0]) {
                    tableData[idx].logoUrl = PhotoData[0].logoUrl;
                    PhotoData.pop();
                }
                res.send({
                    code: 200,
                    status: 1,
                    message: '上传成功',
                })
            } else {
                res.send({
                    code: 201,
                    status: 0,
                    message: '上传失败',
                })
            }
        }
        // 添加
        else {
            tableData.push({
                tmName: data.name,
                logoUrl: PhotoData[0].logoUrl,
                // id: (tableData.length + 1)
                id: uuid.v4(),
            })
            PhotoData.pop();
            res.send({
                code: 200,
                status: 1,
                message: '上传成功',
            })
        }
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
            // message: `${req.headers}`
        })
    }
}
// 修改品牌brandName方法
exports.uploadBrandName_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body
        let idx
        const result = tableData.some((item, index) => {
            if (item.id == data.id) {
                idx = index
                return true
            }
        })
        if (result) {
            // console.log(data);
            tableData[idx].tmName = data.name;
            res.send({
                code: 200,
                status: 1,
                message: '修改成功',
            })
        } else {
            res.send({
                code: 201,
                status: 0,
                message: '进行添加操作中或修改失败',
            })
        }

    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 删除某个品牌数据方法
exports.delBrandData_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body
        let idx
        const result = tableData.some((item, index) => {
            if (item.id == data.id) {
                idx = index
                return true
            }
        })
        if (result) {
            tableData.splice(idx, 1)
            res.send({
                code: 200,
                status: 1,
                message: '删除品牌数据成功',
            })
        } else {
            res.send({
                code: 201,
                status: 0,
                message: '删除品牌数据失败',
            })
        }
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}

// 获取一级管理数据的方法
exports.getAttrDataOne_handler = (req, res) => {
    if (req.headers.token) {
        // 判断用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        res.send({
            code: 200,
            status: 1,
            message: '获取用户数据成功',
            data: AttrDataOne,
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 获取二级管理数据的方法
exports.getAttrDataTwo_handler = (req, res) => {
    if (req.headers.token) {
        // 判断用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body
        let temp = [];
        //创造临时数组
        AttrDataTwo.forEach((item) => {
            if (item.categoryid == data.categoryid) {
                temp.push(item)
            }
        })
        if (temp) {
            res.send({
                code: 200,
                status: 1,
                message: '获取二级属性数据成功',
                data: temp
            })
        } else {
            res.send({
                code: 201,
                status: 0,
                message: '获取二级属性数据失败',
            })
        }
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 获取最终属性数据的方法
exports.getAttrDataEnd_handler = (req, res) => {
    if (req.headers.token) {
        // 判断用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body
        let temp = [];
        //创造临时数组
        AttrDataEnd.forEach((item) => {
            if (item.categoryid === data.categoryid) {
                temp.push(item)
            }
        })
        if (temp) {
            res.send({
                code: 200,
                status: 1,
                message: '获取二级属性数据成功',
                data: temp
            })
        } else {
            res.send({
                code: 201,
                status: 0,
                message: '获取二级属性数据失败',
            })
        }
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 添加或修改属性数据的方法
exports.uploadAttrData_handler = (req, res) => {
    if (req.headers.token) {
        // 判断用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body
        // 请求体是一个对象，根据是否携带id判断是添加还是修改
        if (data.id) {
            // 携带id，为修改
            let idx;
            AttrDataEnd.some((item, index) => {
                if (item.id === data.id) {
                    idx = index;
                    // temp.push(item)
                    // 修改不可能修改id、categoryid,只换name、value就行
                    AttrDataEnd[index].name = data.name;
                    AttrDataEnd[index].value = data.value;
                } // else {
                //     console.log('id异常');
                // }
                // 之前还在这里写了else，显然是不行的，这样会输出很多遍
                // 因为要some一个一个去查对不对，这样一个不对就报一次异常肯定不行啊
            })
        } else {
            // 添加的话给它补一个随机id就可以直接push了
            let temp = data;
            temp.id = uuid.v4();
            AttrDataEnd.push(temp)
            // console.log(temp);
            temp = {};
        }
        res.send({
            code: 200,
            status: 1,
            message: '添加/修改属性数据成功',
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 删除属性数据的方法
exports.deleteAttrData_handler = (req, res) => {
    if (req.headers.token) {
        // 判断用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body
        // 请求体是一个对象
        AttrDataEnd.some((item, index) => {
            if (item.id === data.id) {
                AttrDataEnd.splice(index, 1);
                // 找到就删掉就行
            }
        })
        res.send({
            code: 200,
            status: 1,
            message: '删除属性数据成功',
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }

}

// -----------------------用户模块--------------------------------
// 获取用户管理数据方法
exports.getAclUserData_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body
        const currentPage = data.currentPage // 前端传递过来的的当前页数
        const pageSize = data.pageSize // 前端传递过来的当前一页展示数量
        const startIdx = (currentPage - 1) * pageSize // 截取的初始下标
        const endIdx = startIdx + pageSize // 截取的末尾下标
        let arr = [];
        if (data.keyword) {
            let keyData = [];//含有关键词的用户数据
            userData.forEach((item) => {
                // 查找所有用户数据里含有关键词的,放进关键词数据
                if (item.username.indexOf(data.keyword) !== -1) {
                    keyData.push(item);
                }
            })
            arr = keyData.slice(startIdx, endIdx);//从含有关键词的数据中取出页面要求的数量
        } else {
            arr = userData.slice(startIdx, endIdx)
        }
        res.send({
            code: 200,
            status: 1,
            message: '获取用户管理数据成功',
            data: {
                userData: arr,
                total: userData.length
            }
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 添加或编辑用户管理数据方法
exports.createUserData_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body;
        if (data.id == '') {
            // 无id，要创建账号，判断是否重复
            const result = userData.some((item, index) => {
                if (item.userNumber == data.userNumber) {
                    res.send({
                        code: 201,
                        status: 0,
                        message: '用户账号不能相同',
                    })
                    return true
                }
            })
            if (result) return
            data.id = uuid.v4()
            data.token = data.id
            let datenow = new Date();
            let y = datenow.getFullYear();
            let m = datenow.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            let d = datenow.getDate();
            d = d < 10 ? '0' + d : d;
            data.createdate = `${y}-${m}-${d}`;
            data.updatedate = data.createdate;
            data.userRole = '';
            data.routes = [];
            // let routes;
            // if (data.userRole == '超级管理员') {
            //     routes = ['product', 'trademark', 'sku', 'spu', 'acl', 'user', 'role', 'Menu']
            // } else if (data.userRole == '钻石VIP') {
            //     routes = ['product', 'trademark', 'sku', 'spu', 'acl', 'role', 'Menu']
            // } else {
            //     routes = ['product', 'trademark', 'sku', 'spu']
            // }
            // // 用户数据增加routes属性
            // data.routes = routes
            // // routes 列表增加
            // userRoutes.push({
            //     token: data.id,
            //     routes: routes
            // })
            userData.push(data)
            res.send({
                code: 200,
                status: 1,
                message: '创建成功',
                data: {
                    userData
                }
            })
        } else {
            let idx
            userData.some((item, index) => {
                if (item.id == data.id) {
                    item = data
                    idx = index
                    return true
                }
            })
            let datenow = new Date();
            let y = datenow.getFullYear();
            let m = datenow.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            let d = datenow.getDate();
            d = d < 10 ? '0' + d : d;
            data.updatedate = `${y}-${m}-${d}`;
            userData[idx] = data
            res.send({
                code: 200,
                status: 1,
                message: '编辑成功',
            })

        }
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 编辑用户管理数据方法----没用
// exports.editUserData_handler = (req, res) => {
//     if (req.headers.token) {
//         const isExist = userData.some(item => {
//             if (item.token == req.headers.token) {
//                 return true
//             }
//         })
//         if (!isExist) {
//             res.send({
//                 code: 201,
//                 status: -1,
//                 message: '用户已注销或TOKEN已过期',
//             })
//             return
//         }
//         const data = req.body.userData
//         let idx
//         userData.some((item, index) => {
//             if (item.id == data.id) {
//                 item = data
//                 idx = index
//                 return true
//             }
//         })
//         userData[idx] = data
//         res.send({
//             code: 200,
//             status: 1,
//             message: '编辑成功',
//         })
//     } else {
//         res.send({
//             code: 201,
//             status: -1,
//             message: '用户已注销或TOKEN已过期',
//         })
//     }
// }
// 删除(与批量删除)用户数据方法
exports.delUserData_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body;
        // 批量删除回传数组，单个删除回传属性id
        if (data.idArr) {
            data.idArr.forEach(item => {
                userData = userData.filter((user, index) => {
                    if (user.id !== item) {
                        return user
                    }
                    // else {
                    //     userRoutes.splice(index, 1)
                    // }
                })
            })
        } else {
            // console.log(data.id);
            // 单个删除
            userData.some((item, index) => {
                if (item.id === data.id) {
                    userData.splice(index, 1);
                }
            })
        }

        res.send({
            code: 200,
            status: 1,
            message: '删除成功',
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 修改用户状态方法
exports.changeState_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body
        const result = userData.some(item => {
            if (item.token == data.token) {
                item.state = data.state
                return true
            }
        })
        if (result) {
            res.send({
                code: 200,
                status: 1,
                message: '修改用户状态成功',
            })
        } else {
            res.send({
                code: 201,
                status: 0,
                message: '修改用户状态失败',
            })
        }
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 获取用户角色分配和全部角色的方法
exports.getUserRoleData_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body;
        let assignroles = [];
        let assignRoles = [];
        // 先找到来请求数据的是数据里的哪一个，才能匹配角色
        userData.some((item => {
            if (item.id === data.id) {
                assignroles = item.userRole.split(',');//按逗号拆分
                assignroles.forEach((item) => {
                    roleData.some((role) => {
                        if (item === role.roleName) {
                            // 从roleData里找匹配assignroles中的项的角色，找到后push进准备传递的数组
                            assignRoles.push(role);
                        }
                    })
                })
            }
        }))
        res.send({
            code: 200,
            status: 1,
            message: '获取用户角色数据成功',
            data: {
                allRolesList: roleData,
                assignRoles
            }
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 修改用户角色分配方法
exports.uploadUserRoleData_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body;
        // 先找到要修改数据的是数据里的哪一个，才能修改角色
        userData.some((item => {
            if (item.id === data.id) {
                let temprole = [];
                data.userRole.forEach((item) => {
                    temprole.push(item.roleName);
                    // 把传过来的数组里面的名字先拿出来放数组
                })
                item.userRole = temprole.toString();
                //数组转字符串存起来就行
            }
        }))
        res.send({
            code: 200,
            status: 1,
            message: '修改用户角色数据成功',
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}

// -----------------------角色模块--------------------------------
// 获取角色数据
exports.getAclRoleData_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body
        const currentPage = data.currentPage // 前端传递过来的的当前页数
        const pageSize = data.pageSize // 前端传递过来的当前一页展示数量
        const startIdx = (currentPage - 1) * pageSize // 截取的初始下标
        const endIdx = startIdx + pageSize // 截取的末尾下标
        let arr = [];
        if (data.keyword) {
            let keyData = [];//含有关键词的用户数据
            roleData.forEach((item) => {
                // 查找所有用户数据里含有关键词的,放进关键词数据
                if (item.roleName.indexOf(data.keyword) !== -1) {
                    keyData.push(item);
                }
            })
            arr = keyData.slice(startIdx, endIdx);//从含有关键词的数据中取出页面要求的数量
        } else {
            arr = roleData.slice(startIdx, endIdx)
        }
        res.send({
            code: 200,
            status: 1,
            message: '获取角色数据成功',
            data: {
                roleData: arr,
                total: roleData.length
            }
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 添加或编辑角色数据方法
exports.uploadRoleData_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body;
        if (data.id == '') {
            // 无id，要创建角色，判断是否重复
            const result = roleData.some((item, index) => {
                if (item.roleName == data.roleName) {
                    res.send({
                        code: 201,
                        status: 0,
                        message: '当前角色已存在',
                    })
                    return true
                }
            })
            if (result) return
            // 用最后一个数据id+1，最后一个数据的id一定是最大的，+1保证更大
            // 如果像之前直接用长度加一，如果id较小的被删除，然后添加一个就会与当前数组最后一个项目id重复
            data.id = roleData[roleData.length - 1].id + 1;
            let datenow = new Date();
            let y = datenow.getFullYear();
            let m = datenow.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            let d = datenow.getDate();
            d = d < 10 ? '0' + d : d;
            data.createdate = `${y}-${m}-${d}`;
            data.updatedate = data.createdate;
            roleData.push(data);

            // 新建角色默认无任何权限
            permissionData.push([{
                id: 1, name: '全部数据', level: 1, select: false,
                children: [
                    {
                        id: 2, name: '权限管理', level: 2, select: false,
                        children: [
                            {
                                id: 7, name: '用户管理', level: 3, select: false,
                                children: [
                                    { id: 19, name: '添加用户', level: 4, select: false, },
                                    { id: 20, name: '删除用户', level: 4, select: false, },
                                    { id: 21, name: '修改用户', level: 4, select: false, },
                                    { id: 22, name: '分配角色', level: 4, select: false, },
                                ],
                            },
                            {
                                id: 8, name: '角色管理', level: 3, select: false,
                                children: [
                                    { id: 23, name: '分配权限', level: 4, select: false, },
                                    { id: 24, name: '添加角色', level: 4, select: false, },
                                    { id: 25, name: '修改角色', level: 4, select: false, },
                                    { id: 26, name: '删除角色', level: 4, select: false, },
                                ],
                            },
                            {
                                id: 9, name: '菜单管理', level: 3, select: false,
                                children: [
                                    { id: 27, name: '添加', level: 4, select: false, },
                                    { id: 28, name: '修改', level: 4, select: false, },
                                    { id: 29, name: '删除', level: 4, select: false, },
                                ],
                            },
                        ],
                    },
                    {
                        id: 3, name: '商品管理', level: 2, select: false,
                        children: [
                            {
                                id: 10, name: '分类管理', level: 3, select: false,
                                children: [
                                    { id: 30, name: '添加子分类', level: 4, select: false, },
                                    { id: 31, name: '修改分类', level: 4, select: false, },
                                    { id: 32, name: '删除分类', level: 4, select: false, },
                                ],
                            },
                            {
                                id: 11, name: '平台属性管理', level: 3, select: false,
                                children: [
                                    { id: 33, name: '添加属性', level: 4, select: false, },
                                    { id: 34, name: '更新属性', level: 4, select: false, },
                                    { id: 35, name: '删除属性', level: 4, select: false, },
                                ],
                            },
                            {
                                id: 12, name: '品牌管理', level: 3, select: false,
                                children: [
                                    { id: 36, name: '添加品牌', level: 4, select: false, },
                                    { id: 37, name: '修改品牌', level: 4, select: false, },
                                    { id: 38, name: '删除品牌', level: 4, select: false, },
                                ],
                            },
                            {
                                id: 13, name: 'SPU管理', level: 3, select: false,
                                children: [
                                    { id: 39, name: '添加SPU', level: 4, select: false, },
                                    { id: 40, name: '添加SKU', level: 4, select: false, },
                                    { id: 41, name: '更新Spu', level: 4, select: false, },
                                ],
                            },
                        ],
                    },
                    {
                        id: 4, name: '订单管理', level: 2, select: false,
                        children: [
                            {
                                id: 14, name: '订单列表', level: 3, select: false,
                                children: [
                                    { id: 42, name: '查看订单详情', level: 4, select: false, },
                                    { id: 43, name: '退款', level: 4, select: false, },
                                ],
                            },
                            {
                                id: 15, name: '退款管理', level: 3, select: false, children: [],
                            },
                        ],
                    },
                    {
                        id: 5, name: '客户管理', level: 2, select: false,
                        children: [
                            {
                                id: 16, name: '客户列表', level: 3, select: false,
                                children: [
                                    { id: 44, name: '锁定客户', level: 4, select: false, },
                                ],
                            },
                        ],
                    },
                    {
                        id: 6, name: '优惠管理', level: 2, select: false,
                        children: [
                            {
                                id: 17, name: '优惠活动管理', level: 3, select: false,
                                children: [
                                    { id: 45, name: '添加活动', level: 4, select: false, },
                                    { id: 46, name: '修改活动', level: 4, select: false, },
                                    { id: 47, name: '活动规则', level: 4, select: false, },
                                ],
                            },
                            {
                                id: 18, name: '优惠券管理', level: 3, select: false,
                                children: [
                                    { id: 48, name: '添加优惠券', level: 4, select: false, },
                                    { id: 49, name: '修改优惠券', level: 4, select: false, },
                                ],
                            },
                        ],
                    }
                ],
            }],)
            res.send({
                code: 200,
                status: 1,
                message: '创建成功',
            })
        } else {
            // 有id，要修改角色
            let idx
            roleData.some((item, index) => {
                if (item.id == data.id) {
                    item = data
                    idx = index
                    return true
                }
            })
            let datenow = new Date();
            let y = datenow.getFullYear();
            let m = datenow.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            let d = datenow.getDate();
            d = d < 10 ? '0' + d : d;
            data.updatedate = `${y}-${m}-${d}`;
            let oldname = roleData[idx].roleName;//把老名字拿下来
            roleData[idx] = data;
            // 角色名字改了，已经分配这个角色的用户拿到的角色名也应该更改
            userData.forEach((item) => {
                let flag = false;
                let assignroles = item.userRole.split(',');//按逗号拆分
                assignroles.some((littleItem) => {//找找用户有没有使用被改名角色
                    if (littleItem === oldname) {
                        flag = true;
                    }
                })
                if (flag) {
                    // console.log(item.userRole);
                    // console.log(typeof item.userRole);
                    // console.log(data.roleName);
                    // console.log(typeof data.roleName);
                    // 注意replace不会修改字符串，字符串不可变！！！
                    item.userRole = item.userRole.replace(oldname, data.roleName);
                    // console.log(item.userRole);
                }
            })
            // roleData变更就一定要重跑权限异步路由
            userData.forEach((item) => {
                item.routes = [];
                if (item.userRole) {//如果已经分配角色
                    let assignroles = item.userRole.split(',');//按逗号拆分
                    assignroles.forEach((littleItem) => {
                        roleData.some((role) => {//对角色数据去找littleitem对应角色，并把route交给item.routes
                            // 角色名变更，这里肯定是拿不到路由权限
                            if (littleItem === role.roleName) {
                                if (item.routes) {
                                    let temp = item.routes
                                    item.routes = [...temp, ...role.routes];
                                } else {
                                    item.routes = [...role.routes];
                                }
                            }
                        })
                    })
                } else { item.routes = []; }//没角色就没异步路由

            })
            res.send({
                code: 200,
                status: 1,
                message: '编辑成功',
            })
        }
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 获取角色权限数据方法
exports.getRolePermission_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body;
        let index = data.id - 1;
        // 因为上面设计的非常恶心，只有index能判断是对应哪个角色，所以只拿到id是找不到index的，
        // 因为index才是根，所有项目权限都长得一模一样，只有index不一样，没有与id对应的关系
        // 还要求其他的一点信息不让设置，于是就按照index与id一一对应的方式去操作了
        // 比如非最末id被删除，其余id不变，新增id按最大id+1计算
        // 最末id被删除，其余id不变，新增id可重新获得最末id(正是最大id+1)
        // 于是相对应的权限数据就必须有：非最末角色被删除，权限不做任何更改
        // 最末角色被删除，对应权限删除
        // 这样设计后，从而允许index = data.id - 1这样直接的index与id直观绑定
        res.send({
            code: 200,
            status: 1,
            message: '获取角色权限数据成功',
            data: {
                permissionData: permissionData[index],
            }
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 修改角色权限方法
exports.changeRolePermission_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        const data = req.body
        let index = data.id - 1;
        // 定义函数，等下递归调用，实现修改角色权限数据
        const getSelected = (permissionArray, roleData) => {
            permissionArray.forEach((item) => {
                if (item.children) {
                    getSelected(item.children, roleData); // 有孩子就不是最底部,直接孩子去递归进最底部
                } else {
                    //没有孩子就是最底部,直接检查收到的id数组有没有相同的
                    item.select = false;//默认全部先弄成false，有的再置true
                    data.selected.some((selecteds) => {
                        if (item.id === selecteds) {
                            item.select = true;
                            if (item.id > 18 && item.id < 42) {
                                if (roleData) {
                                    // 二选一，大权限添加，如果还没有就添加进来
                                    if (item.id < 30 && !roleData.includes('acl')) {
                                        roleData.push('acl');
                                    } else if (item.id > 29 && !roleData.includes('product')) {
                                        roleData.push('product');
                                    }
                                } else {// 如果还是空的直接id判断后选就行
                                    if (item.id < 30) {
                                        roleData = ['acl'];
                                    } else {
                                        roleData = ['product'];
                                    }
                                }

                                // 多选一，小权限添加，如果还没有就添加进来
                                if (item.id < 23) {
                                    if (!roleData.includes('user')) roleData.push('user');
                                } else if (item.id < 27) {
                                    if (!roleData.includes('role')) roleData.push('role');
                                } else if (item.id < 30) {
                                    if (!roleData.includes('Menu')) roleData.push('Menu');
                                } else if (item.id < 33) {
                                    if (!roleData.includes('sku')) roleData.push('sku');
                                } else if (item.id < 36) {
                                    if (!roleData.includes('attr')) roleData.push('attr');
                                } else if (item.id < 39) {
                                    if (!roleData.includes('trademark')) roleData.push('trademark');
                                } else {
                                    if (!roleData.includes('spu')) roleData.push('spu');
                                }
                            }
                        }
                    })
                }
            });
            return roleData;
        };
        // 对特定角色进行递归操作内部属性,同时修改权限
        // 不能在递归里清空，在调用递归方法前先清空角色路由权限
        roleData[index].routes = [];
        roleData[index].routes = getSelected(permissionData[index], roleData[index].routes)
        // console.log(roleData[index].roleName);
        // console.log(roleData[index].routes);
        // 重跑一遍角色权限
        userData.forEach((item) => {
            item.routes = [];//重跑一遍旧的异步路由权限要清空
            if (item.userRole) {//如果已经分配角色
                let assignroles = item.userRole.split(',');//按逗号拆分
                assignroles.forEach((littleItem) => {
                    roleData.some((role) => {//对角色数据去找littleitem对应角色，并把route交给item.routes
                        if (littleItem === role.roleName) {
                            if (item.routes) {
                                let temp = item.routes
                                item.routes = [...temp, ...role.routes];
                            } else {
                                item.routes = [...role.routes];
                            }
                        }
                    })
                })
            } else { item.routes = []; }//没角色就没异步路由
        })
        res.send({
            code: 200,
            status: 1,
            message: '修改角色权限成功',
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 删除角色方法
exports.deleteRoleData_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        // 正如获取权限数据方法里面的注释所说，这样的设计格式对删除就有额外的要求
        const data = req.body;
        console.log(1);
        roleData.some((item, index) => {
            if (item.id === data.id) {
                roleData.splice(index, 1);
                if (index === (permissionData.length - 1)) {
                    //如果删除的是最后一个，那么id会复用，权限也需要对应，因此还要删权限
                    permissionData.splice(index, 1);
                }
            }
        })
        // roleData变更就一定要重跑权限异步路由
        userData.forEach((item) => {
            item.routes = [];
            if (item.userRole) {//如果已经分配角色
                let assignroles = item.userRole.split(',');//按逗号拆分
                assignroles.forEach((littleItem) => {
                    roleData.some((role) => {//对角色数据去找littleitem对应角色，并把route交给item.routes
                        if (littleItem === role.roleName) {
                            if (item.routes) {
                                let temp = item.routes
                                item.routes = [...temp, ...role.routes];
                            } else {
                                item.routes = [...role.routes];
                            }
                        }
                    })
                })
            } else { item.routes = []; }//没角色就没异步路由

        })
        res.send({
            code: 200,
            status: 1,
            message: '删除成功',
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// -------------菜单模块-----------------
// 获取菜单数据
exports.getMenuData_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        res.send({
            code: 200,
            status: 1,
            message: '获取菜单数据成功',
            data: {
                menuData
            }
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 添加或更新菜单数据方法
exports.uploadMenuData_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        // 获取请求体
        const data = req.body;
        // 获取更新时间
        let datenow = new Date();
        let y = datenow.getFullYear();
        let m = datenow.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = datenow.getDate();
        d = d < 10 ? '0' + d : d;
        data.updateDate = `${y}-${m}-${d}`;
        // 新建时需要创建Menu数组和permissionData数组，并且它们的id必须保持一致
        // 所以应当在外面统一生成id后使用，避免每次都自动生成而不同
        let theSameID = uuid.v4();
        // 定义递归查找Menu数组，并进行修改
        const checkMenuToUpdate = (MenuArray) => {
            MenuArray.some((item) => {
                if (item.id === data.id) {
                    item.name = data.name;
                    if (item.updateDate) {
                        // 有更新时间为menuData
                        item.value = data.permissionValue;
                        item.updateDate = data.updateDate;
                    }
                    // 没有为permissionData，对于permissionData而言，修改只更新了name，所以不需要其他操作了
                } else if (item.children) {
                    checkMenuToUpdate(item.children)
                }
            })
        };
        // 递归查找Menu，并添加
        const checkMenuToAdd = (MenuArray) => {
            MenuArray.some((item) => {
                if (item.id === data.pid) {
                    let tempToPush = {};
                    tempToPush.id = theSameID;
                    tempToPush.name = data.name;
                    tempToPush.level = data.level + 1;
                    tempToPush.updateDate = data.updateDate;
                    tempToPush.value = data.permissionValue;
                    if (data.level !== 3) {
                        // 除了3级数组添加的子数据，其他都要有children
                        tempToPush.children = [];
                    }
                    item.children.push(tempToPush)
                } else if (item.children) {
                    checkMenuToAdd(item.children)
                }
            })
        };
        // 定义递归查找Permission数组，并进行修改
        const checkPermissionToUpdate = (pD) => {
            pD.forEach((item) => {
                // 拿到不同角色的权限数组,与menuData基本相同，共用一个修改方法
                checkMenuToUpdate(item);
            })
        }
        // 需要遍历permissionData，根据id递归找位置，每个都添加相同内容，非常麻烦
        // 但其实permissionData往里一层后，每个角色的权限数组都和menuData基本相同
        // 不同：permissionData没有更新日期和权限值，但有select
        // 可以使用它上面的递归方法去处理permissionData的角色权限数据
        // 对不同在修改时很好处理，但创建时还是不好区分，故修改共用方法，创建的还是新写一个
        // 递归查找Permission，并添加的新方法
        const checkPermissionToAdd = (pD) => {
            pD.some((item) => {
                if (item.id === data.pid) {
                    let tempToPush = {};
                    tempToPush.id = theSameID;
                    tempToPush.name = data.name;
                    tempToPush.level = data.level + 1;
                    tempToPush.select = false;//新权限默认false
                    if (data.level !== 3) {
                        // 除了3级数组添加的子数据，其他都要有children
                        tempToPush.children = [];
                    }
                    item.children.push(tempToPush)
                    // console.log('item.children', item.children);
                } else if (item.children) {
                    checkPermissionToAdd(item.children)
                }
            })
        };
        // 对新递归方法的调用，取出各个角色调用新递归方法
        const usePermissionToAdd = (pD) => {
            pD.forEach((item) => {
                // 拿到不同角色的权限数组,与menuData创造无法区分，不再共用修改方法
                checkPermissionToAdd(item);
            })
        }
        if (data.id) {
            // 有data就是更新
            checkMenuToUpdate(menuData);
            checkPermissionToUpdate(permissionData);
        } else {
            // 没有就是添加
            checkMenuToAdd(menuData);
            usePermissionToAdd(permissionData)
        }
        res.send({
            code: 200,
            status: 1,
            message: '添加/更新菜单数据成功',
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 删除菜单数据
exports.deleteMenuData_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        // 获取请求体
        const data = req.body;
        // 定义递归查找Menu数组，并进行删除
        const checkMenuToDel = (MenuArray) => {
            MenuArray.some((item, index) => {
                if (item.id === data.id) {
                    MenuArray.splice(index, 1);
                } else if (item.children) {
                    checkMenuToDel(item.children)
                }
            })
        };
        // 定义递归查找Permission数组，并进行删除
        const checkPermissionToDel = (pD) => {
            pD.forEach((item) => {
                // 拿到不同角色的权限数组,与menuData基本相同，共用一个删除方法
                checkMenuToDel(item);
            })
        }
        // 两个方法都调用，全删了
        checkMenuToDel(menuData);
        checkPermissionToDel(permissionData);
        res.send({
            code: 200,
            status: 1,
            message: '删除菜单数据成功',
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}

// 获取异步路由数据方法---没用
// exports.getAsyncRoute_handler = (req, res) => {
//     if (req.headers.token) {
//         // 判断当前的用户是否存在
//         const isExist = userData.some(item => {
//             if (item.token == req.headers.token) {
//                 return true
//             }
//         })
//         if (!isExist) {
//             res.send({
//                 code: 201,
//                 status: -1,
//                 message: '用户已注销或TOKEN已过期',
//             })
//             return
//         }
//         res.send({
//             code: 200,
//             status: 1,
//             message: '获取菜单权限数据成功',
//             data: {
//                 asyncRoutes
//             }
//         })
//     } else {
//         res.send({
//             code: 201,
//             status: -1,
//             message: '用户已注销或TOKEN已过期',
//         })
//     }
// }
// 分配菜单权限方法----没用
// exports.distribute_handler = (req, res) => {
//     if (req.headers.token) {
//         // 判断当前的用户是否存在
//         const isExist = userData.some(item => {
//             if (item.token == req.headers.token) {
//                 return true
//             }
//         })
//         if (!isExist) {
//             res.send({
//                 code: 201,
//                 status: -1,
//                 message: '用户已注销或TOKEN已过期',
//             })
//             return
//         }
//         const data = req.body
//         userRoutes.some((item, index) => {
//             if (item.token == data.userToken) {
//                 item.routes = data.routes
//                 userData[index].routes = data.routes
//                 return true
//             }
//         })
//         res.send({
//             code: 200,
//             status: 1,
//             message: '菜单权限分配成功',
//         })
//     } else {
//         res.send({
//             code: 201,
//             status: -1,
//             message: '用户已注销或TOKEN已过期',
//         })
//     }
// }
// 获取浏览板数据方法
exports.getMessage_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        res.send({
            code: 200,
            status: 1,
            message: '浏览板数据获取成功',
            data: {
                messageData
            }
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}
// 获取浏览板数据方法
exports.getMessage_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        res.send({
            code: 200,
            status: 1,
            message: '浏览板数据获取成功',
            data: {
                messageData
            }
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}


// 添加浏览板数据方法
exports.addMessage_handler = (req, res) => {
    if (req.headers.token) {
        // 判断当前的用户是否存在
        const isExist = userData.some(item => {
            if (item.token == req.headers.token) {
                return true
            }
        })
        if (!isExist) {
            res.send({
                code: 201,
                status: -1,
                message: '用户已注销或TOKEN已过期',
            })
            return
        }
        messageData.unshift(req.body)
        res.send({
            code: 200,
            status: 1,
            message: '添加成功',
        })
    } else {
        res.send({
            code: 201,
            status: -1,
            message: '用户已注销或TOKEN已过期',
        })
    }
}




