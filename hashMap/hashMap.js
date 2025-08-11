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
    this.buckets = Array(this.BASE_CAPACITY);
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
    // update existing key, or...
    if (this.has(key)) {
      const bucket = this.hash(key);
      let currentNode = this.buckets[bucket];
      while (true) {
        if (currentNode.key === key) {
          currentNode.value = value;
          return;
        }
        currentNode = currentNode.nextNode;
      }
    }
    // ...add new key
    const requiresGrowth =
      this.LOAD_FACTOR * this.capacity < this.entryCount + 1;
    if (requiresGrowth) {
      // double the capacity and re-populate new buckets
      this.capacity *= 2;
      const newBuckets = new Array(this.capacity);
      for (const [k, v] of this.entries()) {
        const bucket = this.hash(k);
        if (bucket < 0 || this.capacity <= bucket)
          throw new Error('Trying to access index out of bounds');
        let currentNode = newBuckets[bucket];
        if (!currentNode) newBuckets[bucket] = new Node(k, v);
        else {
          while (currentNode.nextNode) currentNode = currentNode.nextNode;
          currentNode.nextNode = new Node(k, v);
        }
      }
      this.buckets = newBuckets;
    }
    // add new node to the map
    const bucket = this.hash(key);
    if (bucket < 0 || this.capacity <= bucket)
      throw new Error('Trying to access index out of bounds');
    let currentNode = this.buckets[bucket];
    if (!currentNode) this.buckets[bucket] = new Node(key, value);
    else {
      while (currentNode.nextNode) currentNode = currentNode.nextNode;
      currentNode.nextNode = new Node(key, value);
    }
    this.entryCount += 1;
  }

  // return value assigned to a key or null if the key is absent
  get(key) {
    const bucket = this.hash(key);
    if (bucket < 0 || this.capacity <= bucket)
      throw new Error('Trying to access index out of bounds');
    let currentNode = this.buckets[bucket];
    while (currentNode) {
      if (currentNode.key === key) return currentNode.value;
      currentNode = currentNode.nextNode;
    }
    return null;
  }

  // check if the map contains specific key
  has(key) {
    const bucket = this.hash(key);
    if (bucket < 0 || this.capacity <= bucket)
      throw new Error('Trying to access index out of bounds');
    let currentNode = this.buckets[bucket];
    while (currentNode) {
      if (currentNode.key === key) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  // remove the node with given key fom the map & return true; false otherwise
  remove(key) {
    const bucket = this.hash(key);
    if (bucket < 0 || this.capacity <= bucket)
      throw new Error('Trying to access index out of bounds');
    let currentNode = this.buckets[bucket];
    if (!currentNode) return false;
    else if (currentNode.key === key) {
      this.buckets[bucket] = currentNode.nextNode ?? undefined;
      this.entryCount -= 1;
      return true;
    }
    let next = currentNode.nextNode;
    while (next) {
      if (next.key === key) {
        currentNode.nextNode = next.nextNode;
        this.entryCount -= 1;
        return true;
      }
      currentNode = next;
      next = currentNode.nextNode;
    }
    return false;
  }

  // number of keys stored in the map
  length() {
    return this.entryCount;
  }

  // remove all entries from the map
  clear() {
    this.capacity = this.BASE_CAPACITY;
    this.entryCount = 0;
    this.buckets = new Array(this.BASE_CAPACITY);
  }

  // return array with all keys from the map
  keys() {
    const keysSeen = [];
    for (const bucket of this.buckets) {
      let currentNode = bucket;
      while (currentNode) {
        keysSeen.push(currentNode.key);
        currentNode = currentNode.nextNode;
      }
    }
    return keysSeen;
  }

  // return array with all values from the map
  values() {
    const valuesSeen = [];
    for (const bucket of this.buckets) {
      let currentNode = bucket;
      while (currentNode) {
        valuesSeen.push(currentNode.value);
        currentNode = currentNode.nextNode;
      }
    }
    return valuesSeen;
  }

  // return array with each key-value pair from the map
  entries() {
    const entriesSeen = [];
    for (const bucket of this.buckets) {
      let currentNode = bucket;
      while (currentNode) {
        const entry = [currentNode.key, currentNode.value];
        entriesSeen.push(entry);
        currentNode = currentNode.nextNode;
      }
    }
    return entriesSeen;
  }
}
