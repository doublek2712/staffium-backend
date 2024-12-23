'use strict';

var Position = require('../models/position.model.js')
const { Error } = require('../common/responses/index.js')

const PositionService = {
  getOnePositionById: async (id) => {
    try {
      const pos = await Position.findById(id).lean()
      return pos
    }
    catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  getAllPosition: async (user) => {
    try {
      const posList = await Position.find({ organization_id: user.organization_id }).lean()
      return posList
    }
    catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  createOnePosition: async (user, payload) => {
    try {
      const newPos = await Position.create({
        organization_id: user.organization_id,
        name: payload.name,
        description: payload.description
      })
      return newPos
    }
    catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  updateOnePositionById: async (id, payload) => {
    try {
      const updatedPos = await Position.findByIdAndUpdate(
        id,
        { $set: payload },
        { new: true }
      )
      return updatedPos
    }
    catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  deleteOnePositionById: async (id) => {
    try {
      await Position.deleteOne({ _id: id })
    }
    catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
}

module.exports = PositionService