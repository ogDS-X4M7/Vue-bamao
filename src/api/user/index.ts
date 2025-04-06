// 统一管理项目用户相关的接口
import request from "@/utils/request";
import type { loginFromData, loginResponseData, UserInfoResponseData } from "./type";
// 项目用户相关的请求地址
enum API {
    LOGIN_URL = "/login",
    USERINFO_URL = "/getUserinfo",
}

// 登录接口方法
export const reqLogin = (data: loginFromData) => request.post<any, loginResponseData>(API.LOGIN_URL, data);
// 获取用户信息接口方法
export const reqUserInfo = () => request.get<any, UserInfoResponseData>(API.USERINFO_URL);


// 配合mock使用
// import type { loginFrom, loginResponseData, userResponseData } from "./type"
// // 统一管理接口
// enum API {
//     // 这里不需要写/api，因为在对axios的二次封装时已经把/api添加到baseurl了（详见utils-request第一步）
//     LOGIN_URL = "/user/login",
//     USERINFO_URL = "/user/info"
// }
// // 暴露请求函数
// // 登录接口方法
// export const reqLogin = (data: loginFrom) => request.post<any, loginResponseData>(API.LOGIN_URL, data);
// // 获取用户信息接口方法
// export const reqUserInfo = () => request.get<any,userResponseData>(API.USERINFO_URL);