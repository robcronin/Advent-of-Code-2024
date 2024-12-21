import { Coords, Grid, isCoordsEqual } from './grid';

type Node = Coords & { cost: number };

export const simpleDijk = <TNode extends Node>({
  grid,
  start,
  end,
  getValidOptions,
  getVisitedKey,
  isOptionEqual,
  extraStartNode,
}: {
  grid: Grid<string>;
  start: Coords;
  end: Coords;
  getValidOptions: (
    grid: Grid<string>,
    currentNode: TNode,
    visitedSet: Set<string>,
  ) => TNode[];
  getVisitedKey: (node: TNode) => string;
  isOptionEqual: (nodeA: TNode, nodeB: TNode) => boolean;
  extraStartNode?: Omit<TNode, keyof Node>;
}) => {
  const startNode = {
    ...start,
    cost: 0,
    ...extraStartNode,
  } as TNode;
  const queue: TNode[] = [startNode];

  const visitedSet = new Set<string>();
  const maxCost = Number.MAX_SAFE_INTEGER;
  let ans: number = maxCost;

  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (!currentNode) break;

    if (isCoordsEqual(currentNode, end)) {
      ans = Math.min(currentNode.cost, ans);
      break;
    }

    const validOptions = getValidOptions(grid, currentNode, visitedSet);
    visitedSet.add(getVisitedKey(currentNode));

    validOptions.forEach((opt) => {
      const currentOptionCost =
        queue.find((q) => isOptionEqual(q, opt))?.cost || maxCost;

      if (opt.cost < currentOptionCost) queue.push(opt);

      queue.sort((a, b) => a.cost - b.cost);
    });
  }
  return ans;
};
