import { isEmpty, isNumber, isStringNumber, isBelowDigits } from './utils';
const POSTIVE_INFINITY = +Infinity;
const NEGATIVE_INFINITY = -Infinity;

export const ERROR_MESSAGE = Object.freeze({
    EMPTY_OPERAND: '피연산자가 비어있습니다.',
    INVALID_OPERAND: '피연산자 형태가 유효하지 않습니다.',
    LONG_OPERAND: '피연산자가 입력 가능 자릿수를 초과하였습니다.',
    INVALID_RESULT: '계산 결과가 유효하지 않습니다.',
});

const OPERATIONS = Object.freeze({
    ADD: '+',
    SUBTRACT: '-',
    MULTIPLY: '*',
    DIVIDE: '/',
});

export default class Calculator {
    static DECMINAL_POINT_LIMIT = 3;

    validate(operand1, operand2) {
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

    calculate(operator, operand1, operand2) {
        switch (operator) {
            case OPERATIONS.ADD:
                return operand1 + operand2;
            case OPERATIONS.SUBTRACT:
                return operand1 - operand2;
            case OPERATIONS.MULTIPLY:
                return operand1 * operand2;
            case OPERATIONS.DIVIDE:
                return operand1 / operand2;
            default:
                throw new Error(ERROR_MESSAGE.INVALID_OPERAND);
        }
    }

    adjustResult(result) {
        if (
            Number.isNaN(result) ||
            result === POSTIVE_INFINITY ||
            result === NEGATIVE_INFINITY
        ) {
            throw new Error(ERROR_MESSAGE.INVALID_RESULT);
        }

        const truncResult = Math.trunc(result);

        if (Object.is(truncResult, -0)) {
            return 0;
        }

        return truncResult;
    }
}
