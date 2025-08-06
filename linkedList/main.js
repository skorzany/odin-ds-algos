import LinkedList from './linkedList.js';

const list = new LinkedList();

list.append('cat');
list.prepend('dog');
list.append('parrot');
console.log(list.head()); // 'dog'
list.append('trash');
console.log(list.tail()); // 'trash'
console.log(list.pop()); // 'trash'
console.log(list.tail()); // 'parrot'
list.append('hamster');
list.append('snake');
list.append('turtle');
console.log(list.toString()); // ( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null
console.log(list.contains('trash')); // false
console.log(list.find('cat')); // 1
console.log(list.find('trash')); // null
console.log(list.size()); // 6
console.log(list.at(4)); // 'snake'
list.insertAt('beaver', 3);
console.log(list.toString()); // ( dog ) -> ( cat ) -> ( parrot ) -> ( beaver ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null
list.insertAt('trash1', -5);
console.log(list.toString()); // ( trash1 ) -> ( dog ) -> ( cat ) -> ( parrot ) -> ( beaver ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> ( trash2 ) -> null
list.insertAt('trash2', 113);
console.log(list.toString()); // ( trash1 ) -> ( dog ) -> ( cat ) -> ( parrot ) -> ( beaver ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> ( trash2 ) -> null
console.log('removed: ', list.removeAt(list.find('trash2'))); // trash2
console.log(list.find('trash1')); // 0
list.removeAt(list.find('trash1'));
list.removeAt(-123);
list.removeAt(467676);
console.log(String(list)); // ( dog ) -> ( cat ) -> ( parrot ) -> ( beaver ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null
list.removeAt('not a number'); // should do nothing
list.removeAt([1, 2, 3]); // should do nothing as well
