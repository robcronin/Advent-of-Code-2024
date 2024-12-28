import { logAnswer } from '../utils/logging';
import { day21, day21part2 } from './day21';
import { data, testData } from './day21.data';

describe('day 21', () => {
  it.only('test cases', () => {
    expect(day21(testData)).toBe(126384);
  }); // 26s

  it.skip('answer', () => {
    const answer = day21(data);
    logAnswer(answer, 21, 1);
    expect(answer).toBe(156714);
  });
});

describe('day 21 part 2', () => {
  it.skip('answer 5', () => {
    const answer = day21part2(data, 5);
    expect(answer).toBe(2325198);
  });
  it.skip('answer 6', () => {
    const answer = day21part2(data, 6);
    expect(answer).toBe(5782166);
  });
  it.skip('answer', () => {
    const answer = day21part2(data, 25);
    logAnswer(answer, 21, 2);
    expect(answer).toBe(191139369248202);
  }); // 52s
});
