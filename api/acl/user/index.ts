// 统一管理项目用户相关的接口
import request from "@/utils/request";
enum API {
    GETACLUSERDATA_URL = "/getAclUserData",
    CREATEUSERDATA_URL = "/createUserData",
    // EDITUSERDATA_URL = "/editUserData",
    DELUSERDATA_URL = "/delUserData",
    CHANGESTATE_URL = "/changeState",
    GETUSERROLEDATA_URL = '/getUserRoleData',
    UPLOADUSERROLEDATA_URL = '/uploadUserRoleData'
}

export const reqAclUserData = (data: any) => request.post<any, any>(API.GETACLUSERDATA_URL, data);
export const createAclUserData = (data: any) => request.post<any, any>(API.CREATEUSERDATA_URL, data);
// export const editAclUserData = (data: any) => request.post<any, any>(API.EDITUSERDATA_URL, data);
export const deleteAclUserData = (data: any) => request.post<any, any>(API.DELUSERDATA_URL, data);
export const changeAclUserState = (data: any) => request.post<any, any>(API.CHANGESTATE_URL, data);
export const reqUserRoleData = (data: any) => request.post<any, any>(API.GETUSERROLEDATA_URL, data);
export const uploadUserRoleData = (data: any) => request.post<any, any>(API.UPLOADUSERROLEDATA_URL, data);
