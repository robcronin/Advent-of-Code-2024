import { createGridFromInput, getCoordKey, Grid } from '../utils/grid';
import { range } from '../utils/looping';

const findFreqs = (grid: Grid<string>) => {
  const freqs = new Set<string>();
  range(grid.numRows).forEach((x) => {
    range(grid.numCols).forEach((y) => {
      const val = grid.get({ x, y });
      if (val !== '.') freqs.add(val);
    });
  });
  return [...freqs];
};

const findAntinodePairForFreq = (
  grid: Grid<string>,
  freq: string,
  antinodes: Set<string> = new Set<string>(),
) => {
  const antennas = grid.findValueInGrid(freq);
  for (let i = 0; i < antennas.length; i++) {
    for (let j = i + 1; j < antennas.length; j++) {
      const a = antennas[i];
      const b = antennas[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const antinodeA = { x: a.x + dx, y: a.y + dy };
      const antinodeB = { x: b.x - dx, y: b.y - dy };
      if (grid.isCoordValid(antinodeA)) antinodes.add(getCoordKey(antinodeA));
      if (grid.isCoordValid(antinodeB)) antinodes.add(getCoordKey(antinodeB));
    }
  }
  return antinodes;
};

// Could de duplicate but more readable this way
const findAllAntinodesForFreq = (
  grid: Grid<string>,
  freq: string,
  antinodes: Set<string> = new Set<string>(),
) => {
  const antennas = grid.findValueInGrid(freq);
  for (let i = 0; i < antennas.length; i++) {
    for (let j = i + 1; j < antennas.length; j++) {
      const a = antennas[i];
      const b = antennas[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      let mult = 1;
      while (true) {
        const newNodeA = { x: b.x + mult * dx, y: b.y + mult * dy };
        const newNodeB = { x: a.x - mult * dx, y: a.y - mult * dy };
        if (grid.isCoordValid(newNodeA)) antinodes.add(getCoordKey(newNodeA));
        if (grid.isCoordValid(newNodeB)) antinodes.add(getCoordKey(newNodeB));
        if (!grid.isCoordValid(newNodeA) && !grid.isCoordValid(newNodeB)) break;
        mult++;
      }
    }
  }
  return antinodes;
};

export const day8 = (input: string[]) => {
  const grid = createGridFromInput(input);
  const freqs = findFreqs(grid);
  let antinodes = new Set<string>();
  freqs.forEach((freq) => {
    antinodes = findAntinodePairForFreq(grid, freq, antinodes);
  });
  return antinodes.size;
};

export const day8part2 = (input: string[]) => {
  const grid = createGridFromInput(input);
  const freqs = findFreqs(grid);
  let antinodes = new Set<string>();
  freqs.forEach((freq) => {
    antinodes = findAllAntinodesForFreq(grid, freq, antinodes);
  });
  return antinodes.size;
};
