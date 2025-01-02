const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler')
const UserRoles = require('../common/enums/user-role')
var authenticate = require('../auth/authenticate')
const { Error } = require('../common/responses/index.js')

const DayAttendanceController = require('../controllers/day-attendance.controller')

// Parse Json
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/checkin',
  authenticate.verifyUser,
  asyncHandler(DayAttendanceController.checkin)
)
router.post('/checkout',
  authenticate.verifyUser,
  asyncHandler(DayAttendanceController.checkout)
)

router.get('/today',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(DayAttendanceController.getAllTodayAttendance)
)

router.get('/my/today',
  authenticate.verifyUser,
  asyncHandler(DayAttendanceController.getMyAttendanceToday)
)


module.exports = router;