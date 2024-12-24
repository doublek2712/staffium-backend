const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler')
const AuthController = require('../controllers/auth.controller')
var authenticate = require('../auth/authenticate')
const { Error, Success } = require('../common/responses/index.js')

// Parse Json
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', authenticate.verifyUser, asyncHandler(AuthController.getAllUser))
router.post('/signup', asyncHandler(AuthController.signUp))
router.post('/login', asyncHandler(AuthController.signIn))
router.post('/logout', authenticate.verifyUser, asyncHandler(AuthController.logout))

router.get('/check', authenticate.verifyUser, (req, res) => { Success.OkResponse(res) })
router.get('/check-role/:role',
  authenticate.verifyUser,
  (req, res, next) => {
    authenticate.requireRole(req.params.role)(req, res, next)
    return next()
  },
  (req, res) => { Success.OkResponse(res) }
)

module.exports = router;


