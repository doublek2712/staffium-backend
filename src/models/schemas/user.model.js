'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose');

const MODELS_NAME = require('../models-name');

var User = new Schema({
  // organization_id: {
  //   type: Schema.Types.ObjectId,
  //   ref: MODELS_NAME.ORGANIZATION,
  //   required: true
  // },
  // staff_id: {
  //   type: Schema.Types.ObjectId,
  //   ref: MODELS_NAME.STAFF,
  //   required: true
  // },
  roles: [{
    type: String,
    required: false
  }],
  lastLogout: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model(MODELS_NAME.USER, User);