import HashMap from './hashMap.js';

const test = new HashMap();
// hashing:
console.log(test.hash('grape') === test.hash('hat')); // true
console.log(test.hash('apple') !== test.hash('grape')); // true
try {
  test.hash([1, 2, 3]);
} catch {
  console.log('***hashing non-string key handled***');
}
// empty map operations:
console.log(test.entryCount === 0); // true
console.log(test.remove('abcd') === false); // true
console.log(test.entryCount !== -1); // true, counter should not decrease
// adding stuff, but not exceeding the load factor:
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
console.log(test.length() === 12); // true
console.log(test.capacityCurrent === 16); // true, as the load factor was not exceeded
// updating existing key-value pairs:
test.set('hat', 'fancy-new-color');
test.set('banana', 'brown-yellow');
console.log(test.length() === 12); // true
console.log(test.capacityCurrent === 16); // true, we only updated some existing keys
// adding new pair, which should exceed the limit and trigger the rebuild:
test.set('moon', 'silver');
console.log(test.length() === 13); // true, added a *new* key-value pair
console.log(test.capacityCurrent === 32); // true, adding a *new* pair exceeded the load factor
// updating keys in the enlarged bucket structure:
test.set('apple', 'green');
test.set('dog', 'black');
console.log(test.length() === 13); // true,
console.log(test.capacityCurrent === 32); // true, we only updated some existing keys
// lookup methods & removal:
console.log(test.get('elephant') === 'gray'); // true
console.log(test.get('coin') === null); // true
console.log(test.has('carrot') === true); // true
console.log(test.has('trash') === false); // true
console.log(test.keys()); // it might be not in order, but roughly: ['apple', 'banana', 'carrot', 'dog', 'elephant', 'frog', 'grape', 'hat', 'ice cream', 'jacket', 'kite', 'lion', 'moon']
console.log(test.values()); // it might be not in order, but roughly: ['green', 'brown-yellow', 'orange', 'black', 'gray', 'green', 'purple', 'fancy-new-color', 'white', 'blue', 'pink', 'golden', 'silver']
console.log(test.entries()); // it might be not in order, but roughly: [['apple', 'green'], ['banana', 'brown-yellow'], ['carrot', 'orange'], ['dog', 'black'], ['elephant', 'gray'], ['frog', 'green'], ['grape', 'purple'], ['hat', 'fancy-new-color'], ['ice cream', 'white'], ['jacket', 'blue'], ['kite', 'pink'], ['lion', 'gold'], ['moon', 'silver']]
console.log(test.remove('nonexistentKey') === false); // true
console.log(test.length() === 13); // true, looking for stuff, or removing nonexistent keys do not change the state of the map
console.log(test.capacityCurrent === 32); // true, same reason as above
console.log(test.remove('hat') === true); // true
console.log(test.length() === 12); // true, now we have removed an existing key, so the counter decreases
console.log(test.capacityCurrent === 32); // still 32 as there's no mechanism to reduce the capacity other than clearing everything
console.log(test.entries()); // same output as before, minus ['hat', 'fancy-new-color']
console.log(test.remove('apple') === true); // true
console.log(test.length() === 11); // true
// resetting the map
test.clear();
console.log(test.length() === 0); // true
console.log(test.capacityCurrent === 16); // true, back to the default
console.log(test.entries().length === 0); // true
console.log(test.values().length === 0); // true
console.log(test.keys()); // []
