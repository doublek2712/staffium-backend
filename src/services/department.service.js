'use strict';

var Department = require('../models/department.model.js')
const { Error } = require('../common/responses/index.js')
const { StatusCodes } = require('../utils/httpStatusCode.js')

const DepartmentService = {
  getOneDepartmentById: async (id) => {
    try {
      const dept = await Department.findById(id).lean()
      return dept
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  getAllDepartment: async (user) => {
    try {
      const depts = await Department.find({ organization_id: user.organization_id })
      return depts
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  createOneDepartment: async (user, payload) => {
    try {
      const newDept = await Department.create({
        organization_id: user.organization_id,
        name: payload.name,
      })
      return newDept
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  updateOneDepartmentById: async (id, payload) => {
    try {
      const updatedDept = await Department.findByIdAndUpdate(
        id,
        { $set: payload },
        { new: true }
      )
      return updatedDept
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  deleteOneDepartmentById: async (id) => {
    try {
      await Department.deleteOne({ _id: id })
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }

  },
}

module.exports = DepartmentService