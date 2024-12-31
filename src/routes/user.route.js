const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler')
const UserController = require('../controllers/user.controller')
const UserRoles = require('../common/enums/user-role')
var authenticate = require('../auth/authenticate')
const { upload } = require('../helpers/multer')

// Parse Json
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/join/:code',
  authenticate.verifyUser,
  asyncHandler(UserController.joinOrganization)
)
router.get('/',
  authenticate.verifyUser,
  asyncHandler(UserController.getMe)
)
router.get('/full',
  authenticate.verifyUser,
  asyncHandler(UserController.getMeFullData)
)
router.get('/all',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
)
router.put('/avatar',
  authenticate.verifyUser,
  upload.single('file'),
  asyncHandler(UserController.uploadAvatar)
)
router.put('/name',
  authenticate.verifyUser,
  asyncHandler(UserController.changeDisplayName)
)

module.exports = router;