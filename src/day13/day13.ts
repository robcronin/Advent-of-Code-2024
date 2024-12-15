import { sumArr } from '../utils/array';
import { Coords } from '../utils/grid';
import { parseInput } from '../utils/input';

type Machine = {
  prize: Coords;
  aButton: Coords;
  bButton: Coords;
};

// Button A: X+17, Y+86 Button B: X+84, Y+37 Prize: X=7870, Y=6450
const parseMachines = (input: string[]): Machine[] =>
  input.map((line) => {
    const [aString, bString, prizeString] = parseInput(line) as string[];
    const aGroups = aString.match(
      new RegExp(/Button A: X\+([0-9]+), Y\+([0-9]+)/),
    );
    const bGroups = bString.match(
      new RegExp(/Button B: X\+([0-9]+), Y\+([0-9]+)/),
    );
    const prizeGroups = prizeString.match(
      new RegExp(/Prize: X=([0-9]+), Y=([0-9]+)/),
    );
    if (!aGroups || !bGroups || !prizeGroups)
      throw new Error('No groups found');
    return {
      prize: { x: +prizeGroups[1], y: +prizeGroups[2] },
      aButton: { x: +aGroups[1], y: +aGroups[2] },
      bButton: { x: +bGroups[1], y: +bGroups[2] },
    };
  });

const getCheapestWin = (machine: Machine): number | undefined => {
  const A_COST = 3;
  const B_COST = 1;
  const { aButton, bButton, prize } = machine;

  let options: { a: number; b: number }[] = [];

  for (let a = 1; a <= 100; a++) {
    const remainingX = prize.x - a * aButton.x;
    const remainingY = prize.y - a * aButton.y;

    if (remainingX % bButton.x === 0 && remainingY % bButton.y === 0) {
      if (remainingX / bButton.x === remainingY / bButton.y) {
        options.push({ a, b: remainingX / bButton.x });
      }
    }
  }
  if (options.length === 0) return undefined;
  let minCost = Number.MAX_SAFE_INTEGER;
  options.forEach((option) => {
    const cost = A_COST * option.a + B_COST * option.b;
    minCost = Math.min(minCost, cost);
  });
  return minCost;
};

const getTotalMinForWins = (machines: Machine[]) =>
  sumArr(machines, (m) => {
    const cost = getCheapestWin(m);
    return cost === undefined ? 0 : cost;
  });

export const day13 = (input: string[]) => {
  const machines = parseMachines(input);
  return getTotalMinForWins(machines);
};

export const day13part2 = (input: string[]) => {
  return 13;
};
