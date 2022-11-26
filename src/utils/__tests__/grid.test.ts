import {
  countValueInGrid,
  deepCopyGrid,
  genNewGrid,
  getNeighbourCoords,
  printGrid,
  reversePrintGrid,
  runFnOnGrid,
} from '../grid';

describe('genNewGrid', () => {
  it('should generate a new grid', () => {
    expect(genNewGrid({ numRows: 2, numCols: 3, defaultValue: 0 })).toEqual({
      numRows: 2,
      numCols: 3,
      grid: [
        [0, 0, 0],
        [0, 0, 0],
      ],
    });
  });
});

describe('deepCopyGrid', () => {
  it('should deep copy an existing grid', () => {
    const gridInfo1 = genNewGrid({ numRows: 3, numCols: 3, defaultValue: 0 });
    const gridInfo2 = deepCopyGrid({ gridInfo: gridInfo1 });
    gridInfo1.grid[1][1] = 1;
    gridInfo2.grid[2][2] = 2;
    expect(gridInfo1.grid).toEqual([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]);
    expect(gridInfo2.grid).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 2],
    ]);
  });
});

describe('getNeighbourCoords', () => {
  describe('getNeighbourCoords not diagonal', () => {
    const gridInfo = { grid: [], numRows: 5, numCols: 6 };
    it('should return 2 neighbours for top left corner', () => {
      expect(getNeighbourCoords({ coords: { x: 0, y: 0 }, gridInfo })).toEqual([
        { x: 1, y: 0 },
        { x: 0, y: 1 },
      ]);
    });
    it('should return 2 neighbours for bottom right corner', () => {
      expect(getNeighbourCoords({ coords: { x: 4, y: 5 }, gridInfo })).toEqual([
        { x: 3, y: 5 },
        { x: 4, y: 4 },
      ]);
    });
    it('should return 3 neighbours for top row', () => {
      expect(getNeighbourCoords({ coords: { x: 1, y: 0 }, gridInfo })).toEqual([
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
      ]);
    });
    it('should return 4 neighbours for middle value', () => {
      expect(getNeighbourCoords({ coords: { x: 3, y: 4 }, gridInfo })).toEqual([
        { x: 2, y: 4 },
        { x: 3, y: 3 },
        { x: 4, y: 4 },
        { x: 3, y: 5 },
      ]);
    });
  });
  describe('getNeighbourCoords with diagonal', () => {
    const gridInfo = { grid: [], numRows: 5, numCols: 6 };
    it('should return 3 neighbours for top left corner', () => {
      expect(
        getNeighbourCoords({
          coords: { x: 0, y: 0 },
          gridInfo,
          isDiagonal: true,
        }),
      ).toEqual([
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ]);
    });
    it('should return 3 neighbours for bottom right corner', () => {
      expect(
        getNeighbourCoords({
          coords: { x: 4, y: 5 },
          gridInfo,
          isDiagonal: true,
        }),
      ).toEqual([
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 3, y: 4 },
      ]);
    });
    it('should return 5 neighbours for top row', () => {
      expect(
        getNeighbourCoords({
          coords: { x: 1, y: 0 },
          gridInfo,
          isDiagonal: true,
        }),
      ).toEqual([
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 2, y: 1 },
      ]);
    });
    it('should return 8 neighbours for middle value', () => {
      expect(
        getNeighbourCoords({
          coords: { x: 3, y: 4 },
          gridInfo,
          isDiagonal: true,
        }),
      ).toEqual([
        { x: 2, y: 4 },
        { x: 3, y: 3 },
        { x: 4, y: 4 },
        { x: 3, y: 5 },

        { x: 2, y: 3 },
        { x: 2, y: 5 },
        { x: 4, y: 3 },
        { x: 4, y: 5 },
      ]);
    });
  });
});

describe('runFnOnGrid', () => {
  it('should run a function on a grid and return a new copy', () => {
    const gridInfo = genNewGrid({ numRows: 2, numCols: 3, defaultValue: 0 });
    const newGridInfo = runFnOnGrid({
      gridInfo,
      fnToRun: ({ coords, grid }) => coords.x + coords.y,
    });
    expect(gridInfo).toEqual({
      grid: [
        [0, 0, 0],
        [0, 0, 0],
      ],
      numCols: 3,
      numRows: 2,
    });
    expect(newGridInfo).toEqual({
      grid: [
        [0, 1, 2],
        [1, 2, 3],
      ],
      numCols: 3,
      numRows: 2,
    });
  });
  it('should run a function dependent on the grid', () => {
    const newGridInfo = runFnOnGrid({
      gridInfo: {
        grid: [
          [0, 1, 2],
          [1, 2, 3],
        ],
        numCols: 3,
        numRows: 2,
      },
      fnToRun: ({ coords, grid }) => {
        const { x, y } = coords;
        return grid[x][y] + 2;
      },
    });
    expect(newGridInfo).toEqual({
      grid: [
        [2, 3, 4],
        [3, 4, 5],
      ],
      numCols: 3,
      numRows: 2,
    });
  });
  it('should run a function dependent on the value', () => {
    const newGridInfo = runFnOnGrid({
      gridInfo: {
        grid: [
          [0, 1, 2],
          [1, 2, 3],
        ],
        numCols: 3,
        numRows: 2,
      },
      fnToRun: ({ value }) => value + 2,
    });
    expect(newGridInfo).toEqual({
      grid: [
        [2, 3, 4],
        [3, 4, 5],
      ],
      numCols: 3,
      numRows: 2,
    });
  });
});

describe('printGrid', () => {
  it('should print the grid', () => {
    expect(
      printGrid({
        grid: [
          [2, 3, 4],
          [3, 4, 5],
        ],
        numCols: 3,
        numRows: 2,
      }),
    ).toBe('2 3 4 \n3 4 5 \n');
  });
});

describe('reversePrintGrid', () => {
  it('should reverse print the grid based on x y axis', () => {
    expect(
      reversePrintGrid({
        grid: [
          [2, 3, 4],
          [3, 4, 5],
        ],
        numCols: 3,
        numRows: 2,
      }),
    ).toBe('2 3 \n3 4 \n4 5 \n');
  });
});

describe('countValueInGrid', () => {
  it('should count the number of occurences of a value in the grid', () => {
    expect(
      countValueInGrid(
        {
          grid: [
            [2, 3, 4],
            [3, 4, 5],
          ],
          numCols: 3,
          numRows: 2,
        },
        3,
      ),
    ).toBe(2);
  });
});
