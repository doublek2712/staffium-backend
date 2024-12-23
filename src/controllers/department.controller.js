'use strict';

const { Error, Success } = require('../common/responses/index.js')
const DepartmentService = require('../services/department.service.js')

const DepartmentController = {
  getOneDepartment: async (req, res, next) => {
    try {
      const dept = await DepartmentService.getOneDepartmentById(req.params.dept_id)
      return Success.OkResponse(res, undefined, dept)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
  getAllDepartment: async (req, res, next) => {
    try {
      const depts = await DepartmentService.getAllDepartment(req.user)
      return Success.OkResponse(res, undefined, depts)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
  createOneDepartment: async (req, res, next) => {
    try {
      const newDept = await DepartmentService.createOneDepartment(req.user, req.body)
      return Success.OkResponse(res, undefined, newDept)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
  updateOneDepartment: async (req, res, next) => {
    try {
      const updatedDept = await DepartmentService.updateOneDepartmentById(req.params.dept_id, req.body)
      return Success.OkResponse(res, undefined, updatedDept)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
  deleteOneDepartment: async (req, res, next) => {
    try {
      await DepartmentService.deleteOneDepartmentById(req.params.dept_id)
      return Success.OkResponse(res)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },
}

module.exports = DepartmentController