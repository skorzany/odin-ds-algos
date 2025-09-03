import Queue from '../../queue/queue.js';
import ADJACENCY_LIST from './adjacencyList.js';
import { coordsToNumber, numberToCoords, inRange } from './utils.js';

// breadth-first search on undirected, unweighted graph
export default function knightMoves(start, end) {
  const nodeStartNumber = coordsToNumber(start);
  const nodeEndNumber = coordsToNumber(end);
  if (!inRange(nodeStartNumber, -1, 64) || !inRange(nodeEndNumber, -1, 64))
    throw new Error('Coordinates out of bounds.');
  const visitedAndParentMap = {};
  visitedAndParentMap[nodeStartNumber] = null;
  const queue = new Queue();
  queue.enqueue(nodeStartNumber);
  while (!queue.isEmpty()) {
    let nodeCurrent = queue.dequeue().data;
    if (nodeCurrent === nodeEndNumber) {
      const shortestPath = [];
      while (nodeCurrent !== null) {
        shortestPath.push(numberToCoords(nodeCurrent));
        nodeCurrent = visitedAndParentMap[nodeCurrent];
      }
      if (shortestPath.length === 1) return "You're already there!";
      return `You made it in ${shortestPath.length - 1} move${shortestPath.length > 2 ? 's' : ''}! Here's your path:\n[${shortestPath.reverse().join(']\n[')}]`;
    }
    ADJACENCY_LIST[nodeCurrent].forEach((nodeAdjacent) => {
      if (!(nodeAdjacent in visitedAndParentMap)) {
        visitedAndParentMap[nodeAdjacent] = nodeCurrent;
        queue.enqueue(nodeAdjacent);
      }
    });
  }
  return 'Path not found. Is the adjacency list correct?';
}
