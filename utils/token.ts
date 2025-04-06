// 封装本地存储数据与读取数据方法
// 本地存储数据
export const SET_TOKEN = (token: string) => {
    localStorage.setItem("TOKEN", token);
}
// 本地存储获取数据
export const GET_TOKEN = () => {
    // console.log('到底有没有真的执行啊');
    // 经过上面测试，state只有创建时才执行，后续发生更改必须在actions里直接对
    // state数据进行操作，或者外部对state数据进行操作，直接动数据
    // 这些封装的get方法都是没用的，不会执行的
    return localStorage.getItem("TOKEN");
}
// 本地存储删除数据
export const DEL_TOKEN = () => {
    return localStorage.removeItem("TOKEN");
}