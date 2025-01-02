const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler')
const UserRoles = require('../common/enums/user-role')
var authenticate = require('../auth/authenticate')
const { Error } = require('../common/responses/index.js')

const DashboardController = require('../controllers/dashboard.controller')

// Parse Json
const bodyParser = require('body-parser');
router.use(bodyParser.json());


router.get('/',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(DashboardController.getTodayDashboard)
)


module.exports = router;