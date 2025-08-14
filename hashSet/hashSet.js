class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

export default class HashSet {
  constructor() {
    this.LOAD_FACTOR = 0.75;
    this.BASE_CAPACITY = 16;
    this.capacity = this.BASE_CAPACITY;
    this.valueCount = 0;
    this.buckets = new Array(this.BASE_CAPACITY);
  }

  // create and return a hash code for given value
  hash(value) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < value.length; i += 1) {
      hashCode = primeNumber * hashCode + value.charCodeAt(i);
      hashCode %= this.capacity; // same reason as in the HashMap class
    }
    return hashCode;
  }

  // add a value to the set
  add(value) {
    const index = this.hash(value);
    if (index < 0 || this.capacity <= index)
      throw new Error('Trying to access index out of bounds');
    let nodeLast = this.buckets[index];
    if (!nodeLast) this.buckets[index] = new Node(value);
    else {
      while (true) {
        if (nodeLast.value === value) return;
        else if (nodeLast.nextNode === null) {
          nodeLast.nextNode = new Node(value);
          break;
        } else nodeLast = nodeLast.nextNode;
      }
    }
    this.valueCount += 1;

    const isOverloaded = this.LOAD_FACTOR * this.capacity < this.valueCount;
    if (isOverloaded) {
      this.capacity *= 2;
      this._rebuild();
    }
  }

  // check if the set contains specific value
  has(value) {
    const index = this.hash(value);
    if (index < 0 || this.capacity <= index)
      throw new Error('Trying to access index out of bounds');
    let nodeLast = this.buckets[index];
    while (nodeLast) {
      if (nodeLast.value === value) return true;
      nodeLast = nodeLast.nextNode;
    }
    return false;
  }

  // remove the value from the set & return true; false otherwise
  remove(value) {
    const index = this.hash(value);
    if (index < 0 || this.capacity <= index)
      throw new Error('Trying to access index out of bounds');
    let nodeBefore = this.buckets[index];
    if (!nodeBefore) return false;
    else if (nodeBefore.value === value) {
      this.buckets[index] = nodeBefore.nextNode ?? undefined;
      this.valueCount -= 1;
      return true;
    } else {
      let nodeCurrent = nodeBefore.nextNode;
      while (nodeCurrent) {
        if (nodeCurrent.value === value) {
          nodeBefore.nextNode = nodeCurrent.nextNode;
          this.valueCount -= 1;
          return true;
        }
        nodeBefore = nodeCurrent;
        nodeCurrent = nodeBefore.nextNode;
      }
      return false;
    }
  }

  // number of values stored in the set
  length() {
    return this.valueCount;
  }

  // remove all values and restore the defaults
  clear() {
    this.capacity = this.BASE_CAPACITY;
    this.valueCount = 0;
    this.buckets = new Array(this.BASE_CAPACITY);
  }

  // return array with all values from the set
  values() {
    let valuesSeen = [];
    for (let i = 0; i < this.capacity; i += 1) {
      let nodeCurrent = this.buckets[i];
      while (nodeCurrent) {
        valuesSeen.push(nodeCurrent.value);
        nodeCurrent = nodeCurrent.nextNode;
      }
    }
    return valuesSeen;
  }

  // repopulate the enlarged bucket array
  _rebuild() {
    const newBuckets = new Array(this.capacity);
    for (let i = 0; i < this.buckets.length; i += 1) {
      let nodeOld = this.buckets[i];
      while (nodeOld) {
        const newIndex = this.hash(nodeOld.value);
        if (newIndex < 0 || this.capacity <= newIndex)
          throw new Error('Trying to access index out of bounds');
        const nodeToAdd = new Node(nodeOld.value);
        let nodeNewLast = newBuckets[newIndex];
        if (!nodeNewLast) newBuckets[newIndex] = nodeToAdd;
        else {
          while (nodeNewLast.nextNode) nodeNewLast = nodeNewLast.nextNode;
          nodeNewLast.nextNode = nodeToAdd;
        }
        nodeOld = nodeOld.nextNode;
      }
    }
    this.buckets = newBuckets;
  }
}
