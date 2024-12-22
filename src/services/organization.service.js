'use strict';

var Organization = require('../models/organization.model.js')
var Invitation = require('../models/invitation.model.js')
const { Error, Success } = require('../common/responses/index.js')

const OrganizationService = {
  createAnOrganization: async (createOrgDTO) => {
    return await Organization.create({
      name: createOrgDTO.name,
      size: createOrgDTO.size
    })
  }
}

module.exports = OrganizationService