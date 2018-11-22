# 样式相关

### 去除移动端 input 阴影

#### 移动端开发的时候，在 iphone 下的 input，上边框有一块阴影，导致与设计稿不统一

```css
outline: none;
-webkit-appearance: none; /*去除系统默认的样式*/
-webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* 点击高亮的颜色*/
```
