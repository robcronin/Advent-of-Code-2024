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
  return diffIndex === undefined ? Number.MAX_SAFE_INTEGER : diffIndex;
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
        if (newDiff > diffIndex) {
          pairs.push([i, j, newDiff]);
        }
      }
      gates[j].output = gates[i].output;
      gates[i].output = temp;
    }
  }
  // console.log(pairs.slice(0, 100));
  // if (pairs.length > 100) console.log(pairs.slice(100));

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

  // actual first pairs
  // const firstPairs = getPairs(wires, gates);
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

  // actual second pairs
  // const secondPairsSet = new Set<string>();
  // firstPairs.forEach(([i, j]) => {
  //   const temp = gates[i].output;
  //   gates[i].output = gates[j].output;
  //   gates[j].output = temp;
  //   const internal = getPairs(wires, gates);
  //   gates[j].output = gates[i].output;
  //   gates[i].output = temp;
  //   internal.forEach((i, j, num) => secondPairsSet.add(`${i},${j},${num}`));
  // });
  // const secondPairs = [...secondPairsSet].forEach((line) => {
  //   const [i, j, num] = line.split(',');
  //   return [+i, +j, +num];
  // });
  // console.log(secondPairs);

  const secondPairs = [
    [81, 136, 22],
    [108, 136, 22],
    [134, 136, 22],
    [136, 174, 22],
  ];

  // actual third pairs
  // const thirdPairsSet = new Set<string>();
  // firstPairs.forEach(([i, j]) => {
  //   const temp = gates[i].output;
  //   gates[i].output = gates[j].output;
  //   gates[j].output = temp;

  //   secondPairs.forEach(([i2, j2]) => {
  //     const temp2 = gates[i2].output;
  //     gates[i2].output = gates[j2].output;
  //     gates[j2].output = temp2;

  //     const internal2 = getPairs(wires, gates);
  //     internal2.forEach((i, j, num) => thirdPairsSet.add(`${i},${j},${num}`));

  //     gates[j2].output = gates[i2].output;
  //     gates[i2].output = temp2;
  //   });

  //   gates[j].output = gates[i].output;
  //   gates[i].output = temp;
  // });
  // const thirdPairs = [...thirdPairsSet].forEach((line) => {
  //   const [i, j, num] = line.split(',');
  //   return [+i, +j, +num];
  // });
  // console.log(thirdPairs);

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

  // actual fourth pairs
  // const fourthPairsSet = new Set<string>();
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
  //       // fourthPairs.push(...internal3);

  //       // internal3.forEach(([i4, j4]) => {
  //       //   const ans = [i, j, i2, j2, i3, j3, i4, j4]
  //       //     .map((a) => gates[a].output)
  //       //     .sort((a, b) => a.localeCompare(b))
  //       //     .join(',');
  //       //   // console.log({ ans });
  //       // });
  //       internal3.forEach((i, j, num) =>
  //         fourthPairsSet.add(`${i},${j},${num}`),
  //       );

  //       gates[j3].output = gates[i3].output;
  //       gates[i3].output = temp3;
  //     });
  //     console.log(
  //       'temp fourth',
  //       [...fourthPairsSet].forEach((line) => {
  //         const [i, j, num] = line.split(',');
  //         return [+i, +j, +num];
  //       }),
  //     );

  //     gates[j2].output = gates[i2].output;
  //     gates[i2].output = temp2;
  //   });

  //   gates[j].output = gates[i].output;
  //   gates[i].output = temp;
  // });
  // const fourthPairs = [...fourthPairsSet].forEach((line) => {
  //   const [i, j, num] = line.split(',');
  //   return [+i, +j, +num];
  // });
  // console.log(fourthPairs);
  const fourthPairs = [
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

  const fourthPairsOld = [
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

export const day24part2v2 = (input: string[]) => {
  const { wires, gates } = parseWiresAndGates(input);
  // runGates(wires, gates);

  // first pairs
  let firstPairs = [];
  firstPairs = getPairs(wires, gates);
  // console.log(firstPairs);
  // firstPairs = firstPairs.map((p) => [...p, 0]);
  // while (firstPairs.length > 5) {
  //   console.log('firstPairs', firstPairs.length);
  //   if (firstPairs.length < 20) console.log(firstPairs);
  //   const newWires = { ...wires };
  //   Object.keys(newWires).forEach((wire) => {
  //     if (wire.startsWith('x') || wire.startsWith('y')) {
  //       newWires[wire] = Math.random() > 0.5 ? 1 : 0;
  //     }
  //   });
  //   const ogDiff = getFirstDiff(newWires, gates);
  //   firstPairs = firstPairs.filter((p) => {
  //     const [i1, j1] = p;
  //     const temp1 = gates[i1].output;
  //     gates[i1].output = gates[j1].output;
  //     gates[j1].output = temp1;

  //     const newDiff = getFirstDiff(newWires, gates);
  //     gates[j1].output = gates[i1].output;
  //     gates[i1].output = temp1;
  //     if (newDiff !== ogDiff) return true;
  //     if (p[3] < 200) {
  //       p[3]++;
  //       return true;
  //     }
  //     return false;
  //   });
  // }
  // console.log(firstPairs);

  firstPairs = [
    [1, 66, 18, 169],
    [5, 66, 10, 196],
    [12, 66, 10, 198],
    [14, 94, 10, 196],
    [30, 94, 18, 119],
    [38, 169, 10, 197],
    [66, 124, 10, 200],
    [66, 135, 10, 194],
    [66, 180, 10, 199],
    [66, 162, 10, 200],
    [94, 133, 10, 200],
  ];

  // const firstPair = [1, 66];
  // const [i1, j1] = firstPair;

  // second pairs
  // firstPairs.forEach(([i1, j1]) => {
  //   const temp1 = gates[i1].output;
  //   gates[i1].output = gates[j1].output;
  //   gates[j1].output = temp1;

  //   let secondPairs = getPairs(wires, gates);

  //   secondPairs = secondPairs.map((p) => [...p, 0]);
  //   while (secondPairs.length > 5) {
  //     console.log('secondPairs', secondPairs.length);
  //     if (secondPairs.length < 20) console.log(secondPairs);
  //     const newWires = { ...wires };
  //     Object.keys(newWires).forEach((wire) => {
  //       if (wire.startsWith('x') || wire.startsWith('y')) {
  //         newWires[wire] = Math.random() > 0.5 ? 1 : 0;
  //       }
  //     });
  //     const ogDiff = getFirstDiff(newWires, gates);
  //     secondPairs = secondPairs.filter((p) => {
  //       const [i2, j2] = p;
  //       const temp2 = gates[i2].output;
  //       gates[i2].output = gates[j2].output;
  //       gates[j2].output = temp2;

  //       const newDiff = getFirstDiff(newWires, gates);
  //       gates[j2].output = gates[i2].output;
  //       gates[i2].output = temp2;
  //       if (newDiff !== ogDiff) return true;
  //       if (p[3] < 200) {
  //         p[3]++;
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   console.log(secondPairs);
  //   gates[j1].output = gates[i1].output;
  //   gates[i1].output = temp1;
  // });

  const secondPairsO = [
    [81, 136, 22, 169],
    [117, 136, 19, 192],
    [134, 136, 22, 198],
    [136, 161, 19, 198],
    [136, 174, 22, 174],
  ];

  const secondPairs = [
    [136, 174, 22, 105],
    [81, 136, 22, 110],
    [40, 137, 18, 133],
    [13, 135, 12, 149],
    [1, 40, 18, 159],
    [5, 13, 12, 160],
    [1, 94, 12, 165],
    [1, 142, 18, 166],
    [1, 11, 18, 167],
    [1, 89, 18, 170],
    [117, 136, 19, 172],
    [30, 40, 18, 173],
    [137, 142, 18, 177],
    [1, 90, 18, 177],
    [90, 137, 18, 177],
    [30, 142, 18, 179],
    [30, 90, 18, 181],
    [136, 177, 19, 181],
    [89, 137, 18, 184],
    [11, 137, 18, 188],
    [11, 30, 18, 189],
    [13, 119, 18, 193],
    [13, 137, 11, 195],
    [75, 136, 19, 197],
    [128, 136, 19, 198],
    [13, 174, 18, 198],
    [30, 89, 18, 198],
    [136, 180, 19, 199],
    [13, 81, 18, 199],
    [61, 136, 19, 199],
    [13, 38, 18, 199],
    [13, 117, 18, 199],
    [13, 183, 18, 199],
    [1, 152, 12, 199],
    [46, 136, 19, 200],
    [79, 136, 19, 200],
    [13, 63, 18, 200],
    [13, 64, 12, 200],
    [13, 140, 18, 200],
    [13, 178, 18, 200],
    [136, 141, 19, 200],
    [136, 158, 19, 200],
    [13, 185, 18, 200],
    [13, 191, 12, 200],
    [1, 104, 18, 200],
  ];
  // third pairs
  // secondPairs.forEach(([i2, j2]) => {
  //   // do swap
  //   const temp2 = gates[i2].output;
  //   gates[i2].output = gates[j2].output;
  //   gates[j2].output = temp2;

  //   let thirdPairs = getPairs(wires, gates);

  //   thirdPairs = thirdPairs.map((p) => [...p, 0]);
  //   while (thirdPairs.length > 1) {
  //     // console.log('thirdPairs', thirdPairs.length);
  //     if (thirdPairs.length < 4) console.log('running', thirdPairs);
  //     const newWires = { ...wires };
  //     Object.keys(newWires).forEach((wire) => {
  //       if (wire.startsWith('x') || wire.startsWith('y')) {
  //         newWires[wire] = Math.random() > 0.5 ? 1 : 0;
  //       }
  //     });
  //     const ogDiff = getFirstDiff(newWires, gates);
  //     thirdPairs = thirdPairs.filter((p) => {
  //       const [i1, j1] = p;
  //       const temp1 = gates[i1].output;
  //       gates[i1].output = gates[j1].output;
  //       gates[j1].output = temp1;

  //       const newDiff = getFirstDiff(newWires, gates);
  //       gates[j1].output = gates[i1].output;
  //       gates[i1].output = temp1;
  //       if (newDiff !== ogDiff) return true;
  //       if (p[3] < 200) {
  //         p[3]++;
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   console.log('final', thirdPairs);
  //   gates[j2].output = gates[i2].output;
  //   gates[i2].output = temp2;
  //   console.log(thirdPairs);
  // });

  const thirdPairs = [
    [173, 184, 27, 186],
    [168, 173, 27, 197],
    [90, 174, 20, 198],
  ];

  const fourthPairsSet = new Set<string>();
  firstPairs.forEach(([i1, j1]) => {
    const temp1 = gates[i1].output;
    gates[i1].output = gates[j1].output;
    gates[j1].output = temp1;
    secondPairs.forEach(([i2, j2]) => {
      const temp2 = gates[i2].output;
      gates[i2].output = gates[j2].output;
      gates[j2].output = temp2;

      thirdPairs.forEach(([i3, j3]) => {
        const temp3 = gates[i3].output;
        gates[i3].output = gates[j3].output;
        gates[j3].output = temp3;

        const internal3 = getPairs(wires, gates, true);
        internal3.forEach((i, j, num) =>
          fourthPairsSet.add(`${i},${j},${num}`),
        );

        gates[j3].output = gates[i3].output;
        gates[i3].output = temp3;
      });
      console.log(fourthPairsSet);

      gates[j2].output = gates[i2].output;
      gates[i2].output = temp2;
    });
    gates[j1].output = gates[i1].output;
    gates[i1].output = temp1;
  });

  const fourthPairs = [...fourthPairsSet].forEach((line) => {
    const [i, j, num] = line.split(',');
    return [+i, +j, +num];
  });
  console.log(fourthPairs);
};

// thirds
// [
//   [168, 173, 27, 200],
//   [173, 184, 27, 186],
// ];
// [173, 184, 27, 186], [[168, 173, 27, 197]];

// firsts
// [30, 94, 18];
//[ 30, 94, 18, 2 ]
// [ 137, 169, 18, 1 ]
// [ [ 66, 130, 10, 9 ] ]
// [[133, 169, 10, 10]];
//    [ [ 30, 94, 18, 6 ] ]
//     [ [ 30, 94, 18, 9 ] ]
//     [ [ 1, 66, 18, 10 ] ]
// [[30, 94, 18, 34]];
//    [ [ 30, 94, 18, 111 ] ]

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

type Pair2 = {
  i1?: number;
  i2?: number;
  i3?: number;
  i4?: number;
  j1?: number;
  j2?: number;
  j3?: number;
  j4?: number;
};

const swapGates = (gates: Gate[], i: number, j: number) => {
  const temp = gates[i].output;
  gates[i].output = gates[j].output;
  gates[j].output = temp;
};

const swapAllPairs = (gates: Gate[], pair: Pair2) => {
  for (let n = 1; n <= 4; n++) {
    const i = pair[`i${n}` as keyof Pair2];
    const j = pair[`j${n}` as keyof Pair2];
    if (i !== undefined && j !== undefined) {
      swapGates(gates, i, j);
    }
  }
};

const generatePair = (pair: Pair2, i: number, j: number): Pair2 | undefined => {
  const newPair = { ...pair };
  const currents = Object.values(pair);
  if (currents.includes(i) || currents.includes(j)) return undefined;
  for (let n = 1; n <= 4; n++) {
    const iKey = `i${n}` as keyof Pair2;
    const jKey = `j${n}` as keyof Pair2;
    if (pair[iKey] === undefined) {
      newPair[iKey] = i;
      newPair[jKey] = j;
      return newPair;
    }
  }
  throw new Error('uh oh');
};

export const day24part2v3 = (input: string[]) => {
  const { gates } = parseWiresAndGates(input);

  // get first diff
  let pow = 0;
  for (let p = 0; p < 45; p++) {
    const newW = generateWires(2 ** p - 1, 1);
    const startDiff = getFirstDiff(newW, gates);
    if (startDiff - p !== 1) {
      pow = p;
      break;
    }
  }
  console.log({ pow });

  let pairs: Pair2[] = [{}];
  while (pairs.length !== 1 || pairs[0].i4 === undefined) {
    const newW = generateWires(2 ** 45 - 1, 1);
    const newW2 = generateWires(2 ** 45 - 1, 0);
    let newPairs: Pair2[] = [];
    let max = 0;
    pairs.forEach((pair, index) => {
      console.log('pow:', pow, 'checking', index, 'of', pairs.length);
      if (pow > 22) console.log(pow, max, newPairs);
      swapAllPairs(gates, pair);
      const startDiff = getFirstDiff(newW, gates);
      const startDiff2 = getFirstDiff(newW2, gates);
      for (let i = 0; i < gates.length; i++) {
        for (let j = i + 1; j < gates.length; j++) {
          swapGates(gates, i, j);
          const newDiff = getFirstDiff(newW, gates);
          const newDiff2 = getFirstDiff(newW, gates);
          swapGates(gates, i, j);
          if (newDiff > startDiff && newDiff2 > startDiff2) {
            const comDiff = Math.min(newDiff, newDiff2);
            const newPair = generatePair(pair, i, j);
            if (newPair) {
              if (comDiff > max) {
                newPairs = [newPair];
                max = comDiff;
              } else if (comDiff === max) newPairs.push(newPair);
            }
          }
        }
      }
      swapAllPairs(gates, pair);
      // break;
    });
    pairs = newPairs;
    pow = max;
    console.log(pairs);
    console.log({ pow, len: pairs.length });
  }
  // runGates(wires, gates);
};

const swapGateOutput = (gates: Gate[], a: string, b: string) => {
  const aGate = gates.find((g) => g.output === a);
  const bGate = gates.find((g) => g.output === b);
  if (!aGate || !bGate) throw new Error('No gate found');
  aGate.output = b;
  bGate.output = a;

  const aGateI = gates.findIndex((g) => g.output === a);
  const bGateI = gates.findIndex((g) => g.output === b);
  console.log({ a, b, aGateI, bGateI });
};

export const day24part2v4 = (input: string[]) => {
  const { gates } = parseWiresAndGates(input);
  const newW = generateWires(2 ** 45 - 1, 1);
  const diff0 = getFirstDiff(newW, gates);
  console.log({ diff0 });
  swapGateOutput(gates, 'hbs', 'kfp');
  const diff1 = getFirstDiff(newW, gates);
  console.log({ diff1 });
  swapGateOutput(gates, 'z22', 'pdg');
  const diff2 = getFirstDiff(newW, gates);
  console.log({ diff2 });
  swapGateOutput(gates, 'z27', 'jcp');
  const diff3 = getFirstDiff(newW, gates);
  console.log({ diff3 });
  swapGateOutput(gates, 'z18', 'dhq');
  const diff4 = getFirstDiff(newW, gates);
  console.log({ diff4 });

  return ['hbs', 'kfp', 'z22', 'pdg', 'z27', 'jcp', 'z18', 'dhq']
    .sort((a, b) => a.localeCompare(b))
    .join(',');
};
