'use strict';

const { Error, Success } = require('../common/responses/index.js')
const PositionService = require('../services/position.service.js')

const PositionController = {
  getOnePosition: async (req, res, next) => {
    try {
      const pos = await PositionService.getOnePositionById(req.params.pos_id)
      return Success.OkResponse(res, undefined, pos)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
  getAllPosition: async (req, res, next) => {
    try {
      const posList = await PositionService.getAllPosition(req.user)
      return Success.OkResponse(res, undefined, posList)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
  createOnePosition: async (req, res, next) => {
    try {
      const newPos = await PositionService.createOnePosition(req.user, req.body)
      return Success.OkResponse(res, undefined, newPos)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
  updateOnePosition: async (req, res, next) => {
    try {
      const updatedPos = await PositionService.updateOnePositionById(req.params.pos_id, req.body)
      return Success.OkResponse(res, undefined, updatedPos)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
  deleteOnePosition: async (req, res, next) => {
    try {
      await PositionService.deleteOnePositionById(req.params.pos_id)
      return Success.OkResponse(res)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
}

module.exports = PositionController