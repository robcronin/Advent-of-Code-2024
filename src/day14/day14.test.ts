import { logAnswer } from '../utils/logging';
import { day14, day14part2 } from './day14';
import { data, testData } from './day14.data';

describe('day 14', () => {
  it('test cases', () => {
    expect(day14(testData, { w: 11, h: 7 })).toBe(12);
  });

  it('answer', () => {
    const answer = day14(data, { w: 101, h: 103 });
    logAnswer(answer, 14, 1);
    expect(answer).toBe(225943500);
  });
});

describe('day 14 part 2', () => {
  it('answer', () => {
    const answer = day14part2(data, { w: 101, h: 103 });
    logAnswer(answer, 14, 2);
    expect(answer).toBe(6377);
  });
});
