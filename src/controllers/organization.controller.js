'use strict';

var Organization = require('../models/organization.model.js')
var Invitation = require('../models/invitation.model.js')
const { Error, Success } = require('../common/responses/index.js')
const CreateOrgDTO = require('../common/requests/org.req.js')
const OrganizationService = require('../services/organization.service.js')
const UserService = require('../services/user.service.js')
const StaffService = require('../services/staff.service.js')

const OrganizationController = {
  getInvitationCode: async (req, res, next) => {
    const existingInvitation = await Invitation.findByCreator(req.user)
    if (existingInvitation) {
      return Success.OkResponse(res, 'Get invitation code successfully!', existingInvitation)
    }
    else {
      const newInvitation = await Invitation.createOneByCreator(req.user)
      if (newInvitation) {
        return Success.CreatedResponse(res, 'Create invitation code successfully!', newInvitation)
      }
      else {
        return Error.InternalServerErrorResponse(res)
      }
    }
  },
  createOrganization: async (req, res, next) => {
    try {
      const staff = await StaffService.getOneStaffById(req.user.staff_id)
      const newOrg = await OrganizationService.createAnOrganization(new CreateOrgDTO({ name: req.body.name, size: req.body.size }))

      await UserService.joinAnOrganization(req.user, newOrg._id)
      await StaffService.updateOrganization(staff, newOrg._id)
      return Success.OkResponse(res, `Create org ${newOrg.name} successfully!`)
    }
    catch (error) {
      return Error.ThrowErrorHandler(res, error.status, error.message)
    }
  }

}

module.exports = OrganizationController