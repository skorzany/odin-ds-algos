class Node {
  constructor(value) {
    this.data = value;
    this.next = null;
  }
}

export default class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // add node with value to the end of the queue
  enqueue(value) {
    if (value === null || value === undefined) return;
    const nodeToAdd = new Node(value);
    if (!this.head) [this.head, this.tail] = [nodeToAdd, nodeToAdd];
    else {
      this.tail.next = nodeToAdd;
      this.tail = nodeToAdd;
    }
    this.length += 1;
  }

  // remove and return the node from the front of the queue
  dequeue() {
    const nodeToRemove = this.head;
    if (nodeToRemove) {
      this.head = nodeToRemove.next;
      if (this.head === null) this.tail = null;
      this.length -= 1;
    }
    return nodeToRemove;
  }

  // return the first node without removing it
  peek() {
    return this.head;
  }

  // check if the queue is empty
  isEmpty() {
    return this.length === 0;
  }

  // return number of nodes in the queue
  size() {
    return this.length;
  }

  // remove all nodes from the queue
  clear() {
    [this.head, this.tail, this.length] = [null, null, 0];
  }

  // print the values of nodes in the queue
  print() {
    const values = [];
    let nodeCurrent = this.head;
    while (nodeCurrent) {
      values.push(nodeCurrent.data);
      nodeCurrent = nodeCurrent.next;
    }
    return values.join(' -> ');
  }
}
