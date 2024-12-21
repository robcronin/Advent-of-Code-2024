import { sumArr } from '../utils/array';
import { Coords, createGridFromInput, Grid } from '../utils/grid';
import { parseInput } from '../utils/input';
import { range } from '../utils/looping';

type Dir = '^' | '>' | 'v' | '<';
type Map = Grid<Spot>;

enum Spot {
  ROBOT = '@',
  BOX = 'O',
  EMPTY = '.',
  WALL = '#',
  LEFT_BOX = '[',
  RIGHT_BOX = ']',
}

const getDiffFromDir = (dir: Dir) => {
  switch (dir) {
    case '^':
      return [-1, 0];
    case '<':
      return [0, -1];
    case '>':
      return [0, 1];
    case 'v':
      return [1, 0];
  }
};

const parseMapAndDirs = (input: string[]) => {
  const map = createGridFromInput(parseInput(input[0]) as string[]) as Map;
  const dirs = (parseInput(input[1]) as string[]).reduce(
    (acc: string[], line) => [...acc, ...line],
    [],
  ) as Dir[];
  return { map, dirs };
};

const scaleMap: Record<string, [Spot, Spot]> = {
  [Spot.WALL]: [Spot.WALL, Spot.WALL],
  [Spot.BOX]: [Spot.LEFT_BOX, Spot.RIGHT_BOX],
  [Spot.EMPTY]: [Spot.EMPTY, Spot.EMPTY],
  [Spot.ROBOT]: [Spot.ROBOT, Spot.EMPTY],
};

const scaleUpMap = (map: Map): Map => {
  const scaledMap = new Grid(map.numRows, map.numCols * 2, Spot.EMPTY);
  range(map.numRows).forEach((x) => {
    range(map.numCols).forEach((y) => {
      const value = map.get({ x, y });
      const mapped = scaleMap[value];
      scaledMap.set({ x, y: y * 2 }, mapped[0]);
      scaledMap.set({ x, y: y * 2 + 1 }, mapped[1]);
    });
  });
  return scaledMap;
};

const moveRobot = (map: Map, dir: Dir) => {
  const [dx, dy] = getDiffFromDir(dir);
  const robot = map.findValueInGrid(Spot.ROBOT)[0];
  let nextSpot = { x: robot.x + dx, y: robot.y + dy };
  if (map.get(nextSpot) === Spot.EMPTY) {
    map.set(nextSpot, Spot.ROBOT);
    map.set(robot, Spot.EMPTY);
  } else if (map.get(nextSpot) === Spot.WALL) {
    return;
  } else {
    while (![Spot.EMPTY, Spot.WALL].includes(map.get(nextSpot))) {
      nextSpot = { x: nextSpot.x + dx, y: nextSpot.y + dy };
    }
    if (map.get(nextSpot) === Spot.WALL) return;
    map.set(robot, Spot.EMPTY);
    map.set({ x: robot.x + dx, y: robot.y + dy }, Spot.ROBOT);
    map.set(nextSpot, Spot.BOX);
  }
};

type BigBox = [Coords, Coords];

