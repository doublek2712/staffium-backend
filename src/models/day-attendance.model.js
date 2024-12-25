'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MODELS_NAME = require('./_models-name');
const { Error } = require('../common/responses/index.js')
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

  var finalFilter = queryFilter

  if (finalFilter.name !== undefined) {
    const regex = queryFilter.name
    var { name, ...finalFilter } = queryFilter
    finalFilter = {
      ...finalFilter,
      $or: [
        { 'staff.first_name': regex },
        { 'staff.last_name': regex }
      ]
    }
  }
  var countFilter = finalFilter

  if (finalFilter['department._id'] !== undefined) {
    const id = finalFilter['department._id']
    var { 'department._id': deptId, ...finalFilter } = finalFilter
    finalFilter = {
      ...finalFilter,
      'staff.department._id': new mongoose.Types.ObjectId(id)
    }
    var { 'department._id': deptId, ...countFilter } = countFilter
    countFilter = {
      ...countFilter,
      'staff.department': new mongoose.Types.ObjectId(id)
    }
  }

  if (finalFilter.gender !== undefined) {
    const tmp = finalFilter.gender
    var { gender, ...finalFilter } = finalFilter
    finalFilter = {
      ...finalFilter,
      'staff.gender': tmp
    }
    var { gender, ...countFilter } = countFilter
    countFilter = {
      ...countFilter,
      'staff.gender': tmp
    }
  }

  try {
    const aggregate = await mongoose.model(MODELS_NAME.DAYATTENDANCE).aggregate([
      {
        $lookup: {
          from: `${MODELS_NAME.STAFF}s`,
          localField: 'staff_id',
          foreignField: '_id',
          as: 'staff'
        }
      },
      {
        $unwind: {
          path: '$staff', preserveNullAndEmptyArrays: true
        }
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
        $unwind: {
          path: '$staff.department', preserveNullAndEmptyArrays: true
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
        $unwind: {
          path: '$staff.position', preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          organization_id: org_id,
          day: {
            $gte: startOfDay(time),
            $lt: endOfDay(time)
          },
          ...finalFilter
        }
      },
      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) },
      { $sort: querySort },
    ])
    const count = await mongoose.model(MODELS_NAME.DAYATTENDANCE).aggregate([
      {
        $lookup: {
          from: `${MODELS_NAME.STAFF}s`,
          localField: 'staff_id',
          foreignField: '_id',
          as: 'staff'
        }
      },
      {
        $unwind: {
          path: '$staff', preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          organization_id: org_id,
          day: {
            $gte: startOfDay(time),
            $lt: endOfDay(time)
          },
          ...countFilter
        }
      },
      {
        $count: "totalDocument"
      }
    ])

    return {
      totalPage: count && Math.ceil(count[0]?.totalDocument / limit),
      page: Number(page),
      totalItem: aggregate.length,
      items: aggregate
    }
  }
  catch (err) {
    throw new Error.ThrowableError({ status: err.status, msg: err.message })
  }

}

module.exports = mongoose.model(MODELS_NAME.DAYATTENDANCE, DayAttendance);