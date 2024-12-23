'use strict';

var User = require('../models/user.model')
const { Error, Success } = require('../common/responses/index.js')
var passport = require('passport')
var authenticate = require('../auth/authenticate')
const CreateUserDTO = require('../common/requests/user.req.js')
const CreateOrgDTO = require('../common/requests/org.req.js')
const UserService = require('../services/user.service.js')
const OrganizationService = require('../services/organization.service.js')
const StaffService = require('../services/staff.service.js')

const AuthController = {
  signUp: async (req, res, next) => {
    const createUserDTO = new CreateUserDTO({
      username: req.body.username,
      password: req.body.password,
      roles: req.body.roles
    })
    UserService.createAnUser(createUserDTO, req, res, async (err, user) => {
      if (err) {
        return Error.InternalServerErrorResponse(res, err)
      }
      try {
        const staff = await StaffService.createAnEmptyStaff()
        await User.setStaffId(user, staff)
        return Success.OkResponse(res, 'Registration successfull')
      }
      catch (error) {
        return Error.ThrowErrorHandler(res, error.status, error.message)
      }
    })

  },

  signIn: async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return Error.UnauthorizedResponse(res, info ? info.message : 'Invalid username or password')
      }

      req.login(user, async (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }

        const token = authenticate.getAccessToken({ _id: user._id });

        return Success.OkResponse(res, 'Login successful', {
          access_token: token,
        })
      });
    })(req, res, next);
  },

  getAllUser: async (req, res, next) => {
    // Get all records
    User.find({})
      .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        // format result as json
        res.json(users);
      }, (err) => next(err))
      .catch((err) => next(err));
  },

  logout: async (req, res, next) => {
    try {
      if (req.user) {
        await User.findByIdAndUpdate(req.user._id, { lastLogout: Date.now() });
        Success.OkResponse(res, 'Logout successful')
      }
      else
        Error.NotFoundResponse(res)
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController