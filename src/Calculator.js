import {
    isValidOperand,
    isValidOperator,
    isValidOutput,
} from './validation.js';
import { operate } from './operation.js';
import { ValidationError } from './ValidationError.js';

// FIXME: _adjustOutput private method 테스트 방법 고민 필요
export default class Calculator {
    _adjustOutput(output) {
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

            return this._adjustOutput(output);
        } catch (e) {
            if (e instanceof ValidationError) {
                e.handle();
            }
            return e.message;
        }
    }
}
