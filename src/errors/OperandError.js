import { ApplicationError } from './ApplicationError.js';
import { AbstractClassError } from './AbstractClassError.js';

export class OperandError extends ApplicationError {
    constructor(message) {
        if (new.target === OperandError) {
            throw new AbstractClassError(new.target.name);
        }
        super(message);
    }
}

export class EmptyOperandError extends OperandError {
    constructor() {
        super('피연산자가 비어있습니다.');
    }
}

export class NonNumericOperandError extends OperandError {
    constructor() {
        super('피연산자가 숫자나 문자열 형태의 숫자가 아닙니다.');
    }
}

export class TooLongOperandError extends OperandError {
    constructor() {
        super('피연산자가 세 자리를 초과하였습니다.');
    }
}
