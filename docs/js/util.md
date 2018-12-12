# 工具方法

### 将字符串中 `{ { xxx } }` 的内容替换成 data[xxx]

```javascript
function stringfy(str, data) {
    return str.replace(/\{\{[^\}\}]+\}\}/g, function(v) {
        console.log(v);
        let key = v.substring(2, v.length - 2);
        return data[key] || v;
    });
}
```

### 模拟耗时操作

有时候自己在做一些测试的时候，需要来模拟一个耗时的操作。

一开始总是用 while true ，执行一个很大的循环来模拟。这种方法对耗时的时间无法精确控制。

后面无意中想到了这种方法

```javascript
//耗时操作,大概1秒
function sleep(sleepTime = 1500) {
    var start = new Date().getTime();
    while (true) {
        if (new Date().getTime() - start > sleepTime) {
            break;
        }
    }
    //console.log('sleep done')
}
```

### 数组分块

由于 js 是单线程的，有时候一个耗时的操作会阻塞线程，导致这段时间用户无法与界面交互。

如果是某个循环比较耗时，并且该循环并不必须同步完成，就可以使用数组分块的技术，小块小块的处理数组，给主线程有空闲的机会，就可以不影响用户的操作。

实现数组分块非常简单：

```javascript
/**
 * 数组分块
 * array : 数组
 * process ：处理程序
 * context : 上下文
 */
function chunk(array, process, context) {
    setTimeout(function loop() {
        var item = array.shift();
        process.call(context, item);
        if (array.length > 0) {
            setTimeout(loop, 100);
        }
    }, 100);
}
```

:::tip
一旦某个函数需要花 50ms 以上的时间完成，就可以考虑能否分隔成多个小任务来完成
:::

### 浅拷贝

```javascript
//es5
function shallowClone(source) {
    var target = {};
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}

// es6
// {...source}
// Object.assign({},source);
```
