const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler')
const UserRoles = require('../common/enums/user-role')
var authenticate = require('../auth/authenticate')
const { Error } = require('../common/responses/index.js')

const DepartmentController = require('../controllers/department.controller')
const DepartmentService = require('../services/department.service.js')

// Parse Json
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const getDeptForVerify = async (req, res, next) => {
  try {
    const dept = await DepartmentService.getOneDepartmentById(req.params.dept_id)
    return dept
  }
  catch (err) {
    return Error.ThrowErrorHandler(res, err.status, err.message)
  }


}

router.get('/all',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(DepartmentController.getAllDepartment)
)
router.post('/',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(DepartmentController.createOneDepartment)
)
router.put('/:dept_id',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  authenticate.verifyTenantMatch(getDeptForVerify),
  asyncHandler(DepartmentController.updateOneDepartment)
)
router.delete('/:dept_id',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  authenticate.verifyTenantMatch(getDeptForVerify),
  asyncHandler(DepartmentController.deleteOneDepartment)
)

module.exports = router;