const POSTIVE_INFINITY = +Infinity;
const NEGATIVE_INFINITY = -Infinity;
const INFINITY_OUTPUT = '오류';

const errorMessageForInfinity = (output) => {
    if (output === POSTIVE_INFINITY || output === NEGATIVE_INFINITY) {
        return INFINITY_OUTPUT;
    }
    return output;
};

const removeDecimal = (input) => {
    return Math.trunc(input);
};

const convertToPositiveZero = (input) => {
    return Object.is(input, -0) ? 0 : input;
};

export const normalizeOutput = (output) => {
    output = removeDecimal(output);
    output = convertToPositiveZero(output);
    output = errorMessageForInfinity(output);
    return output;
};
