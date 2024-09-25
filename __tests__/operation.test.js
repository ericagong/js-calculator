import { operate } from '../src/operation.js';

// TODO mapping 테스트로 변경해야하는 것이 아닌지 고민
describe('[Feature2] 피연산자 두 개와 연산자 하나의 연산 결과를 생성한다.', () => {
    describe('두 개의 피연산자에 대해 덧셈 결과를 생성한다.', () => {
        it.each([
            { operand1: 1, operand2: 30 },
            { operand1: -1, operand2: 30 },
            { operand1: 1, operand2: -30 },
            { operand1: -1, operand2: -30 },
        ])(`operate(+, $operand1, $operand2)`, ({ operand1, operand2 }) => {
            expect(operate('+', operand1, operand2)).toBe(operand1 + operand2);
        });
    });

    describe('두 개의 피연산자에 대해 뺄셈 결과를 생성한다.', () => {
        it.each([
            { operand1: 1, operand2: 30 },
            { operand1: -1, operand2: 30 },
            { operand1: 1, operand2: -30 },
            { operand1: -1, operand2: -30 },
        ])(`operate('-', $operand1, $operand2)`, ({ operand1, operand2 }) => {
            expect(operate('-', operand1, operand2)).toBe(operand1 - operand2);
        });
    });

    describe('두 개의 피연산자에 대해 곱셈 결과를 생성한다.', () => {
        it.each([
            { operand1: 1, operand2: 30 },
            { operand1: -1, operand2: 30 },
            { operand1: 1, operand2: -30 },
            { operand1: -1, operand2: -30 },
        ])(`operate('*', $operand1, $operand2)`, ({ operand1, operand2 }) => {
            expect(operate('*', operand1, operand2)).toBe(operand1 * operand2);
        });
    });

    describe('두 개의 피연산자에 대해 나눗셈 결과를 생성한다.', () => {
        it.each([
            { operand1: 1, operand2: 30 },
            { operand1: -1, operand2: 30 },
            { operand1: 1, operand2: -30 },
            { operand1: -1, operand2: -30 },
        ])(`operate('/', $operand1, $operand2)`, ({ operand1, operand2 }) => {
            expect(operate('/', operand1, operand2)).toBe(operand1 / operand2);
        });

        describe('피연산자 중 0이 있는 경우, 올바른 나눗셈 결과를 생성한다.', () => {
            describe('첫 번째 피연산자만 0인 경우, 0을 생성한다.', () => {
                it.each([
                    { operand1: +0, operand2: 30 },
                    { operand1: +0, operand2: -30 },
                    { operand1: -0, operand2: 30 },
                    { operand1: -0, operand2: -30 },
                ])(
                    `operate('/', $operand1, $operand2) = 0`,
                    ({ operand1, operand2 }) => {
                        expect(operate('/', operand1, operand2)).toBe(
                            operand1 / operand2,
                        );
                    },
                );
            });

            describe('두 번째 피연산자만 0인 경우, 연산자 부호 동일성 여부에 따라 Infinity/-Infinity를 생성한다.', () => {
                it.each([
                    { operand1: 30, operand2: +0 },
                    { operand1: -30, operand2: -0 },
                ])(
                    `operate('/', $operand1, $operand2) = +Infinity`,
                    ({ operand1, operand2 }) => {
                        expect(operate('/', operand1, operand2)).toBe(Infinity);
                    },
                );

                it.each([
                    { operand1: 30, operand2: -0 },
                    { operand1: -30, operand2: +0 },
                ])(
                    `operate('/', $operand1, $operand2) = -Infinity`,
                    ({ operand1, operand2 }) => {
                        expect(operate('/', operand1, operand2)).toBe(
                            -Infinity,
                        );
                    },
                );
            });

            describe('두 피연산자가 모두 0인 경우, NaN을 생성한다.', () => {
                it.each([
                    { operand1: +0, operand2: +0 },
                    { operand1: +0, operand2: -0 },
                    { operand1: -0, operand2: +0 },
                    { operand1: -0, operand2: -0 },
                ])(
                    `operate('/', $operand1, $operand2) = NaN`,
                    ({ operand1, operand2 }) => {
                        expect(operate('/', operand1, operand2)).toBeNaN();
                    },
                );
            });
        });
    });
});
