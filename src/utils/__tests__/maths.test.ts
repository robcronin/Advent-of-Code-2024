import { getAllLcm, getGcd, getLcm } from '../maths';

describe('maths', () => {
  it('should get gcd of two numbers', () => {
    expect(getGcd(10, 12)).toBe(2);
    expect(getGcd(12, 20)).toBe(4);
    expect(getGcd(13, 20)).toBe(1);
  });
  it('should get lcm of two numbers', () => {
    expect(getLcm(10, 12)).toBe(60);
    expect(getLcm(12, 20)).toBe(60);
    expect(getLcm(13, 20)).toBe(260);
  });
  it('should get all lcm of many numbers', () => {
    expect(getAllLcm([5, 12, 18])).toBe(180);
  });
});
