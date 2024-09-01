export default class Calculator {
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
            result === +Infinity ||
            result === -Infinity
        ) {
            return '오류';
        }

        if (Object.is(result, -0)) {
            return 0;
        }

        return Math.trunc(result);
    }
}
