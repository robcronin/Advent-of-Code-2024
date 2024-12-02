import { countArr } from '../utils/array';
import { parseInput } from '../utils/input';

type Level = number;
type Report = Level[];

const parseReports = (input: string[]): Report[] =>
  input.map((line) => parseInput(line) as number[]);

const getIsReportSafe = (report: Report): boolean => {
  const minChange = 1;
  const maxChange = 3;
  const isAllIncreasing = report.every(
    (level, index) => index === 0 || level > report[index - 1],
  );
  const isAllDecreasing = report.every(
    (level, index) => index === 0 || level < report[index - 1],
  );
  const isGradual = report.every(
    (level, index) =>
      index === 0 ||
      (Math.abs(level - report[index - 1]) >= minChange &&
        Math.abs(level - report[index - 1]) <= maxChange),
  );

  return (isAllDecreasing || isAllIncreasing) && isGradual;
};

const getIsReportSafeWithRemove = (report: Report): boolean => {
  const isFullSafe = getIsReportSafe(report);
  const isRemoveOneSafe = report.some((_, i) =>
    getIsReportSafe([...report.slice(0, i), ...report.slice(i + 1)]),
  );

  return isFullSafe || isRemoveOneSafe;
};

export const day2 = (input: string[]) => {
  const reports = parseReports(input);
  return countArr(reports, getIsReportSafe);
};

export const day2part2 = (input: string[]) => {
  const reports = parseReports(input);
  return countArr(reports, getIsReportSafeWithRemove);
};
