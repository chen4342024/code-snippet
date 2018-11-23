# 事件管理

```javascript
/**
 * 事件管理
 */
class EventEmitter {
    constructor() {
        this._events = {}; //维护事件列表
    }

    /**
     * 添加事件
     * @param {*} type 事件类型
     * @param {*} fn 事件触发回调
     * @param {*} context 上下文
     */
    on(type, fn, context = this) {
        if (!this._events[type]) {
            this._events[type] = [];
        }
        this._events[type].push([fn, context]);
    }

    /**
     * 绑定事件，只触发一次
     * @param {*} type 事件类型
     * @param {*} fn 回调
     * @param {*} context 上下文
     */
    once(type, fn, context = this) {
        let fired = false;

        function magic() {
            this.off(type, magic);

            if (!fired) {
                fired = true;
                fn.apply(context, arguments);
            }
        }

        this.on(type, magic);
    }

    /**
     * 解绑事件
     * @param {*} type 事件类型
     * @param {*} fn 事件回调
     */
    off(type, fn) {
        let _events = this._events[type];
        if (!_events) {
            return;
        }

        let count = _events.length;
        while (count--) {
            if (_events[count][0] === fn) {
                _events[count][0] = undefined;
            }
        }
    }

    /**
     * 触发事件执行
     * @param {*} type 事件类型
     * @param ...other 可以传入更多参数，会传到对应的事件回调里面
     */
    trigger(type) {
        let events = this._events[type];
        if (!events) {
            return;
        }

        let len = events.length;
        let eventsCopy = [...events];
        for (let i = 0; i < len; i++) {
            let event = eventsCopy[i];
            let [fn, context] = event;
            if (fn) {
                fn.apply(context, [].slice.call(arguments, 1));
            }
        }
    }
}
```
