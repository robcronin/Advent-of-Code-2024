import { countArr, sumArr } from '../utils/array';

const parseLists = (input: string[]): number[][] =>
  input.reduce(
    (acc: number[][], line) => {
      const [a, b] = line.split('   ').map(Number);
      return [
        [...acc[0], a],
        [...acc[1], b],
      ];
    },
    [[], []],
  );

export const day1 = (input: string[]) => {
  const lists = parseLists(input);
  const sortedLists = lists.map((list) => list.sort((a, b) => a - b));
  return sumArr(sortedLists[0], (entry, index) =>
    Math.abs(entry - sortedLists[1][index]),
  );
};

export const day1part2 = (input: string[]) => {
  const lists = parseLists(input);
  return sumArr(lists[0], (i) => i * countArr(lists[1], (j) => i === j));
};
