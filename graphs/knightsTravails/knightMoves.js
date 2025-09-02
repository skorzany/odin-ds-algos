import Queue from '../../queue/queue.js';
/*
The 8x8 chessboard is an unweighted and undirected graph.
It can be represented as nodes (squares) numbered from 0 to 63:

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

ex.: square [0,0] is 0, square [1,4] is 12, square [7,7] is 63
*/

// helper methods
const numberToCoords = (n) => [Math.floor(n / 8), n % 8];

const coordsToNumber = (coords) => coords[0] * 8 + coords[1];

const inRange = (x, min, max) => min < x && x < max;

// create global adjacency list for all knight's valid moves for every square on the chessboard
const adjList = (function createAdjacencyList() {
  const adjacencyList = [];
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
    const neighbors = [];
    const [x, y] = numberToCoords(n);
    possibleMoves.forEach((arr) => {
      const [newX, newY] = [x + arr[0], y + arr[1]];
      if (inRange(newX, -1, 8) && inRange(newY, -1, 8))
        neighbors.push(coordsToNumber([newX, newY]));
    });
    adjacencyList.push(neighbors);
  }
  return adjacencyList;
})();

function knightMoves(start, end) {
  const nodeStartNumber = coordsToNumber(start);
  const nodeEndNumber = coordsToNumber(end);
  if (!inRange(nodeStartNumber, -1, 64) || !inRange(nodeEndNumber, -1, 64))
    throw new Error('Coordinates out of bounds.');
  const visited = {};
  visited[nodeStartNumber] = true;
  const parentMap = {};
  parentMap[nodeStartNumber] = null;
  const queue = new Queue();
  queue.enqueue(nodeStartNumber);
  while (!queue.isEmpty()) {
    let nodeCurrent = queue.dequeue().data;
    if (nodeCurrent === nodeEndNumber) {
      const shortestPath = [];
      while (nodeCurrent !== null) {
        shortestPath.push(numberToCoords(nodeCurrent));
        nodeCurrent = parentMap[nodeCurrent];
      }
      if (shortestPath.length === 1) return "You're already there!";
      return `You made it in ${shortestPath.length - 1} moves! Here's your path:\n[${shortestPath.reverse().join(']\n[')}]`;
    }
    adjList[nodeCurrent].forEach((adjNode) => {
      if (!visited[adjNode]) {
        visited[adjNode] = true;
        parentMap[adjNode] = nodeCurrent;
        queue.enqueue(adjNode);
      }
    });
  }
  return `It is impossible to get from ${start} to ${end}.`;
}

// TESTS:
// console.log(knightMoves([2, 5], [2, 5]));
// console.log(knightMoves([0, 0], [3, 3]));
// console.log(knightMoves([3, 3], [0, 0]));
console.log(knightMoves([0, 0], [7, 7]));
// try {
//   console.log(knightMoves([8, 9], [7, -1]));
// } catch (err) {
//   console.log('Handled:', err.message);
// }
