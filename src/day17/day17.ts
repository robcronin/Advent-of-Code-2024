import { parseInput } from '../utils/input';

type Meta = {
  a: number;
  b: number;
  c: number;
  pointer: number;
  outputs: number[];
};
type Program = number[];
enum OperandType {
  LITERAL = 'LITERAL',
  COMBO = 'COMBO',
}

const parseProgram = (input: string[]): { meta: Meta; program: Program } => {
  const registerValues = (parseInput(input[0]) as string[]).map(
    (line) => +line.slice('Register X: '.length),
  );
  const meta = {
    a: registerValues[0],
    b: registerValues[1],
    c: registerValues[2],
    pointer: 0,
    outputs: [],
  };
  const program = parseInput(input[1].slice('Program: '.length)) as number[];
  return { program, meta };
};

const getOperandValue = (
  operandType: OperandType,
  operand: number,
  meta: Meta,
): number => {
  if (operandType === OperandType.LITERAL) return operand;
  else if (operandType === OperandType.COMBO) {
    if (operand >= 0 && operand <= 3) return operand;
    if (operand === 4) return meta.a;
    if (operand === 5) return meta.b;
    if (operand === 6) return meta.c;
    throw new Error(`Combo operand ${operand} not valid`);
  }
  throw new Error(`Operand type ${operandType} not valid`);
};

const runInstruction = (instruction: number, operand: number, meta: Meta) => {
  if (instruction === 0) {
    meta.a = Math.floor(
      meta.a / 2 ** getOperandValue(OperandType.COMBO, operand, meta),
    );
  } else if (instruction === 1) {
    meta.b = meta.b ^ getOperandValue(OperandType.LITERAL, operand, meta);
  } else if (instruction === 2) {
    meta.b = getOperandValue(OperandType.COMBO, operand, meta) % 8;
  } else if (instruction === 3) {
    if (meta.a !== 0) {
      meta.pointer = getOperandValue(OperandType.LITERAL, operand, meta);
      return;
    }
  } else if (instruction === 4) {
    meta.b = meta.b ^ meta.c;
  } else if (instruction === 5) {
    meta.outputs.push(getOperandValue(OperandType.COMBO, operand, meta) % 8);
  } else if (instruction === 6) {
    meta.b = Math.floor(
      meta.a / 2 ** getOperandValue(OperandType.COMBO, operand, meta),
    );
  } else if (instruction === 7) {
    meta.c = Math.floor(
      meta.a / 2 ** getOperandValue(OperandType.COMBO, operand, meta),
    );
  } else {
    throw new Error(`Unknown instruction number ${instruction}`);
  }
  meta.pointer += 2;
};

const runProgram = (program: Program, meta: Meta) => {
  while (meta.pointer >= 0 && meta.pointer < program.length) {
    const instruction = program[meta.pointer];
    const operand = program[meta.pointer + 1];
    runInstruction(instruction, operand, meta);
  }
};

const getOutputs = (a: number, program: Program, meta: Meta) => {
  const newMeta = { ...meta, a, outputs: [] };
  runProgram(program, newMeta);
  return newMeta.outputs;
};

const getMinAForCopy = (
  program: Program,
  meta: Meta,
  pos: number,
  currentA: number,
): number | undefined => {
  for (let i = 0; i < 8; i++) {
    const a = currentA + i * 8 ** pos;
    const outputs = getOutputs(a, program, meta);
    if (
      outputs.length === program.length &&
      outputs.every((o, index) => (o + 8) % 8 === program[index])
    )
      return a;

    if (pos > 0 && (outputs[pos] + 8) % 8 === program[pos]) {
      const subAns = getMinAForCopy(program, meta, pos - 1, a);
      if (subAns) return subAns;
    }
  }
};

export const day17 = (input: string[]) => {
  const { program, meta } = parseProgram(input);
  runProgram(program, meta);
  return meta.outputs.join(',');
};

export const day17part2 = (input: string[]) => {
  const { program, meta } = parseProgram(input);
  return getMinAForCopy(program, meta, program.length - 1, 0);
};
