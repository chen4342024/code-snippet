# 类型判断

### 判断是否定义

```javascript
function isDef(v) {
    return v !== undefined;
}
```

### 判断是否为对象

```javascript
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
```

### 判断是否为数组

```javascript
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
```

### 判断类型通用方法

```javascript
// "Arguments", 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'
// 也可以同样的方法获取
_.each(["Arguments",'Array', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function (name) {
	["is" + name] = function (obj) {
        return Object.prototype.call(obj) === '[object ' + name + ']';
    }
});
```
