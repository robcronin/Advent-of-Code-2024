export const countArr = <T>(arr: T[], countFn: (i: T) => boolean) =>
    arr.reduce((acc, i) => countFn(i) ? acc + 1 : acc, 0)
