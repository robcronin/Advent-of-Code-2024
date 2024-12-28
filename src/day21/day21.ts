import { sumArr } from '../utils/array';
import { Coords, createGridFromInput, getCoordKey, Grid } from '../utils/grid';
import { range } from '../utils/looping';

type Direction = '<' | 'v' | '>' | '^';
enum DirectionButton {
  LEFT = '<',
  RIGHT = '>',
  DOWN = 'v',
  UP = '^',
  PRESS = 'A',
  VOID = '#',
}
enum GridType {
  NUMERIC = 'NUMERIC',
  DIRECTIONAL = 'DIRECTIONAL',
}
type State = {
  grids: GridType[];
  positions: Coords[];
  codePressed: string;
  target: string;
  lastPressed: string[];
  numPresses: number;
  sequence: string;
};
const buttonOptions = [
  DirectionButton.DOWN,
  DirectionButton.LEFT,
  DirectionButton.RIGHT,
  DirectionButton.UP,
  DirectionButton.PRESS,
];

const createNumericKeyboard = () =>
  createGridFromInput(['789', '456', '123', '#0A']);
const createDirectionalKeyboard = () => createGridFromInput(['#^A', '<v>']);
const numericKeyboard = createNumericKeyboard();
const directionalKeyboard = createDirectionalKeyboard();
const cache = new Map<string, number>();

const createState = (
  target: string,
  numDirRobots: number,
  noNumeric?: boolean,
): State => {
  const grids = [...range(numDirRobots).map(() => GridType.DIRECTIONAL)];
  if (!noNumeric) grids.push(GridType.NUMERIC);
  const dirStart = directionalKeyboard.findValueInGrid('A')[0];
  const positions = [...range(numDirRobots).map(() => dirStart)];
  if (!noNumeric) positions.push(numericKeyboard.findValueInGrid('A')[0]);
  const codePressed = '';
  const lastPressed = [...range(numDirRobots).map(() => '')];
  return {
    grids,
    positions,
    codePressed,
    target,
    lastPressed,
    numPresses: 0,
    sequence: '',
  };
};

const getStateKey = (state: State): string => {
  let key = `${state.codePressed};`;
  const coordKeys = state.positions.map((c) => getCoordKey(c));
  return key + coordKeys.join(';') + state.sequence; // removing sequence here speeds up p1 massively but its getting lucky
};

const moveArm = (grid: Grid<string>, pos: Coords, direction: Direction) => {
  let newPos: Coords = pos;
  if (direction === '>') newPos = { x: pos.x, y: pos.y + 1 };
  if (direction === '<') newPos = { x: pos.x, y: pos.y - 1 };
  if (direction === '^') newPos = { x: pos.x - 1, y: pos.y };
  if (direction === 'v') newPos = { x: pos.x + 1, y: pos.y };
  if (grid.isCoordValid(newPos) && grid.get(newPos) !== '#') return newPos;
  return undefined;
};

const pressButton = (
  button: DirectionButton,
  state: State,
): State | undefined => {
  let gridIndex = 0;
  let buttonPressed = button;
  const newState: State = {
    ...state,
    positions: [...state.positions],
    lastPressed: [...state.lastPressed],
    numPresses: state.numPresses + 1,
    sequence: state.sequence + button,
  };
  while (gridIndex < state.grids.length) {
    const grid =
      state.grids[gridIndex] === GridType.DIRECTIONAL
        ? directionalKeyboard
        : numericKeyboard;
    const pos = state.positions[gridIndex];
    if (buttonPressed === DirectionButton.VOID) throw new Error('void pressed');
    else if (buttonPressed === DirectionButton.PRESS) {
      newState.lastPressed[gridIndex] = '';
      if (gridIndex === state.grids.length - 1) {
        newState.codePressed += grid.get(pos);
        if (newState.target.startsWith(newState.codePressed)) return newState;
        return undefined;
      } else {
        buttonPressed = grid.get(pos) as DirectionButton;
        gridIndex++;
      }
    } else {
      newState.lastPressed[gridIndex] += buttonPressed;
      if (
        gridIndex === state.grids.length - 1 ||
        newState.lastPressed[gridIndex].length < 4
      ) {
        const newPos = moveArm(grid, pos, buttonPressed);
        if (newPos) {
          newState.positions[gridIndex] = newPos;
          return newState;
        }
      }
      return undefined;
    }
  }
};

const getMinSequenceBfs = (
  target: string,
  numDirRobots: number,
  noNumeric?: boolean,
) => {
  let startState = createState(target, numDirRobots, noNumeric);

  let seqLength = 0;
  let states: State[] = [startState];
  const visited = new Set<string>();
  visited.add(getStateKey(startState));
  const answers: { seqLength: number; sequence: string }[] = [];
  while (states.length > 0 && answers.length === 0) {
    const newStates: State[] = [];
    for (const state of states) {
      buttonOptions.forEach((button) => {
        const newState = pressButton(button, state);
        if (newState) {
          const stateKey = getStateKey(newState);
          if (!visited.has(stateKey)) {
            newStates.push(newState);
            visited.add(stateKey);
            if (newState.codePressed === newState.target) {
              answers.push({
                seqLength: seqLength + 1,
                sequence: newState.sequence,
              });
            }
          }
        }
      });
    }
    seqLength++;
    states = newStates;
  }
  return answers;
};

const splitSeqOnAs = (sequence: string): string[] => {
  const splits = [];
  let current = '';
  for (let i = 0; i < sequence.length; i++) {
    current += sequence[i];
    if (sequence[i] === 'A') {
      splits.push(current);
      current = '';
    }
  }
  return splits;
};

const recursiveGetSequenceLengthForTarget = (
  target: string,
  depth: number,
): number => {
  const key = `${target};${depth}`;
  if (cache.has(key)) return cache.get(key) as number;
  if (!target.endsWith('A')) throw new Error('Sequence needs to end with A');
  if (depth === 1) return target.length;

  if (target.length > 1 && target.indexOf('A') !== target.length - 1) {
    const splits = splitSeqOnAs(target);
    const ans = sumArr(splits, (split) =>
      recursiveGetSequenceLengthForTarget(split, depth),
    );
    cache.set(key, ans);
    return ans;
  }

  const options = getMinSequenceBfs(target, 1, true);

  let min = Number.MAX_SAFE_INTEGER;
  options.forEach((option) => {
    const splits = splitSeqOnAs(option.sequence);
    const ans = sumArr(splits, (split) =>
      recursiveGetSequenceLengthForTarget(split, depth - 1),
    );
    min = Math.min(ans, min);
  });
  cache.set(key, min);
  return min;
};

const getSequenceLengthForTarget = (target: string, numDirRobots: number) => {
  const numericMins = getMinSequenceBfs(target, 0);
  let min = Number.MAX_SAFE_INTEGER;
  numericMins.forEach((numericMin) => {
    const length = recursiveGetSequenceLengthForTarget(
      numericMin.sequence,
      numDirRobots,
    );
    min = Math.min(min, length);
  });
  return min;
};

const getCodeComplexity = (target: string, numDirRobots: number) => {
  const seqLength = getSequenceLengthForTarget(target, numDirRobots + 1);
  const numeric = +target.slice(0, 3);
  return seqLength * numeric;
};

export const day21 = (input: string[]) =>
  sumArr(input, (target) => getCodeComplexity(target, 2));

export const day21part2 = (input: string[], numDirRobots: number) =>
  sumArr(input, (target) => getCodeComplexity(target, numDirRobots));
