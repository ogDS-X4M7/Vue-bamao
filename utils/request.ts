// 进行axios的二次封装：使用它的请求与响应拦截器
// 这里的二次封装是为了让api更轻松地实现请求
// 至于平常写代码发送请求，一般都是直接去api里面找对应部分取出使用
// 所以这里基本可以不用看了，直接去api找想要的发送请求方法
import axios from "axios";
// 引入消息提示组件
import { ElMessage } from "element-plus"
import { GET_TOKEN } from "./token"

// 登录后想要获取用户信息，必须携带token去发送请求，token在仓库里,引入仓库
// 关于这个知识点，可以去看mock里假的服务端，反映真实的服务器怎么处理请求，确实是会看请求头里有没有token
// import useUserStore from "@/store/modules/user";

// 第一步：利用axios对象的create方法，去创建实例（其他的配置：基础路径，超时的时间）
let request = axios.create({
    // 发请求的基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API,//基础路径上会携带api，这个是在env环境变量配置的时候写好的（详见.env.development）
    timeout: 5000//超时时间设置 
});
// 第二步：request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
    // 这一段必须取消对仓库的使用，不然不可能做到挂载前拿到挂载后仓库的数据去发请求
    // let userStore = useUserStore();
    // if (userStore.token) {
    //     config.headers.token = userStore.token;
    // } else {
    config.headers.token = GET_TOKEN();//后端做了token判断，不用担心有问题,这里主要是为异步路由刷新时发送请求提供请求头信息
    // }
    return config;
    // config配置对象，headers属性请求头，经常给服务器端携带公共参数
    // 返回配置对象
})
// 第三步：响应拦截器
request.interceptors.response.use((response) => {
    // 成功回调
    // 监护数据
    return response.data;
}, (error) => {
    // 失败毁掉：处理http网络错误
    // 定义一个变量：存储网络错误信息
    let message = '';
    // http状态码
    // console.log(error);//输出报错可以看到是仓库挂载前被调用导致
    let status = error.response.status;
    switch (status) {
        case 401:
            message = "TOKEN过期";
            break;
        case 403:
            message = "无权访问";
            break;
        case 404:
            message = "请求地址错误";
            break;
        case 500:
            message = "服务器出现问题"
            break;
        default:
            message = "网络出现问题";
            break;
    }
    // 提示错误信息
    ElMessage({
        type: 'error',
        message
    });
    return Promise.reject(error)
})
export default request;