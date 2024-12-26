import { sumArr } from '../utils/array';
import { range } from '../utils/looping';

type Mapped = { prices: number[]; diff: string }[];

const mixSecret = (secret: number, value: number) => secret ^ value;
const pruneSecret = (secret: number) => secret % 2 ** 24;
const mixAndPruneSecret = (secret: number, value: number) =>
  pruneSecret(mixSecret(secret, value));

const evolveSecret = (startSecret: number) => {
  let secret = startSecret;
  secret = mixAndPruneSecret(secret, secret * 64);
  secret = mixAndPruneSecret(secret, Math.floor(secret / 32));
  secret = mixAndPruneSecret(secret, secret * 2048);
  while (secret < 0) secret += 2 ** 24;
  return secret;
};

const evolveSecretNumTimes = (startSecret: number, numTimes: number) => {
  let secret = startSecret;
  range(numTimes).forEach(() => (secret = evolveSecret(secret)));
  return secret;
};

const getPrices = (startSecret: number, numTimes: number) => {
  let secret = startSecret;
  const prices: number[] = [secret % 10];
  let diff: string = '';
  range(numTimes).forEach(() => {
    secret = evolveSecret(secret);
    prices.push(secret % 10);
    const nextDiff = prices[prices.length - 1] - prices[prices.length - 2];
    diff += `${nextDiff >= 0 ? '+' : ''}${nextDiff};`;
  });
  return { prices, diff };
};

const getBananasForSequence = (mapped: Mapped, sequence: number[]) => {
  const seqString = sequence.reduce(
    (acc, i) => (i >= 0 ? acc + `+${i};` : acc + i + ';'),
    '',
  );
  let bananas = 0;
  mapped.forEach(({ prices, diff }) => {
    const index = diff.indexOf(seqString) / 3;
    if (index >= 0) {
      const price = prices[index + 4];
      bananas += price;
    }
  });
  return bananas;
};

export const day22 = (input: number[]) =>
  sumArr(input, (start) => evolveSecretNumTimes(start, 2000));

export const day22part2 = (input: number[]) => {
  const mapped: Mapped = input.map((num) => getPrices(num, 2000));
  let max = 0;
  for (let a = -9; a < 10; a++) {
    for (let b = -9; b < 10; b++) {
      for (let c = -9; c < 10; c++) {
        for (let d = -9; d < 10; d++) {
          const num = getBananasForSequence(mapped, [a, b, c, d]);
          max = Math.max(num, max);
        }
      }
    }
  }
  return max;
};
