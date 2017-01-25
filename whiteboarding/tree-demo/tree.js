'use strict';

const Queue = require('../singly-linked-list-queue/queue.js');

module.exports = Tree;

function Tree(val, kids) {
  this.val = val;
  this.children = kids;
}

Tree.prototype.breadthFirst = function() {
  let order = [];
  let queue = new Queue();
  order.push(this.val);

  this.children.forEach(child => {
    queue.enqueue(child);
  });

  while(queue.sll.head) {
    if(queue.sll.head.val.children) {
      queue.sll.head.val.children.forEach(child => {
        queue.enqueue(child);
      });
    }
    order.push(queue.dequeue().val);
  }
  return order;
};
