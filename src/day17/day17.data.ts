import { parseInput } from '../utils/input';

const testString = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;
const testString2 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;
const input = `Register A: 30878003
Register B: 0
Register C: 0

Program: 2,4,1,2,7,5,0,3,4,7,1,7,5,5,3,0`;

export const testData = parseInput(testString) as string[];
export const testData2 = parseInput(testString2) as string[];
export const data = parseInput(input) as string[];
