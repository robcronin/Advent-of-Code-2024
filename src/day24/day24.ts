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
    // binary = bit + ' ' + binary;
    binary = bit + binary;
  });
  return [binary, decimal];
};

export const day24 = (input: string[]) => {
  const { wires, gates } = parseWiresAndGates(input);
  const endWires = runGates(wires, gates);
  return getNumber(endWires, 'z')[1];
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
  return diffIndex || -1;
};

export const day24part2 = (input: string[]) => {
  const { wires, gates } = parseWiresAndGates(input);
  runGates(wires, gates);
  console.log({ numGates: gates.length });

  const [xb, x] = getNumber(wires, 'x');
  const [yb, y] = getNumber(wires, 'y');
  const [zb, z] = getNumber(wires, 'z');

  const actualZb = (x + y).toString(2);

  const diffIndex = getFirstDiff(wires, gates);
  console.log({ diffIndex });

  console.log({ x, y, z });
  console.log({ xb: '0 ' + xb, yb: '0 ' + yb, zb });

  const pairs: [number, number, number][] = [];
  for (let i = 0; i < gates.length; i++) {
    for (let j = i + 1; j < gates.length; j++) {
      const temp = gates[i].output;
      gates[i].output = gates[j].output;
      gates[j].output = temp;
      const newDiff = getFirstDiff(wires, gates);
      if (newDiff > diffIndex + 1) {
        pairs.push([i, j, newDiff]);
      }
      gates[j].output = gates[i].output;
      gates[i].output = temp;
    }
  }
  console.log(pairs);

  return 24;
};
