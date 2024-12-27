import { logAnswer } from '../utils/logging';
import { day23, day23part2 } from './day23';
import { data, testData } from './day23.data';

describe('day 23', () => {
  it('test cases', () => {
    expect(day23(testData)).toBe(7);
  });

  it('answer', () => {
    const answer = day23(data);
    logAnswer(answer, 23, 1);
    expect(answer).toBe(1419);
  });
});

describe('day 23 part 2', () => {
  it('test cases', () => {
    expect(day23part2(testData)).toBe('co,de,ka,ta');
  });

  // suppper slow - should use Bron–Kerbosch algorithm
  it.skip('answer', () => {
    const answer = day23part2(data);
    logAnswer(answer, 23, 2);
    expect(answer).toBe('af,aq,ck,ee,fb,it,kg,of,ol,rt,sc,vk,zh');
  });
});
