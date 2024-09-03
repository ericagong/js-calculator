import { operatorMapper } from './operation.js';
import {
    InputValidationError,
    OutputValidationError,
    INPUT_ERROR_MESSAGE,
    OUTPUT_ERROR_MESSAGE,
} from './ValidationError.js';

const isEmpty = (operand) => {
    return operand === '' || operand === null || operand === undefined;
};

const isNumber = (operand) => {
    return typeof operand === 'number';
};

const isNumberStyleString = (operand) => {
    return typeof operand === 'string' && !Number.isNaN(Number(operand));
};

export const DECMINAL_POINT_LIMIT = 3;
const isBelowDigits = (operand, digits) => {
    const integerPart = Math.trunc(Math.abs(operand));

    return integerPart.toString().length <= digits;
};

// FIXME: validation 함수와 오류 처리 함수 분리 방법 고민해 적용
export const isValidOperand = (operand) => {
    if (isEmpty(operand)) {
        throw new InputValidationError(INPUT_ERROR_MESSAGE.EMPTY_OPERAND);
    }

    if (!(isNumber(operand) || isNumberStyleString(operand))) {
        throw new InputValidationError(INPUT_ERROR_MESSAGE.INVALID_OPERAND);
    }

    if (!isBelowDigits(operand, DECMINAL_POINT_LIMIT)) {
        throw new InputValidationError(INPUT_ERROR_MESSAGE.LONG_OPERAND);
    }
};

export const isValidOperator = (operator) => {
    if (operatorMapper[operator] === undefined) {
        throw new InputValidationError(INPUT_ERROR_MESSAGE.INVALID_OPERATOR);
    }
};

// FIXME: 정상적인 userflow에서 발생할 수 없는 에러 감지 필요한지 고민
// FIXME: POSITIVE_INFINITY, NEGATIVE_INFINITY 처리 방법 고민
const POSTIVE_INFINITY = +Infinity;
const NEGATIVE_INFINITY = -Infinity;
export const isValidOutput = (output) => {
    if (
        Number.isNaN(output) ||
        output === POSTIVE_INFINITY ||
        output === NEGATIVE_INFINITY
    ) {
        throw new OutputValidationError(OUTPUT_ERROR_MESSAGE.INVALID_RESULT);
    }
};
