import { AbstractClassError } from '../src/errors/AbstractClassError.js';
import { ApplicationError } from '../src/errors/ApplicationError.js';
import { OperandError } from '../src/errors/OperandError.js';
import { OperatorError } from '../src/errors/OperatorError.js';
import { ResultError } from '../src/errors/ResultError.js';

describe('추상 클래스 직접 인스턴스화 방어', () => {
    it('ApplicationError를 직접 생성하면 AbstractClassError가 발생한다', () => {
        expect(() => new ApplicationError('test')).toThrow(AbstractClassError);
    });

    it('OperandError를 직접 생성하면 AbstractClassError가 발생한다', () => {
        expect(() => new OperandError('test')).toThrow(AbstractClassError);
    });

    it('OperatorError를 직접 생성하면 AbstractClassError가 발생한다', () => {
        expect(() => new OperatorError('test')).toThrow(AbstractClassError);
    });

    it('ResultError를 직접 생성하면 AbstractClassError가 발생한다', () => {
        expect(() => new ResultError('test')).toThrow(AbstractClassError);
    });
});
