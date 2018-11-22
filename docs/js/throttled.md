# 函数节流
### 函数防抖
```javascript
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
/**
 * 反反弹，延迟函数的执行。
 * 使用方法参照：http://underscorejs.org/#debounce
 * @param {*} func 函数
 * @param {*} wait 延迟事件
 * @param {*} immediate 是否马上执行
 */
export function debounce(func, wait, immediate) {
    let timeout, result;

    let later = function(context, args) {
        timeout = null;
        if (args) result = func.apply(context, args);
    };

    let debounced = function(...args) {
        if (timeout) clearTimeout(timeout);
        // 如果immediate为true,则立即执行
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(later, wait);
            if (callNow) result = func.apply(this, args);
        } else {
            timeout = setTimeout(() => {
                return later(this, args);
            }, wait);
        }
        return result;
    };

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}
```

### 函数节流
```javascript
/**
 * 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，至少每隔 wait毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助
 * 使用方法参照：http://underscorejs.org/#throttle
 * @param {*} func 回调
 * @param {*} wait 等待时间
 * @param {*} options 配置
 */
export function throttle(func, wait, options) {
    //初始化变量
    let timeout, context, args, result;
    let previous = 0;
    if (!options) options = {};

    //定义执行的方法
    let later = function() {
        previous = options.leading === false ? 0 : now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    //定义返回的节流方法
    let throttled = function() {
        let currentTime = now();
        //如果是首次并且leading === false 的时候，将previous设为now，这样now - previous，便不会大于wait。首次不执行
        if (!previous && options.leading === false) previous = currentTime;
        let remaining = wait - (currentTime - previous);
        context = this;
        args = arguments;
        // remaining小于等于0是跳出wait的限制，可以执行了
        // remaining大于wait的情况，只有在客户机修改了系统时间的时候才会出现（不太确定）
        // 这两种情况都可以立刻对func做调用
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = currentTime;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };

    // 取消
    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;
}
```
