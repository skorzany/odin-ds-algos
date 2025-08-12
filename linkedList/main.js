import LinkedList from './linkedList.js';

const list = new LinkedList();

try {
  list.removeAt(0);
} catch {
  console.log('***removeAt on empty list handled***');
}
list.insertAt('cat', 0);
console.log(list.removeAt(0)); // Node('cat')
console.log(list.toString()); // 'null'
list.append('cat');
list.prepend('dog');
list.append('parrot');
console.log(list.head()); // Node('dog')
list.append('trash');
console.log(list.tail()); // Node('trash')
console.log(list.pop()); // Node('trash')
console.log(list.tail()); // Node('parrot')
list.append('hamster');
list.append('snake');
list.append('turtle');
console.log(list.toString()); // ( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null
console.log(list.contains('trash')); // false
console.log(list.find('cat')); // 1
console.log(list.find('trash')); // null
console.log(list.size()); // 6
console.log(list.at(4)); // Node('snake')
list.insertAt('beaver', 3);
console.log(list.toString()); // ( dog ) -> ( cat ) -> ( parrot ) -> ( beaver ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null
try {
  list.insertAt('trash1', -5);
} catch {
  console.log(`***insertAt with negative index handled***`);
}
try {
  list.insertAt('trash2', 113);
} catch {
  console.log(`***insertAt with index out of bounds handled***`);
}
console.log(list.toString()); // should be same as before
console.log(list.removeAt(list.find('beaver'))); // Node('beaver')
console.log(list.find('beaver')); // null
console.log(list.find('non-existent-value')); // null
list.removeAt(null); // does nothing
list.removeAt(list.find('non-existent-value')); // does nothing
console.log(list.toString()); // ( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null
try {
  list.removeAt(-123);
} catch (error) {
  console.log(`***removeAt with negative index handled***`);
}
try {
  list.removeAt(467676);
} catch (error) {
  console.log(`***removeAt with index out of bounds handled***`);
}
console.log(String(list)); // should be same as before
list.removeAt('not a number'); // should do nothing
list.removeAt([1, 2, 3]); // should do nothing as well
list.insertAt('asfassf', null); // does nothing
list.insertAt('kkkkk', [1]); // does nothing
console.log(list.at('two')); // undefined
console.log(list.toString()); // should be same as before
list.insertAt('head', 0);
list.insertAt('tail', list.size());
console.log(list.toString()); // ( head ) -> ( dog ) -> ( cat ) -> ( parrot ) -> ( beaver ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> ( tail ) -> null
