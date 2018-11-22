# Dom相关

### 获取滚动位置

> 在不同浏览器会有兼容问题，故需要进行一下兼容
```javascript
//获取scrollTop
function getScrollTop() {
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    return scrollTop;
}

//设置scrollTop
function setScrollTop(scroll_top) {
    document.documentElement.scrollTop = scroll_top;
    window.pageYOffset = scroll_top;
    document.body.scrollTop = scroll_top;
}
```