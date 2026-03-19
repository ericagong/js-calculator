import { operatorMapper } from './operation.js';
import {
    EmptyOperandValidationError,
    NotNumericTypeOperandValidationError,
    LongOperandValidationError,
    OperatorValidationError,
    ResultValidationError,
} from './ValidationError.js';

const isEmpty = (operand) =>
    operand === '' || operand === null || operand === undefined;

const isBlank = (operand) =>
    typeof operand === 'string' && operand.trim() === '';

const isNumber = (operand) => typeof operand === 'number';

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
        throw new EmptyOperandValidationError();
    }

    if (!isNumericType(operand)) {
        throw new NotNumericTypeOperandValidationError();
    }

    if (!isWithinDigitLimit(operand, MAX_INTEGER_DIGIT_COUNT)) {
        throw new LongOperandValidationError();
    }
};

export const validateOperator = (operator) => {
    if (operatorMapper[operator] === undefined) {
        throw new OperatorValidationError();
    }
};

export const validateResult = (result) => {
    if (Number.isNaN(result)) {
        throw new ResultValidationError();
    }
};
