import {
    isValidOperand,
    isValidOperator,
    isValidOutput,
} from './validation.js';
import { operate } from './operation.js';

// TODO private, public 메소드 구분
export default class Calculator {
    adjustOutput(output) {
        const integerPart = Math.trunc(output);

        if (Object.is(integerPart, -0)) {
            return 0;
        }

        return integerPart;
    }

    calculate(operator, operand1, operand2) {
        try {
            isValidOperand(operand1);
            isValidOperand(operand2);
            isValidOperator(operator);
            const output = operate(operator, operand1, operand2);
            isValidOutput(output);
            return this.adjustOutput(output);
        } catch (e) {
            return e.message;
        }
    }
}
