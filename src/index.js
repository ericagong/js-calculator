const POSTIVE_INFINITY = +Infinity;
const NEGATIVE_INFINITY = -Infinity;

export const ERROR_MESSAGE = Object.freeze({
    EMPTY_OPERAND: '피연산자가 비어있습니다.',
    INVALID_OPERAND: '피연산자 형태가 유효하지 않습니다.',
    LONG_OPERAND: '피연산자가 입력 가능 자릿수를 초과하였습니다.',
    INVALID_RESULT: '계산 결과가 유효하지 않습니다.',
});

const OPERATIONS = Object.freeze({
    ADD: '+',
    SUBTRACT: '-',
    MULTIPLY: '*',
    DIVIDE: '/',
});

export default class Calculator {
    static DECMINAL_POINT_LIMIT = 3;

    #isEmpty(operand) {
        return operand === '' || operand === null || operand === undefined;
    }

    #isNumberOrStringNumber(operand) {
        if (typeof operand === 'number') return true;
        if (typeof operand === 'string' && !isNaN(operand)) return true;
    }

    #isBelow3Digits(operand) {
        const integer = Math.trunc(Math.abs(operand));
        return integer.toString().length <= Calculator.DECMINAL_POINT_LIMIT;
    }

    validate(operand1, operand2) {
        if (this.#isEmpty(operand1) || this.#isEmpty(operand2)) {
            throw new Error(ERROR_MESSAGE.EMPTY_OPERAND);
        }

        if (
            !this.#isNumberOrStringNumber(operand1) ||
            !this.#isNumberOrStringNumber(operand2)
        ) {
            throw new Error(ERROR_MESSAGE.INVALID_OPERAND);
        }

        if (
            !this.#isBelow3Digits(operand1) ||
            !this.#isBelow3Digits(operand2)
        ) {
            throw new Error(ERROR_MESSAGE.LONG_OPERAND);
        }
    }

    calculate(operator, operand1, operand2) {
        switch (operator) {
            case OPERATIONS.ADD:
                return this.#add(operand1, operand2);
            case OPERATIONS.SUBTRACT:
                return this.#subtarct(operand1, operand2);
            case OPERATIONS.MULTIPLY:
                return this.#multiply(operand1, operand2);
            case OPERATIONS.DIVIDE:
                return this.#divide(operand1, operand2);
            default:
                throw new Error(ERROR_MESSAGE.INVALID_OPERAND);
        }
    }

    #add(operand1, operand2) {
        return operand1 + operand2;
    }

    #subtarct(operand1, operand2) {
        return operand1 - operand2;
    }

    #multiply(operand1, operand2) {
        return operand1 * operand2;
    }

    #divide(operand1, operand2) {
        return operand1 / operand2;
    }

    adjustResult(result) {
        if (
            Number.isNaN(result) ||
            result === POSTIVE_INFINITY ||
            result === NEGATIVE_INFINITY
        ) {
            throw new Error(ERROR_MESSAGE.INVALID_RESULT);
        }

        const truncResult = Math.trunc(result);

        if (Object.is(truncResult, -0)) {
            return 0;
        }

        return truncResult;
    }
}
