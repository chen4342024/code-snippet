# 日期相关

### 格式化日期

```javascript
/**
 * @param timestamp 时间戳
 * @param fmt
 * @returns {*}
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).Format(1540396800000,"yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format(1540396800000,"yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
export function getFormatDate(timestamp, fmt) {
    if (!timestamp) return;

    let date = new Date(timestamp);

    let o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }

    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? o[k]
                    : ('00' + o[k]).substr(('' + o[k]).length)
            );
        }
    }

    return fmt;
}
```

### 获取传入日期与当前时间的距离

```javascript
/**
 * 获取传入的日期与当前时间的距离
 * @param timestamp 时间戳
 * @returns {*}
 * 1分钟内显示**秒；
 * 60分钟内显示**分钟；
 * 24小时内显示**小时；
 * 24小时（含）到 48小时（不含）内显示“1天前”；
 * 48小时（含）到 72小时（不含）内显示“2天前”；以此类推；
 * 30天（含）到 60天（不含）内显示“1个月前”；
 * 60天（含）到 90天（不含）内显示“2个月前”；以此类推；
 * 12个月（含）到24个月（不含）内显示“1年前”；
 * 24个月（含）到36个月（不含）内显示“2年前”；以此类推。
 */
export function getTimeAgo(timestamp) {
    let diff = new Date().getTime() - timestamp;
    let second = 1000;
    let minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
    let hour = minute * 60;
    let day = hour * 24;
    let month = day * 30;
    let year = month * 12;
    // let week = day * 7;
    // let halfamonth = day * 15;

    let diffSection = [year, month, day, hour, minute, second];
    let diffSectionText = ['年前', '月前', '天前', '小时前', '分钟前', '秒前'];
    // 定义各个时间点，从大到小，超过时间点说明以那个时间点为准
    // 例如，超过 year ，则表示超过一年
    for (let i = 0; i < diffSection.length; i++) {
        if (diff > diffSection[i]) {
            let diffNum = diff / diffSection[i];
            return `${parseInt(diffNum)}${diffSectionText[i]}`;
        }
    }
    return '刚刚';
}
```

### 生成日期对象

```javascript
export function parseDate(dateStr) {
    if (typeof dateStr === 'string') {
        return new Date(dateStr.replace(/-/g, '/'));
    }
    return new Date(dateStr);
}
```

### 日期加减，计算

```javascript
/**
 * 日期加减
 * dateAdd(date,'d',5); //增加5天
 */
export function dateAdd(date, type, number) {
    var dtTmp = parseDate(date);
    switch (type) {
        case 'second':
        case 's':
            return new Date(Date.parse(dtTmp) + 1000 * number);
        case 'minute':
        case 'n':
            return new Date(Date.parse(dtTmp) + 60000 * number);
        case 'hour':
        case 'h':
            return new Date(Date.parse(dtTmp) + 3600000 * number);
        case 'day':
        case 'd':
            return new Date(Date.parse(dtTmp) + 86400000 * number);
        case 'week':
        case 'w':
            return new Date(Date.parse(dtTmp) + 86400000 * 7 * number);
        case 'month':
        case 'm':
            dtTmp.setMonth(dtTmp.getMonth() + number);
            return dtTmp;
        case 'year':
        case 'y':
            dtTmp.setFullYear(dtTmp.getFullYear() + number);
            return dtTmp;
    }
    return dtTmp;
}
```

### 获取当前时间

```javascript
// 获取当前时间
export const now =
    Date.now ||
    function() {
        return new Date().getTime();
    };
```



