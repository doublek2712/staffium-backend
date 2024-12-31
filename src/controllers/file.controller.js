'use strict';

const { Error, Success } = require('../common/responses/index.js')
const FileService = require('../services/file.service.js')

const FileController = {
  uploadFile: async (req, res, next) => {
    try {
      const newFile = await FileService.uploadFile(req.user.organization_id, req.file)
      return Success.OkResponse(res, 'Success', newFile)
    }
    catch (err) {
      return next(err)
    }
  },
  getAvatar: async (req, res, next) => {
    try {
      const file = await FileService.getFileById(req.params.id)

      if (file.content_type.startsWith('image')) {
        res.set('Content-Disposition', 'inline')
        res.contentType(file.content_type)
        res.send(file.payload)
      }
      else
        return next(Error.BadRequestResponse(res, 'Not an image'))
    }
    catch (err) {
      return next(err)
    }
  }

}

module.exports = FileController