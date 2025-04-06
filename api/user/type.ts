// 定义数据类型
// 登录接口需要携带参数ts类型
export interface loginFromData {
    username: String,
    password: String
}
// 接口继承，定义全部接口返回数据都具有的ts类型
export interface ResponseData {
    code: number,
    message: string,
    // ok: boolean没这个东西,换成了status，是数字类型
    status: number,
}
export interface loginResponseData extends ResponseData {
    token: string,
}

export interface UserInfoResponseData extends ResponseData {
    data: {
        username: string,
        avatar: string,
        routes: [],
        userId: string,
        userRole: any,
    }
}
// export interface loginFrom {
//     username: String,
//     password: String
// }
// interface dataType {
//     // 问号表示可能没有，毕竟成功回传token，失败回传message
//     token?: String,
//     message?:String
// }
// export interface loginResponseData {
//     code: number,
//     data: dataType
// }
// interface userInfo {
//     userId: number,
//     avatar: String,
//     username: String,
//     password: String,
//     desc: String,
//     roles: String[],
//     buttons: String[],
//     routes: String[],
//     token: String,

// }
// interface user {
//     checkUser: userInfo
// }
// // 定义服务器返回用户信息相关的数据类型
// export interface userResponseData {
//     code: number,
//     data: user
// }