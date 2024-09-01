const POSTIVE_INFINITY = +Infinity;
const NEGATIVE_INFINITY = -Infinity;

const INVALID_OPERAND = '피연산자 형태가 유효하지 않습니다.';
const EMPTY_OPERAND = '피연산자가 비어있습니다.';
const LONG_OPERAND = '피연산자가 입력 가능 자릿수를 초과하였습니다.';
const INVALID_RESULT = '계산 결과가 유효하지 않습니다.';

export const ERROR_MESSAGE = {
    EMPTY_OPERAND,
    INVALID_OPERAND,
    LONG_OPERAND,
    INVALID_RESULT,
};

export default class Calculator {
    static ERROR_MESSAGE = '오류';

    #validate(operand) {
        if (operand === '' || operand === null || operand === undefined) {
            throw new Error(ERROR_MESSAGE.EMPTY_OPERAND);
        }

        if (typeof operand !== 'number' && typeof operand !== 'string') {
            throw new Error(ERROR_MESSAGE.INVALID_OPERAND);
        } else if (isNaN(operand)) {
            throw new Error(ERROR_MESSAGE.INVALID_OPERAND);
        }

        if (operand.toString().length >= 4) {
            throw new Error(ERROR_MESSAGE.LONG_OPERAND);
        }
    }

    validate(operand1, operand2) {
        this.#validate(operand1);
        this.#validate(operand2);
    }

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
