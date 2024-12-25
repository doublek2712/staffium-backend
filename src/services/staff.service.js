'use strict';

var Staff = require('../models/staff.model.js')
const { Error, Success } = require('../common/responses/index.js')
const { StatusCodes } = require('../utils/httpStatusCode.js')
const stringToArray = require('../helpers/stringToArray.js')

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
    try {
      const updatedStaff = await Staff.setOneById(id, updateData)
      return updatedStaff
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },

  getAllStaff: async (org_id, query) => {
    try {
      const staffs = await Staff.getAllByQuery(org_id, query)
      return staffs
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },

  deleteStaffById: async (id) => {
    try {
      await Staff.setOneById(id, { organization_id: null })
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },

  deleteManyStaff: async (query) => {
    const { ids } = query
    try {
      const idArray = stringToArray(ids)
      for (i of idArray) {
        await StaffService.deleteStaffById(i)
      }
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  }
}

module.exports = StaffService