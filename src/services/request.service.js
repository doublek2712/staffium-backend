'use strict';

var Request = require('../models/request.model.js')
const { Error } = require('../common/responses/index.js')
const RequestStatus = require('../common/enums/request-status')
const { startOfDay, endOfDay, startOfMonth, startOfNextMonth } = require('../helpers/date.js')
const { buildFilter, buildSort } = require('../helpers/query-params.builder.js')

const RequestService = {
  // staff
  createOneRequest: async (user, payload) => {
    try {
      const request = await Request.create({
        organization_id: user.organization_id,
        sender: user.staff_id,
        status: RequestStatus.PENDING,
        details: payload
      })
      return request
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },

  getAllMyRequest: async (user) => {
    try {
      const requests = await Request.find({
        organization_id: user.organization_id,
        sender: user.staff_id
      }).lean()
      return requests
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  updateMyRequestById: async (user, id, payload) => {
    try {
      const request = await Request.findOneAndUpdate({
        organization_id: user.organization_id,
        sender: user.staff_id,
        _id: id
      }, {
        $set: {
          details: {
            ...payload
          }
        }
      }, {
        new: true
      })

      return request
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  deleteMyRequestById: async (user, id) => {
    try {
      const request = await Request.findOneAndDelete({
        organization_id: user.organization_id,
        sender: user.staff_id,
        _id: id
      })
      return request
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },

  //HR 
  getAllRequestOfThisMonth: async (user) => {
    try {
      const requests = await Request.find({
        organization_id: user.organization_id,
        createdAt: {
          $gte: startOfMonth(new Date().getMonth(), new Date().getFullYear()),
          $lt: startOfNextMonth(new Date().getMonth(), new Date().getFullYear())
        }
      }).lean()

      return requests
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  getAllRemainingRequest: async (user, query) => {
    try {
      const { page = 1, limit = 15, sort, filter } = query
      const queryFilter = buildFilter(filter)
      const querySort = buildSort(sort) || {
        'details.day_off': 1
      }
      const requests = await Request.aggregate([
        {
          $match: {
            organization_id: user.organization_id,
            status: RequestStatus.PENDING,
            ...queryFilter
          }
        },
        { $skip: (Number(page) - 1) * Number(limit) },
        { $limit: Number(limit) },
        { $sort: querySort },
      ])
      return requests
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },

  updateRequestStatusById: async (id, status) => {
    try {
      const request = await Request.findByIdAndUpdate(
        id,
        { $set: { status: status } },
        { new: true }
      )

      return request
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  }

}

module.exports = RequestService