import HashMap from './hashMap.js';

// instantiation and setting values
const test = new HashMap();
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
console.log(test.length()); // should be 12
console.log(test.capacity); // should be 16 as the load factor was not exceeded
test.set('hat', 'fancy-new-color');
test.set('banana', 'brown-yellow');
console.log(test.length()); // should still be 12 as we only updated some keys
console.log(test.capacity); // again should be 16 as updates should not grow the capacity
test.set('moon', 'silver');
console.log(test.length()); // should be 13
console.log(test.capacity); // should be 32 as we added new node which broke the load limit
test.set('apple', 'green');
test.set('dog', 'black');
console.log(test.length()); // should still be 13 as we only updated existing keys
console.log(test.capacity); // still 32
// other methods
console.log(test.get('elephant')); // 'gray'
console.log(test.get('coin')); // null
console.log(test.has('carrot')); // true
console.log(test.has('trash')); // false
console.log(test.keys()); // it might be not in order, but roughly: ['apple', 'banana', 'carrot', 'dog', 'elephant', 'frog', 'grape', 'hat', 'ice cream', 'jacket', 'kite', 'lion', 'moon']
console.log(test.values()); // it might be not in order, but roughly: ['green', 'brown-yellow', 'orange', 'black', 'gray', 'green', 'purple', 'fancy-new-color', 'white', 'blue', 'pink', 'golden', 'silver']
console.log(test.entries()); // it might be not in order, but roughly: [['apple', 'green'], ['banana', 'brown-yellow'], ['carrot', 'orange'], ['dog', 'black'], ['elephant', 'gray'], ['frog', 'green'], ['grape', 'purple'], ['hat', 'fancy-new-color'], ['ice cream', 'white'], ['jacket', 'blue'], ['kite', 'pink'], ['lion', 'gold'], ['moon', 'silver']]
console.log(test.remove('nonexistentKey')); // should be false
console.log(test.length()); // still 13 as we tried to remove nonexisting key
console.log(test.capacity); // still 32
console.log(test.remove('hat')); // should be true
console.log(test.length()); // now it should be 12
console.log(test.capacity); // still 32 as there's no mechanism to reduce the capacity other than clearing everything
console.log(test.entries()); // it might be not in order, but roughly: [['apple', 'green'], ['banana', 'brown-yellow'], ['carrot', 'orange'], ['dog', 'black'], ['elephant', 'gray'], ['frog', 'green'], ['grape', 'purple'], ['ice cream', 'white'], ['jacket', 'blue'], ['kite', 'pink'], ['lion', 'gold'], ['moon', 'silver']]
test.clear();
console.log(test.length()); // should be 0
console.log(test.capacity); // should be back at default 16
console.log(test.entries()); // []
