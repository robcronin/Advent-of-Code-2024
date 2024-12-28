import { parseInput } from '../utils/input';

const testString = `029A
980A
179A
456A
379A`;
const input = `869A
170A
319A
349A
489A`;

export const testData = parseInput(testString) as string[];
export const data = parseInput(input) as string[];
