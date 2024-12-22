'use strict';

var Staff = require('../models/staff.model.js')
const { Error, Success } = require('../common/responses/index.js')

const StaffService = {
  createAnEmptyStaff: async () => {
    return await Staff.create({})
  }
}

module.exports = StaffService