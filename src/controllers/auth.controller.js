'use strict';

var User = require('../models/schemas/user.model')
const { Error, Success } = require('../common/responses/index.js')
var passport = require('passport')
var authenticate = require('../auth/authenticate')

const AuthController = {
  signUp: async (req, res, next) => {
    User.register(new User({ username: req.body.username }),
      req.body.password, (err, user) => {
        if (err) {
          Error.InternalServerErrorResponse(res)
        }
        else {
          // Use passport to authenticate User
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          });
        }
      });
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

        const token = authenticate.getToken({ _id: user._id });

        return res.status(200).json({
          success: true,
          message: 'Login successful',
          token: token,
          user: {
            id: user._id,
            username: user.username,
          },
        });
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
        // Cập nhật lastLogout bằng thời gian hiện tại
        await User.findByIdAndUpdate(req.user._id, { lastLogout: Date.now() });
        res.status(200).json({ message: 'Logout successful' });
      }
      else
        res.status(404).json({ message: 'not found' });

    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController