'use strict';

var Organization = require('../models/organization.model.js')
var Invitation = require('../models/invitation.model.js')
const { Error, Success } = require('../common/responses/index.js')
const { StatusCodes } = require('../utils/httpStatusCode.js')

const OrganizationService = {
  createAnOrganization: async (createOrgDTO) => {
    const org = await Organization.create({
      name: createOrgDTO.name,
      size: createOrgDTO.size
    })

    if (org) {
      return org
    } else {
      throw new Error.ThrowableError({ status: StatusCodes.NOT_FOUND, msg: 'Org not found.' })
    }
  }
}

module.exports = OrganizationService