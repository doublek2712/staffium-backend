'use strict';

var OrganizationConfig = require('../models/organization-config.model.js')
const { Error } = require('../common/responses/index.js')
const { startOfDay, endOfDay, startOfMonth, startOfNextMonth } = require('../helpers/date.js')
const DefaultOrgConfigDetails = require('../common/default/org-config.js')

const OrganizationConfigService = {
  createOneOrgConfig: async (org_id) => {
    try {
      const org_config = await OrganizationConfig.create({
        organization_id: org_id,
        details: DefaultOrgConfigDetails
      })
      return org_config
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  getOneOrgConfigByOrgId: async (org_id) => {
    try {
      const org_config = await OrganizationConfig.findOne({ organization_id: org_id })
      return org_config
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  updateOneOrgConfigById: async (id, payload) => {
    try {
      const org_config = await OrganizationConfig.findByIdAndUpdate(
        id,
        {
          $set: {
            details: payload
          }
        },
        { new: true }
      )
      return org_config
    } catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
}

module.exports = OrganizationConfigService