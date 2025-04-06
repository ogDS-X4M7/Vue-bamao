export const getTime = () => {
    let message = '';
    let hours = new Date().getHours();
    if (hours < 11) {
        message = '上午好';
    } else if (hours < 14) {
        message = '中午好';
    } else if (hours < 18) {
        message = '下午好';
    } else {
        message = '晚上好';
    }
    return message;
}