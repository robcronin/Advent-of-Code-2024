import { sumArr } from '../utils/array';
import { parseInput } from '../utils/input';

type Rule = { before: number; after: number };
type Update = number[];
type AfterMap = { [key: number]: number[] };

const parseRulesAndUpdates = (
  input: string[],
): { rules: Rule[]; updates: Update[] } => {
  const ruleString = parseInput(input[0]) as string[];
  const updateString = parseInput(input[1]) as string[];
  const rules = ruleString.map((line) => {
    const [before, after] = line.split('|');
    return { before: +before, after: +after };
  });
  const updates = updateString.map((line) => parseInput(line) as number[]);
  return { rules, updates };
};

const mapAftersToBefores = (rules: Rule[]): AfterMap =>
  rules.reduce((acc: AfterMap, rule) => {
    const { before, after } = rule;
    if (!acc[after]) return { ...acc, [after]: [before] };
    return { ...acc, [after]: [...acc[after], before] };
  }, {});

const getIsUpdateValid = (update: Update, afterMap: AfterMap) =>
  update.every((value, index) => {
    const notAllowed = afterMap[value] || [];
    return update
      .slice(index + 1)
      .every((nextValue) => !notAllowed.includes(nextValue));
  });

const getUpdateValue = (update: Update) =>
  update[Math.floor(update.length / 2)];

const sortUpdate = (start: Update, afterMap: AfterMap) => {
  let update = [...start];
  while (!getIsUpdateValid(update, afterMap)) {
    for (let i = 0; i < update.length - 1; i++) {
      const notAllowed = afterMap[update[i]] || [];
      const index = update
        .slice(i + 1)
        .findIndex((value) => notAllowed.includes(value));

      if (index !== -1) {
        const temp = update[i];
        update[i] = update[index + i + 1];
        update[index + i + 1] = temp;
      }
    }
  }
  return update;
};

export const day5 = (input: string[]) => {
  const { rules, updates } = parseRulesAndUpdates(input);
  const afterMap = mapAftersToBefores(rules);
  return sumArr(updates, (update) =>
    getIsUpdateValid(update, afterMap) ? getUpdateValue(update) : 0,
  );
};

export const day5part2 = (input: string[]) => {
  const { rules, updates } = parseRulesAndUpdates(input);
  const afterMap = mapAftersToBefores(rules);

  const incorrectUpdates = updates.filter(
    (update) => !getIsUpdateValid(update, afterMap),
  );
  return sumArr(incorrectUpdates, (update) => {
    const newUpdate = sortUpdate(update, afterMap);
    return getUpdateValue(newUpdate);
  });
};
