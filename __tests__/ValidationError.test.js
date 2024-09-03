import {
    InputValidationError,
    INPUT_ERROR_MESSAGE,
    OutputValidationError,
    OUTPUT_ERROR_MESSAGE,
} from '../src/ValidationError.js';

describe('ValidationError 객체는 인스턴스 타입에 따라 handle 함수에서 다른 동작을 수행한다.', () => {
    describe('InputValidationError 인스턴스는 handle 함수에서 사용자 입력 오류 메시지를 Console.error로 출력한다.', () => {
        it.each([
            INPUT_ERROR_MESSAGE.EMPTY_OPERAND,
            INPUT_ERROR_MESSAGE.INVALID_OPERAND,
            INPUT_ERROR_MESSAGE.INVALID_OPERATOR,
        ])('error message: %p', (message) => {
            const spyFn = jest
                .spyOn(global.console, 'error')
                .mockImplementation(() => {});
            const validationError = new InputValidationError(message);
            validationError.handle();
            expect(spyFn).toHaveBeenCalledWith(validationError.message);
            spyFn.mockRestore();
        });
    });

    describe('OutputValidationError 인스턴스는 handle 함수에서 사용자 입력 오류 메시지를 Console.warn으로 출력한다.', () => {
        it(`error message: ${OUTPUT_ERROR_MESSAGE.INVALID_RESULT}`, () => {
            const spyFn = jest
                .spyOn(global.console, 'warn')
                .mockImplementation(() => {});
            const validationError = new OutputValidationError(
                OUTPUT_ERROR_MESSAGE.INVALID_RESULT,
            );
            validationError.handle();
            expect(spyFn).toHaveBeenCalledWith(validationError.message);
            spyFn.mockRestore();
        });
    });
});
