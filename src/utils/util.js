// 浅拷贝
export function shallowClone(source) {
    var target = {};
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}
