'use strict';

const { Error, Success } = require('../common/responses/index.js');
const DayAttendanceService = require('../services/day-attendance.service.js')
const StaffService = require('../services/staff.service.js')
const OrganizationService = require('../services/organization.service.js')
const DayAttendanceController = {
  //this func only for cron 
  createTodayAttendanceListForAllOrg: async () => {
    try {
      const orgs = await OrganizationService.getAllOrganization()
      orgs.map(async (i) => {
        const staffs = await StaffService.getAllStaff(i._id)
        staffs.map(async (i) => {
          await DayAttendanceService.createTodayAttendance(i)
        })
      })
    }
    catch (error) {
      console.log(error)
    }
  },

  //
  checkin: async (req, res, next) => {
    try {
      const attendance = await DayAttendanceService.createAttendanceByCheckin(req.user, new Date())
      return Success.OkResponse(res, undefined, attendance)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
  checkout: async (req, res, next) => {
    try {
      const attendance = await DayAttendanceService.updateAttendanceByCheckout(req.user, new Date())
      return Success.OkResponse(res, undefined, attendance)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
  //
  getAllTodayAttendance: async (req, res, next) => {
    try {
      const attendances = await DayAttendanceService.getAllAttendanceByTime(req.user, new Date(), req.query)
      return Success.OkResponse(res, undefined, attendances)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
}

module.exports = DayAttendanceController