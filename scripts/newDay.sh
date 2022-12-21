#!/bin/bash
mkdir src/day$1

if [ $? -ne 0 ] ; then
  echo "Day already exists!"
  exit
fi

echo "
export const day$1 = (input: string[]) => {
  return $1;
};

export const day$1part2 = (input: string[]) => {
  return $1;
};
" >> src/day$1/day$1.ts

echo "import { logAnswer } from '../utils/logging';
import { parseInput } from '../utils/input';
import { day$1, day$1part2 } from './day$1';
import { data, testData } from './day$1.data';

describe.only('day $1', () => {
  it.only('test cases', () => {
    console.log(testData)
    expect(day$1(testData)).toBe($1);
  });

  it('answer', () => {
    const answer = day$1(data);
    logAnswer(answer, $1, 1);
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
    expect(answer).toBe($1);
  });
});" >> src/day$1/day$1.test.ts

echo "import { parseInput } from '../utils/input';

const testString = '';
const input = '';

export const testData = parseInput(testString) as string[];
export const data = parseInput(input) as string[];" >> src/day$1/day$1.data.ts

code src/day$1/day$1.data.ts src/day$1/day$1.ts src/day$1/day$1.test.ts
yarn test day$1
exit
