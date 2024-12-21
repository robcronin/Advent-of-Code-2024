import { logAnswer } from '../utils/logging';
import { day16, day16part2 } from './day16';
import { data, testData, testData2 } from './day16.data';

describe('day 16', () => {
  it('test cases', () => {
    expect(day16(testData)).toBe(7036);
  });
  it('test cases 2', () => {
    expect(day16(testData2)).toBe(11048);
  });

  it('answer', () => {
    const answer = day16(data);
    logAnswer(answer, 16, 1);
    expect(answer).toBe(91464);
  });
});

describe('day 16 part 2', () => {
  it('test cases', () => {
    expect(day16part2(testData)).toBe(45);
  });
  it('test cases 2', () => {
    expect(day16part2(testData2)).toBe(64);
  });

  it.skip('answer', () => {
    const answer = day16part2(data);
    logAnswer(answer, 16, 2);
    expect(answer).toBe(494);
  });
});
