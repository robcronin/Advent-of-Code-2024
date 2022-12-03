export const countArr = <T>(arr: T[], countFn: (i: T) => boolean) =>
  arr.reduce((acc, i) => (countFn(i) ? acc + 1 : acc), 0);

export const sumArr = <T>(arr: T[], sumFn: (i: T) => number) =>
  arr.reduce((acc, i) => sumFn(i) + acc, 0);
