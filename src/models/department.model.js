'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { Error } = require('../common/responses/index')
const { StatusCodes } = require('../utils/httpStatusCode')

const MODELS_NAME = require('./_models-name');

var Department = new Schema({
  organization_id: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.ORGANIZATION,
    default: null
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
})

Department.statics.updateSize = async (dept_id) => {
  try {
    const staffCount = await mongoose.model(MODELS_NAME.STAFF).countDocuments({ department: dept_id });

    const updatedDepartment = await mongoose.model(MODELS_NAME.DEPT).findByIdAndUpdate(
      dept_id,
      {
        $set: {
          size: staffCount
        }
      },
      { new: true }
    );

    return updatedDepartment;
  } catch (err) {
    throw new Error.ThrowableError(StatusCodes.INTERNAL_SERVER_ERROR, err.message || 'Failed to update size');
  }
}
Department.statics.setOneById = async (id, updateData) => {
  return await mongoose.model(MODELS_NAME.DEPT).findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  )
}

module.exports = mongoose.model(MODELS_NAME.DEPT, Department);