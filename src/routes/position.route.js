const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler')
const UserRoles = require('../common/enums/user-role')
var authenticate = require('../auth/authenticate')
const { Error } = require('../common/responses/index.js')

const PositionController = require('../controllers/position.controller')
const PositionService = require('../services/position.service.js')

// Parse Json
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const getPosForVerify = async (req, res, next) => {
  try {
    const pos = await PositionService.getOnePositionById(req.params.pos_id)
    return pos
  }
  catch (err) {
    return Error.ThrowErrorHandler(res, err.status, err.message)
  }
}

router.get('/all',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(PositionController.getAllPosition)
)
router.post('/',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(PositionController.createOnePosition)
)
router.put('/:pos_id',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  authenticate.verifyTenantMatch(getPosForVerify),
  asyncHandler(PositionController.updateOnePosition)
)
router.delete('/:pos_id',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  authenticate.verifyTenantMatch(getPosForVerify),
  asyncHandler(PositionController.deleteOnePosition)
)

module.exports = router;