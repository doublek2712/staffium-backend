'use strict';

const { Error, Success } = require('../common/responses/index.js');
const RequestService = require('../services/request.service.js')
const DayAttendanceService = require('../services/day-attendance.service.js')
const RequestController = {
  createRequest: async (req, res, next) => {
    try {
      const request = await RequestService.createOneRequest(req.user, req.body)
      return Success.OkResponse(res, undefined, request)
    } catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
  getAllMyRequest: async (req, res, next) => {
    try {
      const requests = await RequestService.getAllMyRequest(req.user)
      return Success.OkResponse(res, undefined, requests)
    } catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
  updateMyRequest: async (req, res, next) => {
    try {
      const request = await RequestService.updateMyRequestById(req.user, req.params.request_id, req.body)
      if (request) {
        console.log(new Date(request.createdAt))
      }
      return Success.OkResponse(res, undefined, request)
    } catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },

  getAllRequestOfThisMonth: async (req, res, next) => {
    try {
      const requests = await RequestService.getAllRequestOfThisMonth(req.user)
      return Success.OkResponse(res, undefined, requests)
    } catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
  updateRequestStatus: (status) => async (req, res, next) => {
    try {
      const request = await RequestService.updateRequestStatusById(req.params.request_id, status)
      if (request && request.status === RequestStatus.APPROVED) {
        await DayAttendanceService.createAttendanceByRequest(req.user, request)
      }
      return Success.OkResponse(res, undefined, request)
    } catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  }
}

module.exports = RequestController