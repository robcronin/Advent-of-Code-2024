import { sumArr } from '../utils/array';
import { range } from '../utils/looping';

type Stones = Record<number, number>;

const getStones = (input: number[]) =>
  input.reduce((acc: Stones, stone) => {
    if (acc[stone]) {
      return { ...acc, [stone]: acc[stone] + 1 };
    }
    return { ...acc, [stone]: 1 };
  }, {});

const blinkSingleStone = (stone: number): number[] => {
  if (stone === 0) return [1];
  if (stone.toString().length % 2 === 0) {
    const left = stone.toString().slice(0, stone.toString().length / 2);
    const right = stone.toString().slice(stone.toString().length / 2);
    return [parseInt(left), parseInt(right)];
  }
  return [stone * 2024];
};

const blinkStones = (stones: Stones) => {
  const newStones: Stones = {};
  Object.keys(stones).forEach((stone) => {
    const replacedStones = blinkSingleStone(parseInt(stone));
    replacedStones.forEach((replacedStone) => {
      if (newStones[replacedStone]) {
        newStones[replacedStone] += stones[parseInt(stone)];
      } else {
        newStones[replacedStone] = stones[parseInt(stone)];
      }
    });
  });
  return newStones;
};

const blinkStonesNumTimes = (stones: Stones, numBlinks: number) => {
  let finalStones = { ...stones };
  range(numBlinks).forEach(() => {
    finalStones = blinkStones(finalStones);
  });
  return finalStones;
};

const getNumStones = (stones: Stones) =>
  sumArr(Object.values(stones), (x) => x);

export const day11 = (input: number[]) => {
  const stones = getStones(input);
  const finalStones = blinkStonesNumTimes(stones, 25);
  return getNumStones(finalStones);
};

export const day11part2 = (input: number[]) => {
  const stones = getStones(input);
  const finalStones = blinkStonesNumTimes(stones, 75);
  return getNumStones(finalStones);
};
