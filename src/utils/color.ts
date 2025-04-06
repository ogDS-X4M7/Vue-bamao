// 获取浅色
export function getLightColor(color: string, level: number) {
    level = level * 0.1;
    color = color.replace('rgba(', '');
    // 后面的,1)不用管，因为有逗号，等下前三个切出来操作就行了
    let rgb = <any>[];
    rgb = color.split(',')
    for (let i = 0; i < 3; i++) {
        rgb[i] = Math.round(255 * level + rgb[i] * (1 - level))
    }
    return `rgba(${rgb.join(',')}`
}

// 获取深色
export function getDarkColor(color: string, level: number) {
    level = level * 0.1;
    color = color.replace('rgba(', '');
    // 后面的,1)不用管，因为有逗号，等下前三个切出来操作就行了
    let rgb = <any>[];
    rgb = color.split(',')
    for (let i = 0; i < 3; i++) {
        rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level))
    }
    return `rgba(${rgb.join(',')}`
}
// 结论：这样写浅色越来越白，深色越来越黑，并且！！！保证了不会超过255，不低于20.5，这是必须的！！！
// 这个算法的原理是，000是黑色，255,255,255是白色，因此相应的，越靠近0颜色越深，越靠近255颜色越浅，
// 通过让想要靠近的颜色占据0.1~0.9比例(由传入参数level决定)，原色占0.9~0.1，让它变深或浅，但r，g，b之间比例变化了，相互差值越来越小，越来越接近，
// 但占比最大的颜色始终占比最大，而且比例变化才实现了，浅色越来越白，深色越来越黑