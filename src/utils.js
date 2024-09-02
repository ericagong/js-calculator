export const isEmpty = (operand) => {
    return operand === '' || operand === null || operand === undefined;
};

export const isNumber = (operand) => {
    return typeof operand === 'number';
};

export const isStringNumber = (operand) => {
    return typeof operand === 'string' && !Number.isNaN(Number(operand));
};

export const isBelowDigits = (operand, digits) => {
    const integerPart = Math.trunc(Math.abs(operand));

    return integerPart.toString().length <= digits;
};
