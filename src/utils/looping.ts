export const range = (x: number, y?: number): number[] => {
    const start = y ? x : 0;
    const end = y ? y : x;
    const zeroRange = [...Array(end - start).keys()];
    return y ? zeroRange.map((x) => x + start) : zeroRange;
};
