import { defineStore } from "pinia";
import { reqAttrOneData, reqAttrTwoData, reqAttrEndData, uploadAttrData, deleteAttrData } from "@/api/product/attr";
import { ElNotification } from "element-plus";
const useAttrData = defineStore('Attr', {
    state: () => {
        return {
            c1arr: [],
            c1id: "",
            c2arr: [],
            c2id: "",
            Attrarr: [],
            SPUarr: [],
            SKUarr: [],
            reqProduct: ""//补充一个请求产品信息，用于确定哪个产品组件需要发请求
            // 因为Category组件作为全局组件会多次复用，使用了change调用，而不同产品组件
            // 在最后获取信息使用的接口、方法是不同的，因此应该还是需要有一个信号来传递表达是哪个组件
            // 这样就仍然能使用change判断，不过额外需要多判断一步reqProduct信号
        }
    },
    actions: {
        async getc1() {
            let result = await reqAttrOneData();
            this.c1arr = result.data;
        },
        async getc2() {
            let result = await reqAttrTwoData({ categoryid: this.c1id });
            this.c2arr = result.data;
        },
        async getend() {
            let result = await reqAttrEndData({ categoryid: this.c2id });
            this.Attrarr = result.data;
        },
        async changeAttr(data: any) {
            let result = await uploadAttrData(data);
            if (result.code === 200) {
                ElNotification(result.message);
                return true;
            }
        },
        async delAttr(data: any) {
            let result = await deleteAttrData(data);
            if (result.code === 200) {
                ElNotification(result.message);
                return true;
            }
        }
    },
    getters: {

    }
})
export default useAttrData;