import {
    isValidOperand,
    isValidOperator,
    isValidOutput,
} from './validation.js';
import { operate } from './operation.js';
import { removeDecimalAndSignAdjust } from './nomalize.js';
import { ValidationError } from './ValidationError.js';

export default class Calculator {
    calculate(operator, operand1, operand2) {
        try {
            isValidOperand(operand1);
            isValidOperand(operand2);
            isValidOperator(operator);

            const output = operate(operator, operand1, operand2);

            isValidOutput(output);

            return removeDecimalAndSignAdjust(output);
        } catch (e) {
            if (e instanceof ValidationError) {
                e.handle();
            }
            return e.message;
        }
    }
}
