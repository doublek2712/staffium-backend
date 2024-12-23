'use strict';

var DayAttendance = require('../models/day-attendance.model.js')
const { Error } = require('../common/responses/index.js')
const { startOfDay, endOfDay, startOfMonth, startOfNextMonth } = require('../helpers/date.js')
const OrganizationConfigService = require('../services/organization-config.service.js')

const { appTimeFormatter, compareTime } = require('../helpers/time.js')
const AttendanceTypes = require('../common/enums/attendance-type.js');
const { StatusCodes } = require('../utils/httpStatusCode.js');
const OffTypes = require('../common/enums/off-type.js');

const { buildFilter, buildSort } = require('../helpers/query-params.builder.js')

const DayAttendanceService = {
  createTodayAttendance: async (staff) => {
    try {
      const attendance = await DayAttendance.create({
        organization_id: staff.organization_id,
        staff_id: staff._id,
        type: 'Pending'
      })
      return attendance
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  createAttendanceByRequest: async (user, request) => {
    try {
      const attendance = await DayAttendance.create({
        organization_id: user.organization_id,
        staff_id: user.staff_id,
        type: AttendanceTypes.OFF_AUTHORIZED,
        off_request: request._id
      })
      return attendance
    }
    catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },

  getAllAttendanceByTime: async (user, time, query) => {
    try {
      const attendances = await DayAttendance.getAllByTimeAndQuery(user.organization_id, time, query)
      console.log(attendances)
      return attendances
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  getAllAttendanceByMonth: async (user, month, year) => {
    try {
      const attendances = await DayAttendance
        .find({
          organization_id: user.organization_id,
          day: {
            $gte: startOfMonth(month, year),
            $lt: startOfNextMonth(month, year),
          }
        })
        .lean()
      return attendances
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },

  getOneAttendanceByStaffAndTime: async (user, time) => {
    try {
      const attendance = await DayAttendance.findOne({
        organization_id: user.organization_id,
        staff_id: user.staff_id,
        day: {
          $gte: startOfDay(time),
          $lt: endOfDay(time),
        }
      })

      return attendance
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },

  createAttendanceByCheckin: async (user, checkin) => {
    const existing = await DayAttendanceService.getOneAttendanceByStaffAndTime(user, checkin)
    if (existing) {
      throw new Error.ThrowableError({ status: StatusCodes.CONFLICT, msg: 'You already checkin today!' })
    }
    try {
      const config = await OrganizationConfigService.getOneOrgConfigByOrgId(user.organization_id)
      const compare = compareTime(appTimeFormatter(checkin), config.details.clock_in_time)
      const attendance = await DayAttendance.create({
        organization_id: user.organization_id,
        staff_id: user.staff_id,
        type: (compare >= 0) ? AttendanceTypes.LATE : AttendanceTypes.WORK,
        check_in: checkin
      })
      return attendance
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  updateAttendanceByCheckout: async (user, checkout) => {
    const existing = await DayAttendanceService.getOneAttendanceByStaffAndTime(user, checkout)
    if (!existing) {
      throw new Error.ThrowableError({ status: StatusCodes.NOT_FOUND, msg: 'Cannot find your checkin today!' })
    }
    try {
      const config = await OrganizationConfigService.getOneOrgConfigByOrgId(user.organization_id)
      const compare = compareTime(appTimeFormatter(checkout), config.details.clock_out_time)
      const attendance = await DayAttendance.findOneAndUpdate(
        {
          organization_id: user.organization_id,
          staff_id: user.staff_id,
          day: {
            $gte: startOfDay(checkout),
            $lt: endOfDay(checkout),
          }
        },
        {
          $set: {
            type: (compare >= 0) ? AttendanceTypes.WORK : AttendanceTypes.EARLY,
            check_out: checkout
          }
        },
        { new: true }
      )
      return attendance
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
}

module.exports = DayAttendanceService