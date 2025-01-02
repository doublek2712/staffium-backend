'use strict';

var Organization = require('../models/organization.model.js')
var Invitation = require('../models/invitation.model.js')
const { Error, Success } = require('../common/responses/index.js')
const CreateOrgDTO = require('../common/requests/org.req.js')
const OrganizationService = require('../services/organization.service.js')
const UserService = require('../services/user.service.js')
const StaffService = require('../services/staff.service.js')
const OrganizationConfigService = require('../services/organization-config.service.js')

const OrganizationConfigController = {
  getConfig: async (req, res, next) => {
    try {
      const config = await OrganizationConfigService.getOneOrgConfigByOrgId(req.user.organization_id)
      return Success.OkResponse(res, 'success', config)
    }
    catch (err) {
      return next(err)
    }
  },
  updateConfigById: async (req, res, next) => {
    try {
      const config = await OrganizationConfigService.updateOneOrgConfigById(req.params.id, req.body)
      return Success.OkResponse(res, 'success', config)
    }
    catch (err) {
      return next(err)
    }
  },

}

module.exports = OrganizationConfigController