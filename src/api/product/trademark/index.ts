import request from "@/utils/request";
import type { GetData, GetResponseData, Trademark } from "./type"
// 项目品牌管理相关的请求地址
enum API {
    GETDATA_URL = "/getBrandData",//获取品牌管理数据接口
    UPDATEDATA_URL = "/uploadImg",//添加或修改品牌数据接口
    UPDATENAME_URL = "/uploadBrandName",//修改品牌brandName接口
    DELDATA_URL = "/delBrandData",// 删除某个品牌数据接口
}
// 获取接口方法
export const reqBrandData = (data: GetData) => request.post<any, GetResponseData>(API.GETDATA_URL, data);
// 修改品牌数据接口方法
export const reqBrandImg = (data: Trademark) => request.post<any, GetResponseData>(API.UPDATEDATA_URL, data);
//修改品牌brandName接口方法
export const reqBrandName = (data: Trademark) => request.post<any, GetResponseData>(API.UPDATENAME_URL, data);
// 删除某个品牌数据接口方法
export const reqDelBrand = (data: Trademark) => request.post<any, GetResponseData>(API.DELDATA_URL, data);