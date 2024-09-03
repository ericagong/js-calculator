export class ValidationError extends Error {
    constructor(message) {
        super(message);
    }

    get message() {
        return this.message;
    }

    /**
     * ValidationError 인스턴스를 상속받는 클래스는 handle 함수를 구현해야 합니다.
     * handle 함수는 ValidationError 인스턴스 에러를 처리하는 방법을 정의합니다.
     * 예를 들어, InputValidationError 인스턴스는 handle 함수에서 Console.error로 에러 메시지를 출력합니다.
     * ValidationError 인스턴스를 상속받는 클래스는 이를 통해 유연하게 에러를 처리할 수 있습니다.
     */
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
        console.error(this.message);
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
        console.warn(this.message);
    }
}
