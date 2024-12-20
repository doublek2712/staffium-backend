const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const MongoDBInstance = require('./configs/mongo')
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// init middleware
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// init routes
app.use('/', require('./routes/index'))

// init database
MongoDBInstance;

// checkOverloads()

// handle error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    message: error.message,
    stack: error.stack,
    status: statusCode,
  })
})

module.exports = app