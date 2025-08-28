/* eslint-disable no-underscore-dangle */
class Node {
  constructor(value) {
    this.data = value;
    this.next = null;
  }
}

export default class HashSet {
  constructor() {
    this.LOAD_FACTOR = 0.75;
    this.BASE_CAPACITY = 16;
    this.buckets = new Array(this.BASE_CAPACITY);
    this.capacityCurrent = this.BASE_CAPACITY;
    this.valueCount = 0;
  }

  // create and return the hash code for the given value (will throw an error if the value is not a string, or if the produced hashCode falls out of the current bounds)
  hash(value) {
    if (typeof value !== 'string') throw new Error('Invalid value type');
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < value.length; i += 1) {
      hashCode = primeNumber * hashCode + value.charCodeAt(i);
      hashCode %= this.capacityCurrent; // same reason as in the HashMap class
    }
    if (hashCode < 0 || this.capacityCurrent <= hashCode)
      throw new Error('Trying to access index out of bounds');
    return hashCode;
  }

  // add a *unique* value to the set
  add(value) {
    const index = this.hash(value);
    let nodeParent = null;
    let nodeCurrent = this.buckets[index];
    while (nodeCurrent) {
      if (nodeCurrent.data === value) return;
      [nodeParent, nodeCurrent] = [nodeCurrent, nodeCurrent.next];
    }
    if (nodeParent === null) this.buckets[index] = new Node(value);
    else nodeParent.next = new Node(value);
    this.valueCount += 1;

    const isOverloaded =
      this.LOAD_FACTOR * this.capacityCurrent < this.valueCount;
    if (isOverloaded) this._rebuild();
  }

  // check if the set contains the given value
  has(value) {
    const index = this.hash(value);
    let nodeCurrent = this.buckets[index];
    while (nodeCurrent) {
      if (nodeCurrent.data === value) return true;
      nodeCurrent = nodeCurrent.next;
    }
    return false;
  }

  // remove the node with the given value from the set & return true; false otherwise
  remove(value) {
    const index = this.hash(value);
    let nodeParent = null;
    let nodeCurrent = this.buckets[index];
    while (nodeCurrent) {
      if (nodeCurrent.data === value) break;
      [nodeParent, nodeCurrent] = [nodeCurrent, nodeCurrent.next];
    }
    if (nodeCurrent) {
      if (nodeParent === null) this.buckets[index] = undefined;
      else nodeParent.next = nodeCurrent.next;
      this.valueCount -= 1;
      return true;
    }
    return false;
  }

  // return the number of values stored in the set
  length() {
    return this.valueCount;
  }

  // remove all values from the set and restore the defaults
  clear() {
    this.buckets = new Array(this.BASE_CAPACITY);
    this.capacityCurrent = this.BASE_CAPACITY;
    this.valueCount = 0;
  }

  // return the array containing all of the values from the set
  values() {
    const valuesSeen = [];
    this.buckets.forEach((bucket) => {
      let nodeCurrent = bucket;
      while (nodeCurrent) {
        valuesSeen.push(nodeCurrent.data);
        nodeCurrent = nodeCurrent.next;
      }
    });
    return valuesSeen;
  }

  // double the current capacity and recreate the new buckets array from the old one
  _rebuild() {
    this.capacityCurrent *= 2;
    const newBuckets = new Array(this.capacityCurrent);
    this.buckets.forEach((bucket) => {
      let nodeOld = bucket;
      while (nodeOld) {
        const newIndex = this.hash(nodeOld.data);
        let nodeParent = null;
        let nodeCurrent = newBuckets[newIndex];
        while (nodeCurrent)
          [nodeParent, nodeCurrent] = [nodeCurrent, nodeCurrent.next];
        if (nodeParent === null) newBuckets[newIndex] = new Node(nodeOld.data);
        else nodeParent.next = new Node(nodeOld.data);
        nodeOld = nodeOld.next;
      }
    });
    this.buckets = newBuckets;
  }
}
