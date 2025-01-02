const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler')
// const OrganizationController = require('../controllers/organization.controller')
const UserRoles = require('../common/enums/user-role')
var authenticate = require('../auth/authenticate')

// Parse Json
const bodyParser = require('body-parser');
const OrganizationConfigController = require('../controllers/org-config.controller');
router.use(bodyParser.json());

router.get('/',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(OrganizationConfigController.getConfig)
)
router.put('/:id',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(OrganizationConfigController.updateConfigById)
)


module.exports = router;