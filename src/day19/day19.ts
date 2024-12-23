import { countArr, sumArr } from '../utils/array';
import { parseInput } from '../utils/input';

const parseTowelsAndPatterns = (input: string[]) => {
  const towels = parseInput(input[0]) as string[];
  const patterns = parseInput(input[1]) as string[];
  return { towels, patterns };
};

const getNumCombosForPattern = (
  towels: string[],
  pattern: string,
  meta: { cache: Record<string, number> },
): number => {
  if (meta.cache[pattern] !== undefined) return meta.cache[pattern];
  let count = 0;
  for (const towel of towels) {
    if (pattern.startsWith(towel)) {
      if (pattern.length === towel.length) {
        meta.cache[pattern] = meta.cache[pattern] ? meta.cache[pattern] + 1 : 1;
        count++;
      } else {
        const numCombos = getNumCombosForPattern(
          towels,
          pattern.slice(towel.length),
          meta,
        );
        meta.cache[pattern] = meta.cache[pattern]
          ? meta.cache[pattern] + numCombos
          : numCombos;

        count += numCombos;
      }
    }
  }
  meta.cache[pattern] = count;
  return count;
};

export const day19 = (input: string[]) => {
  const { towels, patterns } = parseTowelsAndPatterns(input);
  return countArr(
    patterns,
    (pattern) => getNumCombosForPattern(towels, pattern, { cache: {} }) > 0,
  );
};

export const day19part2 = (input: string[]) => {
  const { towels, patterns } = parseTowelsAndPatterns(input);

  return sumArr(patterns, (pattern) =>
    getNumCombosForPattern(towels, pattern, { cache: {} }),
  );
};
