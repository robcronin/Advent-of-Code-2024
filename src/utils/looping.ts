export const range = (x: number, y?: number): number[] => {
  const start = y !== undefined ? x : 0;
  const end = y !== undefined ? y : x;
  const rangeLength = Math.abs(end - start);
  const zeroRange = [...Array(rangeLength).keys()];
  if (y === undefined) {
    return zeroRange;
  } else {
    if (start < end) {
      return zeroRange.map((x) => x + start);
    }
    return zeroRange.reverse().map((x) => x + end + 1);
  }
};
