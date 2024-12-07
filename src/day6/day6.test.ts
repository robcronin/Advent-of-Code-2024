import { logAnswer } from '../utils/logging';
import { day6, day6part2 } from './day6';
import { data, testData } from './day6.data';

describe('day 6', () => {
  it('test cases', () => {
    expect(day6(testData)).toBe(41);
  });

  it('answer', () => {
    const answer = day6(data);
    logAnswer(answer, 6, 1);
    expect(answer).toBe(4656);
  });
});

describe('day 6 part 2', () => {
  it('test cases', () => {
    expect(day6part2(testData)).toBe(6);
  });

  it('answer', () => {
    const answer = day6part2(data);
    logAnswer(answer, 6, 2);
    expect(answer).toBe(1575);
  });
});
