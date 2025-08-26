import LinkedList from './linkedList.js';

const list = new LinkedList();

try {
  list.removeAt(0);
} catch {
  console.log('***removeAt on empty list handled***');
}
try {
  list.insertAt('cat', 0);
} catch {
  console.log('***insertAt on empty list handled***');
}
list.append('cat');
console.log(list.removeAt(0)); // Node('cat')
console.log(list.toString() === 'null'); // true
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
console.log(list.contains('trash') === false); // true
console.log(list.find('cat') === 1); // true
console.log(list.find('trash') === null); // true
console.log(list.size() === 6); // true
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
console.log(list.find('beaver') === null); // true
console.log(list.find('non-existent-value') === null); // true
try {
  list.removeAt(list.find('non-existent-value'));
} catch {
  console.log('***removeAt with non-numeric index handled***');
}
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
try {
  list.insertAt('asfassf', null);
} catch {
  console.log('***insertAt with non-numeric index handled***');
}
try {
  console.log(list.at('two'));
} catch {
  console.log('***at with non-numeric index handled***');
}
list.insertAt(undefined, 2);
console.log(list.toString()); // same as before
list.insertAt('head', 0);
try {
  list.insertAt('tail', list.size());
} catch {
  console.log('***insertAt with list size as index handled***');
}
list.insertAt('tail', list.size() - 1);
console.log(list.toString()); // ( head ) -> ( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( tail ) -> ( turtle ) -> null
list.insertAt(list.pop().data, list.size() - 1);
console.log(list.toString()); // ( head ) -> ( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> ( tail ) -> null
