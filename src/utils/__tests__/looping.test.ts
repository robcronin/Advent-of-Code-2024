import { range } from '../looping';

describe('range', () => {
  it('should produce a range array for one input', () => {
    expect(range(3)).toEqual([0, 1, 2]);
  });
  it('should produce a range array for two inputs', () => {
    expect(range(3, 5)).toEqual([3, 4]);
  });
  it('should produce a range array backwards', () => {
    expect(range(5, 3)).toEqual([5, 4]);
  });
  it('should produce a range array backwards to 0', () => {
    expect(range(4, 0)).toEqual([4, 3, 2, 1]);
  });
  it('should produce an empty array if 0', () => {
    expect(range(0)).toEqual([]);
  });
});
