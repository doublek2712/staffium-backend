'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MODELS_NAME = require('./_models-name');

var Position = new Schema({
  organization_id: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.ORGANIZATION,
    default: null
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
}, {
  timestamps: true
})

Position.statics.setOneById = async (id, updateData) => {
  return await mongoose.model(MODELS_NAME.POS).findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  )
}

module.exports = mongoose.model(MODELS_NAME.POS, Position);