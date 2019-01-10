# 表单验证

一个超简单的表单验证，当页面并没有引入其他第三方的表单验证控件的时候，表单验证会是一个比较烦的逻辑处理。

有时候又不希望引入第三方库，毕竟有可能页面内容很少，没有必要

这个时候可以使用这个稍微封装了一些简单的方法来提高开发效率

## 如何使用

安装：新建一个新的文件 `eg:form.js` ,复制最下方源码（不到 200 行）到里面。

引入：`import Form from './form.js'`

### 快速开始

```javascript
// 安装
import Form from './form.js';

// 初始化，定义验证规则
let myForm = new Form({
    phone: [
        { validate: Form.required, msg: '请输入手机号码' },
        { validate: Form.phone, msg: '请输入正确的手机号码' }
    ]
});

// 提交表单的时候
let result = myForm.validate(data); // data为需要验证的数据  eg: {phone:13099998888}
if (result.allPass) {
    // 全部验证通过
} else {
    // 验证不通过，展示第一个错误
    let firstError = Form.getFirstError(result.result);
    this.$toast.open({ msg: firstError.msg });
}
```

### 方法介绍

#### 构造函数

接受一个 config 参数，参数类型为一个配置对象。 `{ key : ruleList }`

-   `key` : 需要验证的 `name`
-   `ruleList` : 对象数组类型,包含一系列的 `rule`规则

`rule` 包含 两个参数 ，`rule : { validate : func , msg : 'string' }`

-   `validate` : 函数类型，`return true` , 表示验证通过
-   `msg` ： 验证不通过返回的信息

#### 验证方法

默认提供了一些列的方法，可以作为函数传到规则的 `validate` 方法

-   `Form.required` 是否必填
-   `Form.email` 是否邮箱
-   `Form.digit` 是否数字
-   `Form.phoneCode` 是否手机区号
-   `Form.phone` 是否手机号码
-   `Form.alpha` 是否拼音
-   `Form.chinese` 是否是中文
-   `Form.date` 是否是日期格式
-   `Form.legalText` 是否由 汉字、字母和、数字和下划线\_组成

#### validate(data)

根据配置验证数据， 返回是否所有通过

返回一个对象 `result`

-   `result.allPass` 表示是否全部通过
-   `result.result` 保存每个 name 验证的结果
-   `result.result['xxx'] : { validate , msg }`

#### validateByNames

验证多个 `name` ， 返回结果同 `validate(data)`

#### validateByName(name,value)

验证特定 `name` ，返回结果为 ：`{ validate, msg }`

#### getFirstError

当验证多个 `name` 的时候，获取第一个 `name` 的错误 , 返回结果为 ：`{ validate, msg }`

## 具体源码

```javascript
function isFunction(func) {
    return typeof func === 'function';
}

function noop() {}

/* eslint-disable no-useless-escape */
// 验证规则：邮箱
const REG_EMAIL = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]+)+$/;

// 验证规则：数字
const REG_DIGIT = /^(\d+)$/;

// 验证规则：手机号码区号
const REG_PHONE_CODE = /^\+?(\d+)$/; //验证规则---> 首位可以是+号也可以不是，其他位都是数字

// 验证规则：手机号码
const REG_PHONE = /^1[3,4,5,6,7,8,9]\d{9}$/;

// 验证规则：字母
const REG_ALPHA = /^[a-zA-Z\s]+$/;

// 验证规则：中文
const REG_CHINESE = /^[\u2E80-\u9FFF]+$/;

// 验证规则：日期
const REG_DATE = /^((?:18|19|20|21)\d\d)-(0[1-9]|[1-9]|1[012])-(0[1-9]|[1-9]|[12][0-9]|3[01])$/;

// 汉字、字母和、数字和下划线_组成
const REG_LEGAL_TEXT = /^[a-zA-Z0-9\_\u4e00-\u9fa5]+$/i;
/* eslint-enable no-useless-escape */

function checkReg(reg, value = '') {
    if (value.length > 0) {
        return reg.test(value);
    }
    return true;
}

//默认配置
const defaultConfig = {
    onValidate: noop
};

class Form {
    constructor(config, options) {
        this.config = config || {};
        this.options = { ...defaultConfig, ...options };
    }

    /**
     * 根据配置验证数据， 返回是否所有通过
     * 返回一个对象 result
     * result.allPass 表示是否全部通过
     * result.result 保存每个name验证的结果
     * result.result['xxx'] : { validate , msg }
     */
    validate(data) {
        let validateConfig = this.config;
        let names = Object.keys(validateConfig);
        let { allPass, result } = this.validateByNames(names, data);
        return {
            allPass,
            result
        };
    }

    /**
     * 验证特定 name
     * 结果： { validate, msg }
     */
    validateByName(name, value) {
        let validateConfig = this.config;
        let configList = validateConfig[name];
        return Form.validate(configList, value);
    }

    /**
     * 验证一系列的name
     * 返回一个对象 result
     * result.allPass 表示是否全部通过
     * result.result 保存每个name验证的结果
     * result.result['xxx'] : { validate , msg }
     */
    validateByNames(names, data) {
        let allPass = true;
        let validateResult = {};
        for (let name of names) {
            let value = data[name];
            let result = this.validateByName(name, value);
            if (!result.validate) {
                validateResult[name] = result;
            }
            if (!result.validate) {
                allPass = false;
            }
            this.options.onValidate(name, validateResult);
        }
        return {
            allPass,
            result: validateResult
        };
    }

    // 是否必填
    static required(value = '') {
        return value.length > 0;
    }

    // 是否邮箱
    static email(value = '') {
        return checkReg(REG_EMAIL, value);
    }

    // 是否数字
    static digit(value = '') {
        return checkReg(REG_DIGIT, value);
    }

    // 是否是手机区号
    static phoneCode(value) {
        return checkReg(REG_PHONE_CODE, value);
    }

    // 是否是手机号码
    static phone(value = '') {
        return checkReg(REG_PHONE, value);
    }

    // 是否是拼音
    static alpha(value = '') {
        return checkReg(REG_ALPHA, value);
    }

    // 是否是中文
    static chinese(value = '') {
        return checkReg(REG_CHINESE, value);
    }

    // 是否是日期格式
    static date(value = '') {
        return checkReg(REG_DATE, value);
    }

    // 是否是 汉字、字母和、数字和下划线_组成
    static legalText(value = '') {
        return checkReg(REG_LEGAL_TEXT, value);
    }

    /**
     * 根据配置验证对应的值
     */
    static validate(configList = [], value = '') {
        value = '' + value; //转化为字符串
        for (let i = 0; i < configList.length; i++) {
            let config = configList[i];
            let { validate, msg } = config;
            if (isFunction(validate)) {
                if (!validate(value)) {
                    return { validate: false, msg };
                }
            }
        }
        return { validate: true };
    }

    static getFirstError(errorResult = {}) {
        let names = Object.keys(errorResult);
        if (names.length > 0) {
            return errorResult[names[0]];
        }
        return '';
    }
}

export default Form;
```
