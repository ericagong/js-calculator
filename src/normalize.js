export const removeDecimalAndAdjustSign = (output) => {
    const integerPart = Math.trunc(output);

    if (Object.is(integerPart, -0)) {
        return 0;
    }

    return integerPart;
};
