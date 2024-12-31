const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler')
const UserRoles = require('../common/enums/user-role')
var authenticate = require('../auth/authenticate')
const { upload } = require('../helpers/multer')

const FileController = require('../controllers/file.controller');

// Parse Json
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/upload',
  authenticate.verifyUser,
  upload.single('file'),
  asyncHandler(FileController.uploadFile)
)
router.get('/avatar/:id',
  authenticate.verifyUser,
  asyncHandler(FileController.getAvatar)
)

module.exports = router;