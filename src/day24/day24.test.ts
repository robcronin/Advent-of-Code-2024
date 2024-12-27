import { logAnswer } from '../utils/logging';
import { day24, day24part2 } from './day24';
import { data, testData, testData2 } from './day24.data';

describe.only('day 24', () => {
  it('test cases', () => {
    expect(day24(testData)).toBe(4);
  });
  it('test cases 2', () => {
    expect(day24(testData2)).toBe(2024);
  });

  it('answer', () => {
    const answer = day24(data);
    logAnswer(answer, 24, 1);
    expect(answer).toBe(69201640933606);
  });
});

describe('day 24 part 2', () => {
  it('test cases', () => {
    expect(day24part2(testData)).toBe(24);
  });

  it.skip('answer', () => {
    const answer = day24part2(data);
    logAnswer(answer, 24, 2);
    expect(answer).toBe(24);
  });
});