#!/bin/bash
mkdir src/day$1

if [ $? -ne 0 ] ; then
  echo "Day already exists!"
  exit
fi

echo "export const day$1 = (input: number[]) => {
  return $1;
};
export const day$1part2 = (input: number[]) => {
  return $1;
};
" >> src/day$1/day$1.ts

echo "import { logAnswer } from '../utils/logging';
import { parseInput } from '../utils/input';
import { day$1, day$1part2 } from './day$1';
import { data } from './day$1.data';

const testString = '';
const testData = parseInput(testString);

describe('day $1', () => {
  it('test cases', () => {
    expect(day$1(testData)).toBe($1);
  });

  it('answer', () => {
    const answer = day$1(data);
    logAnswer(answer, $1, 1);
    expect(typeof answer).toBe('number');
    expect(answer).toBe($1);
  });
});

describe('day $1 part 2', () => {
  it('test cases', () => {
    expect(day$1part2(testData)).toBe($1);
  });

  it('answer', () => {
    const answer = day$1part2(data);
    logAnswer(answer, $1, 2);
    expect(typeof answer).toBe('number');
    expect(answer).toBe($1);
  });
});" >> src/day$1/day$1.test.ts

echo "import { parseInput } from '../utils/input';

const input = '';

export const data = parseInput(input) as number[];" >> src/day$1/day$1.data.ts

yarn test day$1
exit
