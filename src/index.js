import calculate from './calculation.js';

/**
 * calculate(operator, operand1, operand2)
 * 두 개의 피연산자와 연산자를 입력받아 연산 결과를 반환한다.
 * type operators = '+' | '-' | '*' | '/';
 * type numberTypeString = number | string;
 * @param {operators} operator
 * @param {number|numberTypeString} operand1
 * @param {number|numberTypeString} operand2
 * @returns {number|string|undefined} 정상 결과(number), 비정상 연산('오류'), 유효성 에러(undefined)
 */
calculate('+', 1, 2); // 3
calculate('-', 1, 2); // -1
calculate('*', 1, 2); // 2
calculate('/', 6, 2); // 3
