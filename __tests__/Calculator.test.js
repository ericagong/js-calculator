import Calculator from '../src';

describe('[Feature] 피연산자 두 개와 연산자 하나의 연산 결과를 반환한다.', () => {
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
    });

    describe('피연산자 중 0이 있는 경우, 올바른 연산 결과를 반환한다.', () => {
        describe('첫 번째 피연산자는 0이 아니고, 두 번쨰 피연산자가 +0/-0인 경우, 나눗셈 결과 Infinity/-Infinity를 반환한다.', () => {
            it.each([
                { operand1: 30, operand2: +0 },
                { operand1: -30, operand2: +0 },
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
                { operand1: -30, operand2: -0 },
            ])(
                `calculator.divide($operand1, $operand2) = -Infinity`,
                ({ operand1, operand2 }) => {
                    expect(calculator.divide(operand1, operand2)).toBe(
                        -Infinity,
                    );
                },
            );
        });

        describe('첫 번째 피연산자가 0, 두 번쨰 피연산자가 0이 아닌 경우, 나눗셈 결과 0을 반환한다.', () => {
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

        describe('두 피연산자가 모두 0일 때, 나눗셈 결과 NaN을 반환한다.', () => {
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
