import { operatorMapper } from './operation.js';
import {
    EmptyOperandValidationError,
    NotNumericTypeOperandValidationError,
    LongOperandValidationError,
    OperatorValidationError,
    ResultValidationError,
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

export const validateOperand = (operand) => {
    if (isEmpty(operand)) {
        throw new EmptyOperandValidationError();
    }

    if (!(isNumber(operand) || isNumberStyleString(operand))) {
        throw new NotNumericTypeOperandValidationError();
    }

    if (!isBelowDigits(operand, DECMINAL_POINT_LIMIT)) {
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
