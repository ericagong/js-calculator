import {
    validateOperand,
    validateOperator,
    validateResult,
} from './validation.js';
import { operate } from './operation.js';
import { normalize } from './normalization.js';
import { ApplicationError } from './errors/ApplicationError.js';

const UNKNOWN_ERROR_MESSAGE = '알 수 없는 에러가 발생했습니다.';

export const handleError = (e) => {
    if (e instanceof ApplicationError) {
        console.error('에러 타입:', e.name);
        console.error('에러 메시지:', e.message);
        console.error('스택 트레이스:', e.stack);
    } else {
        console.error(UNKNOWN_ERROR_MESSAGE);
    }
};

export default function calculate(operator, operand1, operand2) {
    try {
        validateOperand(operand1);
        validateOperand(operand2);
        validateOperator(operator);

        const result = operate(operator, Number(operand1), Number(operand2));

        validateResult(result);
        return normalize(result);
    } catch (e) {
        // 현재 ApplicationError 일괄 console.error 처리
        // 향후 Error 타입(OperandError, OperatorError, ResultError)에 따라 에러 분기 처리 가능
        handleError(e);
        return undefined;
    }
}
