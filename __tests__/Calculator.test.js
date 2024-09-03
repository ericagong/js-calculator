import Calculator from '../src/Calculator.js';
import { ERROR_MESSAGE } from '../src/Calculator.js';

const calculator = new Calculator();

describe('[Fearture1] 피연산자 유효성을 검사한다.', () => {
    describe('피연산자가 빈 값이면, 오류 메시지를 반환한다.', () => {
        it.each(['', null, undefined])(
            `calculator.validateOperands(%s)`,
            (operand) => {
                expect(() => calculator.validateOperands(operand, 1)).toThrow(
                    ERROR_MESSAGE.EMPTY_OPERAND,
                );
            },
        );
    });

    describe('피연산자가 숫자나 문자열 형태의 숫자라면, 오류를 발생시키지 않는다.', () => {
        it.each([
            Infinity,
            -Infinity,
            +0,
            -0,
            0.123,
            -0.123,
            '-0',
            '+0',
            '123',
            '-0.123',
            '+0.123',
        ])(`calculator.validateOperands(%p)`, (operand) => {
            expect(() => calculator.validateOperands(operand, 1)).not.toThrow(
                ERROR_MESSAGE.INVALID_OPERAND,
            );
        });
    });

    describe('피연산자가 숫자나 문자열 형태의 숫자가 아니라면, 오류 메시지를 반환한다.', () => {
        it.each(['123a', 'abc123', true, false, [], {}])(
            `calculator.validateOperands(%p)`,
            (operand) => {
                expect(() => calculator.validateOperands(operand, 1)).toThrow(
                    ERROR_MESSAGE.INVALID_OPERAND,
                );
            },
        );
    });

    describe('피연산자가 세 자리 이하라면, 오류를 발생시키지 않는다.', () => {
        it.each([0, -0, 123, -123, 0.123, -0.123, 0.99999])(
            `calculator.validateOperands(%i)`,
            (operand) => {
                expect(() =>
                    calculator.validateOperands(operand, 1),
                ).not.toThrow(ERROR_MESSAGE.LONG_OPERAND);
            },
        );
    });

    describe('피연산자가 세 자리 초과라면, 오류 메시지를 반환한다.', () => {
        it.each([1234, -1234, 12345, -12345])(
            `calculator.validateOperands(%i)`,
            (operand) => {
                expect(() => calculator.validateOperands(operand, 1)).toThrow(
                    ERROR_MESSAGE.LONG_OPERAND,
                );
            },
        );
    });
});

describe('[Feature2] 피연산자 두 개와 연산자 하나의 연산 결과를 반환한다.', () => {
    describe('연산자의 유효성을 검사한다.', () => {
        describe('+,-,*,/ 외의 연산자는 오류를 반환한다.', () => {
            it.each(['a', '!', '@', '#', '$', '%', '^', '&', '(', ')'])(
                `calculator.validateOperator(%p, 1, 1)`,
                (operator) => {
                    expect(() =>
                        calculator.validateOperator(operator, 1, 1),
                    ).toThrow(ERROR_MESSAGE.INVALID_OPERAND);
                },
            );
        });

        describe('연산자가 주어지지 않은 경우, 오류를 반환한다.', () => {
            it.each(['', null, undefined])(
                `calculator.validateOperator(%p, 1, 1)`,
                (operator) => {
                    expect(() =>
                        calculator.validateOperator(operator, 1, 1),
                    ).toThrow(ERROR_MESSAGE.INVALID_OPERAND);
                },
            );
        });
    });
});

describe('[Feature3] 연산 결과를 특수 처리한다.', () => {
    describe('연산 결과가 +Infinity/-Infinity/NaN인 경우, 오류를 발생시킨다.', () => {
        it.each([Infinity, -Infinity, NaN])(
            `calculator.validateOutput(%p)'`,
            (result) => {
                expect(() => calculator.validateOutput(result)).toThrow(
                    ERROR_MESSAGE.INVALID_RESULT,
                );
            },
        );
    });

    describe('연산 결과가 숫자인 경우, 오류를 발생시키지 않는다.', () => {
        it.each([-1, 1, -100, 100, -10000000, 10000000])(
            `calculator.validateOutput(%i) `,
            (result) => {
                expect(() => calculator.validateOutput(result)).not.toThrow(
                    ERROR_MESSAGE.INVALID_RESULT,
                );
            },
        );
    });

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
