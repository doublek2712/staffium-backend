const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const MongoDBInstance = require('./configs/mongo')
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport')
const session = require('express-session')

const initialAttendanceForAll = require('./scheduler/cron')

const app = express();

// init middleware
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))


app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());

// init routes
app.use('/', require('./routes/index'))

// init database
MongoDBInstance;

// initialAttendanceForAll.start()

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