'use strict';

// step 1
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const debug = require('debug')('cfgram:server');

// step 35
const authRouter = require('./route/auth-router.js');
const errors = require('./lib/err-middleware.js');

// step 86
const picRouter = require('./route/pic-router.js');

// step 57
const galleryRouter = require('./route/gallery-router.js');

// step 6 - important that this line is run/loaded before trying to access any environment variable
if(process.env.NODE_ENV !== 'production') dotenv.load();

// step 2
const PORT = process.env.PORT;
const app = express();

// step 5
mongoose.connect(process.env.MONGODB_URI);

// step 3
app.use(cors());
app.use(morgan('dev'));

// step 36
app.use(authRouter);

// step 58
app.use(galleryRouter);

// step 87
app.use(picRouter);

//step 36
app.use(errors);

// step 4 & 71
const server = module.exports = app.listen(PORT, () => {
  debug(`Server Up: ${PORT}`);
});
server.isRunning = true;
