'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema
const authenticate = require('../auth/authenticate')

const MODELS_NAME = require('./_models-name');

var Organization = new Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
})

Organization.statics.findByToken = async (token) => {
  const id = authenticate.decodeOrgToken(token)._id
  return await mongoose.model(MODELS_NAME.ORGANIZATION).findById(id)
}

module.exports = mongoose.model(MODELS_NAME.ORGANIZATION, Organization);