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
  return diffIndex === undefined ? -1 : diffIndex;
};

type Pairs = [number, number, number][];

const getPairs = (wires: Wires, gates: Gate[], isFinal?: boolean): Pairs => {
  const diffIndex = getFirstDiff(wires, gates);
  const pairs: Pairs = [];
  for (let i = 0; i < gates.length; i++) {
    for (let j = i + 1; j < gates.length; j++) {
      const temp = gates[i].output;
      gates[i].output = gates[j].output;
      gates[j].output = temp;
      const newDiff = getFirstDiff(wires, gates);
      if (isFinal) {
        if (newDiff === -1) {
          pairs.push([i, j, newDiff]);
        }
      } else {
        if (newDiff > diffIndex + 1) {
          pairs.push([i, j, newDiff]);
        }
      }
      gates[j].output = gates[i].output;
      gates[i].output = temp;
    }
  }
  console.log(pairs.slice(0, 100));
  if (pairs.length > 100) console.log(pairs.slice(100));

  return pairs;
};

export const day24part2 = (input: string[]) => {
  const { wires, gates } = parseWiresAndGates(input);
  runGates(wires, gates);
  // console.log({ numGates: gates.length });

  const [xb, x] = getNumber(wires, 'x');
  // const [yb, y] = getNumber(wires, 'y');
  // const [zb, z] = getNumber(wires, 'z');

  // const actualZb = (x + y).toString(2);

  // console.log({ diffIndex });

  // console.log({ x, y, z });
  // console.log({ xb: '0 ' + xb, yb: '0 ' + yb, zb });

  // // actual
  // const firstPairs = getPairs(wires, gates);
  // const secondPairs: Pairs = [];
  // firstPairs.forEach(([i, j]) => {
  //   const temp = gates[i].output;
  //   gates[i].output = gates[j].output;
  //   gates[j].output = temp;
  //   const internal = getPairs(wires, gates);
  //   gates[j].output = gates[i].output;
  //   gates[i].output = temp;
  //   secondPairs.push(...internal);
  // });
  // console.log(secondPairs);

  const firstPairs = [
    [1, 66, 18],
    [30, 66, 18],
    [30, 74, 18],
    [30, 94, 18],
    [30, 152, 18],
    [30, 169, 18],
    [66, 137, 18],
    [74, 137, 18],
    [94, 137, 18],
    [137, 152, 18],
    [137, 169, 18],
  ];
  const secondPairs = [
    [81, 136, 22],
    [108, 136, 22],
    [134, 136, 22],
    [136, 174, 22],
  ];

  // const thirdPairs: Pairs = [];
  // firstPairs.forEach(([i, j]) => {
  //   const temp = gates[i].output;
  //   gates[i].output = gates[j].output;
  //   gates[j].output = temp;

  //   secondPairs.forEach(([i2, j2]) => {
  //     const temp2 = gates[i2].output;
  //     gates[i2].output = gates[j2].output;
  //     gates[j2].output = temp2;

  //     const internal2 = getPairs(wires, gates);
  //     thirdPairs.push(...internal2);

  //     gates[j2].output = gates[i2].output;
  //     gates[i2].output = temp2;
  //   });

  //   gates[j].output = gates[i].output;
  //   gates[i].output = temp;
  // });
  // console.log(secondPairs);

  const thirdPairs = [
    [8, 20, 25],
    [8, 34, 25],
    [8, 104, 25],
    [14, 20, 27],
    [14, 34, 27],
    [14, 104, 27],
    [19, 20, 27],
    [19, 34, 27],
    [19, 104, 27],
    [20, 42, 27],
    [20, 44, 27],
    [20, 60, 27],
    [20, 63, 27],
    [20, 75, 27],
    [20, 119, 27],
    [20, 125, 27],
    [20, 126, 27],
    [20, 128, 27],
    [20, 130, 27],
    [20, 138, 27],
    [20, 140, 27],
    [20, 161, 27],
    [20, 199, 27],
    [20, 217, 27],
    [34, 42, 27],
    [34, 44, 27],
    [34, 60, 27],
    [34, 63, 27],
    [34, 75, 27],
    [34, 119, 27],
    [34, 125, 27],
    [34, 126, 27],
    [34, 128, 27],
    [34, 130, 27],
    [34, 138, 27],
    [34, 140, 27],
    [34, 161, 27],
    [34, 199, 27],
    [34, 217, 27],
    [38, 157, 27],
    [38, 168, 27],
    [38, 184, 27],
    [42, 104, 27],
    [44, 104, 27],
    [60, 104, 27],
    [63, 104, 27],
    [75, 104, 27],
    [104, 119, 27],
    [104, 125, 27],
    [104, 126, 27],
    [104, 128, 27],
    [104, 130, 27],
    [104, 138, 27],
    [104, 140, 27],
    [104, 161, 27],
    [104, 199, 27],
    [104, 217, 27],
    [145, 157, 27],
    [157, 173, 27],
    [168, 173, 27],
    [173, 184, 27],
  ];

  // const fourthPairs: Pairs = [];
  // firstPairs.forEach(([i, j]) => {
  //   const temp = gates[i].output;
  //   gates[i].output = gates[j].output;
  //   gates[j].output = temp;

  //   secondPairs.forEach(([i2, j2]) => {
  //     const temp2 = gates[i2].output;
  //     gates[i2].output = gates[j2].output;
  //     gates[j2].output = temp2;

  //     thirdPairs.forEach(([i3, j3]) => {
  //       const temp3 = gates[i3].output;
  //       gates[i3].output = gates[j3].output;
  //       gates[j3].output = temp3;

  //       const internal3 = getPairs(wires, gates, true);
  //       fourthPairs.push(...internal3);

  //       internal3.forEach(([i4, j4]) => {
  //         const ans = [i, j, i2, j2, i3, j3, i4, j4]
  //           .map((a) => gates[a].output)
  //           .sort((a, b) => a.localeCompare(b))
  //           .join(',');
  //         // console.log({ ans });
  //       });

  //       gates[j3].output = gates[i3].output;
  //       gates[i3].output = temp3;
  //     });

  //     gates[j2].output = gates[i2].output;
  //     gates[i2].output = temp2;
  //   });

  //   gates[j].output = gates[i].output;
  //   gates[i].output = temp;
  // });
  // console.log(secondPairs);

  const fourthPairsOld = [
    [0, 204, -1],
    [1, 204, -1],
    [3, 204, -1],
    [6, 204, -1],
    [8, 168, -1],
    [8, 184, -1],
    [8, 204, -1],
    [12, 204, -1],
    [13, 204, -1],
    [14, 204, -1],
    [18, 204, -1],
    [19, 204, -1],
    [21, 204, -1],
    [22, 204, -1],
    [24, 204, -1],
    [26, 204, -1],
    [30, 204, -1],
    [31, 204, -1],
    [32, 204, -1],
    [34, 168, -1],
    [34, 184, -1],
    [34, 204, -1],
    [38, 204, -1],
    [38, 206, -1],
    [42, 204, -1],
    [44, 204, -1],
    [45, 134, -1],
    [46, 204, -1],
    [48, 204, -1],
    [49, 204, -1],
    [53, 204, -1],
    [54, 204, -1],
    [56, 61, -1],
    [59, 204, -1],
    [60, 204, -1],
    [61, 84, -1],
    [61, 179, -1],
    [61, 210, -1],
    [63, 204, -1],
    [64, 204, -1],
    [65, 204, -1],
    [68, 204, -1],
    [69, 204, -1],
    [70, 204, -1],
    [71, 204, -1],
    [72, 204, -1],
    [75, 204, -1],
    [76, 204, -1],
    [79, 204, -1],
    [80, 204, -1],
    [81, 204, -1],
    [91, 204, -1],
    [98, 120, -1],
    [98, 204, -1],
    [100, 204, -1],
    [102, 204, -1],
    [103, 204, -1],
    [105, 204, -1],
    [107, 204, -1],
    [108, 204, -1],
    [109, 204, -1],
    [111, 204, -1],
    [113, 204, -1],
    [117, 120, -1],
    [117, 204, -1],
    [118, 204, -1],
    [119, 204, -1],
    [120, 204, -1],
    [124, 204, -1],
    [125, 204, -1],
    [126, 204, -1],
    [128, 204, -1],
    [130, 204, -1],
    [133, 141, -1],
    [133, 204, -1],
    [134, 136, -1],
    [137, 204, -1],
    [138, 204, -1],
    [140, 204, -1],
    [141, 204, -1],
    [145, 168, -1],
    [145, 184, -1],
    [145, 204, -1],
    [148, 204, -1],
    [151, 204, -1],
    [153, 204, -1],
    [154, 204, -1],
    [155, 204, -1],
    [158, 204, -1],
    [160, 204, -1],
    [161, 204, -1],
    [162, 204, -1],
    [167, 204, -1],
    [168, 204, -1],
    [174, 204, -1],
    [177, 204, -1],
    [178, 204, -1],
    [180, 204, -1],
    [183, 204, -1],
    [184, 204, -1],
    [185, 204, -1],
    [189, 204, -1],
    [190, 204, -1],
    [191, 204, -1],
    [194, 204, -1],
    [199, 204, -1],
    [204, 206, -1],
    [204, 213, -1],
    [204, 217, -1],
    [204, 219, -1],
  ];
  const fourthPairs = [
    [8, 27, -1],
    [14, 168, -1],
    [14, 184, -1],
    [34, 168, -1],
    [34, 184, -1],
    [38, 206, -1],
    [45, 134, -1],
    [56, 61, -1],
    [61, 84, -1],
    [61, 179, -1],
    [61, 210, -1],
    [62, 112, -1],
    [87, 217, -1],
    [98, 120, -1],
    [112, 198, -1],
    [112, 202, -1],
    [112, 207, -1],
    [117, 120, -1],
    [133, 141, -1],
    [134, 136, -1],
    [145, 168, -1],
    [145, 184, -1],
  ];

  // START HERE
  console.log(
    firstPairs.length,
    secondPairs.length,
    thirdPairs.length,
    fourthPairs.length,
  );

  let potentials: number[][] = [];
  firstPairs.forEach(([i1, j1]) => {
    secondPairs.forEach(([i2, j2]) => {
      thirdPairs.forEach(([i3, j3]) => {
        fourthPairs.forEach(([i4, j4]) => {
          potentials.push([i1, j1, i2, j2, i3, j3, i4, j4]);
        });
      });
    });
  });
  console.log(potentials.length);
  // console.log(xb);

  while (potentials.length > 1) {
    console.log('starting', potentials.length);
    console.log(potentials.slice(0, 10));
    const newWires = { ...wires };
    Object.keys(newWires).forEach((wire) => {
      if (wire.startsWith('x') || wire.startsWith('y')) {
        newWires[wire] = Math.random() > 0.5 ? 1 : 0;
      }
    });
    const endWires = runGates(newWires, gates);
    const [xb, x] = getNumber(endWires, 'x');
    const [yb, y] = getNumber(endWires, 'y');
    console.log({ xb, yb });
    potentials = potentials.filter((p, index) => {
      if (index % 10000 === 0) console.log(index);
      const [i1, j1, i2, j2, i3, j3, i4, j4] = p;
      const temp1 = gates[i1].output;
      gates[i1].output = gates[j1].output;
      gates[j1].output = temp1;
      const temp2 = gates[i2].output;
      gates[i2].output = gates[j2].output;
      gates[j2].output = temp2;
      const temp3 = gates[i3].output;
      gates[i3].output = gates[j3].output;
      gates[j3].output = temp3;
      const temp4 = gates[i4].output;
      gates[i4].output = gates[j4].output;
      gates[j4].output = temp4;

      const diff = getFirstDiff(newWires, gates);

      gates[j1].output = gates[i1].output;
      gates[i1].output = temp1;
      gates[j2].output = gates[i2].output;
      gates[i2].output = temp2;
      gates[j3].output = gates[i3].output;
      gates[i3].output = temp3;
      gates[j4].output = gates[i4].output;
      gates[i4].output = temp4;

      if (diff === -1) {
        // console.log(p);
        return true;
      }
    });
  }

  return potentials;
};
