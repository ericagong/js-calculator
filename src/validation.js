import { operatorMapper } from './operation.js';

const POSTIVE_INFINITY = +Infinity;
const NEGATIVE_INFINITY = -Infinity;
export const DECMINAL_POINT_LIMIT = 3;

export const ERROR_MESSAGE = Object.freeze({
    EMPTY_OPERAND: '피연산자가 비어있습니다.',
    INVALID_OPERAND: '피연산자 형태가 유효하지 않습니다.',
    LONG_OPERAND: '피연산자가 입력 가능 자릿수를 초과하였습니다.',
    INVALID_RESULT: '계산 결과가 유효하지 않습니다.',
});

const isEmpty = (operand) => {
    return operand === '' || operand === null || operand === undefined;
};

const isNumber = (operand) => {
    return typeof operand === 'number';
};

const isNumberStyleString = (operand) => {
    return typeof operand === 'string' && !Number.isNaN(Number(operand));
};

const isBelowDigits = (operand, digits) => {
    const integerPart = Math.trunc(Math.abs(operand));

    return integerPart.toString().length <= digits;
};

export const isValidOperand = (operand) => {
    if (isEmpty(operand)) {
        throw new Error(ERROR_MESSAGE.EMPTY_OPERAND);
    }

    if (!(isNumber(operand) || isNumberStyleString(operand))) {
        throw new Error(ERROR_MESSAGE.INVALID_OPERAND);
    }

    if (!isBelowDigits(operand, DECMINAL_POINT_LIMIT)) {
        throw new Error(ERROR_MESSAGE.LONG_OPERAND);
    }
};

export const isValidOperator = (operator) => {
    if (operatorMapper[operator] === undefined) {
        throw new Error(ERROR_MESSAGE.INVALID_OPERAND);
    }
};

export const isValidOutput = (output) => {
    if (
        Number.isNaN(output) ||
        output === POSTIVE_INFINITY ||
        output === NEGATIVE_INFINITY
    ) {
        throw new Error(ERROR_MESSAGE.INVALID_RESULT);
    }
};
