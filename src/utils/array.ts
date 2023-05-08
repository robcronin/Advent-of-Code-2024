export const countArr = <T>(arr: T[], countFn: (i: T) => boolean) =>
  arr.reduce((acc, i) => (countFn(i) ? acc + 1 : acc), 0);

export const sumArr = <T>(arr: T[], sumFn: (i: T, index: number) => number) =>
  arr.reduce((acc, i, index) => sumFn(i, index) + acc, 0);

export const maxArr = <T>(arr: T[], maxFn: (i: T, index: number) => number) =>
  arr.reduce((max, i, index) => {
    const value = maxFn(i, index);
    return value > max ? value : max;
  }, Number.MIN_VALUE);

export const minArr = <T>(arr: T[], minFn: (i: T, index: number) => number) =>
  arr.reduce((min, i, index) => {
    const value = minFn(i, index);
    return value < min ? value : min;
  }, Number.MAX_VALUE);
