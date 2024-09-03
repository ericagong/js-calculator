export class ValidationError extends Error {
    constructor(message) {
        super(message);
    }

    get message() {
        return this.message;
    }

    handle() {
        throw new Error('handle 함수를 구현해야 합니다.');
    }
}

export const INPUT_ERROR_MESSAGE = Object.freeze({
    EMPTY_OPERAND: '피연산자가 비어있습니다.',
    INVALID_OPERAND: '피연산자 형태가 유효하지 않습니다.',
    LONG_OPERAND: '피연산자가 입력 가능 자릿수를 초과하였습니다.',
    INVALID_OPERATOR: '연산자가 유효하지 않습니다.',
});
export class InputValidationError extends ValidationError {
    constructor(message) {
        super(`[InputValidationError] ${message}`);
    }

    handle() {
        console.error('사용자 입력이 잘못되었습니다. 다시 입력해주세요.');
    }
}

export const OUTPUT_ERROR_MESSAGE = Object.freeze({
    INVALID_RESULT: '계산 결과가 유효하지 않습니다.',
});
export class OutputValidationError extends ValidationError {
    constructor(message) {
        super(`[OutputValidationError] ${message}`);
    }

    handle() {
        console.error('계산 결과 오류');
    }
}
