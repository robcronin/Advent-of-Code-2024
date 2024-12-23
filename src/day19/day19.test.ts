import { logAnswer } from '../utils/logging';
import { day19, day19part2 } from './day19';
import { data, testData } from './day19.data';

describe('day 19', () => {
  it('test cases', () => {
    expect(day19(testData)).toBe(6);
  });

  it('answer', () => {
    const answer = day19(data);
    logAnswer(answer, 19, 1);
    expect(answer).toBe(206);
  });
});

describe('day 19 part 2', () => {
  it('test cases', () => {
    expect(day19part2(testData)).toBe(16);
  });

  it('answer', () => {
    const answer = day19part2(data);
    logAnswer(answer, 19, 2);
    expect(answer).toBe(622121814629343);
  });
});
