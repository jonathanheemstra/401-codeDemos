'use strict';

var str = 'some cool string';

var buff = new Buffer(str);

// binary representation output of str: <Buffer 73 6f 6d 65 20 63 6f 6f 6c 20 73 74 72 69 6e 67>
console.log(buff);

// convert binary representation output of str back to string. 'utf8' is implied but can transfer into other types of encoding when encoding type is passed as parameter of .toString() function.

/*
https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings
utf8
base64
hex
*/

buff.toString();
buff.toString('utf8');
buff.toString('base64');
buff.toString('hex');

var coolStoryJonny = 'Jonny, cool story';
var buff = new Buffer(coolStoryJonny);
console.log(buff);
buff.toString();
