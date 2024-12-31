'use strict';

const { Error, Success } = require('../common/responses/index.js')
const UserService = require('../services/user.service.js')
const InvitationService = require('../services/invitation.service.js')
const StaffService = require('../services/staff.service.js')
const FileService = require('../services/file.service.js')

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

  getMeFullData: async (req, res, next) => {
    try {
      const me = await UserService.getUserByIdFullData(req.user._id)
      return Success.OkResponse(res, 'success', me)
    }
    catch (err) {
      return next(err)
    }
  },

  getAllUser: async (req, res, next) => {
    try {
      const users = await UserService.getAllUserByOrg(req.user.organization_id)
      return Success.OkResponse(res, 'success', users)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },

  changeUsername: async (req, res, next) => {
    try {
      const user = await UserService.updateUsernameByUsername(req.user.username, req.body.username)
      return Success.OkResponse(res, 'success', user)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const user = await UserService.updatePasswordByUsername(req.user.username, req.body.oldPassword, req.body.newPassword)
      return Success.OkResponse(res, 'success', user)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  },

  uploadAvatar: async (req, res, next) => {
    try {
      if (!req.file.mimetype.startsWith('image'))
        return next(Error.BadRequestResponse(res, 'Not an image'))
      const ava = await FileService.uploadFile(req.user.organization_id, req.file)
      const user = await UserService.uploadAvatarById(req.user._id, ava._id)
      return Success.OkResponse(res, 'success')
    }
    catch (error) {
      return next(error)
    }
  }
}

module.exports = UserController