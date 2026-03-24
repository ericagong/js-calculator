import calculate from './calculation.js';
import { ApplicationError } from './errors/ApplicationError.js';

const UNKNOWN_ERROR_MESSAGE = '알 수 없는 에러가 발생했습니다.';

const handleError = (e) => {
    if (e instanceof ApplicationError) {
        console.error('에러 타입:', e.name);
        console.error('에러 메시지:', e.message);
        console.error('스택 트레이스:', e.stack);
    } else {
        console.error(UNKNOWN_ERROR_MESSAGE);
    }
};

/**
 * calculate(operator, operand1, operand2)
 * 두 개의 피연산자와 연산자를 입력받아 연산 결과를 반환한다.
 * type operators = '+' | '-' | '*' | '/';
 * type numberTypeString = number | string;
 * @param {operators} operator
 * @param {number|numberTypeString} operand1
 * @param {number|numberTypeString} operand2
 * @returns {number|string} 정상 결과(number), 비정상 연산('오류')
 */
try {
    calculate('+', 1, 2); // 3
    calculate('-', 1, 2); // -1
    calculate('*', 1, 2); // 2
    calculate('/', 6, 2); // 3
} catch (e) {
    handleError(e);
}
