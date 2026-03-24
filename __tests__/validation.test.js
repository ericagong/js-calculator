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
    describe('피연산자가 빈 값이면, EmptyOperandError가 발생한다', () => {
        it.each(['', '    ', null, undefined])(
            `validateOperand(%p)`,
            (operand) => {
                expect(() => validateOperand(operand)).toThrowError(
                    EmptyOperandError,
                );
            },
        );
    });

    describe('피연산자가 숫자나 문자열 형태의 숫자가 아니면, NonNumericOperandError가 발생한다', () => {
        it.each(['123a', 'abc123', true, false, [], {}, NaN])(
            `validateOperand(%p)`,
            (operand) => {
                expect(() => validateOperand(operand)).toThrowError(
                    NonNumericOperandError,
                );
            },
        );
    });

    describe('피연산자의 정수부가 세 자리를 초과하면, TooLongOperandError가 발생한다', () => {
        it.each([1234, -1234, 12345, -12345, Infinity, -Infinity])(
            `validateOperand(%p)`,
            (operand) => {
                expect(() => validateOperand(operand)).toThrowError(
                    TooLongOperandError,
                );
            },
        );
    });

    describe('피연산자가 유효한 값이면, 에러가 발생하지 않는다', () => {
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
});

describe('validateOperator', () => {
    describe('연산자가 빈 값이면, EmptyOperatorError가 발생한다', () => {
        it.each(['', null, undefined, '    '])(
            `validateOperator(%p)`,
            (operator) => {
                expect(() => validateOperator(operator)).toThrowError(
                    EmptyOperatorError,
                );
            },
        );
    });

    describe('지원하지 않는 연산자라면, UnsupportedOperatorError가 발생한다', () => {
        it.each(['a', '!', '@', '#', '$', '%', '^', '&', '(', ')', '**'])(
            `validateOperator(%p)`,
            (operator) => {
                expect(() => validateOperator(operator)).toThrowError(
                    UnsupportedOperatorError,
                );
            },
        );
    });

    describe('지원하는 연산자(+,-,*,/)라면, 에러가 발생하지 않는다', () => {
        it.each(['+', '-', '*', '/'])(`validateOperator(%p)`, (operator) => {
            expect(() => validateOperator(operator)).not.toThrowError();
        });
    });
});

describe('validateResult', () => {
    describe('비정상적인 연산결과라면, InvalidResultError가 발생한다', () => {
        it(`validateResult(NaN)`, () => {
            expect(() => validateResult(NaN)).toThrowError(InvalidResultError);
        });
    });

    describe('정상적인 연산결과라면, 에러가 발생하지 않는다', () => {
        it.each([-1, 1, -100, 100, -10000000, 10000000, +Infinity, -Infinity])(
            `validateResult(%p)`,
            (result) => {
                expect(() => validateResult(result)).not.toThrowError();
            },
        );
    });
});
