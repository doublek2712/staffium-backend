'use strict';

var File = require('../models/file.model.js')
const { Error } = require('../common/responses/index.js')
const { StatusCodes } = require('../utils/httpStatusCode.js')
const fs = require('fs')

const FileService = {
  uploadFile: async (org_id, file) => {
    try {
      const newFile = File.create({
        organization_id: org_id,
        original_name: file.originalname,
        content_type: file.mimetype,
        size: file.size,
        payload: file.buffer
      })

      return newFile
    }
    catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  getFileById: async (id) => {
    try {
      const file = File.findById(id)

      return file
    }
    catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },

}

module.exports = FileService