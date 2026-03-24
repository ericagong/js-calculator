import { isSupportedOperator } from './operation.js';
import {
    EmptyOperandError,
    NonNumericOperandError,
    TooLongOperandError,
} from './errors/OperandError.js';
import {
    EmptyOperatorError,
    UnsupportedOperatorError,
} from './errors/OperatorError.js';
import { InvalidResultError } from './errors/ResultError.js';

const isEmpty = (value) =>
    value === '' || value === null || value === undefined;

const isBlank = (value) => typeof value === 'string' && value.trim() === '';

const isNumber = (operand) =>
    typeof operand === 'number' && !Number.isNaN(operand);

const isNumericString = (operand) =>
    typeof operand === 'string' && !Number.isNaN(Number(operand));

const isNumericType = (operand) =>
    isNumber(operand) || isNumericString(operand);

const isWithinDigitLimit = (operand, maxDigits) => {
    const integerPart = Math.trunc(Math.abs(operand));

    return integerPart.toString().length <= maxDigits;
};

export const MAX_INTEGER_DIGIT_COUNT = 3;
export const validateOperand = (operand) => {
    if (isEmpty(operand) || isBlank(operand)) {
        throw new EmptyOperandError();
    }

    if (!isNumericType(operand)) {
        throw new NonNumericOperandError();
    }

    if (!isWithinDigitLimit(operand, MAX_INTEGER_DIGIT_COUNT)) {
        throw new TooLongOperandError();
    }
};

export const validateOperator = (operator) => {
    if (isEmpty(operator) || isBlank(operator)) {
        throw new EmptyOperatorError();
    }

    if (!isSupportedOperator(operator)) {
        throw new UnsupportedOperatorError();
    }
};

export const validateResult = (result) => {
    if (Number.isNaN(result)) {
        throw new InvalidResultError();
    }
};
