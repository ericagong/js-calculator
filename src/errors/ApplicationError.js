import { AbstractClassError } from './AbstractClassError.js';

export class ApplicationError extends Error {
    constructor(message) {
        if (new.target === ApplicationError) {
            throw new AbstractClassError(new.target.name);
        }
        super(message);
        this.name = this.constructor.name;
    }
}
