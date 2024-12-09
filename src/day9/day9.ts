const getTriangleSum = (n: number) => (n === 0 ? 0 : (n * (n + 1)) / 2);

const getRangeTriangleSum = (start: number, end: number) =>
  getTriangleSum(end) - getTriangleSum(start - 1);

const getChecksumAtPoint = (
  fileId: number,
  numFiles: number,
  blockPosition: number,
) => {
  const blockSum = getRangeTriangleSum(
    blockPosition,
    blockPosition + numFiles - 1,
  );
  return fileId * blockSum;
};

const getTotalChecksumAllMove = (diskMap: number[]) => {
  let checksum = 0;
  let moveIndex =
    diskMap.length % 2 === 0 ? diskMap.length - 2 : diskMap.length - 1;
  let remainingAtMove = diskMap[moveIndex];
  let diskIndex = 0;
  let blockPosition = 0;

  // diskIndex goes up, moveIndex goes backwards and moves into the empty spaces until they meet
  while (true) {
    if (diskIndex > moveIndex) throw new Error('Invalid state');
    if (diskIndex === moveIndex) {
      // meeting point, everything left that hasn't been moved at the moveIndex
      const fileId = moveIndex / 2;
      const numFiles = remainingAtMove;
      checksum += getChecksumAtPoint(fileId, numFiles, blockPosition);
      break;
    } else if (diskIndex % 2 === 0) {
      // Normal case - file hasn't been moved
      const fileId = diskIndex / 2;
      const numFiles = diskMap[diskIndex];
      checksum += getChecksumAtPoint(fileId, numFiles, blockPosition);
      blockPosition += diskMap[diskIndex];
    } else {
      // empty space, move from the moveIndex into this point
      let amountToMove = diskMap[diskIndex];
      while (amountToMove > 0) {
        const fileId = moveIndex / 2;
        const amountToMoveAtIndex = Math.min(remainingAtMove, amountToMove);
        checksum += getChecksumAtPoint(
          fileId,
          amountToMoveAtIndex,
          blockPosition,
        );

        blockPosition += amountToMoveAtIndex;
        amountToMove -= amountToMoveAtIndex;
        remainingAtMove -= amountToMoveAtIndex;
        if (remainingAtMove === 0) {
          moveIndex -= 2;
          remainingAtMove = diskMap[moveIndex];
        }
      }
    }
    diskIndex++;
  }
  return checksum;
};

const getTotalChecksumPartialMove = (diskMap: number[]) => {
  let checksum = 0;
  let diskIndex = 0;
  let blockPosition = 0;

  while (diskIndex < diskMap.length) {
    if (diskIndex % 2 === 0 && diskMap[diskIndex] > 0) {
      // Normal case - file hasn't been moved
      const fileId = diskIndex / 2;
      const numFiles = diskMap[diskIndex];
      checksum += getChecksumAtPoint(fileId, numFiles, blockPosition);

      blockPosition += diskMap[diskIndex];
    } else {
      // If positive value then it's empty space, negative value is a moved file so essentially empty
      let availableSpace = Math.abs(diskMap[diskIndex]);
      let moveIndex: number | undefined = undefined;
      while (availableSpace > 0) {
        moveIndex = undefined;
        for (let i = diskMap.length - 1; i > diskIndex; i -= 2) {
          // find first non negative(moved) value that fits
          if (diskMap[i] > 0 && diskMap[i] <= availableSpace) {
            moveIndex = i;
            break;
          }
        }
        if (moveIndex) {
          const fileId = moveIndex / 2;
          const numFiles = diskMap[moveIndex];

          checksum += getChecksumAtPoint(fileId, numFiles, blockPosition);

          // use negative space as convention to say this is now empty space
          diskMap[moveIndex] = -diskMap[moveIndex];
          availableSpace -= numFiles;
          blockPosition += numFiles;
        } else {
          break;
        }
      }
      blockPosition += availableSpace;
    }
    diskIndex++;
  }
  return checksum;
};

export const day9 = (input: number[]) => getTotalChecksumAllMove(input);

export const day9part2 = (input: number[]) =>
  getTotalChecksumPartialMove(input);
