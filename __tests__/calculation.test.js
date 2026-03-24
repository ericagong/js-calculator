import calculate from '../src/calculation.js';
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

describe('calculate', () => {
    describe('피연산자가 유효하지 않다면, 에러가 발생한다', () => {
        describe('빈 값이라면, EmptyOperandError를 발생시킨다', () => {
            it.each`
                operator | operand1     | operand2
                ${'+'}   | ${null}      | ${2}
                ${'+'}   | ${undefined} | ${2}
                ${'+'}   | ${'   '}     | ${2}
            `(
                'calculate($operator, $operand1, $operand2)',
                ({ operator, operand1, operand2 }) => {
                    expect(() =>
                        calculate(operator, operand1, operand2),
                    ).toThrow(EmptyOperandError);
                },
            );
        });

        describe('숫자나 문자 형태의 숫자가 아니라면, NonNumericOperandError를 발생시킨다', () => {
            it.each`
                operator | operand1 | operand2
                ${'+'}   | ${'abc'} | ${2}
                ${'+'}   | ${true}  | ${2}
                ${'+'}   | ${[]}    | ${2}
                ${'+'}   | ${1}     | ${'abc'}
                ${'+'}   | ${NaN}   | ${2}
            `(
                'calculate($operator, $operand1, $operand2)',
                ({ operator, operand1, operand2 }) => {
                    expect(() =>
                        calculate(operator, operand1, operand2),
                    ).toThrow(NonNumericOperandError);
                },
            );
        });

        describe('세 자리를 초과하면, TooLongOperandError를 발생시킨다', () => {
            it.each`
                operator | operand1 | operand2
                ${'+'}   | ${1234}  | ${1}
                ${'+'}   | ${1}     | ${-9999}
            `(
                'calculate($operator, $operand1, $operand2)',
                ({ operator, operand1, operand2 }) => {
                    expect(() =>
                        calculate(operator, operand1, operand2),
                    ).toThrow(TooLongOperandError);
                },
            );
        });
    });

    describe('연산자가 유효하지 않다면, 에러가 발생한다', () => {
        describe('빈 값이라면, EmptyOperatorError를 발생시킨다', () => {
            it.each`
                operator     | operand1 | operand2
                ${''}        | ${1}     | ${2}
                ${null}      | ${1}     | ${2}
                ${undefined} | ${1}     | ${2}
            `(
                'calculate($operator, $operand1, $operand2)',
                ({ operator, operand1, operand2 }) => {
                    expect(() =>
                        calculate(operator, operand1, operand2),
                    ).toThrow(EmptyOperatorError);
                },
            );
        });

        describe('지원하지 않는 연산자라면, UnsupportedOperatorError를 발생시킨다', () => {
            it.each`
                operator | operand1 | operand2
                ${'%'}   | ${1}     | ${2}
                ${'^'}   | ${1}     | ${2}
                ${'**'}  | ${1}     | ${2}
            `(
                'calculate($operator, $operand1, $operand2)',
                ({ operator, operand1, operand2 }) => {
                    expect(() =>
                        calculate(operator, operand1, operand2),
                    ).toThrow(UnsupportedOperatorError);
                },
            );
        });
    });

    describe('연산 결과가 유효하지 않다면, 에러가 발생한다', () => {
        describe('결과가 NaN이라면, InvalidResultError를 발생시킨다', () => {
            it.each`
                operator | operand1 | operand2
                ${'/'}   | ${0}     | ${0}
            `(
                'calculate($operator, $operand1, $operand2)',
                ({ operator, operand1, operand2 }) => {
                    expect(() =>
                        calculate(operator, operand1, operand2),
                    ).toThrow(InvalidResultError);
                },
            );
        });
    });

    describe('비정상적인 연산이라면, "오류" 문자열을 반환한다', () => {
        it.each`
            operator | operand1 | operand2 | expected
            ${'/'}   | ${-1}    | ${0}     | ${'오류'}
            ${'/'}   | ${1}     | ${0}     | ${'오류'}
        `(
            '$operand1 $operator $operand2 = $expected',
            ({ operator, operand1, operand2, expected }) => {
                expect(calculate(operator, operand1, operand2)).toBe(expected);
            },
        );
    });

    describe('올바른 연산 결과를 반환한다', () => {
        it.each`
            operator | operand1 | operand2 | expected
            ${'+'}   | ${1}     | ${2}     | ${3}
            ${'-'}   | ${1}     | ${2}     | ${-1}
            ${'*'}   | ${2}     | ${3}     | ${6}
            ${'/'}   | ${6}     | ${2}     | ${3}
            ${'+'}   | ${'3'}   | ${'5'}   | ${8}
            ${'+'}   | ${-1}    | ${-2}    | ${-3}
            ${'+'}   | ${1.9}   | ${2.1}   | ${4}
            ${'+'}   | ${999}   | ${999}   | ${1998}
        `(
            '$operand1 $operator $operand2 = $expected',
            ({ operator, operand1, operand2, expected }) => {
                expect(calculate(operator, operand1, operand2)).toBe(expected);
            },
        );
    });

    describe('연산 결과를 정규화한 값을 반환한다', () => {
        it.each`
            operator | operand1 | operand2 | expected
            ${'*'}   | ${0}     | ${-1}    | ${0}
            ${'/'}   | ${10}    | ${3}     | ${3}
            ${'/'}   | ${7}     | ${-2}    | ${-3}
        `(
            '$operand1 $operator $operand2 = $expected',
            ({ operator, operand1, operand2, expected }) => {
                expect(calculate(operator, operand1, operand2)).toBe(expected);
            },
        );
    });
});
