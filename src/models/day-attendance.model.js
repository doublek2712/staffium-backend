'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MODELS_NAME = require('./_models-name');
const { buildFilter, buildSort } = require('../helpers/query-params.builder.js')
const { startOfDay, endOfDay, startOfMonth, startOfNextMonth } = require('../helpers/date.js')

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
    default: new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }))
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
  },
  off_request: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.REQUEST,
    required: false
  }
})

DayAttendance.statics.setOneById = async (id, updateData) => {
  return await mongoose.model(MODELS_NAME.DAYATTENDANCE).findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  )
}

DayAttendance.index({ day: 1 });
DayAttendance.statics.getAllByTimeAndQuery = async (org_id, time, query) => {
  const { page = 1, limit = 10, sort, filter } = query
  const queryFilter = buildFilter(filter)
  const querySort = buildSort(sort) || {
    check_in: 1
  }

  return await mongoose.model(MODELS_NAME.DAYATTENDANCE).aggregate([
    {
      $lookup: {
        from: `${MODELS_NAME.STAFF}s`,
        localField: 'staff_id',
        foreignField: '_id',
        as: 'staff'
      }
    },
    {
      $unwind: '$staff'
    },
    {
      $lookup: {
        from: `${MODELS_NAME.DEPT}s`,
        localField: 'staff.department',
        foreignField: '_id',
        as: 'staff.department'
      }
    },
    {
      $lookup: {
        from: `${MODELS_NAME.POS}s`,
        localField: 'staff.position',
        foreignField: '_id',
        as: 'staff.position'
      },
    },
    {
      $match: {
        organization_id: org_id,
        day: {
          $gte: startOfDay(time),
          $lt: endOfDay(time)
        },
        ...queryFilter
      }
    },
    {
      $skip: (Number(page) - 1) * Number(limit)
    },
    {
      $limit: Number(limit)
    },
    {
      $sort: querySort
    },

  ])
}

module.exports = mongoose.model(MODELS_NAME.DAYATTENDANCE, DayAttendance);