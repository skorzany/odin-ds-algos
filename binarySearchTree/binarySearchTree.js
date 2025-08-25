/* eslint-disable no-underscore-dangle */
import Queue from '../queue/queue.js';

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  // turns an array of data into balanced binary search tree; returns root node
  buildTree(array) {
    const uniques = new Set(array);
    const ordered = Array.from(uniques).sort((x, y) => x - y);
    return this._buildRecursively(ordered, 0, ordered.length - 1);
  }

  // helper method for recursively building the tree
  _buildRecursively(array, start, end) {
    if (end < start) return null;
    const rootIndex = Math.floor(0.5 * (start + end));
    const root = new Node(array[rootIndex]);
    root.left = this._buildRecursively(array, start, rootIndex - 1);
    root.right = this._buildRecursively(array, rootIndex + 1, end);
    return root;
  }

  // insert *unique* value into the tree
  insert(value) {
    if (value === null || value === undefined) return;
    let nodeParent = null;
    let nodeCurrent = this.root;
    while (nodeCurrent) {
      if (nodeCurrent.data === value) return;
      nodeParent = nodeCurrent;
      nodeCurrent =
        value < nodeCurrent.data ? nodeCurrent.left : nodeCurrent.right;
    }
    if (nodeParent === null) this.root = new Node(value);
    else if (value < nodeParent.data) nodeParent.left = new Node(value);
    else nodeParent.right = new Node(value);
  }

  // iteratively remove the node with given value from the tree while keeping its balance
  deleteItem(value) {
    if (value === null || value === undefined) return;
    let nodeParent = null;
    let nodeCurrent = this.root;
    while (nodeCurrent) {
      if (nodeCurrent.data === value) break;
      nodeParent = nodeCurrent;
      nodeCurrent =
        value < nodeCurrent.data ? nodeCurrent.left : nodeCurrent.right;
    }
    // value not found
    if (nodeCurrent === null) return;
    // value has no children (leaf node)
    if (nodeCurrent.left === null && nodeCurrent.right === null) {
      if (nodeParent === null) this.root = null;
      else if (value < nodeParent.data) nodeParent.left = null;
      else nodeParent.right = null;
    }
    // value has one child
    else if (nodeCurrent.left === null || nodeCurrent.right === null) {
      const onlyChild = nodeCurrent.left ?? nodeCurrent.right;
      if (nodeCurrent.data < nodeParent.data) nodeParent.left = onlyChild;
      else nodeParent.right = onlyChild;
    }
    // both children present
    else {
      let successorParent = nodeCurrent;
      let inorderSuccessor = nodeCurrent.right;
      while (inorderSuccessor.left) {
        successorParent = inorderSuccessor;
        inorderSuccessor = inorderSuccessor.left;
      }
      nodeCurrent.data = inorderSuccessor.data;
      if (successorParent === nodeCurrent)
        successorParent.right = inorderSuccessor.right;
      else successorParent.left = inorderSuccessor.right;
    }
  }

  // returns the node with given value or null if not found
  find(value) {
    if (value === null || value === undefined) return null;
    let nodeCurrent = this.root;
    while (nodeCurrent) {
      if (nodeCurrent.data === value) break;
      nodeCurrent =
        value < nodeCurrent.data ? nodeCurrent.left : nodeCurrent.right;
    }
    return nodeCurrent;
  }

  // iteratively traverse the tree breadth-first 'level order' and call the callback on each node
  levelOrderForEach(callback) {
    if (this.root === null) return;
    if (typeof callback !== 'function')
      throw new Error('No callback function provided');
    const queue = new Queue();
    queue.enqueue(this.root);
    while (!queue.isEmpty()) {
      const nodeCurrent = queue.dequeue().data;
      callback(nodeCurrent);
      if (nodeCurrent.left) queue.enqueue(nodeCurrent.left);
      if (nodeCurrent.right) queue.enqueue(nodeCurrent.right);
    }
  }

  // iteratively traverse the tree depth-first 'in order' (left, root, right) and call the callback on each node
  inOrderForEach(callback) {
    if (typeof callback !== 'function')
      throw new Error('No callback function provided');
    const stack = [];
    let nodeCurrent = this.root;
    while (stack.length || nodeCurrent) {
      while (nodeCurrent) {
        stack.push(nodeCurrent);
        nodeCurrent = nodeCurrent.left;
      }
      nodeCurrent = stack.pop();
      callback(nodeCurrent);
      nodeCurrent = nodeCurrent.right;
    }
  }

  // iteratively traverse the tree depth-first 'pre order' (root, left, right) and call the callback on each node
  preOrderForEach(callback) {
    if (this.root === null) return;
    if (typeof callback !== 'function')
      throw new Error('No callback function provided');
    const stack = [this.root];
    while (stack.length) {
      const nodeCurrent = stack.pop();
      callback(nodeCurrent);
      if (nodeCurrent.right) stack.push(nodeCurrent.right);
      if (nodeCurrent.left) stack.push(nodeCurrent.left);
    }
  }

  // iteratively traverse the tree depth-first 'post order' (left, right, root) and call the callback on each node
  postOrderForEach(callback) {
    if (this.root === null) return;
    if (typeof callback !== 'function')
      throw new Error('No callback function provided');
    const stack = [this.root];
    const traversed = [];
    while (stack.length) {
      const nodeCurrent = stack.pop();
      traversed.push(nodeCurrent);
      if (nodeCurrent.left) stack.push(nodeCurrent.left);
      if (nodeCurrent.right) stack.push(nodeCurrent.right);
    }
    traversed.reverse().forEach(callback);
  }

  // iteratively return the height of the node with given value or null (height = number of edges from that node to its farthest leaf node)
  height(value) {
    if (value === null || value === undefined) return null;
    let nodeCurrent = this.root;
    while (nodeCurrent) {
      if (nodeCurrent.data === value) break;
      nodeCurrent =
        value < nodeCurrent.data ? nodeCurrent.left : nodeCurrent.right;
    }
    if (nodeCurrent === null) return null;
    const queue = new Queue();
    queue.enqueue(nodeCurrent);
    let level = 0;
    let nodesAtLevel = 1;
    while (!queue.isEmpty()) {
      const nodeVisited = queue.dequeue().data;
      nodesAtLevel -= 1;
      if (nodeVisited.left) queue.enqueue(nodeVisited.left);
      if (nodeVisited.right) queue.enqueue(nodeVisited.right);
      if (nodesAtLevel === 0 && !queue.isEmpty()) {
        level += 1;
        nodesAtLevel = queue.size();
      }
    }
    return level;
  }

  // iteratively return the depth of the node with given value or null (depth = number of edges from that node to the root)
  depth(value) {
    if (value === null || value === undefined) return null;
    let counter = 0;
    let nodeCurrent = this.root;
    while (nodeCurrent) {
      if (nodeCurrent.data === value) return counter;
      nodeCurrent =
        value < nodeCurrent.data ? nodeCurrent.left : nodeCurrent.right;
      counter += 1;
    }
    return null;
  }

  // check if the tree is balanced
  isBalanced() {
    if (this.root === null) return true;
    return (
      Math.abs(
        this._heightRecursive(this.root.left) -
          this._heightRecursive(this.root.right)
      ) <= 1
    );
  }

  // helper method for recursively finding the height of given node
  _heightRecursive(root) {
    if (root === null) return 0;
    if (root.left === null && root.right === null) return 0;
    return (
      1 +
      Math.max(
        this._heightRecursive(root.left),
        this._heightRecursive(root.right)
      )
    );
  }

  // rebalance an unbalanced tree
  rebalance() {
    const sortedData = [];
    this.inOrderForEach((node) => sortedData.push(node.data));
    this.root = this._buildRecursively(sortedData, 0, sortedData.length - 1);
  }
}
