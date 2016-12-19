'use strict';

// stack constructor
function Stack() {
  // set the length to zero because there is nothing in the stack
  this.length = 0;
}

// build push method to add element to top of the Stack
Stack.prototype.push = function(value) {
  this[this.length++] = value;
  return this;
};

Stack.prototype.pop = function() {
  if(this.length === 0) return;
  var result = this[--this.length];
  delete this[this.length];
  return result;
};

var nums = new Stack();

console.log('push 10', nums.push(10));
console.log('push 20', nums.push(20));
console.log('push 30', nums.push(30));
console.log('push 40', nums.push(40));

console.log('pop off last item', nums.pop(), 'popped off the stack');
console.log('current stack', nums);
console.log('pop off last item', nums.pop(), 'popped off the stack');
console.log('current stack', nums);
console.log('pop off last item', nums.pop(), 'popped off the stack');
console.log('current stack', nums);
