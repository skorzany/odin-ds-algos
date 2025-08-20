import Tree from './binarySearchTree.js';

const test = [600, 100, 400, 400, 400, 500, 20, 30, 40, 50, 22];
const x = new Tree(test);

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

console.log('initial tree');
console.log(prettyPrint(x.root));
x.insert(400);
console.log('after inserting a duplicate');
console.log(prettyPrint(x.root));
x.insert(1000);
console.log('after inserting largest value yet');
console.log(prettyPrint(x.root));
x.insert(-2);
console.log('after inserting smallest value yet');
console.log(prettyPrint(x.root));
x.deleteItem(-2);
console.log('after deleting -2 (leaf node)');
console.log(prettyPrint(x.root));
x.deleteItem(500);
console.log('after deleting 500 (node with single child)');
console.log(prettyPrint(x.root));
x.deleteItem(Math.PI);
console.log('after deleting nonexistent value');
console.log(prettyPrint(x.root));
x.deleteItem(22);
console.log('after deleting 22 (node with two children inside the tree)');
console.log(prettyPrint(x.root));
x.deleteItem(50);
console.log('after deleting 50 (root node with two children)');
console.log(prettyPrint(x.root));
