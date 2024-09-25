import { normalizeOutput } from '../src/normalization.js';

describe('[Feature3] 연산 결과를 특수 처리한다.', () => {
    describe('연산 결과가 소수인 경우, 소수점 이하는 버림 처리하고 정수값을 생성한다.', () => {
        it.each([
            { result: 1.1, expected: 1 },
            { result: -1.1, expected: -1 },
            { result: 1.9, expected: 1 },
            { result: -1.9, expected: -1 },
            { result: -0.123456789, expected: 0 },
            { result: 0.123456789, expected: 0 },
        ])(`normalizeOutput($result) = $expected`, ({ result, expected }) => {
            expect(normalizeOutput(result)).toBe(expected);
        });
    });

    describe('연산 결과가 -0인 경우, 0을 생성한다.', () => {
        it(`normalizeOutput(-0) = 0`, () => {
            expect(normalizeOutput(-0)).toBe(0);
        });
    });

    describe('연산 결과가 +Infinity/-Infinity인 경우, "오류" 문자열을 생성한다.', () => {
        it.each([+Infinity, -Infinity])(
            'normalizeOutput($result) = "오류"',
            (result) => {
                expect(normalizeOutput(result)).toBe('오류');
            },
        );
    });
});
