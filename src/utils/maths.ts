export const getGcd = (a: number, b: number): number => {
  if (!b) return a;
  return getGcd(b, a % b);
};

export const getLcm = (a: number, b: number): number => (a * b) / getGcd(a, b);

export const getAllLcm = (nums: number[]) =>
  nums.reduce((allLcm, num) => getLcm(allLcm, num), 1);
