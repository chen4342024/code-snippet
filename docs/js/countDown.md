# 倒计时

一个简单的工具，倒计时，用于发送短信验证码的时候可以使用。
[github 链接](https://github.com/chen4342024/count-down)

## 如何使用

### 安装

#### 通过 npm

安装：`npm install --save zzc-count-down`

引入：`import CountDown from 'zzc-count-down'`

#### 直接使用代码

安装：新建一个新的文件 `eg:countDown.js` ,复制最下方源码（不到 100 行）到里面。

引入：`import CountDown from './countDown.js'`

### 快速开始

```javascript
// 安装
import CountDown from './countDown.js';

let countDown = new CountDown({
    //每次计时都会回调，每秒一次
    count: second => {
        console.log(second);
    },
    // 计时结束的时候回调
    end: second => {
        console.log('count down end');
    }
});

countDown.start(60); //开始计时
```

### 方法

#### start(second)

开始计时，从传入的 second 开始倒数

#### pause

暂停计时

#### resume

继续计时

#### reset

重置计时为 0

## 事件

#### count

计时变化的时候回调，每秒回调一次，接收参数：秒数。

通常在这里更新页面上的秒数

#### end

计时结束的时候回调，用于处理计时结束后的事

## 具体源码

```javascript
// 空函数，方便使用
let noop = () => {};

/**
 * 倒计时的状态
 */
const CountDownStatus = {
    COUNTING: 'counting',
    PAUSE: 'pause',
    NONE: 'none'
};

/**
 * 倒计时
 */
class CountDown {
    //将倒计时挂在类上
    static Status = CountDownStatus;

    //默认的配置
    static defaultOptions = {
        count: noop,
        end: noop,
        status: CountDownStatus.NONE
    };

    constructor(options) {
        this.options = { ...CountDown.defaultOptions, ...options };
        this.status = CountDown.Status.NONE;
    }

    /**
     * 开始倒计时
     * @param seconds 秒数
     */
    start(seconds) {
        clearTimeout(this.timeoutId);
        this.seconds = seconds;
        this.status = CountDown.Status.COUNTING;
        this.next();
    }

    /**
     * 下一秒
     */
    next() {
        let { count } = this.options;
        if (this.seconds > 0) {
            count(this.seconds);
            this.seconds--;
            this.timeoutId = setTimeout(() => {
                this.next(this.seconds);
            }, 1000);
        } else {
            this.status = CountDown.Status.NONE;
            let { end } = this.options;
            end(this.seconds);
        }
    }

    /**
     * 暂停计时器
     */
    pause() {
        clearTimeout(this.timeoutId);
        this.status = CountDown.Status.PAUSE;
    }

    /**
     * 继续倒计时
     */
    resume() {
        if (this.status === CountDown.Status.PAUSE) {
            this.status = CountDown.Status.COUNTING;
            this.next();
        }
    }

    /**
     * 重置计时器
     */
    reset() {
        clearTimeout(this.timeoutId);
        this.seconds = 0;
        this.status = CountDown.Status.NONE;
        let { end } = this.options;
        end(this.seconds);
    }
}

export default CountDown;
```
