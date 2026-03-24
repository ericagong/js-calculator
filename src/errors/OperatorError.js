import { ApplicationError } from './ApplicationError.js';
import { AbstractClassError } from './AbstractClassError.js';

export class OperatorError extends ApplicationError {
    constructor(message) {
        if (new.target === OperatorError) {
            throw new AbstractClassError(new.target.name);
        }
        super(message);
    }
}

export class EmptyOperatorError extends OperatorError {
    constructor() {
        super('연산자가 비어있습니다.');
    }
}

export class UnsupportedOperatorError extends OperatorError {
    constructor() {
        super('지원하는 연산자가 아닙니다.');
    }
}
