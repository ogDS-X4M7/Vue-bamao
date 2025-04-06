// 定义数据类型
// 登录接口需要携带参数ts类型
export interface GetData {
    currentPage: number,
    pageSize: number,
}
// 接口继承，定义全部接口返回数据都具有的ts类型
export interface ResponseData {
    code: number,
    message: string,
    // ok: boolean没这个东西,换成了status，是数字类型
    status: number,
}
export interface Trademark {
    id: number,
    tmName: string,
    logoUrl: string
}
export interface GetResponseData extends ResponseData {
    // data: {
    //     id: number,
    //     tmName: string,
    //     logoUrl: string
    // }
    data: Trademark,
}

// export interface UserInfoResponseData extends ResponseData {
//     data: {
//         username: string,
//         avatar: string,
//         routes: [],
//         userId: string,
//     }
// }