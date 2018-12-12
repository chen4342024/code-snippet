import { expect } from "chai";

import { extend } from '../../src/utils/util'

describe("extend", () => {
    it("正确浅拷贝对象", () => {
        const obj = { a: 1, b: { c: 1 } };
        const result = extend(obj);
        expect(result).to.deep.equal(obj);
        expect(result.b).to.equal(obj.b);
    });
});
