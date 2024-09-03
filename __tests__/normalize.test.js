import { removeDecimalAndAdjustSign } from '../src/normalize.js';

describe('[Feature3] 연산 결과를 특수 처리한다.', () => {
    describe('연산 결과가 소수인 경우, 소수점 이하는 버림 처리하고 정수값을 반환한다.', () => {
        it.each([
            { result: 1.1, expected: 1 },
            { result: -1.1, expected: -1 },
            { result: 1.9, expected: 1 },
            { result: -1.9, expected: -1 },
            { result: -0.123456789, expected: 0 },
            { result: 0.123456789, expected: 0 },
        ])(
            `removeDecimalAndAdjustSign($result) = $expected`,
            ({ result, expected }) => {
                expect(removeDecimalAndAdjustSign(result)).toBe(expected);
            },
        );
    });

    describe('연산 결과가 -0인 경우, 0을 반환한다.', () => {
        it(`removeDecimalAndAdjustSign(-0) = 0`, () => {
            expect(removeDecimalAndAdjustSign(-0)).toBe(0);
        });
    });
});