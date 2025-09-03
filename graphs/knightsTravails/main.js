/* eslint-disable no-console */
import knightMoves from './knightMoves.js';

// driver/test code:
console.log(knightMoves([2, 5], [2, 5])); // Already there!
console.log(knightMoves([0, 0], [1, 2])); // 1 move
console.log(knightMoves([0, 0], [3, 3])); // 2 moves
console.log(knightMoves([3, 3], [0, 0])); // 2 moves (previous one in reverse)
console.log(knightMoves([0, 0], [7, 7])); // 6 moves
try {
  console.log(knightMoves([8, 9], [7, -1]));
} catch (err) {
  console.log('Error handled:', err.message); // correct input type, but out-of-bounds
}
try {
  console.log(knightMoves(5, 63));
} catch (err) {
  console.log('Error handled:', err.message); // invalid input
}
