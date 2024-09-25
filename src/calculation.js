import {
    validateOperand,
    validateOperator,
    validateResult,
} from './validation.js';
import { operate } from './operation.js';
import { removeDecimalAndSignAdjust } from './normalization.js';
import { ValidationError } from './ValidationError.js';

export default function calculate(operator, operand1, operand2) {
    try {
        validateOperand(operand1);
        validateOperand(operand2);
        validateOperator(operator);

        const output = operate(operator, operand1, operand2);

        validateResult(output);

        return removeDecimalAndSignAdjust(output);
    } catch (e) {
        if (e instanceof ValidationError) {
            // UI 담당 객체에게 Error 관련 정보를 전달하거나
            // 에러 처리 로직을 작성할 수 있는 부분
            // 에러 타입: InvalidOperandValidationError
            // 에러 메시지: 피연산자 오류: 피연산자가 숫자나 문자열 형태의 숫자가 아닙니다.
            // 스택 트레이스: InvalidOperandValidationError: 피연산자 오류: 피연산자가 숫자나 문자열 형태의 숫자가 아닙니다.
            //     at Object.<anonymous> (/path/to/file.js:10:11)
            //     at Module._compile (internal/modules/cjs/loader.js:678:30)
            //     ...
            console.error('에러 타입:', e.name);
            console.error('에러 메시지:', e.message);
            console.error('스택 트레이스:', e.stack);
        }
        return e.message;
    }
}
