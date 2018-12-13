import { expect } from "chai";

import { shallowClone, deepCopy } from '../../src/utils/util'

describe("extend", () => {
    it("正确浅拷贝对象", () => {
        const obj = { a: 1, b: { c: 1 } };
        const result = shallowClone(obj);
        expect(result).to.deep.equal(obj);
        expect(result.b).to.equal(obj.b);
    });
});


describe("deepCopy", () => {
    it("深拷贝对象,正常拷贝第二层", () => {
        const obj = { a: 1, b: { c: 1 } };
        const result = deepCopy(obj);
        expect(result).to.deep.equal(obj);
        expect(result.b).to.not.equal(obj.b);
    });

    it("深拷贝对象,正常拷贝循环引用", () => {
        let d = { d: 1 };
        let obj = { c: 1, d: d };
        let b = { a: obj, d: d };
        obj.b = b;
        const result = deepCopy(obj);
        expect(result).to.deep.equal(obj);
        expect(result.d).to.not.equal(obj.d);
    });

    it("深拷贝对象,循环引用后的对象复用", () => {
        let d = { d: 1 };
        let obj = { c: 1, d: d };
        let b = { a: obj, d: d };
        obj.b = b;
        const result = deepCopy(obj);
        expect(result.b.a).to.equal(result);
    });

    it("深拷贝对象,正常拷贝循环引用,包含数组", () => {
        let d = { d: 1 };
        let obj = { c: 1, d: d };
        let e = [obj]
        let b = [e];
        obj.b = b;
        const result = deepCopy(obj);
        expect(result).to.deep.equal(obj);
        expect(result.d).to.not.equal(obj.d);
    });
});
