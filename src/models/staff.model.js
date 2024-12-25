'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MODELS_NAME = require('./_models-name');
const { buildFilter, buildSort } = require('../helpers/query-params.builder.js')
const { Error, Success } = require('../common/responses/index.js')
var Staff = new Schema({
  organization_id: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.ORGANIZATION,
    default: null
  },
  first_name: {
    type: String,
    default: ''
  },
  last_name: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    default: ''
  },
  nationality: {
    type: String,
    default: ''
  },
  birthdate: {
    type: Date,
    default: null
  },
  birthplace: {
    type: String,
    default: ''
  },
  place_of_residence: {
    type: String,
    default: ''
  },
  citizen_id: {
    type: String,
    default: ''
  },
  phone: {
    type: Number,
    default: null
  },
  email: {
    type: String,
    default: ''
  },
  date_of_contract: {
    type: Date,
    default: null
  },
  contract_end_date: {
    type: Date,
    default: null,
  },
  contract: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.FILE,
    required: false
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.DEPT,
    required: false
  },
  position: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.POS,
    required: false
  }
}, {
  timestamps: true
})

Staff.statics.getOneById = async (id) => {
  return await mongoose.model(MODELS_NAME.STAFF)
    .findById(id)
    .populate(['contract', 'department', 'position'])
}
Staff.statics.setOrganization = async (staff, org_id) => {
  return await mongoose.model(MODELS_NAME.STAFF).findByIdAndUpdate(staff._id, {
    $set: {
      organization_id: org_id
    }
  })
}
Staff.statics.setOneById = async (id, updateData) => {
  return await mongoose.model(MODELS_NAME.STAFF).findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true })
}
Staff.statics.getAllByQuery = async (org_id, query) => {
  const { page = 1, limit = 10, sort, filter } = query
  const queryFilter = buildFilter(filter)
  const querySort = buildSort(sort) || {
    name: 1
  }

  try {
    const aggregate = await mongoose.model(MODELS_NAME.STAFF).aggregate([
      {
        $lookup: {
          from: `${MODELS_NAME.DEPT}s`,
          localField: 'department',
          foreignField: '_id',
          as: 'department'
        }
      },
      {
        $unwind: {
          path: '$department', preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: `${MODELS_NAME.POS}s`,
          localField: 'position',
          foreignField: '_id',
          as: 'position'
        }
      },
      {
        $unwind: {
          path: '$position', preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          organization_id: org_id,
          ...queryFilter
        }
      },
      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) },
      { $sort: querySort },
    ])
    const count = await mongoose.model(MODELS_NAME.STAFF).countDocuments({ organization_id: org_id, ...queryFilter })

    return {
      totalPage: Math.ceil(count / limit),
      page: Number(page),
      totalItem: aggregate.length,
      items: aggregate
    }
  }
  catch (err) {
    throw new Error.ThrowableError({ status: err.status, msg: err.message })
  }
}


module.exports = mongoose.model(MODELS_NAME.STAFF, Staff);