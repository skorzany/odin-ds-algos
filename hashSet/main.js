import HashSet from './hashSet.js';

const test = new HashSet();
// hashing:
console.log(test.hash('grape') === test.hash('hat')); // true
console.log(test.hash('apple') !== test.hash('grape')); // true
try {
  test.hash(null);
} catch {
  console.log('***hashing non-string value handled***');
}
// empty set operations:
console.log(test.length() === 0); // true
console.log(test.remove('abcd') === false); // true
console.log(test.length() !== -1); // true, counter should not decrease
// adding stuff, but not exceeding the load factor:
test.add('apple');
test.add('banana');
test.add('carrot');
test.add('dog');
test.add('elephant');
test.add('frog');
test.add('grape');
test.add('hat');
test.add('ice cream');
test.add('jacket');
test.add('kite');
test.add('lion');
console.log(test.length() === 12); // true
console.log(test.capacityCurrent === 16); // true, as the load factor was not exceeded
// adding duplicates:
test.add('hat');
test.add('banana');
console.log(test.length() === 12); // true
console.log(test.capacityCurrent === 16); // true, we tried to add existing values
// adding new value, which should exceed the limit and trigger the rebuild:
test.add('moon');
console.log(test.length() === 13); // true, added a *new* value
console.log(test.capacityCurrent === 32); // true, adding a *new* value exceeded the load factor
// adding duplicates to the enlarged bucket structure:
test.add('apple');
test.add('dog');
console.log(test.length() === 13); // true
console.log(test.capacityCurrent === 32); // true, nothing should change as we tried to add existing value
// lookup methods & removal:
console.log(test.has('carrot') === true); // true
console.log(test.has('trash') === false); // true
console.log(test.values()); // it might be not in order, but roughly: ['apple', 'banana', 'carrot', 'dog', 'elephant', 'frog', 'grape', 'hat', 'ice cream', 'jacket', 'kite', 'lion', 'moon']
console.log(test.remove('nonexistentKey') === false); // true
console.log(test.length() === 13); // true, looking for stuff, or removing nonexistent values do not change the state of the set
console.log(test.capacityCurrent === 32); // true, same reason as above
console.log(test.remove('hat') === true); // true
console.log(test.length() === 12); // true, we now have removed an existing value, so the counter decreased
console.log(test.capacityCurrent === 32); // still 32 as there's no mechanism to reduce the capacity other than clearing everything
console.log(test.values()); // same output as before, minus 'hat'
console.log(test.remove('apple') === true); // true
console.log(test.length() === 11); // true
// resetting the set:
test.clear();
console.log(test.length() === 0); // true
console.log(test.capacityCurrent === 16); // true, back to the default
console.log(test.values().length === 0); // true
console.log(test.values()); // []
