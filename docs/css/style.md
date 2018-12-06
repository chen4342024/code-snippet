# 样式相关

### 去除移动端 input 阴影

#### 移动端开发的时候，在 iphone 下的 input，上边框有一块阴影，导致与设计稿不统一

```css
outline: none;
-webkit-appearance: none; /*去除系统默认的样式*/
-webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* 点击高亮的颜色*/
```

### 超出显示省略号-单行

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

### 超出显示省略号 - 多行

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2; /*行数*/
overflow: hidden;
```

### 1px 边框

```css
/*上边框*/
.border-bottom-line:after {
    bottom: 0;
    top: auto;
}

/*下边框*/
.border-top-line:before {
    top: 0;
    bottom: auto;
}

.border-top-line:before,
.border-bottom-line:after {
    left: 0;
    right: auto;
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: #eaeaea;
    display: block;
    z-index: 15;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
```

### 文字垂直居中

```css
.xxx {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: normal;
}
```

### 禁用微信 webview 调整字体大小

在微信上可以调整字体，有时候会导致我们整体的布局错乱。所以这里禁用掉微信的字体调整

```css
body {
    -webkit-text-size-adjust: 100% !important; //禁止微信端字体缩放
}
```

:::warning
这块代码仅对 `IOS` 生效，`android` 上网络上有说用`WeixinJSBridge`，但是我没试。`android` 端就不处理了
:::
