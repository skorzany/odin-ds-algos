import { numberToCoords, coordsToNumber, inRange } from './utils.js';

/*
The 8x8 chessboard can be represented as nodes numbered 0 to 63:

                56 | 57 | 58 | 59 | 60 | 61 | 62 | 63
                ---+----+----+----+----+----+----+----
                48 | 49 | 50 | 51 | 52 | 53 | 54 | 55
                ---+----+----+----+----+----+----+----
                40 | 41 | 42 | 43 | 44 | 45 | 46 | 47
                ---+----+----+----+----+----+----+----
                32 | 33 | 34 | 35 | 36 | 37 | 38 | 39
                ---+----+----+----+----+----+----+----
                24 | 25 | 26 | 27 | 28 | 29 | 30 | 31
                ---+----+----+----+----+----+----+----
                16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
                ---+----+----+----+----+----+----+----
                 8 |  9 | 10 | 11 | 12 | 13 | 14 | 15
                ---+----+----+----+----+----+----+----
                 0 |  1 |  2 |  3 |  4 |  5 |  6 |  7

Coordinates are [row, column], starting from bottom-left,
ex.: square [0,0] is 0, square [1,4] is 12, square [7,7] is 63 etc.
*/

// create an adjacency list for the knight piece
const knightList = (function createKnightAdjacencyList() {
  const adjacencyList = [];
  // there are 8 possible L-shaped coordinate changes:
  const possibleMoves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];
  for (let n = 0; n < 64; n += 1) {
    const validMoves = [];
    const [x, y] = numberToCoords(n);
    possibleMoves.forEach((arr) => {
      const [newX, newY] = [x + arr[0], y + arr[1]];
      if (inRange(newX, -1, 8) && inRange(newY, -1, 8))
        validMoves.push(coordsToNumber([newX, newY]));
    });
    adjacencyList.push(validMoves);
  }
  return adjacencyList;
})();

export default knightList;
