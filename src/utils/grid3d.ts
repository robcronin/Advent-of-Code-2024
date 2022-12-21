/*
  Note: The x and y coordinates are backwards from convention
      x is the rowNumber
      y is the colNumber
*/

import { range } from './looping';

export type Grid3d<ValueType> = ValueType[][][];
export type GridInfo3d<ValueType> = {
  grid: Grid3d<ValueType>;
  numRows: number;
  numCols: number;
  numDips: number;
};
export type Coords3d = { x: number; y: number; z: number };

export const directions3d = [
  [-1, 0, 0],
  [1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

export const genNew3dGrid = <ValueType>({
  numRows,
  numCols,
  numDips,
  defaultValue,
}: {
  numRows: number;
  numCols: number;
  numDips: number;
  defaultValue: ValueType;
}): GridInfo3d<ValueType> => {
  const newGrid: Grid3d<ValueType> = [];
  range(numRows).forEach((x) => {
    range(numCols).forEach((y) => {
      range(numDips).forEach((z) => {
        if (!newGrid[x]) newGrid.push([]);
        if (!newGrid[x][y]) newGrid[x].push([]);
        newGrid[x][y][z] = defaultValue;
      });
    });
  });
  return { numRows, numCols, numDips, grid: newGrid };
};

export const isCoordValid3d = <ValueType>(
  coords: Coords3d,
  gridInfo: GridInfo3d<ValueType>,
) => {
  const { x, y, z } = coords;
  const { numRows, numCols, numDips } = gridInfo;
  return (
    x >= 0 && x < numRows && y >= 0 && y < numCols && z >= 0 && z < numDips
  );
};

export const getNeighbourCoords3d = <ValueType>({
  coords,
  gridInfo3d,
}: {
  coords: Coords3d;
  gridInfo3d: GridInfo3d<ValueType>;
  isDiagonal?: boolean;
}): Coords3d[] =>
  directions3d
    .map(([dx, dy, dz]) => ({
      x: coords.x + dx,
      y: coords.y + dy,
      z: coords.z + dz,
    }))
    .filter((coord) => isCoordValid3d(coord, gridInfo3d));
