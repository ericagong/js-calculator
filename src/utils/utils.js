export const go = (...args) => args.reduce((acc, fn) => fn(acc));
