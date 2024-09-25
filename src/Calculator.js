import {
    validateOperand,
    validateOperator,
    validateResult,
} from './validation.js';
import { operate } from './operation.js';
import { removeDecimalAndSignAdjust } from './nomalize.js';
import { ValidationError } from './ValidationError.js';

export default class Calculator {
    calculate(operator, operand1, operand2) {
        try {
            validateOperand(operand1);
            validateOperand(operand2);
            validateOperator(operator);

            const output = operate(operator, operand1, operand2);

            validateResult(output);

            return removeDecimalAndSignAdjust(output);
        } catch (e) {
            if (e instanceof ValidationError) {
                e.handle();
            }
            return e.message;
        }
    }
}
