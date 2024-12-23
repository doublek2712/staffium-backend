'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema
const authenticate = require('../auth/authenticate')
const { Error } = require('../common/responses/index')
const { StatusCodes } = require('../utils/httpStatusCode')

const MODELS_NAME = require('./_models-name');

var File = new Schema({
  organization_id: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.ORGANIZATION,
    default: null
  },
  original_name: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  content_type: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 0
  },
  payload: {
    type: Buffer,
    required: true,
  }
}, {
  timestamps: true
})

File.statics.setOneById = async (id, updateData) => {
  return await mongoose.model(MODELS_NAME.DEPT).findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  )
}

module.exports = mongoose.model(MODELS_NAME.FILE, File);