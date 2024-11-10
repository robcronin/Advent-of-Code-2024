const binarySearchMinimaMaximaRecursive = (
  arr: number[],
  low: number,
  high: number,
  getValue: (index: number, arr: number[]) => number,
  isMaxima: boolean,
) => {
  let mid = Math.floor(low + (high - low) / 2);

  const left = getValue(mid - 1, arr);
  const current = getValue(mid, arr);
  const right = getValue(mid + 1, arr);

  if (!isMaxima) {
    if (left >= current && right >= current)
      return { index: mid, value: current };
    if (left < current)
      return binarySearchMinimaMaximaRecursive(
        arr,
        low,
        mid - 1,
        getValue,
        isMaxima,
      );
    if (right < current)
      return binarySearchMinimaMaximaRecursive(
        arr,
        mid + 1,
        high,
        getValue,
        isMaxima,
      );
  } else {
    if (left <= current && right <= current)
      return { index: mid, value: current };
    if (left > current)
      return binarySearchMinimaMaximaRecursive(
        arr,
        low,
        mid - 1,
        getValue,
        isMaxima,
      );
    if (right > current)
      return binarySearchMinimaMaximaRecursive(
        arr,
        mid + 1,
        high,
        getValue,
        isMaxima,
      );
  }
};

export const binarySearchMinima = (
  arr: number[],
  low: number,
  high: number,
  getValue: (index: number, arr: number[]) => number,
) => binarySearchMinimaMaximaRecursive(arr, low, high, getValue, false);

export const binarySearchMaxima = (
  arr: number[],
  low: number,
  high: number,
  getValue: (index: number, arr: number[]) => number,
) => binarySearchMinimaMaximaRecursive(arr, low, high, getValue, true);
