import { isEmpty, isNumber, isStringNumber, isBelowDigits } from './utils';

const POSTIVE_INFINITY = +Infinity;
const NEGATIVE_INFINITY = -Infinity;

const OPERATORS = Object.freeze({
    ADD: '+',
    SUBTRACT: '-',
    MULTIPLY: '*',
    DIVIDE: '/',
});

const operatorMapper = {
    [OPERATORS.ADD]: (a, b) => a + b,
    [OPERATORS.SUBTRACT]: (a, b) => a - b,
    [OPERATORS.MULTIPLY]: (a, b) => a * b,
    [OPERATORS.DIVIDE]: (a, b) => a / b,
};

export const ERROR_MESSAGE = Object.freeze({
    EMPTY_OPERAND: '피연산자가 비어있습니다.',
    INVALID_OPERAND: '피연산자 형태가 유효하지 않습니다.',
    LONG_OPERAND: '피연산자가 입력 가능 자릿수를 초과하였습니다.',
    INVALID_RESULT: '계산 결과가 유효하지 않습니다.',
});

export default class Calculator {
    static DECMINAL_POINT_LIMIT = 3;

    validateOperands(operand1, operand2) {
        if (isEmpty(operand1) || isEmpty(operand2)) {
            throw new Error(ERROR_MESSAGE.EMPTY_OPERAND);
        }

        if (
            !(isNumber(operand1) || isStringNumber(operand1)) ||
            !(isNumber(operand2) || isStringNumber(operand2))
        ) {
            throw new Error(ERROR_MESSAGE.INVALID_OPERAND);
        }

        if (
            !isBelowDigits(operand1, Calculator.DECMINAL_POINT_LIMIT) ||
            !isBelowDigits(operand2, Calculator.DECMINAL_POINT_LIMIT)
        ) {
            throw new Error(ERROR_MESSAGE.LONG_OPERAND);
        }
    }

    validateOperator(operator) {
        if (operatorMapper[operator] === undefined) {
            throw new Error(ERROR_MESSAGE.INVALID_OPERAND);
        }
    }

    operate(operator, operand1, operand2) {
        return operatorMapper[operator](operand1, operand2);
    }

    validateOutput(output) {
        if (
            Number.isNaN(output) ||
            output === POSTIVE_INFINITY ||
            output === NEGATIVE_INFINITY
        ) {
            throw new Error(ERROR_MESSAGE.INVALID_RESULT);
        }
    }

    adjustOutput(output) {
        const integerPart = Math.trunc(output);

        if (Object.is(integerPart, -0)) {
            return 0;
        }

        return integerPart;
    }

    calculate(operator, operand1, operand2) {
        this.validateOperands(operand1, operand2);
        this.validateOperator(operator);
        const output = this.operate(operator, operand1, operand2);
        this.validateOutput(output);
        return this.adjustOutput(output);
    }
}
