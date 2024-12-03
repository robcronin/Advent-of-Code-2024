import { sumArr } from '../utils/array';

const parseOps = (input: string) => {
  const groups = input.match(
    new RegExp(/(mul\([0-9]+,[0-9]+\))|(don\'t)|(do)/, 'g'),
  );
  if (!groups) throw new Error('No groups found');
  return groups.map((g) => {
    if (g === 'do' || g === "don't") return { isEnabled: g === 'do' };
    const [start, end] = g.split(',');
    const a = parseInt(start.slice(4));
    const b = parseInt(end.slice(0, -1));
    return { a, b };
  });
};

export const day3 = (input: string) => {
  const ops = parseOps(input);
  return sumArr(ops, (op) => (op.isEnabled !== undefined ? 0 : op.a * op.b));
};

export const day3part2 = (input: string) => {
  const ops = parseOps(input);
  let sum = 0;
  let enabled = true;
  for (const op of ops) {
    if (op.isEnabled !== undefined) enabled = op.isEnabled;
    else if (enabled) sum += op.a * op.b;
  }
  return sum;
};
