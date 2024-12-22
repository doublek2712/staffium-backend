const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler')
const UserController = require('../controllers/user.controller')
const UserRoles = require('../common/enums/user-role')
var authenticate = require('../auth/authenticate')

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

module.exports = router;