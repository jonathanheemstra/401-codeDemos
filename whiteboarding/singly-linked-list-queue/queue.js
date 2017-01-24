'use strict';

const SinglyLinkedList = require('./singly-linked-list.js');

module.exports = Queue;

function Queue() {
  this.sll = new SinglyLinkedList();
}

Queue.prototype.enqueue = function(val) {
  this.sll.append(val);
  return;
};

Queue.prototype.dequeue = function() {
  if(!this.sll.head) return null;

  let node = this.sll.head;

  this.sll.head = node.next;
  return node.val;
};
