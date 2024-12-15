import { sumArr } from '../utils/array';
import {
  Coords,
  createNumberGridFromInput,
  getCoordKey,
  Grid,
} from '../utils/grid';

const getTrailheadValues = (grid: Grid<number>, trailhead: Coords) => {
  const endTrails = [];
  let options = [trailhead];
  while (options.length > 0) {
    const newOptions: Coords[] = [];
    for (const option of options) {
      if (grid.get(option) === 9) {
        endTrails.push(option);
      }

      const neighbours = grid
        .getNeighbours(option)
        .filter((n) => grid.get(n) - grid.get(option) === 1);
      neighbours.forEach((n) => newOptions.push(n));
    }
    options = newOptions;
  }
  const uniqueEndTrails = new Set<string>();
  endTrails.forEach((et) => uniqueEndTrails.add(getCoordKey(et)));
  return { score: uniqueEndTrails.size, rating: endTrails.length };
};

export const day10 = (input: number[]) => {
  const grid = createNumberGridFromInput(input);
  const trailheads = grid.findValueInGrid(0);
  return sumArr(trailheads, (th) => getTrailheadValues(grid, th).score);
};

export const day10part2 = (input: number[]) => {
  const grid = createNumberGridFromInput(input);
  const trailheads = grid.findValueInGrid(0);
  return sumArr(trailheads, (th) => getTrailheadValues(grid, th).rating);
};
