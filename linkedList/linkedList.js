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
    let lastNode = this.head();
    if (lastNode === null) this.headNode = nodeToAdd;
    else {
      while (lastNode.nextNode) lastNode = lastNode.nextNode;
      lastNode.nextNode = nodeToAdd;
    }
  }

  // add value to the start of the list
  prepend(value) {
    const nodeToAdd = new Node(value);
    const firstNode = this.head();
    if (firstNode === null) this.headNode = nodeToAdd;
    else {
      nodeToAdd.nextNode = firstNode;
      this.headNode = nodeToAdd;
    }
  }

  // total number of nodes in the list
  size() {
    let counter = 0;
    let currentNode = this.head();
    while (currentNode) {
      counter += 1;
      currentNode = currentNode.nextNode;
    }
    return counter;
  }

  // first node of the list
  head() {
    return this.headNode;
  }

  // last node of the list
  tail() {
    let lastNode = this.head();
    if (lastNode === null) return null;
    else {
      while (lastNode.nextNode) lastNode = lastNode.nextNode;
      return lastNode;
    }
  }

  // node at the given index
  at(index) {
    if (typeof index !== 'number') return;
    if (index < 0 || this.size() <= index)
      throw new Error('Trying to access index out of bounds');
    let currentNode = this.head();
    for (let i = 0; i < index; i += 1) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  // remove last node from the list
  pop() {
    let secondToLastNode = this.head();
    if (!secondToLastNode || !secondToLastNode.nextNode) {
      this.headNode = null;
      return secondToLastNode;
    }
    let lastNode = secondToLastNode.nextNode;
    while (lastNode.nextNode) {
      secondToLastNode = lastNode;
      lastNode = lastNode.nextNode;
    }
    secondToLastNode.nextNode = null;
    return lastNode;
  }

  // is value in the list?
  contains(value) {
    let currentNode = this.head();
    while (currentNode) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  // return index of value in the list or null if not found
  find(value) {
    let index = 0;
    let currentNode = this.head();
    while (currentNode) {
      if (currentNode.value === value) return index;
      currentNode = currentNode.nextNode;
      index += 1;
    }
    return null;
  }

  // string representation of the list
  toString() {
    const nodeValues = [];
    let currentNode = this.head();
    while (currentNode) {
      nodeValues.push(`( ${currentNode.value} )`);
      currentNode = currentNode.nextNode;
    }
    nodeValues.push('null');
    return nodeValues.join(' -> ');
  }

  // insert a node with value at given index
  insertAt(value, index) {
    if (typeof index !== 'number') return;
    const L = this.size();
    if (index === 0) this.prepend(value);
    else if (index === L) this.append(value);
    else if (index < 0 || L < index)
      throw new Error('Trying to access index out of bounds');
    else {
      const nodeToAdd = new Node(value);
      let previousNode = this.head();
      let currentNode = previousNode.nextNode;
      for (let i = 1; i < index; i += 1) {
        previousNode = currentNode;
        currentNode = currentNode.nextNode;
      }
      previousNode.nextNode = nodeToAdd;
      nodeToAdd.nextNode = currentNode;
    }
  }

  // remove the node at given index
  removeAt(index) {
    if (typeof index !== 'number') return;
    const L = this.size();
    if (index < 0 || L <= index)
      throw new Error('Trying to access index out of bounds');
    else if (index === 0) {
      const nodeToRemove = this.head();
      this.headNode = nodeToRemove.nextNode;
      return nodeToRemove;
    } else {
      let previousNode = this.head();
      let nodeToRemove = previousNode.nextNode;
      for (let i = 1; i < index; i += 1) {
        previousNode = nodeToRemove;
        nodeToRemove = nodeToRemove.nextNode;
      }
      previousNode.nextNode = nodeToRemove.nextNode;
      return nodeToRemove;
    }
  }
}
