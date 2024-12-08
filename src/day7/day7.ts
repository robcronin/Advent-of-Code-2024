import { sumArr } from '../utils/array';
import { parseInput } from '../utils/input';

type Calibration = { testValue: number; values: number[] };

const parseCalibrations = (input: string[]): Calibration[] =>
  input.map((line) => {
    const [testValue, valueString] = line.split(': ');
    const values = parseInput(valueString) as number[];
    return { testValue: +testValue, values };
  });

const getCanReachSum = (
  current: number,
  target: number,
  remainingValues: number[],
  opOptions: string[],
): boolean => {
  if (remainingValues.length === 0) return current === target;
  if (current > target) return false;
  const newRemainingValues = remainingValues.slice(1);
  for (const op of opOptions) {
    let next = current;
    if (op === '+') next += remainingValues[0];
    else if (op === '*') next *= remainingValues[0];
    else if (op === '||')
      next = parseInt(next.toString() + remainingValues[0].toString());

    if (getCanReachSum(next, target, newRemainingValues, opOptions))
      return true;
  }
  return false;
};

const getIsCalibrationValid = (
  calibration: Calibration,
  opOptions: string[],
) => {
  const { testValue, values } = calibration;
  return getCanReachSum(values[0], testValue, values.slice(1), opOptions);
};

export const day7 = (input: string[]) => {
  const calibrations = parseCalibrations(input);
  const validCalibrations = calibrations.filter((c) =>
    getIsCalibrationValid(c, ['+', '*']),
  );
  return sumArr(validCalibrations, (calibration) => calibration.testValue);
};

export const day7part2 = (input: string[]) => {
  const calibrations = parseCalibrations(input);
  const validCalibrations = calibrations.filter((c) =>
    getIsCalibrationValid(c, ['+', '*', '||']),
  );
  return sumArr(validCalibrations, (calibration) => calibration.testValue);
};
