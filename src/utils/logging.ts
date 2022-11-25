export const logAnswer = (
  answer: any,
  day: number,
  part: number,
  extraNewLine?: boolean,
) => {
  process.stdout.write(`\n\n-----------------------------------
Answer Day ${day} Part ${part}: ${extraNewLine ? '\n\n' : ''}${answer}
-----------------------------------\n\n`);
};
