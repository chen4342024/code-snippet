# URL 相关

### 对象转字符串

```javascript
// 将对象转换成 url参数 ： a=xxx&b=xxx 这样的字符串
export function paramToStr(params = {}) {
    let paramArray = [];
    let keys = Object.keys(params);

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (params[key] !== undefined) {
            paramArray.push(`${key}=${params[key]}`);
        }
    }
    return paramArray.join('&');
}
```

### 获取参数

```javascript
// 从 location.search 中获取 query 参数
export function getQuery(search) {
    var queryObj = new Object();
    if (search.indexOf('?') != -1) {
        var params = search.substr(1);
        params = params.split('&');
        for (var i = 0; i < params.length; i++) {
            let query = params[i].split('=');
            queryObj[query[0]] = query[1];
        }
    }
    return queryObj;
}
```
