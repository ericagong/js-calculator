import { go } from './utils/utils.js';

const INFINITY_OUTPUT = '오류';
const errorMessageForInfinity = (output) => {
    if (!Number.isFinite(output)) {
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

export const normalizeOutput = (output) =>
    go(output, removeDecimal, convertToPositiveZero, errorMessageForInfinity);
