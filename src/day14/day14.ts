import { Coords, Grid } from '../utils/grid';

type GridSize = { w: number; h: number };
type Robot = { p: Coords; v: Coords };

const quadrants = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

const parseRobots = (input: string[]): Robot[] =>
  input.map((line) => {
    const groups = line.match(
      new RegExp('p=(-?[0-9]+),(-?[0-9]+) v=(-?[0-9]+),(-?[0-9]+)'),
    );
    if (!groups) throw new Error(`${line} is not a valid robot`);
    const p = { x: +groups[1], y: +groups[2] };
    const v = { x: +groups[3], y: +groups[4] };
    return { p, v };
  });

const getPositionAfterNumSteps = (
  robot: Robot,
  size: GridSize,
  numSteps: number,
): Coords => {
  const { w, h } = size;
  let x = robot.p.x + numSteps * robot.v.x;
  if (x < 0) x += Math.ceil(-x / w) * w;
  const loopedX = x % w;

  let y = robot.p.y + numSteps * robot.v.y;
  if (y < 0) y += Math.ceil(-y * h) * h;
  const loopedY = y % h;

  // my grid is reversed to the question
  return { x: loopedY, y: loopedX };
};

const getSumInQuadrant = (grid: Grid<number>, quadrant: number[]) => {
  const [dx, dy] = quadrant;
  const startX = dx === 0 ? 0 : (grid.numRows + 1) / 2;
  const endX = dx === 0 ? Math.floor(grid.numRows / 2) : grid.numRows;
  const startY = dy === 0 ? 0 : (grid.numCols + 1) / 2;
  const endY = dy === 0 ? Math.floor(grid.numCols / 2) : grid.numCols;

  let sum = 0;
  for (let x = startX; x < endX; x++) {
    for (let y = startY; y < endY; y++) {
      sum += grid.get({ x, y });
    }
  }
  return sum;
};

export const day14 = (input: string[], size: GridSize) => {
  const grid = new Grid(size.h, size.w, 0);
  const robots = parseRobots(input);
  robots.forEach((robot) => {
    const newP = getPositionAfterNumSteps(robot, size, 100);
    grid.set(newP, grid.get(newP) + 1);
  });

  let ans = 1;
  quadrants.forEach((quadrant) => {
    ans *= getSumInQuadrant(grid, quadrant);
  });
  return ans;
};

export const day14part2 = (input: string[], size: GridSize) => {
  const robots = parseRobots(input);

  let numSteps = 0;
  while (true) {
    numSteps++;
    const grid = new Grid(size.h, size.w, 0);
    robots.forEach((robot) => {
      const newP = getPositionAfterNumSteps(robot, size, numSteps);
      grid.set(newP, grid.get(newP) + 1);
    });
    if (grid.findValueInGrid(1).length === robots.length) {
      break;
    }
  }
  const grid = new Grid(size.h, size.w, ' ');
  robots.forEach((robot) => {
    const newP = getPositionAfterNumSteps(robot, size, numSteps);
    grid.set(newP, '#');
  });
  grid.print();
  return numSteps;
};
