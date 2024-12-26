import { logAnswer } from '../utils/logging';
import { day20, day20part2 } from './day20';
import { data, testData } from './day20.data';

describe('day 20', () => {
  it('test cases', () => {
    expect(day20(testData, 2)).toBe(44);
  });

  it('answer', () => {
    const answer = day20(data, 100);
    logAnswer(answer, 20, 1);
    expect(answer).toBe(1518);
  });
});

describe('day 20 part 2', () => {
  it('test cases', () => {
    expect(day20part2(testData, 50)).toBe(285);
  });

  it.skip('answer', () => {
    const answer = day20part2(data, 100);
    logAnswer(answer, 20, 2);
    expect(answer).toBe(1032257);
  });
});
