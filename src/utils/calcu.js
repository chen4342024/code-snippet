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
 */
export function moveDecimalPlace(num, movePlace) {
    let decimalPlace = getDecimalPlace(num);
    let step = movePlace - decimalPlace;
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
 * 相加
 */
export function accAdd(arg1, arg2) {
    let step1 = getDecimalPlace(arg1);
    let step2 = getDecimalPlace(arg2);

    let maxStep = Math.max(step1, step2);

    arg1 = moveDecimalPlace(arg1, maxStep);
    arg2 = moveDecimalPlace(arg2, maxStep);

    return (arg1 + arg2) / Math.pow(10, maxStep);
}
