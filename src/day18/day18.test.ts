import { logAnswer } from '../utils/logging';
import { day18, day18part2 } from './day18';
import { data, testData } from './day18.data';

describe('day 18', () => {
  it('test cases', () => {
    expect(day18(testData, 7, 12)).toBe(22);
  });

  it('answer', () => {
    const answer = day18(data, 71, 1024);
    logAnswer(answer, 18, 1);
    expect(answer).toBe(248);
  });
});

describe('day 18 part 2', () => {
  it('test cases', () => {
    expect(day18part2(testData, 7, 12)).toBe('6,1');
  });

  it('answer', () => {
    const answer = day18part2(data, 71, 1024);
    logAnswer(answer, 18, 2);
    expect(answer).toBe('32,55');
  });
});
