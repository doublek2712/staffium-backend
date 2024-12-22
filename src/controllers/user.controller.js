'use strict';

const { Error, Success } = require('../common/responses/index.js')
const UserService = require('../services/user.service.js')
const Invitation = require('../models/invitation.model.js')
const User = require('../models/user.model.js');
const { authenticate } = require('passport');

const UserController = {
  joinOrganization: async (req, res, next) => {
    if (req.user && req.params.code) {
      if (req.user.organization_id) {
        return Error.ConflictResponse(res, 'You already in an organization.')
      }

      const invitation = await Invitation.findByCode(req.params.code)
      if (!invitation) {
        return Error.InternalServerErrorResponse(res)
      }
      const updateUser = UserService.joinAnOrganization(req.user, invitation.createdBy.organization_id, res)
      if (updateUser) {
        return Success.OkResponse(res, `Join organization successfully`)
      } else {
        return Error.InternalServerErrorResponse(res)
      }
    } else {
      return Error.BadRequestResponse(res)
    }
  },

  getMe: async (req, res, next) => {
    const me = await UserService.getUserById(req.user._id)
    if (me)
      return Success.OkResponse(res, 'success', me)
  }
}

module.exports = UserController