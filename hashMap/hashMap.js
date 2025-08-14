class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

export default class HashMap {
  constructor() {
    this.LOAD_FACTOR = 0.75;
    this.BASE_CAPACITY = 16;
    this.capacity = this.BASE_CAPACITY;
    this.entryCount = 0;
    this.buckets = new Array(this.BASE_CAPACITY);
  }

  // create and return a hash code for given key
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      // long keys can produce a very large number which exceeds JS's integer limit,
      // so to keep the precision we do modulo division on each iteration instead once at the end:
      hashCode %= this.capacity;
    }
    return hashCode;
  }

  // set a key-value pair in the map
  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || this.capacity <= index)
      throw new Error('Trying to access index out of bounds');
    let nodeLast = this.buckets[index];
    if (!nodeLast) {
      this.buckets[index] = new Node(key, value);
    } else {
      while (true) {
        if (nodeLast.key === key) {
          nodeLast.value = value;
          return;
        } else if (nodeLast.nextNode === null) {
          nodeLast.nextNode = new Node(key, value);
          break;
        } else nodeLast = nodeLast.nextNode;
      }
    }
    this.entryCount += 1;

    const isOverloaded = this.LOAD_FACTOR * this.capacity < this.entryCount;
    if (isOverloaded) {
      this.capacity *= 2;
      this._rebuild();
    }
  }

  // return value assigned to a key or null if the key is absent
  get(key) {
    const index = this.hash(key);
    if (index < 0 || this.capacity <= index)
      throw new Error('Trying to access index out of bounds');
    let nodeCurrent = this.buckets[index];
    while (nodeCurrent) {
      if (nodeCurrent.key === key) return nodeCurrent.value;
      nodeCurrent = nodeCurrent.nextNode;
    }
    return null;
  }

  // check if the map contains specific key
  has(key) {
    const index = this.hash(key);
    if (index < 0 || this.capacity <= index)
      throw new Error('Trying to access index out of bounds');
    let nodeCurrent = this.buckets[index];
    while (nodeCurrent) {
      if (nodeCurrent.key === key) return true;
      nodeCurrent = nodeCurrent.nextNode;
    }
    return false;
  }

  // remove the node with given key fom the map & return true; false otherwise
  remove(key) {
    const index = this.hash(key);
    if (index < 0 || this.capacity <= index)
      throw new Error('Trying to access index out of bounds');
    let nodeBefore = this.buckets[index];
    if (!nodeBefore) return false;
    else if (nodeBefore.key === key) {
      this.buckets[index] = nodeBefore.nextNode ?? undefined;
      this.entryCount -= 1;
      return true;
    } else {
      let nodeCurrent = nodeBefore.nextNode;
      while (nodeCurrent) {
        if (nodeCurrent.key === key) {
          nodeBefore.nextNode = nodeCurrent.nextNode;
          this.entryCount -= 1;
          return true;
        }
        nodeBefore = nodeCurrent;
        nodeCurrent = nodeBefore.nextNode;
      }
      return false;
    }
  }

  // number of keys stored in the map
  length() {
    return this.entryCount;
  }

  // remove all entries from the map and restore the defaults
  clear() {
    this.capacity = this.BASE_CAPACITY;
    this.entryCount = 0;
    this.buckets = new Array(this.BASE_CAPACITY);
  }

  // return array with all keys from the map
  keys() {
    const keysSeen = [];
    for (let i = 0; i < this.capacity; i += 1) {
      let nodeCurrent = this.buckets[i];
      while (nodeCurrent) {
        keysSeen.push(nodeCurrent.key);
        nodeCurrent = nodeCurrent.nextNode;
      }
    }
    return keysSeen;
  }

  // return array with all values from the map
  values() {
    const valuesSeen = [];
    for (let i = 0; i < this.capacity; i += 1) {
      let nodeCurrent = this.buckets[i];
      while (nodeCurrent) {
        valuesSeen.push(nodeCurrent.value);
        nodeCurrent = nodeCurrent.nextNode;
      }
    }
    return valuesSeen;
  }

  // return array with each key-value pair from the map
  entries() {
    const entriesSeen = [];
    for (let i = 0; i < this.capacity; i += 1) {
      let nodeCurrent = this.buckets[i];
      while (nodeCurrent) {
        const entry = [nodeCurrent.key, nodeCurrent.value];
        entriesSeen.push(entry);
        nodeCurrent = nodeCurrent.nextNode;
      }
    }
    return entriesSeen;
  }

  // repopulate the enlarged bucket array
  _rebuild() {
    const newBuckets = new Array(this.capacity);
    for (let i = 0; i < this.buckets.length; i += 1) {
      let nodeOld = this.buckets[i];
      while (nodeOld) {
        const newIndex = this.hash(nodeOld.key);
        if (newIndex < 0 || this.capacity <= newIndex)
          throw new Error('Trying to access index out of bounds');
        const nodeToAdd = new Node(nodeOld.key, nodeOld.value);
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
