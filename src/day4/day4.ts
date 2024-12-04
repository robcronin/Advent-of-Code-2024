import { countArr } from '../utils/array';
import {
  Coords,
  createGridFromInput,
  diagonalDirections,
  directions,
  Grid,
} from '../utils/grid';
import { range } from '../utils/looping';

const dirs = [...directions, ...diagonalDirections];

const getNumWordInGrid = (grid: Grid<string>, word: string) => {
  const startPos = grid.findValueInGrid(word[0]);
  return startPos
    .map((start) => {
      const possibleWordLocs: Coords[][] = dirs
        .map(([dx, dy]) =>
          range(word.length)
            .map((i) => ({
              x: start.x + i * dx,
              y: start.y + i * dy,
            }))
            .filter((p) => grid.isCoordValid(p)),
        )
        .filter((coords) => coords.length === word.length);
      return possibleWordLocs.filter((wordLoc) =>
        wordLoc.every((coords, i) => grid.get(coords) === word[i]),
      );
    })
    .flat().length;
};

const getNumXsInGrid = (grid: Grid<string>, word: string) => {
  if (word.length !== 3) throw new Error('Word length must be 3');

  const middleLocs = grid.findValueInGrid(word[1]);
  const diagonalLetters = [word[0], word[2]].sort().join('');

  return countArr(middleLocs, (loc) => {
    const diagonals = diagonalDirections
      .map(([dx, dy]) => ({ x: loc.x + dx, y: loc.y + dy }))
      .filter((coords) => grid.isCoordValid(coords));
    if (diagonals.length !== 4) return false;

    const negative = [diagonals[0], diagonals[2]].map((c) => grid.get(c));
    const positive = [diagonals[1], diagonals[3]].map((c) => grid.get(c));
    return (
      negative.sort().join('') === diagonalLetters &&
      positive.sort().join('') === diagonalLetters
    );
  });
};

export const day4 = (input: string[]) => {
  const grid = createGridFromInput(input);
  return getNumWordInGrid(grid, 'XMAS');
};

export const day4part2 = (input: string[]) => {
  const grid = createGridFromInput(input);
  return getNumXsInGrid(grid, 'MAS');
};
