import { parseInput } from '../utils/input';

const testString = '125 17';
const input = '572556 22 0 528 4679021 1 10725 2790';

export const testData = parseInput(testString) as number[];
export const data = parseInput(input) as number[];
