import HashSet from './hashSet.js';

// instantiation and setting values
const test = new HashSet();
console.log(test.hash('grape') === test.hash('hat')); // true
console.log(test.hash('apple') !== test.hash('grape')); // true
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
console.log(test.length()); // 12
console.log(test.capacity); // 16, as the load factor was not exceeded
test.add('hat');
test.add('banana');
console.log(test.length()); // still 12
console.log(test.capacity); // still 16
test.add('moon');
console.log(test.length()); // 13
console.log(test.capacity); // 32, as we added new node which broke the load limit
test.add('apple');
test.add('dog');
console.log(test.length()); // still 13
console.log(test.capacity); // still 32
// other methods
console.log(test.has('carrot')); // true
console.log(test.has('trash')); // false
console.log(test.values()); // it might be not in order, but roughly: ['apple', 'banana', 'carrot', 'dog', 'elephant', 'frog', 'grape', 'hat', 'ice cream', 'jacket', 'kite', 'lion', 'moon']
console.log(test.remove('nonexistentKey')); // false
console.log(test.length()); // still 13
console.log(test.capacity); // still 32
console.log(test.remove('hat')); // true
console.log(test.length()); // 12
console.log(test.capacity); // still 32 as there's no mechanism to reduce the capacity other than clearing everything
console.log(test.values()); // it might be not in order, but roughly: ['apple', 'banana', 'carrot', 'dog', 'elephant', 'frog', 'grape', 'ice cream', 'jacket', 'kite', 'lion', 'moon']
console.log(test.remove('apple')); // true (test for removing from the start as 'apple' was added first)
console.log(test.length()); // 11
test.clear();
test.remove('trash');
console.log(test.length()); // 0
console.log(test.capacity); // 16, back to the default
console.log(test.values()); // []
console.log(test.values().length); // 0
