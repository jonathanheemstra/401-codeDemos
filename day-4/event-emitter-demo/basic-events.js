'use strict';

const EE = require('events');
const ee = new EE();

ee.on('customEvent', () => {
  console.log('msg:', 'custom event fired');
});

ee.emit('customEvent');

ee.on('anotherCustomEvent', () => {
  ee.emit('customEvent');
  console.log('msg:', 'another custom event fired');
});

ee.emit('anotherCustomEvent');
