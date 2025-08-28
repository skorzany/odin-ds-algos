/* eslint-disable no-underscore-dangle */
class Node {
  constructor(key, value) {
    this.key = key;
    this.data = value;
    this.next = null;
  }
}

export default class HashMap {
  constructor() {
    this.LOAD_FACTOR = 0.75;
    this.CAPACITY_BASE = 16;
    this.buckets = new Array(this.CAPACITY_BASE);
    this.capacityCurrent = this.CAPACITY_BASE;
    this.entryCount = 0;
  }

  // create and return the hash code for the given key (will throw an error if the key is not a string, or if the produced hashCode falls out of the current bounds)
  hash(key) {
    if (typeof key !== 'string') throw new Error('Invalid key type');
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      // long keys can produce a very large number which exceeds JS's integer limit,
      // so to keep the precision we do modulo division on each iteration instead once at the end:
      hashCode %= this.capacityCurrent;
    }
    if (hashCode < 0 || this.capacityCurrent <= hashCode)
      throw new Error('Trying to access index out of bounds');
    return hashCode;
  }

  // set the new key-value pair in the map, or update the existing one
  set(key, value) {
    const index = this.hash(key);
    let nodeParent = null;
    let nodeCurrent = this.buckets[index];
    while (nodeCurrent) {
      if (nodeCurrent.key === key) {
        nodeCurrent.data = value;
        return;
      }
      [nodeParent, nodeCurrent] = [nodeCurrent, nodeCurrent.next];
    }
    if (nodeParent === null) this.buckets[index] = new Node(key, value);
    else nodeParent.next = new Node(key, value);
    this.entryCount += 1;

    const isOverloaded =
      this.LOAD_FACTOR * this.capacityCurrent < this.entryCount;
    if (isOverloaded) this._rebuild();
  }

  // return the value assigned to the given key, or null if the key is absent
  get(key) {
    const index = this.hash(key);
    let nodeCurrent = this.buckets[index];
    while (nodeCurrent) {
      if (nodeCurrent.key === key) return nodeCurrent.data;
      nodeCurrent = nodeCurrent.next;
    }
    return null;
  }

  // check if the map contains the given key
  has(key) {
    const index = this.hash(key);
    let nodeCurrent = this.buckets[index];
    while (nodeCurrent) {
      if (nodeCurrent.key === key) return true;
      nodeCurrent = nodeCurrent.next;
    }
    return false;
  }

  // remove the node with the given key fom the map & return true; false otherwise
  remove(key) {
    const index = this.hash(key);
    let nodeParent = null;
    let nodeCurrent = this.buckets[index];
    while (nodeCurrent) {
      if (nodeCurrent.key === key) break;
      [nodeParent, nodeCurrent] = [nodeCurrent, nodeCurrent.next];
    }
    if (nodeCurrent) {
      if (nodeParent === null) this.buckets[index] = undefined;
      else nodeParent.next = nodeCurrent.next;
      this.entryCount -= 1;
      return true;
    }
    return false;
  }

  // return the number of key-value pairs stored in the map
  length() {
    return this.entryCount;
  }

  // remove all entries from the map and restore the defaults
  clear() {
    this.buckets = new Array(this.CAPACITY_BASE);
    this.capacityCurrent = this.CAPACITY_BASE;
    this.entryCount = 0;
  }

  // return the array containing all of the keys from the map
  keys() {
    const keysSeen = [];
    this.buckets.forEach((bucket) => {
      let nodeCurrent = bucket;
      while (nodeCurrent) {
        keysSeen.push(nodeCurrent.key);
        nodeCurrent = nodeCurrent.next;
      }
    });
    return keysSeen;
  }

  // return the array containing all of the values from the map
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

  // return the array containing all of the key-value pairs from the map
  entries() {
    const entriesSeen = [];
    this.buckets.forEach((bucket) => {
      let nodeCurrent = bucket;
      while (nodeCurrent) {
        entriesSeen.push([nodeCurrent.key, nodeCurrent.data]);
        nodeCurrent = nodeCurrent.next;
      }
    });
    return entriesSeen;
  }

  // double the current capacity and recreate the new buckets array from the old one
  _rebuild() {
    this.capacityCurrent *= 2;
    const newBuckets = new Array(this.capacityCurrent);
    this.buckets.forEach((bucket) => {
      let nodeOld = bucket;
      while (nodeOld) {
        const newIndex = this.hash(nodeOld.key);
        let nodeParent = null;
        let nodeCurrent = newBuckets[newIndex];
        while (nodeCurrent)
          [nodeParent, nodeCurrent] = [nodeCurrent, nodeCurrent.next];
        if (nodeParent === null)
          newBuckets[newIndex] = new Node(nodeOld.key, nodeOld.data);
        else nodeParent.next = new Node(nodeOld.key, nodeOld.data);
        nodeOld = nodeOld.next;
      }
    });
    this.buckets = newBuckets;
  }
}
