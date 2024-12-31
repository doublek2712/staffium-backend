const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors')
const MongoDBInstance = require('./configs/mongo')
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport')
const session = require('express-session')
const { Error } = require('./common/responses/index.js');
const { StatusCodes } = require('./utils/httpStatusCode.js');



const app = express();

// init middleware
app.use(cors())
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


// handle error
app.use((req, res, next) => {
  const error = new Error.ThrowableError({ status: StatusCodes.NOT_FOUND }, { msg: '' })
  next(error);
})

app.use((error, req, res, next) => {
  return Error.ThrowErrorHandler(res, error.status, error.message)
})

module.exports = app