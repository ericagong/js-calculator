import Calculator from '../src';

describe('[Feature2] 피연산자 두 개와 연산자 하나의 연산 결과를 반환한다.', () => {
    const calculator = new Calculator();

    describe('두 개의 피연산자에 대해 덧셈 결과를 반환한다.', () => {
        it.each([
            { operand1: 1, operand2: 30 },
            { operand1: -1, operand2: 30 },
            { operand1: 1, operand2: -30 },
            { operand1: -1, operand2: -30 },
        ])(`calculator.add($operand1, $operand2)`, ({ operand1, operand2 }) => {
            expect(calculator.add(operand1, operand2)).toBe(
                operand1 + operand2,
            );
        });
    });

    describe('두 개의 피연산자에 대해 뺄셈 결과를 반환한다.', () => {
        it.each([
            { operand1: 1, operand2: 30 },
            { operand1: -1, operand2: 30 },
            { operand1: 1, operand2: -30 },
            { operand1: -1, operand2: -30 },
        ])(
            `calculator.subtract($operand1, $operand2)`,
            ({ operand1, operand2 }) => {
                expect(calculator.subtarct(operand1, operand2)).toBe(
                    operand1 - operand2,
                );
            },
        );
    });

    describe('두 개의 피연산자에 대해 곱셈 결과를 반환한다.', () => {
        it.each([
            { operand1: 1, operand2: 30 },
            { operand1: -1, operand2: 30 },
            { operand1: 1, operand2: -30 },
            { operand1: -1, operand2: -30 },
        ])(
            `calculator.multiply($operand1, $operand2)`,
            ({ operand1, operand2 }) => {
                expect(calculator.multiply(operand1, operand2)).toBe(
                    operand1 * operand2,
                );
            },
        );
    });

    describe('두 개의 피연산자에 대해 나눗셈 결과를 반환한다.', () => {
        it.each([
            { operand1: 1, operand2: 30 },
            { operand1: -1, operand2: 30 },
            { operand1: 1, operand2: -30 },
            { operand1: -1, operand2: -30 },
        ])(
            `calculator.divide($operand1, $operand2)`,
            ({ operand1, operand2 }) => {
                expect(calculator.divide(operand1, operand2)).toBe(
                    operand1 / operand2,
                );
            },
        );

        describe('피연산자 중 0이 있는 경우, 올바른 나눗셈 결과를 반환한다.', () => {
            describe('첫 번째 피연산자만 0인 경우, 0을 반환한다.', () => {
                it.each([
                    { operand1: +0, operand2: 30 },
                    { operand1: +0, operand2: -30 },
                    { operand1: -0, operand2: 30 },
                    { operand1: -0, operand2: -30 },
                ])(
                    `calculator.divide($operand1, $operand2) = 0`,
                    ({ operand1, operand2 }) => {
                        expect(calculator.divide(operand1, operand2)).toBe(
                            operand1 / operand2,
                        );
                    },
                );
            });

            describe('두 번째 피연산자만 0인 경우, 연산자 부호 동일성 여부에 따라 Infinity/-Infinity를 반환한다.', () => {
                it.each([
                    { operand1: 30, operand2: +0 },
                    { operand1: -30, operand2: -0 },
                ])(
                    `calculator.divide($operand1, $operand2) = +Infinity`,
                    ({ operand1, operand2 }) => {
                        expect(calculator.divide(operand1, operand2)).toBe(
                            Infinity,
                        );
                    },
                );

                it.each([
                    { operand1: 30, operand2: -0 },
                    { operand1: -30, operand2: +0 },
                ])(
                    `calculator.divide($operand1, $operand2) = -Infinity`,
                    ({ operand1, operand2 }) => {
                        expect(calculator.divide(operand1, operand2)).toBe(
                            -Infinity,
                        );
                    },
                );
            });

            describe('두 피연산자가 모두 0인 경우, NaN을 반환한다.', () => {
                it.each([
                    { operand1: +0, operand2: +0 },
                    { operand1: +0, operand2: -0 },
                    { operand1: -0, operand2: +0 },
                    { operand1: -0, operand2: -0 },
                ])(
                    `calculator.divide($operand1, $operand2) = NaN`,
                    ({ operand1, operand2 }) => {
                        expect(calculator.divide(operand1, operand2)).toBeNaN();
                    },
                );
            });
        });
    });
});

describe('[Feature3] 연산 결과에 대한 특수 처리를 수행한다.', () => {
    const calculator = new Calculator();

    describe('연산 결과가 +Infinity/-Infinity/NaN인 경우, 오류를 반환한다.', () => {
        it.each([Infinity, -Infinity, NaN])(
            `calculator.display($result) = $result`,
            (result) => {
                expect(calculator.display(result)).toBe(result);
            },
        );
    });

    describe('연산 결과가 정수인 경우, 정수를 반환한다.', () => {
        it.each([
            { result: 0, expected: 0 },
            { result: 1, expected: 1 },
            { result: -1, expected: -1 },
            { result: 100, expected: 100 },
            { result: -100, expected: -100 },
        ])(
            `calculator.display($result) = $expected`,
            ({ result, expected }) => {
                expect(calculator.display(result)).toBe(expected);
            },
        );
    });

    describe('연산 결과가 소수인 경우, 소수점 이하는 버림 처리하고 정수값을 반환한다.', () => {
        it.each([
            { result: 1.1, expected: 1 },
            { result: -1.1, expected: -1 },
            { result: 1.9, expected: 1 },
            { result: -1.9, expected: -1 },
        ])(
            `calculator.display($result) = $expected`,
            ({ result, expected }) => {
                expect(calculator.display(result)).toBe(expected);
            },
        );
    });

    describe('연산 결과가 +0/-0인 경우, 0을 반환한다.', () => {
        it.each([+0, -0])(`calculator.display($result) = 0`, (result) => {
            expect(calculator.display(result)).toBe(0);
        });
    });
});
