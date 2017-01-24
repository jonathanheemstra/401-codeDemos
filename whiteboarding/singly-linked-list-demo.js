'use strict';


function Node(val) {
  this.val = val;
  this.next = null;
}

function SinglyLinkedList(array) {
  this.head = null;

  if(Array.isArray(array)) {
    array.forEach( val => {
      return this.prepend(val);
    });
  }
}

SinglyLinkedList.prototype.prepend = function (val) {

  let node = new Node(val);

  if(!this.head) {
    this.head = node;
    return node.val;
  }

  node.next = this.head;
  this.head = node;
  return node.val;
};


SinglyLinkedList.prototype.append = function(val) {

  let node = new Node(val);
  let lastNode = null;

  if(!this.head) {
    this.head = node;
    return node.val;
  }

  _setLastNode(this.head);
  lastNode.next = node;
  return node.val;

  function _setLastNode(node) {
    if(!node) return;
    lastNode = node;
    _setLastNode(node.next);
  }
};

SinglyLinkedList.prototype.appendAlt = function(val) {

  let node = new Node(val);

  if(!this.head) {
    this.head = node;
    return node.val;
  }

  let tail = this.head;

  while(tail.next) {
    tail.next = node;
  }

  this.tail = node;
  return node.val;
};


var sll = new SinglyLinkedList([5, 4, 3]);

sll.prepend(2);
sll.prepend(1);
sll.append(6);
sll.append(7);



/*******************************************************************************************
 ==================================== WITH CONSOLE.LOG ====================================
********************************************************************************************/


// node constructor is the an object with a value and then a pointer to the next thing in the list.
function Node(val) {
  this.val = val;
  this.next = null;
}

// link list constructor this will build out a list initially that we can then add to and remove from.
function SinglyLinkedList(array) {
  this.head = null;

  if(Array.isArray(array)) {
    console.log('SinglyLinkedList - array', array); // array [5, 4, 3]
    array.forEach( val => {
      console.log('SinglyLinkedList - val', val); // val 5
      console.log('SinglyLinkedList - this.prepend', this.prepend); // function (val) {...}
      return this.prepend(val);
    });
  }
}

SinglyLinkedList.prototype.prepend = function (val) {
  // create a new node and pass it value we want to be part of the list.
  let node = new Node(val);

  // if there is no headstate then set it to the node we just created
  if(!this.head) {
    console.log('if.prepend - !this.head 1', this.head); // if - !this.head 1 null
    this.head = node;
    console.log('if.prepend - !this.head 2', this.head); // if - !this.head 2 Node {val: 5, next: null}
    console.log('if.prepend - node', node); // if - node Node {val: 5, next: null}
    console.log('if.prepend - node.val', node.val); // if - node.val 5
    return node.val;
  }

  // if there is a headstate then set the pointer to the
  console.log('prepend - node.next 1', node.next); // node.next 1 null
  node.next = this.head;
  console.log('prepend - node.next 2', node.next); // node.next 2 Node {val: 5, next: null}
  console.log('prepend - this.head 1', this.head); // this.head 1 Node {val: 5, next: null}
  this.head = node;
  console.log('prepend - this.head 2', this.head); // this.head 2 Node {val: 4, next: Node}
  console.log('prepend - node', node); // node Node {val: 4, next: Node}
  console.log('prepend - node.val', node.val); // node.val 4
  return node.val;
};


SinglyLinkedList.prototype.append = function(val) {
  // creates a node with the value that is passed in and a next of null
  let node = new Node(val);
  let lastNode = null;

  // if there is no headstate then set this as the first value in the list.
  if(!this.head) {
    console.log('if.append - !this.head 1', this.head);
    this.head = node;
    console.log('if.append - !this.head 2', this.head);
    console.log('if.append - node', node);
    console.log('if.append - node.val', node.val);
    return node.val;
  }

  console.log('append - this.head', this.head); // this.head Node {val: 1, next: Node}
  _setLastNode(this.head);
  console.log('append - lastNode.next 1', lastNode.next);
  lastNode.next = node;
  console.log('append - lastNode.next 2', lastNode.next);
  console.log('append - node', node);
  console.log('append - node.val', node.val);
  return node.val;

  function _setLastNode(node) {
    if(!node) return;
    console.log('append - lastNode', lastNode);
    console.log('append - node', node);
    lastNode = node;
    console.log('append - node.next', node.next);
    _setLastNode(node.next);
  }

};


var sll = new SinglyLinkedList([5, 4, 3]);

sll.prepend(2);
sll.prepend(1);
sll.append(6);
sll.append(7);

console.log(sll);
// challenge - build out a remove function to remove a node from the list
