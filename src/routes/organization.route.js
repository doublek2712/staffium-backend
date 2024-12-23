const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler')
const OrganizationController = require('../controllers/organization.controller')
const UserRoles = require('../common/enums/user-role')
var authenticate = require('../auth/authenticate')

// Parse Json
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/invitation',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(OrganizationController.getInvitationCode)
)
router.post('/',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(OrganizationController.createOrganization)
)


module.exports = router;