import { logAnswer } from '../utils/logging';
import { day7, day7part2 } from './day7';
import { data, testData } from './day7.data';

describe('day 7', () => {
  it('test cases', () => {
    expect(day7(testData)).toBe(3749);
  });

  it('answer', () => {
    const answer = day7(data);
    logAnswer(answer, 7, 1);
    expect(answer).toBe(975671981569);
  });
});

describe('day 7 part 2', () => {
  it('test cases', () => {
    expect(day7part2(testData)).toBe(11387);
  });

  it('answer', () => {
    const answer = day7part2(data);
    logAnswer(answer, 7, 2);
    expect(answer).toBe(223472064194845);
  });
});
