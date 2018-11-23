# Dom 相关

### 获取滚动位置

> 在不同浏览器会有兼容问题，故需要进行一下兼容

```javascript
//获取scrollTop
function getScrollTop() {
    var scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
    return scrollTop;
}

//设置scrollTop
function setScrollTop(scroll_top) {
    document.documentElement.scrollTop = scroll_top;
    window.pageYOffset = scroll_top;
    document.body.scrollTop = scroll_top;
}
```

### 根据 html 代码生成节点

```javascript
/**
 * 根据html代码生成节点
 * @param {string} html
 */
function stringToNode(html) {
    let wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim();
    return wrapper.children.length > 1 ? wrapper.children : wrapper.firstChild;
}
```

### 创建元素

```javascript
function createElement(tagName) {
    return document.createElement(tagName);
}
```

### 是否是元素类型

```javascript
function isElement(node) {
    return node.nodeType === 1;
}
```

### 是否是文本类型

```javascript
function isText(node) {
    return node.nodeType === 3;
}
```

### 是否是注释内容

```javascript
function isComment(node) {
    return node.nodeType === 8;
}
```

### 一个很简单的模板引擎
```javascript
/**
 * render
 * 取值：<%= variable %>
 * 表达式：<% if {} %>
 * 例子：
 *  <div>
 *    <div class="weui-mask"></div>
 *    <div class="weui-dialog">
 *    <% if(typeof title === 'string'){ %>
 *           <div class="weui-dialog__hd"><strong class="weui-dialog__title"><%=title%></strong></div>
 *    <% } %>
 *    <div class="weui-dialog__bd"><%=content%></div>
 *    <div class="weui-dialog__ft">
 *    <% for(var i = 0; i < buttons.length; i++){ %>
 *        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_<%=buttons[i]['type']%>"><%=buttons[i]['label']%></a>
 *    <% } %>
 *    </div>
 *    </div>
 *  </div>
 * A very simple template engine
 * @param {String} tpl
 * @param {Object=} data
 * @returns {String}
 */
function render(tpl, data) {
    const code =
        "var p=[];with(this){p.push('" +
        tpl
            .replace(/[\r\t\n]/g, ' ')
            .split('<%')
            .join('\t')
            .replace(/((^|%>)[^\t]*)'/g, '$1\r')
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split('\t')
            .join("');")
            .split('%>')
            .join("p.push('")
            .split('\r')
            .join("\\'") +
        "');}return p.join('');";
    return new Function(code).apply(data);
}
```
