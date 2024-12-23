'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MODELS_NAME = require('./_models-name');


var OrganizationConfig = new Schema({
  organization_id: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.ORGANIZATION,
    required: true
  },
  details: {
    type: Schema.Types.Mixed,
    default: null
  },
}, {
  timestamps: true
})

OrganizationConfig.statics.setOneById = async (id, updateData) => {
  return await mongoose.model(MODELS_NAME.ORG_CONFIG).findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  )
}

module.exports = mongoose.model(MODELS_NAME.ORG_CONFIG, OrganizationConfig);