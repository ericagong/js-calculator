import Calculator from '../src/Calculator.js';
import { ERROR_MESSAGE } from '../src/validation.js';

const calculator = new Calculator();

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
            `calculator.adjustOutput($result) = $expected`,
            ({ result, expected }) => {
                expect(calculator.adjustOutput(result)).toBe(expected);
            },
        );
    });

    describe('연산 결과가 -0인 경우, 0을 반환한다.', () => {
        it(`calculator.adjustOutput(-0) = 0`, () => {
            expect(calculator.adjustOutput(-0)).toBe(0);
        });
    });
});
