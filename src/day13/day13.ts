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

const getLargerMachines = (macines: Machine[]): Machine[] =>
  macines.map((machine) => ({
    ...machine,
    prize: {
      x: machine.prize.x + 10000000000000,
      y: machine.prize.y + 10000000000000,
    },
  }));

// A hack to get around float division
const isInteger = (a: number) => Math.abs(a - Math.round(a)) < 0.001;

const getCheapestWin = (machine: Machine): number | undefined => {
  const A_COST = 3;
  const B_COST = 1;
  const { prize, aButton, bButton } = machine;

  // simulatenous equations
  const aComp = aButton.x - aButton.y;
  const bComp = bButton.x - bButton.y;
  const intComp = prize.x - prize.y;
  const number = intComp / aComp;
  const finalBComp = -bComp / aComp;

  const nextBComp = aButton.x * finalBComp + bButton.x;
  const nextNumber = prize.x - aButton.x * number;

  const numB = nextNumber / nextBComp;
  if (isInteger(numB)) {
    const numA = (prize.x - numB * bButton.x) / aButton.x;
    if (isInteger(numA)) {
      return A_COST * Math.round(numA) + B_COST * Math.round(numB);
    }
  }
  return undefined;
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
  const machines = parseMachines(input);
  const largeMachines = getLargerMachines(machines);
  return getTotalMinForWins(largeMachines);
};
