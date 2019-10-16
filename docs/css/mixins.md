# scss mixins 集合

### 一像素边框

```scss
// 顶部一像素边框
@mixin border-top($left: 0, $right: 0, $color: #e6e4dd) {
    &::before {
        left: $left;
        right: $right;
        top: 0;
        bottom: auto;
        content: '';
        position: absolute;
        height: 1px;
        background-color: $color;
        display: block;
        z-index: 15;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
}

// 底部一像素边框
@mixin border-bottom($left: 0, $right: 0, $color: #e6e4dd) {
    &::after {
        left: $left;
        right: $right;
        bottom: 0;
        top: auto;
        content: '';
        position: absolute;
        height: 1px;
        background-color: $color;
        display: block;
        z-index: 15;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
}

// 左侧一像素边框
@mixin border-left($top: 0, $bottom: 0, $color: #e6e4dd) {
    &::before {
        top: $top;
        bottom: $bottom;
        left: 0;
        right: auto;
        content: '';
        position: absolute;
        width: 1px;
        background-color: $color;
        display: block;
        z-index: 15;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
    }
}

// 右侧一像素边框
@mixin border-right($top: 0, $bottom: 0, $color: #e6e4dd) {
    &::after {
        top: $top;
        bottom: $bottom;
        left: auto;
        right: 0;
        content: '';
        position: absolute;
        width: 1px;
        background-color: $color;
        display: block;
        z-index: 15;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
    }
}

// 一像素全边框
@mixin border-all($color: #e6e4dd, $radius: 0) {
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid $color;
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        transform: scale(0.5);
        transform-origin: left top;
        border-radius: $radius;
        pointer-events: none;
    }
}
```
