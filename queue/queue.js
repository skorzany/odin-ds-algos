/* eslint max-classes-per-file:0 */
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
    this.size = 0;
  }

  enqueue(value) {
    const nodeToAdd = new Node(value);
    if (!this.head) [this.head, this.tail] = [nodeToAdd, nodeToAdd];
    else {
      this.tail.next = nodeToAdd;
      this.tail = nodeToAdd;
    }
    this.size += 1;
  }

  dequeue() {
    const nodeToRemove = this.head;
    if (nodeToRemove) {
      this.head = nodeToRemove.next;
      if (this.head === null) this.tail = null;
      this.size -= 1;
    }
    return nodeToRemove;
  }

  length() {
    return this.size;
  }

  view() {
    const values = [];
    let nodeCurrent = this.head;
    while (nodeCurrent) {
      values.push(nodeCurrent.data);
      nodeCurrent = nodeCurrent.next;
    }
    return values;
  }
}
