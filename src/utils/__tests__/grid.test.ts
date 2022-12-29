import { createGridFromInput, createNumberGridFromInput, Grid } from '../grid';

describe('constructor', () => {
  it('should generate a new grid', () => {
    const grid = new Grid(2, 3, 0);
    expect(grid.print(true)).toEqual(
      `0 0 0
0 0 0
`,
    );
  });
});

describe('deepCopyGrid', () => {
  it('should deep copy an existing grid', () => {
    const grid1 = new Grid(2, 3, 0);
    grid1.set({ x: 0, y: 0 }, 10);
    const grid2 = grid1.createDeepCopy();
    grid1.set({ x: 1, y: 1 }, 1);
    grid2.set({ x: 1, y: 1 }, 2);
    expect(grid1.get({ x: 0, y: 0 })).toBe(10);
    expect(grid1.get({ x: 1, y: 1 })).toBe(1);
    expect(grid1.get({ x: 0, y: 0 })).toBe(10);
    expect(grid2.get({ x: 1, y: 1 })).toBe(2);
  });
});

describe('looping grid', () => {
  it('allow setting and getting outside range', () => {
    const grid = new Grid(2, 3, 0, { looping: true });
    grid.set({ x: 4, y: 4 }, 1);
    expect(grid.get({ x: 4, y: 4 })).toBe(1);
    expect(grid.get({ x: 0, y: 1 })).toBe(1);
  });
});

describe('reversePrint', () => {
  it('should print the grid with rows/cols swapped', () => {
    const grid = new Grid(2, 3, 0);
    expect(grid.reversePrint(true)).toEqual(
      `0 0
0 0
0 0
`,
    );
  });
});

describe('isCoordValid', () => {
  const grid = new Grid(3, 3, 0);
  it.each([
    [true, 1, 1],
    [true, 0, 1],
    [true, 1, 0],
    [true, 2, 1],
    [true, 1, 2],
    [false, -1, 1],
    [false, 3, 1],
    [false, 1, -1],
    [false, 1, 3],
  ])('should return %p for %p, %p being valid', (isValid, x, y) => {
    expect(grid.isCoordValid({ x, y })).toBe(isValid);
  });
});

describe('loop coords', () => {
  const grid = new Grid(3, 3, 0);
  it.each([
    [1, 1, 1, 1],
    [0, 0, 3, 3],
    [1, 2, 10, 11],
    [1, 2, -11, -10],
  ])('should return %p, %p after looping %p %p', (lx, ly, x, y) => {
    expect(grid.loopCoords({ x, y })).toEqual({ x: lx, y: ly });
  });
});

describe('getNeighbours', () => {
  describe('getNeighbours not diagonal', () => {
    const grid = new Grid(5, 6, 0);
    it('should return 2 neighbours for top left corner', () => {
      expect(grid.getNeighbours({ x: 0, y: 0 })).toEqual([
        { x: 0, y: 1 },
        { x: 1, y: 0 },
      ]);
    });
    it('should return 2 neighbours for bottom right corner', () => {
      expect(grid.getNeighbours({ x: 4, y: 5 })).toEqual([
        { x: 4, y: 4 },
        { x: 3, y: 5 },
      ]);
    });
    it('should return 3 neighbours for top row', () => {
      expect(grid.getNeighbours({ x: 1, y: 0 })).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 0 },
        { x: 0, y: 0 },
      ]);
    });
    it('should return 4 neighbours for middle value', () => {
      expect(grid.getNeighbours({ x: 3, y: 4 })).toEqual([
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 3, y: 3 },
        { x: 2, y: 4 },
      ]);
    });
  });
  describe('getNeighbourCoords with diagonal', () => {
    const grid = new Grid(5, 6, 0);
    it('should return 3 neighbours for top left corner', () => {
      expect(grid.getNeighbours({ x: 0, y: 0 }, true)).toEqual([
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ]);
    });
    it('should return 3 neighbours for bottom right corner', () => {
      expect(grid.getNeighbours({ x: 4, y: 5 }, true)).toEqual([
        { x: 4, y: 4 },
        { x: 3, y: 5 },
        { x: 3, y: 4 },
      ]);
    });
    it('should return 5 neighbours for top row', () => {
      expect(grid.getNeighbours({ x: 1, y: 0 }, true)).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 2, y: 1 },
      ]);
    });
    it('should return 8 neighbours for middle value', () => {
      expect(grid.getNeighbours({ x: 3, y: 4 }, true)).toEqual([
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 3, y: 3 },
        { x: 2, y: 4 },
        { x: 2, y: 5 },
        { x: 4, y: 5 },
        { x: 4, y: 3 },
        { x: 2, y: 3 },
      ]);
    });
  });
  describe('getNeighbourCoords with looping', () => {
    const grid = new Grid(5, 6, 0, { looping: true });
    it('should return 4 neighbours on edge', () => {
      expect(grid.getNeighbours({ x: 1, y: 0 })).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 0 },
        { x: 1, y: 5 },
        { x: 0, y: 0 },
      ]);
    });
    it('should return 8 neighbours on edge with looping and diagonal', () => {
      expect(grid.getNeighbours({ x: 1, y: 0 }, true)).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 0 },
        { x: 1, y: 5 },
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: 5 },
        { x: 0, y: 5 },
      ]);
    });
  });
});

describe('createGridFromInput', () => {
  it('should create a grid from string input', () => {
    const grid = createGridFromInput(['abc', 'def']);
    expect(grid.print(true)).toEqual(
      `a b c
d e f
`,
    );
  });
});

describe('createNumberGridFromInput', () => {
  it('should create a number grid from number input', () => {
    const grid = createNumberGridFromInput([123, 456]);
    expect(grid.print(true)).toEqual(
      `1 2 3
4 5 6
`,
    );
  });
});

describe('countValueInGrid', () => {
  it('should count the number of occurences of a value in the grid', () => {
    const grid = createNumberGridFromInput([1232, 4256]);
    expect(grid.countValueInGrid(2)).toBe(3);
  });
});

describe('findValueInGrid', () => {
  it('should find the locations of a value in the grid', () => {
    const grid = createNumberGridFromInput([1232, 4256]);
    expect(grid.findValueInGrid(2)).toEqual([
      { x: 0, y: 1 },
      { x: 0, y: 3 },
      { x: 1, y: 1 },
    ]);
  });
});
