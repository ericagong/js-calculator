const OPERATORS = Object.freeze({
    ADD: '+',
    SUBTRACT: '-',
    MULTIPLY: '*',
    DIVIDE: '/',
});

const OPERATOR_MAPPER = Object.freeze({
    [OPERATORS.ADD]: (a, b) => a + b,
    [OPERATORS.SUBTRACT]: (a, b) => a - b,
    [OPERATORS.MULTIPLY]: (a, b) => a * b,
    [OPERATORS.DIVIDE]: (a, b) => a / b,
});

export const isSupportedOperator = (operator) =>
    OPERATOR_MAPPER[operator] !== undefined;

export const operate = (operator, operand1, operand2) => {
    return OPERATOR_MAPPER[operator](operand1, operand2);
};
