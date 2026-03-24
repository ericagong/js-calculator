import calculate, { handleError } from '../src/calculation.js';

describe('handleError', () => {
    it('ApplicationError가 아닌 에러는 알 수 없는 에러 메시지를 출력한다', () => {
        const spy = jest.spyOn(console, 'error').mockImplementation();

        handleError(new Error('일반 에러'));

        expect(spy).toHaveBeenCalledWith('알 수 없는 에러가 발생했습니다.');
        spy.mockRestore();
    });
});

describe('calculate', () => {
    // 정상 연산
    it.each`
        operator | operand1 | operand2 | expected
        ${'+'}   | ${1}     | ${2}     | ${3}
        ${'-'}   | ${1}     | ${2}     | ${-1}
        ${'*'}   | ${2}     | ${3}     | ${6}
        ${'/'}   | ${6}     | ${2}     | ${3}
    `(
        '$operand1 $operator $operand2 = $expected',
        ({ operator, operand1, operand2, expected }) => {
            expect(calculate(operator, operand1, operand2)).toBe(expected);
        },
    );

    // 정상 연산 확장
    it.each`
        operator | operand1 | operand2 | expected | description
        ${'+'}   | ${'3'}   | ${'5'}   | ${8}     | ${'문자열 피연산자'}
        ${'+'}   | ${-1}    | ${-2}    | ${-3}    | ${'음수 연산'}
        ${'+'}   | ${1.9}   | ${2.1}   | ${4}     | ${'소수점 포함 연산'}
        ${'+'}   | ${999}   | ${999}   | ${1998}  | ${'경계값 (3자리 최대)'}
    `(
        '$description: $operand1 $operator $operand2 = $expected',
        ({ operator, operand1, operand2, expected }) => {
            expect(calculate(operator, operand1, operand2)).toBe(expected);
        },
    );

    // 정규화(normalize) 검증
    it('-0을 0으로 변환한다', () => {
        expect(calculate('*', 0, -1)).toBe(0);
    });

    it('음수 나눗셈 소수점을 버린다', () => {
        expect(calculate('/', 7, -2)).toBe(-3);
    });

    it('-Infinity는 오류를 반환한다', () => {
        expect(calculate('/', -1, 0)).toBe('오류');
    });

    // 소수점 버림
    it('소수점 이하를 버린다', () => {
        expect(calculate('/', 10, 3)).toBe(3);
    });

    // Infinity → '오류'
    it('0으로 나누면 오류를 반환한다', () => {
        expect(calculate('/', 1, 0)).toBe('오류');
    });

    // 피연산자 유효성 에러
    describe('피연산자가 유효하지 않으면 에러를 처리한다', () => {
        it.each`
            operator | operand1     | operand2 | description
            ${'+'}   | ${null}      | ${2}     | ${'null 피연산자'}
            ${'+'}   | ${undefined} | ${2}     | ${'undefined 피연산자'}
            ${'+'}   | ${'   '}     | ${2}     | ${'공백 피연산자'}
            ${'+'}   | ${'abc'}     | ${2}     | ${'문자열 피연산자'}
            ${'+'}   | ${true}      | ${2}     | ${'boolean 피연산자'}
            ${'+'}   | ${[]}        | ${2}     | ${'배열 피연산자'}
            ${'+'}   | ${1234}      | ${1}     | ${'네 자리 초과 첫째 피연산자'}
            ${'+'}   | ${1}         | ${-9999} | ${'네 자리 초과 둘째 피연산자'}
            ${'+'}   | ${1}         | ${'abc'} | ${'둘째 피연산자 문자열'}
            ${'+'}   | ${NaN}       | ${2}     | ${'NaN 피연산자'}
        `('$description → undefined', ({ operator, operand1, operand2 }) => {
            expect(calculate(operator, operand1, operand2)).toBeUndefined();
        });
    });

    // 연산자 유효성 에러
    describe('연산자가 유효하지 않으면 에러를 처리한다', () => {
        it.each`
            operator     | operand1 | operand2 | description
            ${''}        | ${1}     | ${2}     | ${'빈 연산자'}
            ${null}      | ${1}     | ${2}     | ${'null 연산자'}
            ${undefined} | ${1}     | ${2}     | ${'undefined 연산자'}
            ${'%'}       | ${1}     | ${2}     | ${'% 연산자'}
            ${'^'}       | ${1}     | ${2}     | ${'^ 연산자'}
            ${'**'}      | ${1}     | ${2}     | ${'** 연산자'}
        `('$description → undefined', ({ operator, operand1, operand2 }) => {
            expect(calculate(operator, operand1, operand2)).toBeUndefined();
        });
    });

    // 연산 결과 유효성 에러
    describe('연산 결과가 유효하지 않으면 에러를 처리한다', () => {
        it.each`
            operator | operand1 | operand2 | description
            ${'/'}   | ${0}     | ${0}     | ${'0/0 → NaN'}
        `('$description → undefined', ({ operator, operand1, operand2 }) => {
            expect(calculate(operator, operand1, operand2)).toBeUndefined();
        });
    });
});
