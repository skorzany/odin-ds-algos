/* eslint-disable no-console */
import Tree from './binarySearchTree.js';

// driver code
// helper functions:
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const printData = (node) => console.log(node.data);

const randomNumbers = (maxNumber = 100, count = 10) => {
  const numbers = [];
  for (let i = 0; i < count; i += 1)
    numbers.push(Math.floor(Math.random() * (maxNumber + 1)));
  return numbers;
};

// working with the tree
const myTree = new Tree(randomNumbers());
console.log('=== initial tree ===');
console.log(prettyPrint(myTree.root));
console.log('initial balance:', myTree.isBalanced());
console.log('=== traversals ===');
console.log('Breadth-first:');
myTree.levelOrderForEach(printData);
console.log('Depth-first:');
console.log('*preorder:');
myTree.preOrderForEach(printData);
console.log('*postorder:');
myTree.postOrderForEach(printData);
console.log('*inorder:');
myTree.inOrderForEach(printData);
console.log('insert big values with some duplicates to unbalance the tree...');
myTree.insert(200);
myTree.insert(300);
myTree.insert(400);
myTree.insert(500);
myTree.insert(250);
myTree.insert(345);
myTree.insert(346);
myTree.insert(154);
myTree.insert(111);
myTree.insert(177);
for (let n = 0; n < 10; n += 1) myTree.insert(101);
console.log('=== unbalanced tree ===');
console.log(prettyPrint(myTree.root));
console.log('balance after insertion:', myTree.isBalanced());
console.log('height of unbalanced tree root:', myTree.height(myTree.root.data)); // should match the current number of levels, counting from 0
console.log('height of the leaf node:', myTree.height(500));

myTree.rebalance();
console.log('=== rebalanced tree ===');
console.log(prettyPrint(myTree.root));
console.log('balance after rebuilding:', myTree.isBalanced());
console.log('=== new traversals ===');
console.log('Breadth-first:');
myTree.levelOrderForEach(printData);
console.log('Depth-first:');
console.log('*preorder:');
myTree.preOrderForEach(printData);
console.log('*postorder:');
myTree.postOrderForEach(printData);
console.log('*inorder:');
myTree.inOrderForEach(printData);
console.log('=== other methods ===');
console.log('roots height:', myTree.height(myTree.root.data)); // should match the current number of levels, counting from 0
console.log('roots depth:', myTree.depth(myTree.root.data));
console.log('leaf node height:', myTree.height(500));
console.log('find existing value:', myTree.find(346));
console.log('find non-existing value:', myTree.find(-Math.PI));
console.log('deleting root twice...');
myTree.deleteItem(myTree.root.data);
myTree.deleteItem(myTree.root.data);
console.log('balance after deletion:', myTree.isBalanced());
console.log(prettyPrint(myTree.root));
