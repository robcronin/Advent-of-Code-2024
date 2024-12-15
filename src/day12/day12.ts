import { sumArr } from '../utils/array';
import { Coords, createGridFromInput, getCoordKey, Grid } from '../utils/grid';
import { range } from '../utils/looping';

const getAndMarkValidNeighbours = (
  grid: Grid<string>,
  visited: Set<string>,
  value: string,
  coords: Coords,
) => {
  const neighbours = grid
    .getNeighbours(coords)
    .filter((n) => grid.get(n) === value)
    .filter((n) => !visited.has(getCoordKey(n)));
  neighbours.forEach((n) => visited.add(getCoordKey(n)));
  return neighbours;
};

const markRegions = (grid: Grid<string>) => {
  let numRegions = 0;
  const markedGrid = new Grid(grid.numRows, grid.numRows, 0);
  while (markedGrid.findValueInGrid(0).length > 0) {
    const nextRegionCoords = markedGrid.findValueInGrid(0)[0];
    const nextRegionValue = grid.get(nextRegionCoords);
    const nextRegionNum = numRegions + 1;
    numRegions++;

    const visited = new Set<string>();
    visited.add(getCoordKey(nextRegionCoords));
    markedGrid.set(nextRegionCoords, nextRegionNum);
    let neighbours = getAndMarkValidNeighbours(
      grid,
      visited,
      nextRegionValue,
      nextRegionCoords,
    );
    while (neighbours.length > 0) {
      const newNeighbours: Coords[] = [];
      for (const neighbour of neighbours) {
        markedGrid.set(neighbour, nextRegionNum);
        getAndMarkValidNeighbours(
          grid,
          visited,
          nextRegionValue,
          neighbour,
        ).forEach((n) => newNeighbours.push(n));
      }
      neighbours = newNeighbours;
    }
  }
  return { markedGrid, numRegions };
};

// Super ugly
const getRegionSides = (markedGrid: Grid<number>, regionNum: number) => {
  let tops = 0;
  for (let x = 0; x < markedGrid.numRows; x++) {
    for (let y = 0; y < markedGrid.numCols; y++) {
      if (markedGrid.get({ x, y }) === regionNum) {
        if (x === 0) {
          tops++;
          while (
            y < markedGrid.numCols - 1 &&
            markedGrid.get({ x, y: y + 1 }) === regionNum
          )
            y++;
        } else if (markedGrid.get({ x: x - 1, y }) !== regionNum) {
          tops++;
          while (
            y < markedGrid.numCols - 1 &&
            markedGrid.get({ x, y: y + 1 }) === regionNum &&
            markedGrid.get({ x: x - 1, y }) !== regionNum
          )
            y++;
        }
      }
    }
  }

  let bottoms = 0;
  for (let x = 0; x < markedGrid.numRows; x++) {
    for (let y = 0; y < markedGrid.numCols; y++) {
      if (markedGrid.get({ x, y }) === regionNum) {
        if (x === markedGrid.numRows - 1) {
          bottoms++;
          while (
            y < markedGrid.numCols - 1 &&
            markedGrid.get({ x, y: y + 1 }) === regionNum
          )
            y++;
        } else if (markedGrid.get({ x: x + 1, y }) !== regionNum) {
          bottoms++;
          while (
            y < markedGrid.numCols - 1 &&
            markedGrid.get({ x, y: y + 1 }) === regionNum &&
            markedGrid.get({ x: x + 1, y }) !== regionNum
          )
            y++;
        }
      }
    }
  }

  let lefts = 0;
  for (let y = 0; y < markedGrid.numCols; y++) {
    for (let x = 0; x < markedGrid.numRows; x++) {
      if (markedGrid.get({ x, y }) === regionNum) {
        if (y === 0) {
          lefts++;
          while (
            x < markedGrid.numRows - 1 &&
            markedGrid.get({ x: x + 1, y }) === regionNum
          )
            x++;
        } else if (markedGrid.get({ x, y: y - 1 }) !== regionNum) {
          lefts++;
          while (
            x < markedGrid.numRows - 1 &&
            markedGrid.get({ x: x + 1, y }) === regionNum &&
            markedGrid.get({ x, y: y - 1 }) !== regionNum
          )
            x++;
        }
      }
    }
  }

  let rights = 0;
  for (let y = 0; y < markedGrid.numCols; y++) {
    for (let x = 0; x < markedGrid.numRows; x++) {
      if (markedGrid.get({ x, y }) === regionNum) {
        if (y === markedGrid.numCols - 1) {
          rights++;
          while (
            x < markedGrid.numRows - 1 &&
            markedGrid.get({ x: x + 1, y }) === regionNum
          )
            x++;
        } else if (markedGrid.get({ x, y: y + 1 }) !== regionNum) {
          rights++;
          while (
            x < markedGrid.numRows - 1 &&
            markedGrid.get({ x: x + 1, y }) === regionNum &&
            markedGrid.get({ x, y: y + 1 }) !== regionNum
          )
            x++;
        }
      }
    }
  }
  return tops + bottoms + lefts + rights;
};

const getRegionAreaAndPerimeter = (
  markedGrid: Grid<number>,
  regionNum: number,
) => {
  const coords = markedGrid.findValueInGrid(regionNum);
  let perimeter = 0;
  coords.forEach((coord) => {
    const nonRegionNeighbours = markedGrid
      .getNeighbours(coord, false, true)
      .filter(
        (n) => !markedGrid.isCoordValid(n) || markedGrid.get(n) !== regionNum,
      );
    perimeter += nonRegionNeighbours.length;
  });

  return { area: coords.length, perimeter };
};

const getRegionPrice = (markedGrid: Grid<number>, regionNum: number) => {
  const { area, perimeter } = getRegionAreaAndPerimeter(markedGrid, regionNum);
  return area * perimeter;
};

const getRegionPrice2 = (markedGrid: Grid<number>, regionNum: number) => {
  const { area } = getRegionAreaAndPerimeter(markedGrid, regionNum);
  const sides = getRegionSides(markedGrid, regionNum);
  return area * sides;
};

export const day12 = (input: string[]) => {
  const grid = createGridFromInput(input);
  const { markedGrid, numRegions } = markRegions(grid);
  return sumArr(range(1, numRegions + 1), (x) => getRegionPrice(markedGrid, x));
};

export const day12part2 = (input: string[]) => {
  const grid = createGridFromInput(input);
  const { markedGrid, numRegions } = markRegions(grid);
  return sumArr(range(1, numRegions + 1), (x) =>
    getRegionPrice2(markedGrid, x),
  );
};
