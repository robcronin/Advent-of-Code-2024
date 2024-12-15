import { logAnswer } from '../utils/logging';
import { day12, day12part2 } from './day12';
import { data, testData, testData2, testData3 } from './day12.data';

describe('day 12', () => {
  it('test cases', () => {
    expect(day12(testData)).toBe(140);
  });
  it('test cases 2', () => {
    expect(day12(testData2)).toBe(772);
  });
  it('test cases 3', () => {
    expect(day12(testData3)).toBe(1930);
  });

  it.skip('answer', () => {
    const answer = day12(data);
    logAnswer(answer, 12, 1);
    expect(answer).toBe(1421958);
  });
});

describe('day 12 part 2', () => {
  it('test cases', () => {
    expect(day12part2(testData)).toBe(80);
  });
  it('test cases 2', () => {
    expect(day12part2(testData2)).toBe(436);
  });
  it('test cases 3', () => {
    expect(day12part2(testData3)).toBe(1206);
  });

  it.skip('answer', () => {
    const answer = day12part2(data);
    logAnswer(answer, 12, 2);
    expect(answer).toBe(885394);
  });
});
