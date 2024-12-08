import { range } from './looping';

export const getPermutations = <T>(inputArr: Array<T>): Array<Array<T>> => {
  const result: Array<Array<T>> = [];

  const permute = (arr: Array<T>, m: Array<T> = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

export const getUniqueOns = (
  length: number,
  targetNumOn: number,
): number[][] => {
  const getExtraOnPerms = (arr: number[][]): number[][] => {
    const newPerms = new Set<string>();
    arr.forEach((perm) => {
      range(perm.length).forEach((permIndex) => {
        if (perm[permIndex] === 0) {
          const newPerm = [...perm];
          newPerm[permIndex] = 1;
          newPerms.add(JSON.stringify(newPerm));
        }
      });
    }, new Set());
    return [...newPerms].map((perm) => JSON.parse(perm));
  };

  let perms = [range(length).map(() => 0)];
  let numOn = 0;
  while (numOn < targetNumOn) {
    perms = getExtraOnPerms(perms);
    numOn++;
  }

  return perms;
};

export const getCombinations = (
  options: string[],
  length: number,
): string[][] => {
  if (options.length === 1) return [range(length).map(() => options[0])];
  const combos: string[][] = [];
  const repeater = options[0];
  const remainingOptions = options.slice(1);
  range(0, length + 1).forEach((numRepeats) => {
    const endCombos = getCombinations(remainingOptions, length - numRepeats);
    const startCombo = range(numRepeats).map(() => repeater);
    endCombos.forEach((endCombo) => {
      combos.push([...startCombo, ...endCombo]);
    });
  });
  return combos;
};

export const getPermutedCombinations = (options: string[], length: number) => {
  const combos = getCombinations(options, length);
  const addedKeys = new Set<string>();
  const permutedCombos: string[][] = [];
  combos.forEach((combo) => {
    const perms = getPermutations(combo);
    perms.forEach((perm) => {
      const key = perm.join('');
      if (!addedKeys.has(key)) {
        addedKeys.add(key);
        permutedCombos.push(perm);
      }
    });
  });
  return permutedCombos;
};
