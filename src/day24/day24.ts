import { countArr } from '../utils/array';
import { parseInput } from '../utils/input';
import { range } from '../utils/looping';

type Wires = Record<string, 0 | 1>;
enum GateType {
  AND = 'AND',
  OR = 'OR',
  XOR = 'XOR',
}
type Gate = {
  type: GateType;
  a: string;
  b: string;
  output: string;
  isOutputted: boolean;
};

const parseWiresAndGates = (
  input: string[],
): { wires: Wires; gates: Gate[] } => {
  const wireString = parseInput(input[0]) as string[];
  const wires = wireString.reduce((acc, line) => {
    const [wire, value] = line.split(': ');
    return { ...acc, [wire]: +value };
  }, {});
  const gateString = parseInput(input[1]) as string[];
  const gates = gateString.map((line) => {
    const groups = line.match(
      new RegExp('([a-z0-9]+) (AND|OR|XOR) ([a-z0-9]+) -> ([a-z0-9]+)'),
    );
    if (!groups) throw new Error(`Can't parse ${line}`);
    const [_, a, type, b, output] = groups;
    return { a, b, output, type: type as GateType, isOutputted: false };
  });
  return { wires, gates };
};

const runGates = (wires: Wires, gates: Gate[]) => {
  let numOutputted = 0;
  while (numOutputted < gates.length) {
    for (const gate of gates) {
      if (gate.isOutputted) continue;
      const { a, b, type, output } = gate;
      if (wires[a] !== undefined && wires[b] !== undefined) {
        gate.isOutputted = true;
        numOutputted++;
        if (type === GateType.AND) {
          if (wires[a] === 1 && wires[b] === 1) wires[output] = 1;
          else wires[output] = 0;
        } else if (type === GateType.OR) {
          if (wires[a] === 1 || wires[b] === 1) wires[output] = 1;
          else wires[output] = 0;
        } else if (type === GateType.XOR) {
          if (wires[a] !== wires[b]) wires[output] = 1;
          else wires[output] = 0;
        }
      }
    }
  }
};

const getZ = (wires: Wires) => {
  const wireNames = Object.keys(wires);
  const numZ = countArr(wireNames, (w) => w.startsWith('z'));
  let ans = 0;
  range(numZ).forEach((i) => {
    const bit = wires[`z${i < 10 ? '0' : ''}${i}`];
    if (bit === 1) ans += 2 ** i;
  });
  return ans;
};

export const day24 = (input: string[]) => {
  const { wires, gates } = parseWiresAndGates(input);
  runGates(wires, gates);
  return getZ(wires);
};

export const day24part2 = (input: string[]) => {
  return 24;
};
