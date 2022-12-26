export const countArr = <T>(arr: T[], countFn: (i: T) => boolean) =>
  arr.reduce((acc, i) => (countFn(i) ? acc + 1 : acc), 0);

export const sumArr = <T>(arr: T[], sumFn: (i: T, index: number) => number) =>
  arr.reduce((acc, i, index) => sumFn(i, index) + acc, 0);
