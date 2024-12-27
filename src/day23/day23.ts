type Connections = Record<string, string[]>;

const parseConnections = (input: string[]): Connections => {
  const connections: Connections = {};
  input.forEach((line) => {
    const [a, b] = line.split('-');
    if (connections[a]) connections[a].push(b);
    else connections[a] = [b];
    if (connections[b]) connections[b].push(a);
    else connections[b] = [a];
  });
  return connections;
};

const getGroupKey = (computers: string[]) =>
  computers.sort((a, b) => a.localeCompare(b)).join(',');

const getGroupsOf3 = (connections: Connections) => {
  const groups = new Set<string>();
  Object.keys(connections).forEach((computer) => {
    const middles = connections[computer];
    middles.forEach((middle) => {
      if (middle !== computer) {
        const thirds = connections[middle];
        thirds.forEach((third) => {
          if (connections[third].includes(computer)) {
            groups.add(getGroupKey([computer, middle, third]));
          }
        });
      }
    });
  });
  return groups;
};

// const recursiveGetGroup = (
//   connections: Connections,
//   start: string,
//   current: string,
//   groupSoFar: Set<string>,
//   groups: Set<string>,
// ) => {
//   connections[current].forEach((link) => {
//     if (link === start) groups.add(getGroupKey([...groupSoFar]));
//     else if (!groupSoFar.has(link)) {
//       const newGroupSoFar = new Set<string>();
//       [...groupSoFar].forEach((g) => newGroupSoFar.add(g));
//       newGroupSoFar.add(link);
//       recursiveGetGroup(connections, start, link, newGroupSoFar, groups);
//     }
//   });
// };

// const getGroupsOfX = (connections: Connections) => {
//   const groups = new Set<string>();
//   const total = Object.keys(connections).length;
//   Object.keys(connections).forEach((first, index) => {
//     // console.log(index, 'of', total);
//     const group = new Set<string>();
//     group.add(first);
//     recursiveGetGroup(connections, first, first, group, groups);
//   });
//   return groups;
// };

const getGroupsWithLetter = (groups: Set<string>, letter: string) =>
  [...groups].filter((group) => {
    const [a, b, c] = group.split(',');
    return [a[0], b[0], c[0]].includes(letter);
  });

// const recursiveGetBiggestGroupForComp = (
//   connections: Connections,
//   computer: string | undefined,
//   ans: Set<string>,
// ) => {
//   if (!computer) return ans;
//   ans.add(computer);
//   const options = connections[computer];

//   const newConnections: Connections = options.reduce((acc, option) => {
//     const innerOptions = connections[option].filter((opt) =>
//       options.includes(opt),
//     );
//     return { ...acc, [option]: innerOptions };
//   }, {});
//   // console.log(newConnections);

//   let biggestAns = ans;
//   Object.keys(newConnections).forEach((opt) => {
//     const newAns = recursiveGetBiggestGroupForComp(
//       newConnections,
//       Object.keys(newConnections)[0],
//       new Set(ans),
//     );
//     if (newAns.size > biggestAns.size) biggestAns = newAns;
//   });
//   return biggestAns;
// };

const getBiggestGroupForComp = (
  connections: Connections,
  computer: string,
  meta: { max: number; checked: Set<string> },
  ans: Set<string> = new Set<string>(),
): Set<string> => {
  if (!computer) return ans;
  ans.add(computer);
  const options = connections[computer];

  const theoreticalMax = ans.size + options.length;
  if (theoreticalMax < meta.max) return ans;

  const newConnections: Connections = options.reduce((acc, option) => {
    if (!meta.checked.has(option)) {
      const innerOptions = connections[option]
        .filter((opt) => options.includes(opt))
        .filter((opt) => !meta.checked.has(opt));
      return { ...acc, [option]: innerOptions };
    }
    return acc;
  }, {});

  let biggest = ans;
  Object.keys(newConnections).forEach((opt) => {
    const newAns = getBiggestGroupForComp(
      newConnections,
      opt,
      meta,
      new Set(ans),
    );
    if (newAns.size > biggest.size) biggest = newAns;
    if (biggest.size > meta.max) meta.max = biggest.size;
  });
  return biggest;
};

export const day23 = (input: string[]) => {
  const connections = parseConnections(input);
  const groups = getGroupsOf3(connections);
  const tGroups = getGroupsWithLetter(groups, 't');
  return tGroups.length;
};

export const day23part2 = (input: string[]) => {
  const connections = parseConnections(input);
  const computers = Object.keys(connections);
  let ans = new Set<string>();
  const meta = { max: computers.length / 40, checked: new Set<string>() };

  computers.forEach((computer, index) => {
    const newG = getBiggestGroupForComp(connections, computer, meta);
    if (newG.size > ans.size) ans = newG;
    meta.checked.add(computer);
  });
  return [...ans].sort((a, b) => a.localeCompare(b)).join(',');
};
