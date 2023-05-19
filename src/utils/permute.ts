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
