// 统一管理角色相关接口
import request from "@/utils/request";
enum API {
    GETMENUDATA_URL = '/getMenuData',
    UPLOADMENUDATA_URL = '/uploadMenuData',
    DELMENUDATA_URL = '/deleteMenuData',
}
export const reqMenuData = () => request.get<any, any>(API.GETMENUDATA_URL);
export const uploadMenuData = (data: any) => request.post<any, any>(API.UPLOADMENUDATA_URL, data);
export const deleteMenuData = (data: any) => request.post<any, any>(API.DELMENUDATA_URL, data);

