import { logAnswer } from '../utils/logging';
import { day3, day3part2 } from './day3';
import { data, testData, testData2 } from './day3.data';

describe('day 3', () => {
  it('test cases', () => {
    expect(day3(testData)).toBe(161);
  });

  it('answer', () => {
    const answer = day3(data);
    logAnswer(answer, 3, 1);
    expect(answer).toBe(184511516);
  });
});

describe('day 3 part 2', () => {
  it('test cases', () => {
    expect(day3part2(testData2)).toBe(48);
  });

  it('answer', () => {
    const answer = day3part2(data);
    logAnswer(answer, 3, 2);
    expect(answer).toBe(90044227);
  });
});
