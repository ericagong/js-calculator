import Calculator from '../src';
import { ERROR_MESSAGE } from '../src';

const calculator = new Calculator();

describe('[Fearture1] 피연산자 유효성을 검사한다.', () => {
    describe('피연산자가 빈 값이면, 오류 메시지를 반환한다.', () => {
        it.each(['', null, undefined])(`calculator.validate(%s)`, (operand) => {
            expect(() => calculator.validate(operand, 1)).toThrow(
                ERROR_MESSAGE.EMPTY_OPERAND,
            );
        });
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
        ])(`calculator.validate(%p)`, (operand) => {
            expect(() => calculator.validate(operand, 1)).not.toThrow(
                ERROR_MESSAGE.INVALID_OPERAND,
            );
        });
    });

    describe('피연산자가 숫자나 문자열 형태의 숫자가 아니라면, 오류 메시지를 반환한다.', () => {
        it.each(['123a', 'abc123', true, false, [], {}])(
            `calculator.validate(%p)`,
            (operand) => {
                expect(() => calculator.validate(operand, 1)).toThrow(
                    ERROR_MESSAGE.INVALID_OPERAND,
                );
            },
        );
    });

    describe('피연산자가 세 자리 이하라면, 오류를 발생시키지 않는다.', () => {
        it.each([0, -0, 123, -123, 0.123, -0.123, 0.99999])(
            `calculator.validate(%i)`,
            (operand) => {
                expect(() => calculator.validate(operand, 1)).not.toThrow(
                    ERROR_MESSAGE.LONG_OPERAND,
                );
            },
        );
    });

    describe('피연산자가 세 자리 초과라면, 오류 메시지를 반환한다.', () => {
        it.each([1234, -1234, 12345, -12345])(
            `calculator.validate(%i)`,
            (operand) => {
                expect(() => calculator.validate(operand, 1)).toThrow(
                    ERROR_MESSAGE.LONG_OPERAND,
                );
            },
        );
    });
});

describe('[Feature2] 피연산자 두 개와 연산자 하나의 연산 결과를 반환한다.', () => {
    describe('두 개의 피연산자에 대해 덧셈 결과를 반환한다.', () => {
        it.each([
            { operand1: 1, operand2: 30 },
            { operand1: -1, operand2: 30 },
            { operand1: 1, operand2: -30 },
            { operand1: -1, operand2: -30 },
        ])(
            `calculator.calculate(+, $operand1, $operand2)`,
            ({ operand1, operand2 }) => {
                expect(calculator.calculate('+', operand1, operand2)).toBe(
                    operand1 + operand2,
                );
            },
        );
    });

    describe('두 개의 피연산자에 대해 뺄셈 결과를 반환한다.', () => {
        it.each([
            { operand1: 1, operand2: 30 },
            { operand1: -1, operand2: 30 },
            { operand1: 1, operand2: -30 },
            { operand1: -1, operand2: -30 },
        ])(
            `calculator.calculate('-', $operand1, $operand2)`,
            ({ operand1, operand2 }) => {
                expect(calculator.calculate('-', operand1, operand2)).toBe(
                    operand1 - operand2,
                );
            },
        );
    });

    describe('두 개의 피연산자에 대해 곱셈 결과를 반환한다.', () => {
        it.each([
            { operand1: 1, operand2: 30 },
            { operand1: -1, operand2: 30 },
            { operand1: 1, operand2: -30 },
            { operand1: -1, operand2: -30 },
        ])(
            `calculator.calculate('*', $operand1, $operand2)`,
            ({ operand1, operand2 }) => {
                expect(calculator.calculate('*', operand1, operand2)).toBe(
                    operand1 * operand2,
                );
            },
        );
    });

    describe('두 개의 피연산자에 대해 나눗셈 결과를 반환한다.', () => {
        it.each([
            { operand1: 1, operand2: 30 },
            { operand1: -1, operand2: 30 },
            { operand1: 1, operand2: -30 },
            { operand1: -1, operand2: -30 },
        ])(
            `calculator.calculate('/', $operand1, $operand2)`,
            ({ operand1, operand2 }) => {
                expect(calculator.calculate('/', operand1, operand2)).toBe(
                    operand1 / operand2,
                );
            },
        );

        describe('피연산자 중 0이 있는 경우, 올바른 나눗셈 결과를 반환한다.', () => {
            describe('첫 번째 피연산자만 0인 경우, 0을 반환한다.', () => {
                it.each([
                    { operand1: +0, operand2: 30 },
                    { operand1: +0, operand2: -30 },
                    { operand1: -0, operand2: 30 },
                    { operand1: -0, operand2: -30 },
                ])(
                    `calculator.calculate('/', $operand1, $operand2) = 0`,
                    ({ operand1, operand2 }) => {
                        expect(
                            calculator.calculate('/', operand1, operand2),
                        ).toBe(operand1 / operand2);
                    },
                );
            });

            describe('두 번째 피연산자만 0인 경우, 연산자 부호 동일성 여부에 따라 Infinity/-Infinity를 반환한다.', () => {
                it.each([
                    { operand1: 30, operand2: +0 },
                    { operand1: -30, operand2: -0 },
                ])(
                    `calculator.calculate('/', $operand1, $operand2) = +Infinity`,
                    ({ operand1, operand2 }) => {
                        expect(
                            calculator.calculate('/', operand1, operand2),
                        ).toBe(Infinity);
                    },
                );

                it.each([
                    { operand1: 30, operand2: -0 },
                    { operand1: -30, operand2: +0 },
                ])(
                    `calculator.calculate('/', $operand1, $operand2) = -Infinity`,
                    ({ operand1, operand2 }) => {
                        expect(
                            calculator.calculate('/', operand1, operand2),
                        ).toBe(-Infinity);
                    },
                );
            });

            describe('두 피연산자가 모두 0인 경우, NaN을 반환한다.', () => {
                it.each([
                    { operand1: +0, operand2: +0 },
                    { operand1: +0, operand2: -0 },
                    { operand1: -0, operand2: +0 },
                    { operand1: -0, operand2: -0 },
                ])(
                    `calculator.calculate('/', $operand1, $operand2) = NaN`,
                    ({ operand1, operand2 }) => {
                        expect(
                            calculator.calculate('/', operand1, operand2),
                        ).toBeNaN();
                    },
                );
            });
        });
    });
});

describe('[Feature3] 연산 결과를 특수 처리한다.', () => {
    describe('연산 결과가 +Infinity/-Infinity/NaN인 경우, 오류를 반환한다.', () => {
        it.each([Infinity, -Infinity, NaN])(
            `calculator.adjustResult(%p)'`,
            (result) => {
                expect(() => calculator.adjustResult(result)).toThrow(
                    ERROR_MESSAGE.INVALID_RESULT,
                );
            },
        );
    });

    describe('연산 결과가 정수인 경우, 정수를 반환한다.', () => {
        it.each([-1, 1, -100, 100, -10000000, 10000000])(
            `calculator.adjustResult(%i) `,
            (result) => {
                expect(calculator.adjustResult(result)).toBe(result);
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
            `calculator.adjustResult($result) = $expected`,
            ({ result, expected }) => {
                expect(calculator.adjustResult(result)).toBe(expected);
            },
        );
    });

    describe('연산 결과가 -0인 경우, 0을 반환한다.', () => {
        it(`calculator.adjustResult(-0) = 0`, () => {
            expect(calculator.adjustResult(-0)).toBe(0);
        });
    });
});
