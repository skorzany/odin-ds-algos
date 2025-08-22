import Queue from './queue.js';

const queue = new Queue();
console.log(queue.length() === 0); // true
console.log(queue.view()); // []
console.log(queue.dequeue() === null); // true
console.log(queue.length() === 0); // true
queue.enqueue(0);
console.log(queue.head === queue.tail); // true
queue.enqueue(1);
console.log(queue.head !== queue.tail); // true
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.view()); // [0, 1, 2, 3]
console.log(queue.length() === 4); // true
queue.dequeue();
queue.dequeue();
console.log(queue.length() === 2); // true
console.log(queue.view()); // [2, 3]
console.log(queue.tail); // Node(3)
console.log(queue.head); // Node(2)
console.log(queue.dequeue()); // Node(2)
console.log(queue.head === queue.tail); // true
queue.dequeue();
queue.dequeue();
queue.dequeue();
queue.dequeue();
console.log(queue.length() === 0); // true
