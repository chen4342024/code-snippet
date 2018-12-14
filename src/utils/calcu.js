// 获取小数位
export function getDecimalPlace(num) {
    try {
        let result = num.toString().split(".")[1].length;
        return result;
    } catch (e) {
        return 0;
    }
}

/**
 * 向右移动小数点
 * * @param movePlace 移动步数，正向右，负数向左
 */
export function moveDecimalPlace(num, movePlace) {
    let decimalPlace = getDecimalPlace(num);
    let step = movePlace - decimalPlace;
    // 先转成整数类型，再确定需要如何移动，为了处理 268.34*100 却等于 26833.999999999996 的问题
    let intNum = Number(num.toString().replace(".", ""));
    if (step > 0) {
        return intNum * Math.pow(10, step);
    } else if (step < 0) {
        return intNum / Math.pow(10, -step);
    } else {
        return intNum;
    }
}

/**
 * 相加  arg1 + arg2
 */
export function add(arg1, arg2) {
    let step1 = getDecimalPlace(arg1);
    let step2 = getDecimalPlace(arg2);

    let maxStep = Math.max(step1, step2);

    arg1 = moveDecimalPlace(arg1, maxStep);
    arg2 = moveDecimalPlace(arg2, maxStep);

    return (arg1 + arg2) / Math.pow(10, maxStep);
}

/**
 * 相减   arg1 - arg2
 */
export function sub(arg1, arg2) {
    return add(arg1, -arg2);
}

/**
 * 乘法   arg1 * arg2
 */
export function multiply(arg1, arg2) {
    let step1 = getDecimalPlace(arg1);
    let step2 = getDecimalPlace(arg2);

    let maxStep = Math.max(step1, step2);

    arg1 = moveDecimalPlace(arg1, maxStep);
    arg2 = moveDecimalPlace(arg2, maxStep);

    if (maxStep > 0) {
        let stepPow = Math.pow(10, maxStep);
        return (arg1 * arg2) / (stepPow * stepPow);
    }
    return arg1 * arg2;
}

/**
 * 除法   arg1 / arg2
 */
export function division(arg1, arg2) {
    let step1 = getDecimalPlace(arg1);
    let step2 = getDecimalPlace(arg2);

    let maxStep = Math.max(step1, step2);

    arg1 = moveDecimalPlace(arg1, maxStep);
    arg2 = moveDecimalPlace(arg2, maxStep);

    return arg1 / arg2;
}
