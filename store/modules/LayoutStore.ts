import { defineStore } from "pinia";
let useLayoutStore = defineStore('LayoutStore', {
    state: () => {
        return {
            fold: false,
            fresh: false,
        }
    }
});
export default useLayoutStore;