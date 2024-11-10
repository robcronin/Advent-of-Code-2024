/*
  Note: The x and y coordinates are backwards from convention
      x is the rowNumber
      y is the colNumber
  This usually matches how the AoC puzzles are defined
*/

import { range } from './looping';

export type GridMap<ValueType> = ValueType[][];
export type GridInfo<ValueType> = {
  grid: GridMap<ValueType>;
  numRows: number;
  numCols: number;
};
export type Coords = { x: number; y: number };
type GridOptions = {
  looping?: boolean;
};

export const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
export const diagonalDirections = [
  [-1, 1],
  [1, 1],
  [1, -1],
  [-1, -1],
];

export class Grid<ValueType> {
  private gridMap: GridMap<ValueType>;
  public numRows: number;
  public numCols: number;
  private looping: boolean;

  public constructor(
    numRows: number,
    numCols: number,
    defaultValue: ValueType,
    options?: GridOptions,
  ) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.gridMap = [];
    this.looping = !!options?.looping;
    range(numRows).forEach((x) => {
      range(numCols).forEach((y) => {
        if (!this.gridMap[x]) this.gridMap.push([]);
        this.set({ x, y }, defaultValue);
      });
    });
  }

  public get = (coords: Coords) => {
    const { x, y } = coords;
    const sx = this.looping ? (x + this.numRows) % this.numRows : x;
    const sy = this.looping ? (y + this.numCols) % this.numCols : y;
    if (!this.isCoordValid({ x: sx, y: sy })) return undefined;
    return this.gridMap[sx][sy];
  };

  public set = (coords: Coords, value: ValueType) => {
    const { x, y } = coords;
    const sx = this.looping ? (x + this.numRows) % this.numRows : x;
    const sy = this.looping ? (y + this.numCols) % this.numCols : y;
    if (this.isCoordValid({ x: sx, y: sy })) this.gridMap[sx][sy] = value;
  };

  public runSettingFn = (
    fn: ({ coords, value }: { coords: Coords; value: ValueType }) => ValueType,
  ) => {
    range(this.numRows).forEach((x) => {
      range(this.numCols).forEach((y) => {
        this.set(
          { x, y },
          fn({
            coords: { x, y },
            value: this.get({ x, y }),
          }),
        );
      });
    });
  };

  public createDeepCopy = () => {
    const newGrid = new Grid(
      this.numRows,
      this.numCols,
      this.get({ x: 0, y: 0 }),
    );
    newGrid.runSettingFn(({ coords: { x, y } }) => this.get({ x, y }));
    return newGrid;
  };

  public print = (noLog?: boolean): string => {
    const printString = range(this.numRows).reduce(
      (printValue, x) =>
        printValue +
        range(this.numCols)
          .reduce((row, y) => row + this.get({ x, y }) + ' ', '')
          .slice(0, -1) +
        '\n',
      '',
    );
    if (!noLog) console.log(printString);
    return printString;
  };

  public reversePrint = (noLog?: boolean): string => {
    const printString = range(this.numCols).reduce(
      (printValue, y) =>
        printValue +
        range(this.numRows)
          .reduce((row, x) => row + this.get({ x, y }) + ' ', '')
          .slice(0, -1) +
        '\n',
      '',
    );
    if (!noLog) console.log(printString);
    return printString;
  };

  public isCoordValid = (coords: Coords) => {
    const { x, y } = coords;
    return x >= 0 && x < this.numRows && y >= 0 && y < this.numCols;
  };

  public loopCoords = (coords: Coords) => {
    const { x, y } = coords;
    let lx = x;
    let ly = y;
    if (lx < 0) lx += this.numRows * (Math.floor((-1 * lx) / this.numRows) + 1);
    if (ly < 0) ly += this.numCols * (Math.floor((-1 * ly) / this.numCols) + 1);
    return {
      x: lx % this.numRows,
      y: ly % this.numCols,
    };
  };

  public getNeighbours = (coords: Coords, isDiagonal?: boolean): Coords[] => {
    const { x, y } = coords;
    const deltas = isDiagonal
      ? directions.concat(diagonalDirections)
      : directions;
    return deltas.reduce((neighbours: Coords[], [dx, dy]) => {
      const neighbour = { x: x + dx, y: y + dy };
      if (this.looping) return [...neighbours, this.loopCoords(neighbour)];
      else {
        if (this.isCoordValid(neighbour)) return [...neighbours, neighbour];
        return neighbours;
      }
    }, []);
  };

  public countValueInGrid = (value: ValueType): number => {
    return range(this.numRows).reduce(
      (sumTotal, x) =>
        sumTotal +
        range(this.numCols).reduce(
          (sumRow, y) => (this.get({ x, y }) === value ? sumRow + 1 : sumRow),
          0,
        ),
      0,
    );
  };

  public findValueInGrid = (value: ValueType): Coords[] => {
    const coords: Coords[] = [];
    range(this.numRows).forEach((x) => {
      range(this.numCols).forEach((y) => {
        if (this.get({ x, y }) === value) {
          coords.push({ x, y });
        }
      });
    });
    return coords;
  };
}

export const createGridFromInput = (input: string[]) => {
  const grid = new Grid(input.length, input[0].length, input[0][0]);
  grid.runSettingFn(({ coords: { x, y } }) => input[x][y]);
  return grid;
};

export const createNumberGridFromInput = (input: number[]) => {
  const grid = new Grid(input.length, input[0].toString().length, 0);
  grid.runSettingFn(({ coords: { x, y } }) => +input[x].toString()[y]);
  return grid;
};
