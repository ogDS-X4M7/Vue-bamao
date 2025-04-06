// 统一管理角色相关接口
import request from "@/utils/request";
enum API {
    GETROLEDATA_URL = '/getRoleData',
    UPLOADROLEDATA_URL = '/uploadRoleData',
    DELROLEDATA_URL = '/deleteRoleData',
    GETROLEPERMISSION_URL = '/getRolePermission',
    CHANGEROLEPERMISSION_URL = '/changeRolePermission',
}
export const reqRoleData = (data: any) => request.post<any, any>(API.GETROLEDATA_URL, data);
export const uploadRoleData = (data: any) => request.post<any, any>(API.UPLOADROLEDATA_URL, data);
export const delRoleData = (data: any) => request.post<any, any>(API.DELROLEDATA_URL, data);
export const reqPermissionData = (data: any) => request.post<any, any>(API.GETROLEPERMISSION_URL, data);
export const changePermissionData = (data: any) => request.post<any, any>(API.CHANGEROLEPERMISSION_URL, data);