import { logAnswer } from '../utils/logging';
import { day15, day15part2 } from './day15';
import { data, testData, testData2, testData3 } from './day15.data';

describe('day 15', () => {
  it('test cases', () => {
    expect(day15(testData)).toBe(2028);
  });
  it('test cases 2', () => {
    expect(day15(testData2)).toBe(10092);
  });

  it('answer', () => {
    const answer = day15(data);
    logAnswer(answer, 15, 1);
    expect(answer).toBe(1527563);
  });
});

describe('day 15 part 2', () => {
  it('test cases 2', () => {
    expect(day15part2(testData2)).toBe(9021);
  });
  it('test cases 3', () => {
    expect(day15part2(testData3)).toBe(618);
  });

  it('answer', () => {
    const answer = day15part2(data);
    logAnswer(answer, 15, 2);
    expect(answer).toBe(1521635);
  });
});
