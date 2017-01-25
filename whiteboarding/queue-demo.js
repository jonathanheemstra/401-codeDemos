'use strict';

module.exports = Queue;

// queue constructor
function Queue() {
  this.next = 0;
  this.length = 0;
}

// add an element to the queue
Queue.prototype.enQueue = function(value) {
  this[this.length] = value;
  if(!this.next) this.next = 0;
  this.length++;
};

Queue.prototype.deQueue = function() {
  if(this.length === 0) return;
  --this.length;
  let result = this[this.next];
  delete this[this.next];
  this.next++;
  return result;
};
//
// let nums = new Queue();
//
// console.log('Add 1 to queue', nums.enQueue('first'));
// console.log('current queue', nums);
//
// console.log('Add 2 to queue', nums.enQueue('second'));
// console.log('current queue', nums);
//
// console.log('Add 3 to queue', nums.enQueue('third'));
// console.log('current queue', nums);
//
// console.log('removed from queue', nums.deQueue());
// console.log('current queue', nums);
//
// console.log('removed from queue', nums.deQueue());
// console.log('current queue', nums);
//
// console.log('Add undefined to queue', nums.enQueue('random'));
// console.log('current queue', nums);
//
// console.log('removed from queue', nums.deQueue());
// console.log('current queue', nums);
