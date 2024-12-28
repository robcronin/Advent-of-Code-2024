import { countArr, sumArr } from '../utils/array';
import { createGridFromInput } from '../utils/grid';
import { parseInput } from '../utils/input';
import { range } from '../utils/looping';

const parseLocksAndKeys = (input: string[]) => {
  const locks: number[][] = [];
  const keys: number[][] = [];
  let fitSize = 0;
  input.forEach((line) => {
    const grid = createGridFromInput(parseInput(line) as string[]);
    fitSize = grid.numRows - 2;
    const isLock = range(grid.numCols).every(
      (y) => grid.get({ x: 0, y }) === '#',
    );
    const schematics = range(grid.numCols).map((y) => {
      let height = 0;
      while (height < grid.numRows - 1) {
        const x = isLock ? height + 1 : grid.numRows - (height + 2);
        if (grid.get({ x, y }) === '#') height++;
        else break;
      }
      return height;
    });
    if (isLock) locks.push(schematics);
    else keys.push(schematics);
  });
  return { locks, keys, fitSize };
};

export const day25 = (input: string[]) => {
  const { locks, keys, fitSize } = parseLocksAndKeys(input);
  return sumArr(locks, (lock) =>
    countArr(keys, (key) => !key.some((h, i) => h + lock[i] > fitSize)),
  );
};
