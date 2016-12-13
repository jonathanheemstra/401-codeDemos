'use strict';

const fs = require('fs');

const bitmap = fs.readFile(`${__dirname}/assets/palette-bitmap.bmp`);

const bmp = {};

bmp.type = bitmap.toString('utf-8', 0, 2);
bmp.size = bitmap.readInt32LE(2);
bmp.width = bitmap.readUInt32LE(18);
bmp.height = bitmap.readUInt32LE();
pixel array
pixel