const getAffectedBoxes = (map: Map, nextSpot: Coords, dx: number) => {
  // get initial box
  let affectedBoxes: BigBox[] = [];
  if (map.get(nextSpot) === Spot.LEFT_BOX) {
    affectedBoxes.push([nextSpot, { ...nextSpot, y: nextSpot.y + 1 }]);
  } else if (map.get(nextSpot) === Spot.RIGHT_BOX) {
    affectedBoxes.push([{ ...nextSpot, y: nextSpot.y - 1 }, nextSpot]);
  }

  let row = nextSpot.x;
  let canMove = true;
  let boxesToCheck: BigBox[] = [...affectedBoxes];
  while (boxesToCheck.length > 0) {
    const boxesToAdd: BigBox[] = [];
    for (const box of boxesToCheck) {
      // check if next box is wall
      if (map.get({ ...box[0], x: box[0].x + dx }) === Spot.WALL)
        canMove = false;
      if (map.get({ x: box[1].x + dx, y: box[1].y }) === Spot.WALL)
        canMove = false;

      // check if box directly sits next
      if (map.get({ x: box[0].x + dx, y: box[0].y }) === Spot.LEFT_BOX) {
        boxesToAdd.push([
          { x: box[0].x + dx, y: box[0].y },
          { x: box[0].x + dx, y: box[0].y + 1 },
        ]);
      }
      // check if next box shifted to left
      if (map.get({ x: box[0].x + dx, y: box[0].y }) === Spot.RIGHT_BOX) {
        boxesToAdd.push([
          { x: box[0].x + dx, y: box[0].y - 1 },
          { x: box[0].x + dx, y: box[0].y },
        ]);
      }
      // check if next box shifted to right
      if (map.get({ x: box[1].x + dx, y: box[1].y }) === Spot.LEFT_BOX) {
        boxesToAdd.push([
          { x: box[1].x + dx, y: box[1].y },
          { x: box[1].x + dx, y: box[1].y + 1 },
        ]);
      }
    }
    row += dx;
    boxesToCheck = [...boxesToAdd];
    affectedBoxes = affectedBoxes.concat(boxesToAdd);
  }
  return { affectedBoxes, canMove };
};

const moveRobotScaled = (map: Map, dir: Dir) => {
  const [dx, dy] = getDiffFromDir(dir);
  let robot = map.findValueInGrid(Spot.ROBOT)[0];
  let nextSpot = { x: robot.x + dx, y: robot.y + dy };
  if (map.get(nextSpot) === Spot.EMPTY) {
    map.set(nextSpot, Spot.ROBOT);
    map.set(robot, Spot.EMPTY);
  } else if (map.get(nextSpot) === Spot.WALL) {
    return;
  } else {
    if (dir === '<' || dir === '>') {
      while (![Spot.EMPTY, Spot.WALL].includes(map.get(nextSpot))) {
        nextSpot = { x: nextSpot.x + dx, y: nextSpot.y + dy };
      }
      if (map.get(nextSpot) === Spot.WALL) return;
      map.set(robot, Spot.EMPTY);
      map.set({ x: robot.x + dx, y: robot.y + dy }, Spot.ROBOT);

      if (dir === '<') {
        for (let y = robot.y - 2; y > nextSpot.y; y -= 2) {
          map.set({ x: robot.x, y }, Spot.RIGHT_BOX);
          map.set({ x: robot.x, y: y + dy }, Spot.LEFT_BOX);
        }
      } else {
        for (let y = robot.y + 2; y < nextSpot.y; y += 2) {
          map.set({ x: robot.x, y }, Spot.LEFT_BOX);
          map.set({ x: robot.x, y: y + dy }, Spot.RIGHT_BOX);
        }
      }
    } else {
      const { affectedBoxes, canMove } = getAffectedBoxes(map, nextSpot, dx);
      if (canMove) {
        affectedBoxes.forEach((box) => {
          map.set(box[0], Spot.EMPTY);
          map.set(box[1], Spot.EMPTY);
        });
        affectedBoxes.forEach((box) => {
          map.set({ ...box[0], x: box[0].x + dx }, Spot.LEFT_BOX);
          map.set({ ...box[1], x: box[1].x + dx }, Spot.RIGHT_BOX);
        });
        map.set(robot, Spot.EMPTY);
        map.set(nextSpot, Spot.ROBOT);
      }
    }
  }
};

const getSumGps = (map: Map) => {
  const smallBoxes = map.findValueInGrid(Spot.BOX);
  const largeBoxes = map.findValueInGrid(Spot.LEFT_BOX);
  const boxes = [...smallBoxes, ...largeBoxes];
  return sumArr(boxes, (box) => 100 * box.x + box.y);
};

export const day15 = (input: string[]) => {
  const { map, dirs } = parseMapAndDirs(input);
  dirs.forEach((dir) => moveRobot(map, dir));
  return getSumGps(map);
};

export const day15part2 = (input: string[]) => {
  const { map, dirs } = parseMapAndDirs(input);
  const scaledMap = scaleUpMap(map);
  dirs.forEach((dir) => moveRobotScaled(scaledMap, dir));
  return getSumGps(scaledMap);
};
