'use strict';

var Staff = require('../models/staff.model.js')
const { Error, Success } = require('../common/responses/index.js')
const { StatusCodes } = require('../utils/httpStatusCode.js')

const StaffService = {
  createAnEmptyStaff: async () => {
    const staff = await Staff.create({})
    if (staff) {
      return staff
    } else {
      throw new Error.ThrowableError({ status: StatusCodes.NOT_FOUND, msg: 'Staff not found.' })
    }
  },
  updateOrganization: async (staff, org_id) => {
    const updateStaff = await Staff.setOrganization(staff, org_id)
    if (updateStaff) {
      return updateStaff
    } else {
      throw new Error.ThrowableError({ status: StatusCodes.NOT_FOUND, msg: 'Staff not found.' })
    }
  },

  getOneStaffById: async (id) => {
    const staff = await Staff.getOneById(id)
    if (staff) {
      return staff
    } else {
      throw new Error.ThrowableError({ status: StatusCodes.NOT_FOUND, msg: 'Staff not found.' })
    }
  },
  updateOneStaffById: async (id, updateData) => {
    const updateStaff = await Staff.setOneById(id, updateData)
    if (updateStaff) {
      return updateStaff
    } else {
      throw new Error.ThrowableError({ status: StatusCodes.NOT_FOUND, msg: 'Staff not found.' })
    }
  },

  getAllStaff: async (user, query) => {
    const { limit, page, filter, sort } = query
    throw new Error.ThrowableError({ status: StatusCodes.NOT_FOUND, msg: `${limit}` })
  }
}

module.exports = StaffService