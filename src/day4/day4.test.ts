import { logAnswer } from '../utils/logging';
import { day4, day4part2 } from './day4';
import { data, testData, testData2 } from './day4.data';

describe('day 4', () => {
  it('test cases', () => {
    expect(day4(testData)).toBe(18);
  });

  it('answer', () => {
    const answer = day4(data);
    logAnswer(answer, 4, 1);
    expect(answer).toBe(2644);
  });
});

describe('day 4 part 2', () => {
  it('test cases', () => {
    expect(day4part2(testData2)).toBe(9);
  });

  it('answer', () => {
    const answer = day4part2(data);
    logAnswer(answer, 4, 2);
    expect(answer).toBe(1952);
  });
});
