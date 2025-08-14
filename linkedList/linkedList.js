class Node {
  constructor(value = null) {
    this.value = value;
    this.nextNode = null;
  }
}

export default class LinkedList {
  constructor() {
    this.headNode = null;
  }

  // add value to the end of the list
  append(value) {
    const nodeToAdd = new Node(value);
    let nodeLast = this.head();
    if (nodeLast === null) this.headNode = nodeToAdd;
    else {
      while (nodeLast.nextNode) nodeLast = nodeLast.nextNode;
      nodeLast.nextNode = nodeToAdd;
    }
  }

  // add value to the start of the list
  prepend(value) {
    const nodeToAdd = new Node(value);
    const nodeFirst = this.head();
    if (nodeFirst === null) this.headNode = nodeToAdd;
    else {
      nodeToAdd.nextNode = nodeFirst;
      this.headNode = nodeToAdd;
    }
  }

  // total number of nodes in the list
  size() {
    let counter = 0;
    let nodeCurrent = this.head();
    while (nodeCurrent) {
      counter += 1;
      nodeCurrent = nodeCurrent.nextNode;
    }
    return counter;
  }

  // first node of the list
  head() {
    return this.headNode;
  }

  // last node of the list
  tail() {
    let nodeLast = this.head();
    if (nodeLast === null) return null;
    else {
      while (nodeLast.nextNode) nodeLast = nodeLast.nextNode;
      return nodeLast;
    }
  }

  // node at the given index
  at(index) {
    if (typeof index !== 'number') return;
    if (index < 0 || this.size() <= index)
      throw new Error('Trying to access index out of bounds');
    let nodeCurrent = this.head();
    for (let i = 0; i < index; i += 1) nodeCurrent = nodeCurrent.nextNode;
    return nodeCurrent;
  }

  // remove last node from the list
  pop() {
    let nodeSecondToLast = this.head();
    if (!nodeSecondToLast || !nodeSecondToLast.nextNode) {
      this.headNode = null;
      return nodeSecondToLast;
    }
    let nodeLast = nodeSecondToLast.nextNode;
    while (nodeLast.nextNode) {
      nodeSecondToLast = nodeLast;
      nodeLast = nodeLast.nextNode;
    }
    nodeSecondToLast.nextNode = null;
    return nodeLast;
  }

  // is value in the list?
  contains(value) {
    let nodeCurrent = this.head();
    while (nodeCurrent) {
      if (nodeCurrent.value === value) return true;
      nodeCurrent = nodeCurrent.nextNode;
    }
    return false;
  }

  // return index of value in the list or null if not found
  find(value) {
    let index = 0;
    let nodeCurrent = this.head();
    while (nodeCurrent) {
      if (nodeCurrent.value === value) return index;
      nodeCurrent = nodeCurrent.nextNode;
      index += 1;
    }
    return null;
  }

  // string representation of the list
  toString() {
    const nodeValues = [];
    let nodeCurrent = this.head();
    while (nodeCurrent) {
      nodeValues.push(`( ${nodeCurrent.value} )`);
      nodeCurrent = nodeCurrent.nextNode;
    }
    nodeValues.push('null');
    return nodeValues.join(' -> ');
  }

  // insert a node with value at given index
  insertAt(value, index) {
    if (typeof index !== 'number') return;
    if (index < 0 || this.size() <= index)
      throw new Error('Trying to access index out of bounds');
    else if (index === 0) this.prepend(value);
    else {
      let nodeBeforeIndex = this.head();
      let nodeAtIndex = nodeBeforeIndex.nextNode;
      for (let i = 1; i < index; i += 1) {
        nodeBeforeIndex = nodeAtIndex;
        nodeAtIndex = nodeAtIndex.nextNode;
      }
      const nodeToAdd = new Node(value);
      nodeBeforeIndex.nextNode = nodeToAdd;
      nodeToAdd.nextNode = nodeAtIndex;
    }
  }

  // remove the node at given index
  removeAt(index) {
    if (typeof index !== 'number') return;
    if (index < 0 || this.size() <= index)
      throw new Error('Trying to access index out of bounds');
    else if (index === 0) {
      const nodeToRemove = this.head();
      this.headNode = nodeToRemove.nextNode;
      return nodeToRemove;
    } else {
      let nodeBeforeIndex = this.head();
      let nodeAtIndex = nodeBeforeIndex.nextNode;
      for (let i = 1; i < index; i += 1) {
        nodeBeforeIndex = nodeAtIndex;
        nodeAtIndex = nodeAtIndex.nextNode;
      }
      nodeBeforeIndex.nextNode = nodeAtIndex.nextNode;
      return nodeAtIndex;
    }
  }
}
