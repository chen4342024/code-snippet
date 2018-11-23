# 工具方法
#### 将字符串中 ```{ { xxx } } ``` 的内容替换成data[xxx]
```javascript
function stringfy(str, data) {
  return str.replace(/\{\{[^\}\}]+\}\}/g, function (v) {console.log(v);
    let key = v.substring(2, v.length - 2);
    return data[key] || v;
  });
}
```
