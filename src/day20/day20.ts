import { countArr } from '../utils/array';
import {
  Coords,
  createGridFromInput,
  getCoordKey,
  Grid,
  isCoordsEqual,
} from '../utils/grid';

const getBaseTrack = (grid: Grid<string>) => {
  const start = grid.findValueInGrid('S')[0];
  const end = grid.findValueInGrid('E')[0];

  let path = [start];
  let pos = start;
  let lastPos = start;
  while (true) {
    const nextPos = grid
      .getNeighbours(pos)
      .filter((n) => grid.get(n) !== '#')
      .filter((n) => !isCoordsEqual(n, lastPos))[0];
    path.push(nextPos);
    if (isCoordsEqual(nextPos, end)) break;
    lastPos = pos;
    pos = nextPos;
  }
  return path;
};

const getStepsRemaining = (baseTrack: Coords[]) => {
  const stepsRemaining: Record<string, number> = {};
  const trackLength = baseTrack.length - 1;
  baseTrack.forEach(
    (coord, index) =>
      (stepsRemaining[getCoordKey(coord)] = trackLength - index),
  );
  return stepsRemaining;
};

const getPossibleEndCheats = (
  grid: Grid<string>,
  start: Coords,
  cheatLength: number,
) => {
  let numSteps = 0;
  const visited = new Set<string>();
  visited.add(getCoordKey(start));
  let options = [start];
  while (options.length > 0 && numSteps < cheatLength) {
    numSteps++;
    const newOptions: Coords[] = [];
    for (const option of options) {
      const neighbours = grid
        .getNeighbours(option)
        .filter((n) => !visited.has(getCoordKey(n)));
      neighbours.forEach((n) => visited.add(getCoordKey(n)));
      if (numSteps === cheatLength) {
        const validEnds = neighbours.filter((n) => grid.get(n) !== '#');
        newOptions.push(...validEnds);
      } else {
        newOptions.push(...neighbours);
      }
    }
    options = newOptions;
  }

  const uniqueEnds = new Set<string>();
  options.forEach((opt) => uniqueEnds.add(getCoordKey(opt)));
  return [...uniqueEnds];
};

const getValidCheats = (
  grid: Grid<string>,
  baseTrack: Coords[],
  stepsRemaining: Record<string, number>,
  cheatStart: number,
  minSaveTime: number,
  cheatLength: number,
) => {
  const cheatStartPos = baseTrack[cheatStart];
  const endCheatOptions = getPossibleEndCheats(
    grid,
    cheatStartPos,
    cheatLength,
  );
  return countArr(endCheatOptions, (endCheatOption) => {
    const stepsFromEndCheat = stepsRemaining[endCheatOption];
    return (
      cheatStart + cheatLength + stepsFromEndCheat <=
      baseTrack.length - 1 - minSaveTime
    );
  });
};

export const day20 = (input: string[], minSaveTime: number) => {
  const grid = createGridFromInput(input);
  const baseTrack = getBaseTrack(grid);
  const stepsRemaining = getStepsRemaining(baseTrack);
  let numCheats = 0;
  for (let cheatStart = 0; cheatStart < baseTrack.length; cheatStart++) {
    numCheats += getValidCheats(
      grid,
      baseTrack,
      stepsRemaining,
      cheatStart,
      minSaveTime,
      2,
    );
  }

  return numCheats;
};

export const day20part2 = (input: string[], minSaveTime: number) => {
  const grid = createGridFromInput(input);
  const baseTrack = getBaseTrack(grid);
  const stepsRemaining = getStepsRemaining(baseTrack);
  let numCheats = 0;
  for (let cheatStart = 0; cheatStart < baseTrack.length; cheatStart++) {
    for (let cheatLength = 2; cheatLength <= 20; cheatLength++) {
      numCheats += getValidCheats(
        grid,
        baseTrack,
        stepsRemaining,
        cheatStart,
        minSaveTime,
        cheatLength,
      );
    }
  }

  return numCheats;
};

/// pre xmas eve
// the start coords are wrong and counting starting from a wall
