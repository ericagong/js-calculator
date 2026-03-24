const truncateDecimal = (result) => Math.trunc(result);

const convertNegativeZeroToZero = (result) =>
    Object.is(result, -0) ? 0 : result;

const ERROR_RESULT = '오류';
const replaceNonFiniteWithError = (result) =>
    Number.isFinite(result) ? result : ERROR_RESULT;

const go = (...args) => args.reduce((acc, fn) => fn(acc));

export const normalize = (result) =>
    go(
        result,
        truncateDecimal,
        convertNegativeZeroToZero,
        replaceNonFiniteWithError,
    );
