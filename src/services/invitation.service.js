'use strict';

var Invitation = require('../models/invitation.model.js')
const { Error, Success } = require('../common/responses/index.js')
const { StatusCodes } = require('../utils/httpStatusCode.js')

const InvitationService = {
  getInvitationByCode: async (code) => {
    const invitation = await Invitation.findByCode(code)
    if (invitation) {
      return invitation
    } else {
      throw new Error.ThrowableError({ status: StatusCodes.NOT_FOUND, msg: 'Invitation not found.' })
    }
  }
}

module.exports = InvitationService