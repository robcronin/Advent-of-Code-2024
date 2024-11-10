import { binarySearchMinima } from '../search';

describe('search', () => {
  it('should get the local minium of an array', () => {
    const array = [5, 4, 3, 2, 3, 5, 19];
    expect(
      binarySearchMinima(array, 0, array.length - 1, (x, arr) => arr[x]),
    ).toEqual({ index: 3, value: 2 });
  });
  it('should get the local minimum of a function', () => {
    const array = [-3, -2, -1, 0, 1, 2, 3];
    expect(
      binarySearchMinima(array, 0, array.length - 1, (x) => 2 * x ** 2 - 4 * x),
    ).toEqual({ index: 1, value: -2 });
  });
});
