'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MODELS_NAME = require('./_models-name');

var Request = new Schema({
  organization_id: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.ORGANIZATION,
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.STAFF,
    required: true
  },
  status: {
    type: String,
    required: true,
  },
  details: {
    type: Schema.Types.Mixed,
    default: null
  },
}, {
  timestamps: true
})

Request.statics.setOneById = async (id, updateData) => {
  return await mongoose.model(MODELS_NAME.REQUEST).findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  )
}

module.exports = mongoose.model(MODELS_NAME.REQUEST, Request);