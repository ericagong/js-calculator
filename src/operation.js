const OPERATORS = Object.freeze({
    ADD: '+',
    SUBTRACT: '-',
    MULTIPLY: '*',
    DIVIDE: '/',
});

export const operatorMapper = Object.freeze({
    [OPERATORS.ADD]: (a, b) => a + b,
    [OPERATORS.SUBTRACT]: (a, b) => a - b,
    [OPERATORS.MULTIPLY]: (a, b) => a * b,
    [OPERATORS.DIVIDE]: (a, b) => a / b,
});

export const operate = (operator, operand1, operand2) => {
    return operatorMapper[operator](operand1, operand2);
};
