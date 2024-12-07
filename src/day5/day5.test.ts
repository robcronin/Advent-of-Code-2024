import { logAnswer } from '../utils/logging';
import { day5, day5part2 } from './day5';
import { data, testData } from './day5.data';

describe('day 5', () => {
  it('test cases', () => {
    expect(day5(testData)).toBe(143);
  });

  it('answer', () => {
    const answer = day5(data);
    logAnswer(answer, 5, 1);
    expect(answer).toBe(4774);
  });
});

describe('day 5 part 2', () => {
  it('test cases', () => {
    expect(day5part2(testData)).toBe(123);
  });

  it('answer', () => {
    const answer = day5part2(data);
    logAnswer(answer, 5, 2);
    expect(answer).toBe(6004);
  });
});
