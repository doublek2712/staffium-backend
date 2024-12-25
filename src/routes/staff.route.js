const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler')
var authenticate = require('../auth/authenticate')
const StaffController = require('../controllers/staff.controller')
const UserRoles = require('../common/enums/user-role')

// Parse Json
const bodyParser = require('body-parser');
router.use(bodyParser.json());

// staff
router.get('/my-record',
  authenticate.verifyUser,
  asyncHandler(StaffController.getMyRecord)
)
router.put('/my-record',
  authenticate.verifyUser,
  asyncHandler(StaffController.updateMyRecord)
)

// HR
router.get('/all',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(StaffController.getAllStaff)
)
router.get('/:staff_id',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(StaffController.getOneStaff)
)
router.put('/:staff_id',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(StaffController.updateOneStaff)
)
router.delete('/:staff_id',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(StaffController.deleteStaff)
)
router.delete('/',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(StaffController.deleteStaffs)
)

module.exports = router