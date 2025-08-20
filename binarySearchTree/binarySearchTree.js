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

  // turns an array of data into a balanced binary tree; returns root node
  buildTree(array) {
    const uniques = new Set(array);
    const ordered = Array.from(uniques).sort((x, y) => x - y);
    return this._buildRecursively(ordered, 0, ordered.length - 1);
  }

  // helper method for recursively building a tree
  _buildRecursively(array, start, end) {
    if (end < start) return null;
    const rootIndex = Math.floor(0.5 * (start + end));
    const root = new Node(array[rootIndex]);
    root.left = this._buildRecursively(array, start, rootIndex - 1);
    root.right = this._buildRecursively(array, rootIndex + 1, end);
    return root;
  }

  // insert unique value into the tree
  insert(value) {
    let nodePrevious = null;
    let nodeCurrent = this.root;
    while (nodeCurrent) {
      nodePrevious = nodeCurrent;
      if (value < nodeCurrent.data) nodeCurrent = nodeCurrent.left;
      else if (nodeCurrent.data < value) nodeCurrent = nodeCurrent.right;
      else return;
    }
    if (nodePrevious === null) this.root = new Node(value);
    else if (value < nodePrevious.data) nodePrevious.left = new Node(value);
    else nodePrevious.right = new Node(value);
  }

  // iteratively remove value from the tree
  deleteItem(value) {
    let nodePrevious = null;
    let nodeCurrent = this.root;
    // move pointers towards the value
    while (nodeCurrent) {
      if (nodeCurrent.data === value) break;
      else {
        nodePrevious = nodeCurrent;
        nodeCurrent =
          value < nodeCurrent.data ? nodeCurrent.left : nodeCurrent.right;
      }
    }
    // value not found
    if (nodeCurrent === null) return;
    // value has no children (leaf node)
    if (nodeCurrent.left === null && nodeCurrent.right === null) {
      if (nodePrevious === null) this.root = null;
      else if (value < nodePrevious.data) nodePrevious.left = null;
      else nodePrevious.right = null;
    }
    // value has one child
    else if (nodeCurrent.left === null || nodeCurrent.right === null) {
      const onlyChild = nodeCurrent.left ?? nodeCurrent.right;
      if (nodeCurrent.data < nodePrevious.data) nodePrevious.left = onlyChild;
      else nodePrevious.right = onlyChild;
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
      if (inorderSuccessor.data < successorParent.data)
        successorParent.left = inorderSuccessor.right;
      else successorParent.right = inorderSuccessor.right;
    }
  }

  // returns the node with given value or null if not found
  find(value) {
    let nodeCurrent = this.root;
    while (nodeCurrent) {
      if (nodeCurrent.data === value) break;
      if (value < nodeCurrent.data) nodeCurrent = nodeCurrent.left;
      else nodeCurrent = nodeCurrent.right;
    }
    return nodeCurrent;
  }

  // iteratively traverse the tree breadth-first and call the callback on each node
  levelOrderForEach(callback) {
    if (this.root === null) return;
    if (typeof callback !== 'function')
      throw new Error('No callback function provided');
    const queue = [this.root];
    for (let node of queue) {
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  // iteratively traverse the tree depth-first and call the callback on each node
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

  // iteratively traverse the tree depth-first and call the callback on each node
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

  // iteratively traverse the tree depth-first and call the callback on each node
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

  // returns the height of the node with given value (longest path from that node to leaf node)
  height(value) {}

  // returns the depth of the node with given value (number of edges from that node to the root)
  depth(value) {}

  // check if the tree is balanced
  isBalanced() {}

  // rebalance an unbalanced tree
  rebalance() {
    const sortedData = [];
    this.inOrderForEach((node) => sortedData.push(node.data));
    this.root = this._buildRecursively(sortedData, 0, sortedData.length - 1);
  }
}
