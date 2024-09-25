export class ValidationError extends Error {
    constructor(type, message) {
        super(`${type} 오류: ${message}`);
        // CustomError 이름을 생성자 이름으로 설정
        this.name = this.constructor.name;
    }
}

export class OperandValidationError extends ValidationError {
    constructor(message) {
        super('피연산자', message);
    }
}

export class EmptyOperandValidationError extends OperandValidationError {
    constructor() {
        super('피연산자가 비어있습니다.');
    }
}

export class NotNumericTypeOperandValidationError extends OperandValidationError {
    constructor() {
        super('피연산자가 숫자나 문자열 형태의 숫자가 아닙니다.');
    }
}

export class LongOperandValidationError extends OperandValidationError {
    constructor() {
        super('피연산자가 세 자리를 초과하였습니다.');
    }
}

export class OperatorValidationError extends ValidationError {
    constructor() {
        super('연산자', '연산자가 +, -, *, /가 아닙니다.');
    }
}

export class ResultValidationError extends ValidationError {
    constructor() {
        super('연산 결과', '연산 결과가 올바르지 않습니다.');
    }
}
