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
    return { a, b, output, type: type as GateType };
  });
  return { wires, gates };
};

const runGates = (inputWires: Wires, gates: Gate[]): Wires => {
  let numOutputted = 0;
  const wires = { ...inputWires };
  let numChanged = 1;
  while (numOutputted < gates.length && numChanged !== 0) {
    numChanged = 0;
    for (const gate of gates) {
      if (wires[gate.output] !== undefined) continue;
      const { a, b, type, output } = gate;
      if (wires[a] !== undefined && wires[b] !== undefined) {
        numOutputted++;
        numChanged++;
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
  return wires;
};

const getNumber = (wires: Wires, wireName: string): [string, number] => {
  const wireNames = Object.keys(wires);
  const numZ = countArr(wireNames, (w) => w.startsWith(wireName));
  let decimal = 0;
  let binary = '';
  range(numZ).forEach((i) => {
    const bit = wires[`${wireName}${i < 10 ? '0' : ''}${i}`];
    if (bit === 1) decimal += 2 ** i;
    binary = bit + binary;
  });
  return [binary, decimal];
};

const getFirstDiff = (wires: Wires, gates: Gate[]) => {
  const endWires = runGates(wires, gates);
  const [xb, x] = getNumber(endWires, 'x');
  const [yb, y] = getNumber(endWires, 'y');
  const [zb, z] = getNumber(endWires, 'z');
  const actualZb = (x + y).toString(2);
  const diffIndex = range(zb.length).find(
    (i) => zb[zb.length - i - 1] !== actualZb[actualZb.length - i - 1],
  );
  return diffIndex === undefined ? Number.MAX_SAFE_INTEGER : diffIndex;
};

const getWireKey = (name: string, num: number) =>
  `${name}${num < 10 ? '0' : ''}${num}`;

const generateWires = (x: number, y: number) => {
  const xb = x.toString(2);
  const yb = y.toString(2);
  const wires: Wires = range(45).reduce(
    (acc, i) => ({
      ...acc,
      [getWireKey('x', i)]: 0,
      [getWireKey('y', i)]: 0,
    }),
    {},
  );
  [...xb].reverse().forEach((num, i) => {
    wires[getWireKey('x', i)] = +num as 0 | 1;
  });
  [...yb].reverse().forEach((num, i) => {
    wires[getWireKey('y', i)] = +num as 0 | 1;
  });
  return wires;
};

const swapGateOutput = (gates: Gate[], a: string, b: string) => {
  const aGate = gates.find((g) => g.output === a);
  const bGate = gates.find((g) => g.output === b);
  if (!aGate || !bGate) throw new Error('No gate found');
  aGate.output = b;
  bGate.output = a;
};

export const day24 = (input: string[]) => {
  const { wires, gates } = parseWiresAndGates(input);
  const endWires = runGates(wires, gates);
  return getNumber(endWires, 'z')[1];
};

export const day24part2 = (input: string[]) => {
  const { gates } = parseWiresAndGates(input);
  const newW = generateWires(2 ** 45 - 1, 1);
  const diff0 = getFirstDiff(newW, gates);
  // console.log({ diff0 });
  swapGateOutput(gates, 'hbs', 'kfp');
  const diff1 = getFirstDiff(newW, gates);
  // console.log({ diff1 });
  swapGateOutput(gates, 'z22', 'pdg');
  const diff2 = getFirstDiff(newW, gates);
  // console.log({ diff2 });
  swapGateOutput(gates, 'z27', 'jcp');
  const diff3 = getFirstDiff(newW, gates);
  // console.log({ diff3 });
  swapGateOutput(gates, 'z18', 'dhq');
  const diff4 = getFirstDiff(newW, gates);
  // console.log({ diff4 });

  return ['hbs', 'kfp', 'z22', 'pdg', 'z27', 'jcp', 'z18', 'dhq']
    .sort((a, b) => a.localeCompare(b))
    .join(',');
};
