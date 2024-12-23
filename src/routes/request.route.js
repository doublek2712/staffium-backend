const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler')
const UserRoles = require('../common/enums/user-role')
var authenticate = require('../auth/authenticate')
const { Error } = require('../common/responses/index.js')

const RequestController = require('../controllers/request.controller')

const RequestStatus = require('../common/enums/request-status')

// Parse Json
const bodyParser = require('body-parser');
router.use(bodyParser.json());
//Staff
router.post('/',
  authenticate.verifyUser,
  asyncHandler(RequestController.createRequest)
)
router.get('/all_of_me',
  authenticate.verifyUser,
  asyncHandler(RequestController.getAllMyRequest)
)
router.put('/:request_id',
  authenticate.verifyUser,
  asyncHandler(RequestController.updateMyRequest)
)
//HR 
router.get('/all_this_month',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(RequestController.getAllRequestOfThisMonth)
)
router.post('/approve:request_id',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(RequestController.updateRequestStatus(RequestStatus.APPROVED))
)
router.post('/reject:request_id',
  authenticate.verifyUser,
  authenticate.requireRole(UserRoles.HR),
  asyncHandler(RequestController.updateRequestStatus(RequestStatus.REJECTED))
)


module.exports = router;