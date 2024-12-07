import { countArr } from '../utils/array';
import {
  Coords,
  createGridFromInput,
  decodeCoordKey,
  getCoordKey,
  Grid,
} from '../utils/grid';

const directions = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];

const getVisitedCoords = (grid: Grid<string>) => {
  const start = grid.findValueInGrid('^')[0];
  let dirIndex = 0;
  const vistited = new Set<string>();
  vistited.add(getCoordKey(start));
  let current = { ...start };
  while (true) {
    const [dx, dy] = directions[dirIndex];
    const next = { x: current.x + dx, y: current.y + dy };
    if (!grid.isCoordValid(next)) break;
    if (grid.get(next) === '#') dirIndex = (dirIndex + 1) % directions.length;
    else {
      current = next;
      vistited.add(getCoordKey(current));
    }
  }
  return vistited;
};

const getDirKey = (coords: Coords, dirIndex: number) =>
  `${getCoordKey(coords)}-${dirIndex}`;

// Could de duplicate but more readable this way
const getIsLoop = (grid: Grid<string>) => {
  const start = grid.findValueInGrid('^')[0];
  let dirIndex = 0;
  const vistited = new Set<string>();
  vistited.add(getDirKey(start, dirIndex));
  let current = { ...start };
  while (true) {
    const [dx, dy] = directions[dirIndex];
    const next = { x: current.x + dx, y: current.y + dy };
    if (!grid.isCoordValid(next)) return false;
    if (grid.get(next) === '#') dirIndex = (dirIndex + 1) % directions.length;
    else {
      current = next;
      if (vistited.has(getDirKey(current, dirIndex))) return true;
      vistited.add(getDirKey(current, dirIndex));
    }
  }
};

export const day6 = (input: string[]) => {
  const grid = createGridFromInput(input);
  return getVisitedCoords(grid).size;
};

export const day6part2 = (input: string[]) => {
  const grid = createGridFromInput(input);
  const visited = getVisitedCoords(grid);
  const start = grid.findValueInGrid('^')[0];
  const options = [...visited]
    .filter((v) => v !== getCoordKey(start))
    .map((v) => decodeCoordKey(v));

  return countArr(options, (option) => {
    grid.set(option, '#');
    const isLoop = getIsLoop(grid);
    grid.set(option, '.');
    return isLoop;
  });
};
