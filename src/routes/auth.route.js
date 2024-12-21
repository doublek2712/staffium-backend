const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler')
const AuthController = require('../controllers/auth.controller')
var authenticate = require('../auth/authenticate')

// Parse Json
const bodyParser = require('body-parser');
router.use(bodyParser.json());

// Get Users
router.get('/', authenticate.verifyUser, asyncHandler(AuthController.getAllUser))
router.post('/signup', asyncHandler(AuthController.signUp))
router.post('/login', asyncHandler(AuthController.signIn))
router.post('/logout', authenticate.verifyUser, asyncHandler(AuthController.logout))

module.exports = router;


