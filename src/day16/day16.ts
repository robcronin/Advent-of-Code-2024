import { simpleDijk } from '../utils/dijk';
import {
  Coords,
  createGridFromInput,
  directions,
  getCoordKey,
  Grid,
  isCoordsEqual,
} from '../utils/grid';

type Node = Coords & { cost: number; dirIndex: number; path: string };

const getVisitedKey = (node: Node) => getCoordKey(node) + `,${node.dirIndex}`;
const isOptionEqual = (optA: Node, optB: Node) =>
  isCoordsEqual(optA, optB) && optA.dirIndex === optB.dirIndex;

const getValidOptions = (
  grid: Grid<string>,
  node: Node,
  visitedSet: Set<string>,
  visitedCost?: Record<string, number>,
): Node[] => {
  const options: Node[] = [];

  const [dx, dy] = directions[node.dirIndex];
  const forwardPos = { x: node.x + dx, y: node.y + dy };
  if (grid.isCoordValid(forwardPos) && grid.get(forwardPos) !== '#') {
    options.push({
      ...node,
      ...forwardPos,
      cost: node.cost + 1,
      path: node.path + `;${getCoordKey(forwardPos)}`,
    });
  }

  const newDirs = [node.dirIndex - 1, node.dirIndex + 1].map(
    (n) => (n + 4) % 4,
  );
  newDirs.forEach((newDir) => {
    options.push({ ...node, cost: node.cost + 1000, dirIndex: newDir });
  });

  // bfs method to revisit visted cells if cheaper
  if (visitedCost) {
    return options.filter((opt) => {
      const key = getVisitedKey(opt);
      if (visitedCost[key]) {
        if (visitedCost[key] >= opt.cost) {
          visitedCost[key] = opt.cost;
          return true;
        }
        return false;
      } else {
        visitedCost[key] = opt.cost;
        return true;
      }
    });
  }

  return options.filter((opt) => !visitedSet.has(getVisitedKey(opt)));
};

const getSmallestCost = (grid: Grid<string>) =>
  simpleDijk({
    grid,
    start: grid.findValueInGrid('S')[0],
    end: grid.findValueInGrid('E')[0],
    getValidOptions,
    getVisitedKey,
    isOptionEqual,
    extraStartNode: { dirIndex: 0, path: '' },
  });

// Couldn't get dijkstra with multiple paths working so made a slow bfs with optimum built in
const getPathsOfOptimumLength = (grid: Grid<string>, optimumCost: number) => {
  const start = grid.findValueInGrid('S')[0];
  const end = grid.findValueInGrid('E')[0];

  let options: Node[] = [
    { ...start, path: getCoordKey(start), dirIndex: 0, cost: 0 },
  ];
  const paths: string[] = [];
  const visitedSet = new Set<string>();
  const visitedCost: Record<string, number> = {};
  while (options.length > 0) {
    const newOptions: Node[] = [];
    for (const option of options) {
      visitedSet.add(getVisitedKey(option));
      if (isCoordsEqual(option, end)) {
        if (option.cost === optimumCost) {
          paths.push(option.path);
        }
      } else {
        const validOptions = getValidOptions(
          grid,
          option,
          new Set(),
          visitedCost,
        );
        const lowCostOptions = validOptions.filter(
          (opt) => opt.cost <= optimumCost,
        );
        newOptions.push(...lowCostOptions);
      }
    }

    options = newOptions;
  }
  return paths;
};

export const day16 = (input: string[]) => {
  const grid = createGridFromInput(input);
  return getSmallestCost(grid);
};

export const day16part2 = (input: string[]) => {
  const grid = createGridFromInput(input);
  const smallestCost = getSmallestCost(grid);

  const seats = new Set<string>();
  const paths = getPathsOfOptimumLength(grid, smallestCost);
  paths.forEach((p) => p.split(';').forEach((c) => seats.add(c)));
  return seats.size;
};
