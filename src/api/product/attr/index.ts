import request from "@/utils/request";
enum API {
    GETCATEGORYONEDATA_URL = "/getAttrDataOne",
    GETCATEGORYTWODATA_URL = "/getAttrDataTwo",
    GETCATEGORYENDDATA_URL = "/getAttrDataEnd",
    UPLOADATTRDATA_URL = "/uploadAttrData",
    DELATTRDATA_URL = "/deleteAttrData"
}
export const reqAttrOneData = () => request.get<any, any>(API.GETCATEGORYONEDATA_URL);
export const reqAttrTwoData = (data: any) => request.post<any, any>(API.GETCATEGORYTWODATA_URL, data);
export const reqAttrEndData = (data: any) => request.post<any, any>(API.GETCATEGORYENDDATA_URL, data);
export const uploadAttrData = (data: any) => request.post<any, any>(API.UPLOADATTRDATA_URL, data);
export const deleteAttrData = (data: any) => request.post<any, any>(API.DELATTRDATA_URL, data);