'use strict';

// step 1
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const debug = require('debug')('cfgram:server');

// step 35
const authRouter = require('./route/auth-router.js');
const errors = require('./lib/err-middleware.js');

// step 6
dotenv.load();

// step 2
const PORT = process.env.PORT;
const app = express();

// step 5
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

// step 3
app.use(cors());
app.use(morgan('dev'));

// step 36
app.use(authRouter);
app.use(errors);

// step 4
app.listen(PORT, () => {
  debug(`Server Up: ${PORT}`);
});
