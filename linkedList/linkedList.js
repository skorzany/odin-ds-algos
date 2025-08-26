class Node {
  constructor(value = null) {
    this.data = value;
    this.next = null;
  }
}

export default class LinkedList {
  constructor() {
    this.headNode = null;
  }

  // add value to the end of the list
  append(value) {
    if (value === null || value === undefined) return;
    if (this.head() === null) this.headNode = new Node(value);
    else {
      let nodeLast = this.head();
      while (nodeLast.next) nodeLast = nodeLast.next;
      nodeLast.next = new Node(value);
    }
  }

  // add value to the start of the list
  prepend(value) {
    if (value === null || value === undefined) return;
    const newHead = new Node(value);
    if (this.head() === null) this.headNode = newHead;
    else {
      newHead.next = this.head();
      this.headNode = newHead;
    }
  }

  // returns total number of nodes in the list
  size() {
    let counter = 0;
    let nodeCurrent = this.head();
    while (nodeCurrent) {
      counter += 1;
      nodeCurrent = nodeCurrent.next;
    }
    return counter;
  }

  // returns the first node of the list or null if empty
  head() {
    return this.headNode;
  }

  // returns the last node of the list or null if empty
  tail() {
    let nodeLast = this.head();
    while (nodeLast) {
      if (nodeLast.next === null) break;
      nodeLast = nodeLast.next;
    }
    return nodeLast;
  }

  // returns the node at given index
  at(index) {
    if (typeof index !== 'number' || index < 0 || this.size() <= index)
      throw new Error('Trying to access index out of bounds');
    let nodeCurrent = this.head();
    for (let i = 0; i < index; i += 1) nodeCurrent = nodeCurrent.next;
    return nodeCurrent;
  }

  // remove and return the last node from the list or null if empty
  pop() {
    let nodeLastParent = null;
    let nodeLast = this.head();
    if (nodeLast === null) return null;
    while (nodeLast.next)
      [nodeLastParent, nodeLast] = [nodeLast, nodeLast.next];
    if (nodeLastParent === null) this.headNode = null;
    else nodeLastParent.next = null;
    return nodeLast;
  }

  // is value in the list?
  contains(value) {
    let nodeCurrent = this.head();
    while (nodeCurrent) {
      if (nodeCurrent.data === value) return true;
      nodeCurrent = nodeCurrent.next;
    }
    return false;
  }

  // return the index of first occurrence of given value or null if not found
  find(value) {
    let index = 0;
    let nodeCurrent = this.head();
    while (nodeCurrent) {
      if (nodeCurrent.data === value) return index;
      nodeCurrent = nodeCurrent.next;
      index += 1;
    }
    return null;
  }

  // string representation of data in the list
  toString() {
    const values = [];
    let nodeCurrent = this.head();
    while (nodeCurrent) {
      values.push(`( ${nodeCurrent.data} )`);
      nodeCurrent = nodeCurrent.next;
    }
    values.push('null');
    return values.join(' -> ');
  }

  // insert node with value at given index
  insertAt(value, index) {
    if (value === null || value === undefined) return;
    if (typeof index !== 'number' || index < 0 || this.size() <= index)
      throw new Error('Trying to access index out of bounds');
    if (index === 0) this.prepend(value);
    else {
      let nodeParent = this.head();
      let nodeAtIndex = nodeParent.next;
      for (let i = 1; i < index; i += 1)
        [nodeParent, nodeAtIndex] = [nodeAtIndex, nodeAtIndex.next];
      const nodeToAdd = new Node(value);
      [nodeParent.next, nodeToAdd.next] = [nodeToAdd, nodeAtIndex];
    }
  }

  // remove and return the node at given index
  removeAt(index) {
    if (typeof index !== 'number' || index < 0 || this.size() <= index)
      throw new Error('Trying to access index out of bounds');
    let nodeToRemove;
    if (index === 0)
      [nodeToRemove, this.headNode] = [this.head(), this.headNode.next];
    else {
      let nodeParent = this.head();
      nodeToRemove = nodeParent.next;
      for (let i = 1; i < index; i += 1)
        [nodeParent, nodeToRemove] = [nodeToRemove, nodeToRemove.next];
      nodeParent.next = nodeToRemove.next;
    }
    return nodeToRemove;
  }
}
