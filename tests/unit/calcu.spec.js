import { expect } from "chai";

import { moveDecimalPlace, getDecimalPlace, accAdd } from '../../src/utils/calcu'

describe("getDecimalPlace", () => {
    it("正确获取小数位", () => {
        let num1 = 0.123;
        expect(getDecimalPlace(num1)).to.equal(3);

        let num2 = 123;
        expect(getDecimalPlace(num2)).to.equal(0);

    });
});

describe("getDecimalPlace", () => {
    it("正确移动小数点", () => {
        let num1 = 0.123;
        expect(moveDecimalPlace(num1, 1)).to.equal(1.23);

    });

    it("正确移动小数点,补零", () => {

        let num2 = 123;
        expect(moveDecimalPlace(num2, 2)).to.equal(12300);

    });

    it("正确移动小数点,往左移", () => {
        let num3 = 123;
        expect(moveDecimalPlace(num3, -2)).to.equal(1.23);
    });

    it("正确移动小数点,往左移，超过自身长度", () => {
        let num4 = 1;
        expect(moveDecimalPlace(num4, -2)).to.equal(0.01);
    });

});

describe("accAdd", () => {
    it("正确相加浮点数", () => {
        expect(accAdd(0.1, 0.2)).to.equal(0.3);
        expect(accAdd(0.1, 0.21)).to.equal(0.31);
        expect(accAdd(268.34, 0.83)).to.equal(269.17);
        expect(accAdd(0.1, 0.2222222)).to.equal(0.3222222);
    });

    it("正确相加整数", () => {
        expect(accAdd(1, 22)).to.equal(23);
    });
});
