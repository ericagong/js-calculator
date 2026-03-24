import { normalize } from '../src/normalization.js';

describe('normalize', () => {
    describe('연산 결과에 소수부가 존재한다면, 소수점 이하를 버림 처리한 정수값을 반환한다', () => {
        it.each([
            { result: 1.1, expected: 1 },
            { result: -1.1, expected: -1 },
            { result: 1.9, expected: 1 },
            { result: -1.9, expected: -1 },
            { result: -0.123456789, expected: 0 },
            { result: 0.123456789, expected: 0 },
        ])(`normalize($result) = $expected`, ({ result, expected }) => {
            expect(normalize(result)).toBe(expected);
        });
    });

    describe('연산 결과가 -0인 경우, 0을 반환한다', () => {
        it(`normalize(-0) = 0`, () => {
            expect(normalize(-0)).toBe(0);
        });
    });

    describe('연산 결과가 +Infinity/-Infinity인 경우, "오류" 문자열을 반환한다', () => {
        it.each([+Infinity, -Infinity])(
            'normalize($result) = "오류"',
            (result) => {
                expect(normalize(result)).toBe('오류');
            },
        );
    });

    describe('정규화가 필요 없는 정수라면, 그대로 반환한다', () => {
        it.each([
            { result: 0, expected: 0 },
            { result: 1, expected: 1 },
            { result: -1, expected: -1 },
            { result: 100, expected: 100 },
            { result: -100, expected: -100 },
        ])(`normalize($result) = $expected`, ({ result, expected }) => {
            expect(normalize(result)).toBe(expected);
        });
    });
});
