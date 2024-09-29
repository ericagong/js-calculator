import calculate from '../src/calculation.js';
import * as validation from '../src/validation.js';
import * as operation from '../src/operation.js';
import * as normalization from '../src/normalization.js';
import * as utils from '../src/utils/utils.js';

jest.mock('../src/validation');
jest.mock('../src/operation');
jest.mock('../src/normalization');
jest.mock('../src/utils/utils');

beforeEach(() => {
    jest.clearAllMocks();
});

// TODO calculate 함수에 대한 예외 케이스 테스트를 작성
describe('정상적인 연산이 수행되는 경우', () => {
    it.each`
        operator | operand1 | operand2 | result
        ${'+'}   | ${1}     | ${30}    | ${31}
        ${'-'}   | ${1}     | ${30}    | ${-29}
        ${'*'}   | ${1}     | ${30}    | ${30}
        ${'/'}   | ${30}    | ${1}     | ${30}
    `(
        '$operand1 $operator $operand2 = $result',
        ({ operator, operand1, operand2, result }) => {
            validation.validateOperand.mockImplementation(() => {});
            validation.validateOperator.mockImplementation(() => {});
            operation.operate.mockReturnValue(result);
            normalization.normalize.mockReturnValue(result);

            utils.go.mockImplementation((res, validateFn, adjustFn) => {
                validateFn(res);
                return adjustFn(res);
            });

            const calculatedResult = calculate(operator, operand1, operand2);

            expect(validation.validateOperand).toHaveBeenCalledWith(operand1);
            expect(validation.validateOperand).toHaveBeenCalledWith(operand2);
            expect(validation.validateOperator).toHaveBeenCalledWith(operator);
            expect(operation.operate).toHaveBeenCalledWith(
                operator,
                operand1,
                operand2,
            );
            expect(calculatedResult).toBe(result);
        },
    );
});
