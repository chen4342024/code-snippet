# 类型判断

```javascript
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

// "Arguments", 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'
// 也可以同样的方法获取
_.each(["Arguments", 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function (name) {
	["is" + name] = function (obj) {
        return Object.prototype.call(obj) === '[object ' + name + ']';
    }
});
```