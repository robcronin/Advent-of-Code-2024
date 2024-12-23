import { logAnswer } from '../utils/logging';
import { day17, day17part2 } from './day17';
import { data, testData, testData2 } from './day17.data';

describe('day 17', () => {
  it('test cases', () => {
    expect(day17(testData)).toBe('4,6,3,5,6,3,5,2,1,0');
  });

  it('answer', () => {
    const answer = day17(data);
    logAnswer(answer, 17, 1);
    expect(answer).toBe('7,1,3,7,5,1,0,3,4');
  });
});

describe('day 17 part 2', () => {
  it('test cases', () => {
    expect(day17part2(testData2)).toBe(117440);
  });

  it('answer', () => {
    const answer = day17part2(data);
    logAnswer(answer, 17, 2);
    expect(answer).toBe(190384113204239);
  });
});
