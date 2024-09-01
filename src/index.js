const POSTIVE_INFINITY = +Infinity;
const NEGATIVE_INFINITY = -Infinity;

export default class Calculator {
    static ERROR_MESSAGE = '오류';

    add(operand1, operand2) {
        return operand1 + operand2;
    }

    subtarct(operand1, operand2) {
        return operand1 - operand2;
    }

    multiply(operand1, operand2) {
        return operand1 * operand2;
    }

    divide(operand1, operand2) {
        return operand1 / operand2;
    }

    display(result) {
        if (
            Number.isNaN(result) ||
            result === POSTIVE_INFINITY ||
            result === NEGATIVE_INFINITY
        ) {
            return Calculator.ERROR_MESSAGE;
        }

        const truncResult = Math.trunc(result);

        if (Object.is(truncResult, -0)) {
            return 0;
        }

        return truncResult;
    }
}
