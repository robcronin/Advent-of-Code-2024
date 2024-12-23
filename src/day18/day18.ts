import { Coords, getCoordKey, Grid, isCoordsEqual } from '../utils/grid';

const parseCorruptCoords = (input: string[]): Coords[] =>
  input.map((line) => {
    // note: is backwards to my grid
    const [y, x] = line.split(',');
    return { x: +x, y: +y };
  });

const createGridAfterNumBytes = (
  corruptCoords: Coords[],
  size: number,
  numBytes: number,
) => {
  const grid = new Grid(size, size, '.');
  corruptCoords.slice(0, numBytes).forEach((coord) => grid.set(coord, '#'));
  return grid;
};

const bfs = (grid: Grid<string>) => {
  const start = { x: 0, y: 0 };
  const target = { x: grid.numRows - 1, y: grid.numCols - 1 };
  let numSteps = 0;
  const visited = new Set<string>();
  let options = [start];
  visited.add(getCoordKey(start));
  while (options.length > 0) {
    const newOptions: Coords[] = [];
    for (const option of options) {
      if (isCoordsEqual(option, target)) return numSteps;
      const neighbours = grid
        .getNeighbours(option)
        .filter((n) => grid.get(n) !== '#')
        .filter((n) => !visited.has(getCoordKey(n)));
      newOptions.push(...neighbours);
      neighbours.forEach((n) => visited.add(getCoordKey(n)));
    }
    options = newOptions;
    numSteps++;
  }
};

export const day18 = (input: string[], size: number, numBytes: number) => {
  const corruptCoords = parseCorruptCoords(input);
  const grid = createGridAfterNumBytes(corruptCoords, size, numBytes);
  return bfs(grid);
};

export const day18part2 = (input: string[], size: number, numBytes: number) => {
  const corruptCoords = parseCorruptCoords(input);
  const grid = createGridAfterNumBytes(corruptCoords, size, numBytes);
  for (let i = numBytes; i < corruptCoords.length; i++) {
    grid.set(corruptCoords[i], '#');
    const hasAns = !!bfs(grid);
    if (!hasAns) return input[i];
  }
};
