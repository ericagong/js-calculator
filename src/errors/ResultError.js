import { ApplicationError } from './ApplicationError.js';
import { AbstractClassError } from './AbstractClassError.js';

export class ResultError extends ApplicationError {
    constructor(message) {
        if (new.target === ResultError) {
            throw new AbstractClassError(new.target.name);
        }
        super(message);
    }
}

export class InvalidResultError extends ResultError {
    constructor() {
        super('연산 결과가 올바르지 않습니다.');
    }
}
