import {
    validateOperand,
    validateOperator,
    validateResult,
} from '../src/validation.js';
import {
    INPUT_ERROR_MESSAGE,
    OUTPUT_ERROR_MESSAGE,
} from '../src/ValidationError.js';

describe('[Fearture1] 피연산자 유효성을 검사한다.', () => {
    describe('피연산자가 빈 값이면, 오류 메시지를 반환한다.', () => {
        it.each(['', null, undefined])(`validateOperand(%s)`, (operand) => {
            expect(() => validateOperand(operand, 1)).toThrow(
                INPUT_ERROR_MESSAGE.EMPTY_OPERAND,
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
        ])(`validateOperand(%p)`, (operand) => {
            expect(() => validateOperand(operand)).not.toThrow(
                INPUT_ERROR_MESSAGE.INVALID_OPERAND,
            );
        });
    });

    describe('피연산자가 숫자나 문자열 형태의 숫자가 아니라면, 오류 메시지를 반환한다.', () => {
        it.each(['123a', 'abc123', true, false, [], {}])(
            `validateOperand(%p)`,
            (operand) => {
                expect(() => validateOperand(operand)).toThrow(
                    INPUT_ERROR_MESSAGE.INVALID_OPERAND,
                );
            },
        );
    });

    describe('피연산자가 세 자리 이하라면, 오류를 발생시키지 않는다.', () => {
        it.each([0, -0, 123, -123, 0.123, -0.123, 0.99999])(
            `validateOperand(%i)`,
            (operand) => {
                expect(() => validateOperand(operand)).not.toThrow(
                    INPUT_ERROR_MESSAGE.LONG_OPERAND,
                );
            },
        );
    });

    describe('피연산자가 세 자리 초과라면, 오류 메시지를 반환한다.', () => {
        it.each([1234, -1234, 12345, -12345])(
            `validateOperand(%i)`,
            (operand) => {
                expect(() => validateOperand(operand)).toThrow(
                    INPUT_ERROR_MESSAGE.LONG_OPERAND,
                );
            },
        );
    });
});

describe('[Feature2] 피연산자 두 개와 연산자 하나의 연산 결과를 반환한다.', () => {
    describe('연산자의 유효성을 검사한다.', () => {
        describe('+,-,*,/ 외의 연산자는 오류를 반환한다.', () => {
            it.each(['a', '!', '@', '#', '$', '%', '^', '&', '(', ')'])(
                `validateOperator(%p, 1, 1)`,
                (operator) => {
                    expect(() => validateOperator(operator, 1, 1)).toThrow(
                        INPUT_ERROR_MESSAGE.INVALID_OPERATOR,
                    );
                },
            );
        });

        describe('연산자가 주어지지 않은 경우, 오류를 반환한다.', () => {
            it.each(['', null, undefined])(
                `validateOperator(%p, 1, 1)`,
                (operator) => {
                    expect(() => validateOperator(operator, 1, 1)).toThrow(
                        INPUT_ERROR_MESSAGE.INVALID_OPERATOR,
                    );
                },
            );
        });
    });
});

describe('[Feature3] 연산 결과를 특수 처리한다.', () => {
    describe('연산 결과가 NaN인 경우, 오류를 발생시킨다.', () => {
        it(`validateResult(NaN)'`, () => {
            expect(() => validateResult(NaN)).toThrow(
                INPUT_ERROR_MESSAGE.INVALID_RESULT,
            );
        });
    });

    describe('연산 결과가 숫자인 경우, 오류를 발생시키지 않는다.', () => {
        it.each([-1, 1, -100, 100, -10000000, 10000000, +Infinity, -Infinity])(
            `validateResult(%i) `,
            (result) => {
                expect(() => validateResult(result)).not.toThrow(
                    OUTPUT_ERROR_MESSAGE.INVALID_RESULT,
                );
            },
        );
    });
});
