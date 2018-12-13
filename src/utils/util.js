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

// deep copy
export function deepCopy(source) {
    // hash表，记录所有的对象的引用关系
    let copyedMap = new WeakMap();
    let isArray = target => target instanceof Array;
    let isObject = target => target instanceof Object;

    // 遍历方法，支持数组与对象
    let each = function(list, callback) {
        if (isArray(list)) {
            list.forEach(callback);
        } else if (isObject(list)) {
            let keys = Object.keys(list);
            keys.forEach(key => {
                callback(list[key], key, list);
            });
        }
    };

    // 拷贝方法
    let copy = function(item) {
        if (isArray(item) || isObject(item)) {
            // 检查是否循环引用，防止死循环
            let existed = copyedMap.get(item);
            if (existed) {
                return existed;
            }

            // 递归拷贝
            let result = isArray(item) ? [] : {};
            copyedMap.set(item, result);
            each(item, (value, key) => {
                result[key] = copy(value);
            });

            return result;
        } else {
            return item;
        }
    };
    return copy(source);
}
