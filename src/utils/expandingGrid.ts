/*
  Note: The x and y coordinates are backwards from convention
      x is the rowNumber
      y is the colNumber
  This usually matches how the AoC puzzles are defined
*/

import { Coords } from './grid';
import { range } from './looping';

export type ExpandingGrid<ValueType> = Record<
  number,
  Record<number, ValueType>
>;

export const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

export const genNewExpandingGrid = <ValueType>({
  numRows,
  numCols,
  defaultValue,
}: {
  numRows: number;
  numCols: number;
  defaultValue: ValueType;
}): ExpandingGrid<ValueType> => {
  const expandingGrid: ExpandingGrid<ValueType> = {};
  range(numRows).forEach((x) => {
    range(numCols).forEach((y) => {
      if (!expandingGrid[x]) expandingGrid[x] = {};
      expandingGrid[x][y] = defaultValue;
    });
  });
  return expandingGrid;
};

export const getValueExpandingGrid = <ValueType>(
  expandingGrid: ExpandingGrid<ValueType>,
  { x, y }: Coords,
) => {
  if (expandingGrid[x]) return expandingGrid[x][y];
  return undefined;
};

export const setValueExpandingGrid = <ValueType>(
  expandingGrid: ExpandingGrid<ValueType>,
  { x, y }: Coords,
  value: ValueType,
) => {
  if (expandingGrid[x]) expandingGrid[x][y] = value;
  else expandingGrid[x] = { [y]: value };
};

export const deepCopyExpandingGrid = <ValueType>(
  expandingGrid: ExpandingGrid<ValueType>,
): ExpandingGrid<ValueType> =>
  Object.keys(expandingGrid).reduce(
    (newExpandingGrid, x) => ({
      ...newExpandingGrid,
      [+x]: { ...expandingGrid[+x] },
    }),
    {},
  );

export const getNeighbourExpandingCoords = (
  coords: Coords,
  isDiagonal?: boolean,
): Coords[] => {
  const { x, y } = coords;
  const neighbours = [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 },
  ];
  if (isDiagonal) {
    neighbours.push(
      { x: x - 1, y: y - 1 },
      { x: x - 1, y: y + 1 },
      { x: x + 1, y: y - 1 },
      { x: x + 1, y: y + 1 },
    );
  }
  return neighbours;
};

export const getExpandingDimensions = <ValueType>(
  expandingGrid: ExpandingGrid<ValueType>,
) => {
  const minX = Object.keys(expandingGrid).reduce(
    (min, x) => Math.min(min, +x),
    0,
  );
  const maxX = Object.keys(expandingGrid).reduce(
    (max, x) => Math.max(max, +x),
    0,
  );
  const minY = Object.keys(expandingGrid).reduce((minGrid, x) => {
    const minYRow = Object.keys(expandingGrid[+x]).reduce(
      (min, y) => Math.min(min, +y),
      0,
    );
    return Math.min(minGrid, minYRow);
  }, 0);
  const maxY = Object.keys(expandingGrid).reduce((maxGrid, x) => {
    const maxYRow = Object.keys(expandingGrid[+x]).reduce(
      (max, y) => Math.max(max, +y),
      0,
    );
    return Math.max(maxGrid, maxYRow);
  }, 0);
  return { minX, maxX, minY, maxY };
};

export const printExpandingGrid = <ValueType>(
  expandingGrid: ExpandingGrid<ValueType>,
): string => {
  const { minX, maxX, minY, maxY } = getExpandingDimensions(expandingGrid);
  return range(minX, maxX + 1).reduce(
    (printValue, x) =>
      printValue +
      range(minY, maxY + 1)
        .reduce(
          (row, y) =>
            row + (getValueExpandingGrid(expandingGrid, { x, y }) ?? ' ') + ' ',
          '',
        )
        .slice(0, -1) +
      '\n',
    '',
  );
};

export const runFnOnExpandingGrid = <ValueType>(
  expandingGrid: ExpandingGrid<ValueType>,
  fnToRun: (arg: {
    coords: Coords;
    grid: ExpandingGrid<ValueType>;
    value: ValueType | undefined;
  }) => ValueType | void,
  noSet?: boolean,
) => {
  const { minX, maxX, minY, maxY } = getExpandingDimensions(expandingGrid);
  range(minX, maxX + 1).forEach((x) => {
    range(minY, maxY + 1).forEach((y) => {
      const newValue = fnToRun({
        coords: { x, y },
        grid: expandingGrid,
        value: getValueExpandingGrid(expandingGrid, { x, y }),
      });
      if (!noSet) {
        setValueExpandingGrid(expandingGrid, { x, y }, newValue);
      }
    });
  });
};

export const countValueInGrid = <ValueType>(
  expandingGrid: ExpandingGrid<ValueType>,
  value: ValueType,
): number => {
  const { minX, maxX, minY, maxY } = getExpandingDimensions(expandingGrid);

  return range(minX, maxX + 1).reduce(
    (sumTotal, x) =>
      sumTotal +
      range(minY, maxY + 1).reduce(
        (sumRow, y) =>
          getValueExpandingGrid(expandingGrid, { x, y }) === value
            ? sumRow + 1
            : sumRow,
        0,
      ),
    0,
  );
};
