'use strict';

const { Error, Success } = require('../common/responses/index.js')
const UserService = require('../services/user.service.js')
const InvitationService = require('../services/invitation.service.js')
const StaffService = require('../services/staff.service.js')

const UserController = {
  joinOrganization: async (req, res, next) => {
    if (req.user.organization_id) {
      return Error.ConflictResponse(res, 'You already in an organization.')
    }
    try {
      const invitation = await InvitationService.getInvitationByCode(req.params.code)

      const staff = await StaffService.getOneStaffById(req.user.staff_id)
      await UserService.joinAnOrganization(req.user, invitation.createdBy.organization_id)
      await StaffService.updateOrganization(staff, invitation.createdBy.organization_id)
      return Success.OkResponse(res, `Join organization successfully`)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }

  },

  getMe: async (req, res, next) => {
    const me = await UserService.getUserById(req.user._id)
    if (me)
      return Success.OkResponse(res, 'success', me)
  },

  getAllUser: async (req, res, next) => {
    try {
      const users = UserService.getAllUserByOrg(req.user.organization_id)
      return Success.OkResponse(res, 'success', users)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },

  changeUsername: async (req, res, next) => {
    try {
      const user = UserService.updateUsernameByUsername(req.user.username, req.body.username)
      return Success.OkResponse(res, 'success', user)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const user = UserService.updatePasswordByUsername(req.user.username, req.body.oldPassword, req.body.newPassword)
      return Success.OkResponse(res, 'success', user)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  }
}

module.exports = UserController