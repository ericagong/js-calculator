import {
    validateOperand,
    validateOperator,
    validateResult,
} from './validation.js';
import { operate } from './operation.js';
import { go } from './utils/utils.js';
import { normalize } from './normalization.js';
import { ValidationError } from './ValidationError.js';

const validateOperands = (operand1, operand2) => {
    validateOperand(operand1);
    validateOperand(operand2);
};

// Error 처리 로직 변경 시 handleError 함수만 수정하면 됨
export const handleError = (e) => {
    if (e instanceof ValidationError) {
        // console.error('에러 타입:', e.name);
        // console.error('에러 메시지:', e.message);
        // console.error('스택 트레이스:', e.stack);
    }
    // console.error('알 수 없는 에러가 발생했습니다.');
};

export default function calculate(operator, operand1, operand2) {
    try {
        validateOperands(operand1, operand2);
        validateOperator(operator);

        const result = operate(operator, operand1, operand2);

        return go(result, validateResult, normalize);
    } catch (e) {
        // handleError 함수에서 Error 처리 로직 담당
        // 혹은 나중에 Error 객체나 메시지를 UI 객체에 전달해 에러 메시지 출력 등에 대한 책임 위임 가능
        handleError(e);
    }
}
