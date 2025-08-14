import HashMap from './hashMap.js';

// instantiation and setting values
const test = new HashMap();
console.log(test.hash('grape') === test.hash('hat')); // true
console.log(test.hash('apple') !== test.hash('grape')); // true
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
console.log(test.length()); // 12
console.log(test.capacity); // 16, as the load factor was not exceeded
test.set('hat', 'fancy-new-color');
test.set('banana', 'brown-yellow');
console.log(test.length()); // still 12
console.log(test.capacity); // still 16
test.set('moon', 'silver');
console.log(test.length()); // 13
console.log(test.capacity); // 32, as we added new node which broke the load limit
test.set('apple', 'green');
test.set('dog', 'black');
console.log(test.length()); // still 13
console.log(test.capacity); // still 32
// other methods
console.log(test.get('elephant')); // 'gray'
console.log(test.get('coin')); // null
console.log(test.has('carrot')); // true
console.log(test.has('trash')); // false
console.log(test.keys()); // it might be not in order, but roughly: ['apple', 'banana', 'carrot', 'dog', 'elephant', 'frog', 'grape', 'hat', 'ice cream', 'jacket', 'kite', 'lion', 'moon']
console.log(test.values()); // it might be not in order, but roughly: ['green', 'brown-yellow', 'orange', 'black', 'gray', 'green', 'purple', 'fancy-new-color', 'white', 'blue', 'pink', 'golden', 'silver']
console.log(test.entries()); // it might be not in order, but roughly: [['apple', 'green'], ['banana', 'brown-yellow'], ['carrot', 'orange'], ['dog', 'black'], ['elephant', 'gray'], ['frog', 'green'], ['grape', 'purple'], ['hat', 'fancy-new-color'], ['ice cream', 'white'], ['jacket', 'blue'], ['kite', 'pink'], ['lion', 'gold'], ['moon', 'silver']]
console.log(test.remove('nonexistentKey')); // false
console.log(test.length()); // still 13
console.log(test.capacity); // still 32
console.log(test.remove('hat')); // true
console.log(test.length()); // 12
console.log(test.capacity); // still 32 as there's no mechanism to reduce the capacity other than clearing everything
console.log(test.entries()); // it might be not in order, but roughly: [['apple', 'green'], ['banana', 'brown-yellow'], ['carrot', 'orange'], ['dog', 'black'], ['elephant', 'gray'], ['frog', 'green'], ['grape', 'purple'], ['ice cream', 'white'], ['jacket', 'blue'], ['kite', 'pink'], ['lion', 'gold'], ['moon', 'silver']]
console.log(test.remove('apple')); // true (test for removing from the start as 'apple' was added first)
console.log(test.length()); // 11
test.clear();
console.log(test.length()); // 0
console.log(test.capacity); // 16, back to the default
console.log(test.entries()); // []
console.log(test.values()); // []
console.log(test.keys().length); // 0
