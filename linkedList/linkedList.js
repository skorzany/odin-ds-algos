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

  append(value) {
    // add value to the end of the list
    if (this.headNode === null) {
      this.headNode = new Node(value);
      return;
    }
    let lastNode = this.head();
    while (lastNode.nextNode) lastNode = lastNode.nextNode;
    lastNode.nextNode = new Node(value);
  }

  prepend(value) {
    // add value to the start of the list
    if (this.head() === null) this.headNode = new Node(value);
    const addedNode = new Node(value);
    addedNode.nextNode = this.head();
    this.headNode = addedNode;
  }

  size() {
    // total number of nodes in the list
    if (this.headNode === null) return 0;
    let counter = 1;
    let current = this.head();
    while (current.nextNode) {
      current = current.nextNode;
      counter += 1;
    }
    return counter;
  }

  head() {
    // first node of the list
    return this.headNode;
  }

  tail() {
    // last node of the list
    if (this.headNode === null) return null;
    let lastNode = this.head();
    while (lastNode.nextNode) lastNode = lastNode.nextNode;
    return lastNode;
  }

  at(index) {
    // node at the given index
    if (index < 0) return null;
    let current = this.head();
    for (let i = 0; i < index; i += 1) {
      current = current.nextNode;
    }
    return current;
  }

  pop() {
    // remove last node from the list
    if (this.headNode === null) return null;
    let previous = this.head();
    let current = previous.nextNode;
    if (current === null) {
      this.headNode = null;
      return previous;
    }
    while (current.nextNode) {
      current = current.nextNode;
      previous = previous.nextNode;
    }
    previous.nextNode = null;
    return current;
  }

  contains(value) {
    // is value in the list?
    let current = this.head();
    while (current) {
      if (current.value === value) return true;
      current = current.nextNode;
    }
    return false;
  }

  find(value) {
    // index of value in the list
    let idx = 0;
    let current = this.head();
    while (current) {
      if (current.value === value) return idx;
      current = current.nextNode;
      idx += 1;
    }
    return null;
  }

  toString() {
    // string representation of the list
    const nodes = [];
    let current = this.head();
    while (current) {
      nodes.push(`( ${current.value} )`);
      current = current.nextNode;
    }
    nodes.push('null');
    return nodes.join(' -> ');
  }

  insertAt(value, index) {
    // insert a node with value at given index
    if (index <= 0) return this.prepend(value);
    else if (this.size() <= index) return this.append(value);
    let previous = this.head();
    let current = previous.nextNode;
    for (let i = 1; i < index; i += 1) {
      previous = current;
      current = current.nextNode;
    }
    const addedNode = new Node(value);
    previous.nextNode = addedNode;
    addedNode.nextNode = current;
  }

  removeAt(index) {
    // remove the node at given index
    if (index < 0) return;
    else if (index === 0) {
      const removedNode = this.head();
      this.headNode = removedNode.nextNode;
      return removedNode;
    }
    let previous = this.head();
    let current = previous.nextNode;
    for (let i = 1; i < index; i += 1) {
      previous = current;
      current = current.nextNode;
      if (current === null) return;
    }
    previous.nextNode = current.nextNode;
    return current;
  }
}
