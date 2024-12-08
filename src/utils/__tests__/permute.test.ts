import { getCombinations, getPermutedCombinations } from '../permute';

describe('getCombinations', () => {
  it('should give combinations of 2 items of length 2', () => {
    const result = getCombinations(['a', 'b'], 2);
    expect(result).toEqual([
      ['b', 'b'],
      ['a', 'b'],
      ['a', 'a'],
    ]);
  });
  it('should give combinations of 2 items of length 4', () => {
    const result = getCombinations(['a', 'b'], 4);
    expect(result).toEqual([
      ['b', 'b', 'b', 'b'],
      ['a', 'b', 'b', 'b'],
      ['a', 'a', 'b', 'b'],
      ['a', 'a', 'a', 'b'],
      ['a', 'a', 'a', 'a'],
    ]);
  });
  it('should give combinations of 3 items of length 3', () => {
    const result = getCombinations(['a', 'b', 'c'], 3);
    expect(result).toEqual([
      ['c', 'c', 'c'],
      ['b', 'c', 'c'],
      ['b', 'b', 'c'],
      ['b', 'b', 'b'],
      ['a', 'c', 'c'],
      ['a', 'b', 'c'],
      ['a', 'b', 'b'],
      ['a', 'a', 'c'],
      ['a', 'a', 'b'],
      ['a', 'a', 'a'],
    ]);
  });
});

describe('getPermutedCombinations', () => {
  it('should give permuted combinations of 2 items of length 2', () => {
    const result = getPermutedCombinations(['a', 'b'], 2);
    expect(result).toEqual([
      ['b', 'b'],
      ['a', 'b'],
      ['b', 'a'],
      ['a', 'a'],
    ]);
  });
  it('should give combinations of 3 items of length 2', () => {
    const result = getPermutedCombinations(['a', 'b', 'c'], 2);
    expect(result).toEqual([
      ['c', 'c'],
      ['b', 'c'],
      ['c', 'b'],
      ['b', 'b'],
      ['a', 'c'],
      ['c', 'a'],
      ['a', 'b'],
      ['b', 'a'],
      ['a', 'a'],
    ]);
  });
});
