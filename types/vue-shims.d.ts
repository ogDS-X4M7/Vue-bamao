declare module '*.vue' {
    import { Component } from 'vue';
    const component: Component;
    export default component;
}
// 解决找不到模块的报红，单纯为了不影响心情，不重要
// declare module '*.vue' {
//     import Vue from 'vue';
//     export default Vue;
// }

// declare module 'store';
