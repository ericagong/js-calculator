import {
    validateOperand,
    validateOperator,
    validateResult,
} from './validation.js';
import { operate } from './operation.js';
import { normalize } from './normalization.js';

export default function calculate(operator, operand1, operand2) {
    validateOperand(operand1);
    validateOperand(operand2);
    validateOperator(operator);

    const result = operate(operator, Number(operand1), Number(operand2));

    validateResult(result);
    return normalize(result);
}
