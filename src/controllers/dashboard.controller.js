'use strict';

const { Error, Success } = require('../common/responses/index.js')
const DepartmentService = require('../services/department.service.js')
const DayAttendanceService = require('../services/day-attendance.service.js')
const RequestService = require('../services/request.service.js')

const DashboardController = {
  getTodayDashboard: async (req, res, next) => {
    try {
      const todayAttendance = await DayAttendanceService.getAllAttendanceByTimeWithoutQuery(req.user, new Date())
      const remainingRequest = await RequestService.getAllRemainingRequest(req.user, '')
      return Success.OkResponse(res, undefined, {
        today_attendance: todayAttendance,
        remaining_request: remainingRequest
      })
    }
    catch (err) {
      return next(err)
    }
  }
}

module.exports = DashboardController