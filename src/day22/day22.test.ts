import { logAnswer } from '../utils/logging';
import { day22, day22part2 } from './day22';
import { data, testData, testData2 } from './day22.data';

describe('day 22', () => {
  it('test cases', () => {
    expect(day22(testData)).toBe(37327623);
  });

  it('answer', () => {
    const answer = day22(data);
    logAnswer(answer, 22, 1);
    expect(answer).toBe(15335183969);
  });
});

describe('day 22 part 2', () => {
  it('test cases', () => {
    expect(day22part2(testData2)).toBe(23);
  });

  it.skip('answer', () => {
    const answer = day22part2(data);
    logAnswer(answer, 22, 2);
    expect(answer).toBe(1696);
  }); // 15 mins
});
