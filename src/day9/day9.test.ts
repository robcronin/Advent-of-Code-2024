import { logAnswer } from '../utils/logging';
import { day9, day9part2 } from './day9';
import { data, testData } from './day9.data';

describe('day 9', () => {
  it('test cases', () => {
    expect(day9(testData)).toBe(1928);
  });

  it('answer', () => {
    const answer = day9(data);
    logAnswer(answer, 9, 1);
    expect(answer).toBe(6334655979668);
  });
});

describe('day 9 part 2', () => {
  it('test cases', () => {
    expect(day9part2(testData)).toBe(2858);
  });

  it('answer', () => {
    const answer = day9part2(data);
    logAnswer(answer, 9, 2);
    expect(answer).toBe(6349492251099);
  });
});
