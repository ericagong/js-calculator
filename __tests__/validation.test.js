import {
    validateOperand,
    validateOperator,
    validateResult,
} from '../src/validation.js';
import {
    EmptyOperandError,
    NonNumericOperandError,
    TooLongOperandError,
} from '../src/errors/OperandError.js';
import {
    EmptyOperatorError,
    UnsupportedOperatorError,
} from '../src/errors/OperatorError.js';
import { InvalidResultError } from '../src/errors/ResultError.js';

describe('validateOperand', () => {
    describe('피연산자가 빈 값이면 EmptyOperandError를 던진다', () => {
        it.each(['', '    ', null, undefined])(
            `validateOperand(%s)`,
            (operand) => {
                expect(() => validateOperand(operand)).toThrowError(
                    EmptyOperandError,
                );
            },
        );
    });

    describe('피연산자가 숫자나 문자열 형태의 숫자가 아니면 NonNumericOperandError를 던진다', () => {
        it.each(['123a', 'abc123', true, false, [], {}, NaN])(
            `validateOperand(%p)`,
            (operand) => {
                expect(() => validateOperand(operand)).toThrowError(
                    NonNumericOperandError,
                );
            },
        );
    });

    describe('피연산자가 유효한 값이면 오류를 던지지 않는다', () => {
        it.each([
            +0,
            -0,
            0.123,
            -0.123,
            '-0',
            '+0',
            '123',
            '-0.123',
            '+0.123',
            123,
            -123,
            0.99999,
        ])(`validateOperand(%p)`, (operand) => {
            expect(() => validateOperand(operand)).not.toThrowError();
        });
    });

    describe('피연산자의 정수부가 세 자리를 초과하면 TooLongOperandError를 던진다', () => {
        it.each([1234, -1234, 12345, -12345, Infinity, -Infinity])(
            `validateOperand(%i)`,
            (operand) => {
                expect(() => validateOperand(operand)).toThrowError(
                    TooLongOperandError,
                );
            },
        );
    });
});

describe('validateOperator', () => {
    describe('연산자가 빈 값이면 EmptyOperatorError를 던진다', () => {
        it.each(['', null, undefined, '    '])(
            `validateOperator(%p)`,
            (operator) => {
                expect(() => validateOperator(operator)).toThrowError(
                    EmptyOperatorError,
                );
            },
        );
    });

    describe('지원하지 않는 연산자라면 UnsupportedOperatorError를 던진다', () => {
        it.each(['a', '!', '@', '#', '$', '%', '^', '&', '(', ')'])(
            `validateOperator(%p)`,
            (operator) => {
                expect(() => validateOperator(operator)).toThrowError(
                    UnsupportedOperatorError,
                );
            },
        );
    });

    describe('지원하는 연산자(+,-,*,/)라면 오류를 던지지 않는다', () => {
        it.each(['+', '-', '*', '/'])(`validateOperator(%p)`, (operator) => {
            expect(() => validateOperator(operator)).not.toThrowError();
        });
    });
});

describe('validateResult', () => {
    describe('비정상적인 연산결과라면 InvalidResultError를 던진다', () => {
        it(`validateResult(NaN)`, () => {
            expect(() => validateResult(NaN)).toThrowError(InvalidResultError);
        });
    });

    describe('정상적인 연산결과라면 오류를 던지지 않는다', () => {
        it.each([-1, 1, -100, 100, -10000000, 10000000, +Infinity, -Infinity])(
            `validateResult(%i) `,
            (result) => {
                expect(() => validateResult(result)).not.toThrowError();
            },
        );
    });
});
