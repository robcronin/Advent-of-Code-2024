import { logAnswer } from '../utils/logging';
import { day1, day1part2 } from './day1';
import { data, testData } from './day1.data';

describe('day 1', () => {
  it('test cases', () => {
    console.log(testData);
    expect(day1(testData)).toBe(11);
  });

  it('answer', () => {
    const answer = day1(data);
    logAnswer(answer, 1, 1);
    expect(answer).toBe(1579939);
  });
});

describe('day 1 part 2', () => {
  it('test cases', () => {
    expect(day1part2(testData)).toBe(31);
  });

  it('answer', () => {
    const answer = day1part2(data);
    logAnswer(answer, 1, 2);
    expect(answer).toBe(20351745);
  });
});
