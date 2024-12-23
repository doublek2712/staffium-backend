'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MODELS_NAME = require('./_models-name');

var DayAttendance = new Schema({
  organization_id: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.ORGANIZATION,
    required: true
  },
  staff_id: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.STAFF,
    required: true
  },
  day: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    required: true,
  },
  check_in: {
    type: Date,
    default: null
  },
  check_out: {
    type: Date,
    default: null
  }
})

DayAttendance.statics.setOneById = async (id, updateData) => {
  return await mongoose.model(MODELS_NAME.DAYATTENDANCE).findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  )
}

module.exports = mongoose.model(MODELS_NAME.DAYATTENDANCE, DayAttendance);