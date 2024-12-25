'use strict';

const { Error, Success } = require('../common/responses/index.js')
var Staff = require('../models/staff.model')
const StaffService = require('../services/staff.service.js')

const StaffController = {
  // for Staff
  getMyRecord: async (req, res, next) => {
    try {
      const staff = await StaffService.getOneStaffById(req.user.staff_id)
      return Success.OkResponse(res, 'DM', staff)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }

  },
  updateMyRecord: async (req, res, next) => {
    try {
      const staff = await StaffService.updateOneStaffById(req.user.staff_id, req.body)
      return Success.OkResponse(res, 'Successful', staff)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },

  // for HR 
  getAllStaff: async (req, res, next) => {
    try {
      const staffList = await StaffService.getAllStaff(req.user.organization_id, req.query)
      return Success.OkResponse(res, 'DM', staffList)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
  getOneStaff: async (req, res, next) => {

  },
  updateOneStaff: async (req, res, next) => {

  },
  deleteStaffs: async (req, res, next) => {

  },
  deleteStaff: async (req, res, next) => {

  },

}

module.exports = StaffController