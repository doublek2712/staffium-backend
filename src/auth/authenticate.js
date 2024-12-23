var passport = require('passport');
require('dotenv').config();
const { Error, Success } = require('../common/responses/index.js')

// User model
var User = require('../models/user.model.js');

// Strategies
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;

// Used to create, sign, and verify tokens
var jwt = require('jsonwebtoken');

// Local strategy with passport mongoose plugin User.authenticate() function
passport.use(new LocalStrategy(User.authenticate()));

// Required for our support for sessions in passport.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getAccessToken = (user) => {
  return jwt.sign(user, process.env.API_SECRET_KEY || 'my_secret', { expiresIn: 60 * 60 });
};
exports.getOrgToken = (org) => {
  return jwt.sign(org, process.env.API_SECRET_KEY || 'my_secret', { expiresIn: 60 * 60 });
}
exports.decodeOrgToken = (token) => {
  return jwt.verify(token, process.env.API_SECRET_KEY || 'my_secret')
}

// Options to specify for my JWT based strategy.
var opts = {};

// Specifies how the jsonwebtoken should be extracted from the incoming request message
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

//Supply the secret key to be using within strategy for the sign-in.
opts.secretOrKey = process.env.API_SECRET_KEY || 'my_secret';

// JWT Strategy
exports.jwtPassport = passport.use(new JwtStrategy(opts,
  // The done is the callback provided by passport
  async (jwt_payload, done) => {
    try {
      // Search the user with jwt.payload ID field
      const user = await User.findOne({ _id: jwt_payload._id });
      if (user) {
        // User exists
        if (user.lastLogout && jwt_payload.iat < Math.floor(user.lastLogout.getTime() / 1000))
          return done(null, false)
        return done(null, user);
      } else {
        // User doesn't exist
        return done(null, false);
      }
    }
    catch (err) {
      // Handle errors
      return done(err, false);
    }
  }));

// Verify an incoming user with jwt strategy we just configured above   
exports.verifyUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return Error.InternalServerErrorResponse(res, 'Authentication failed due to internal error.')
    }
    if (!user) {
      return Error.UnauthorizedResponse(res, 'You are not authorized. Invalid token or user.')
    }
    req.user = user;
    return next();
  })(req, res, next);
};
exports.requireRole = (role) => (req, res, next) => {
  // IMPORTANT: always use after verifyUser
  // assume that verifyUser is done
  if (req.user && req.user.roles.includes(role)) {
    return next()
  }
  Error.ForbiddenResponse(res, 'You do not have permission to perform this action.')
}
exports.verifyTenantMatch = (getSesourceFn) => async (req, res, next) => {
  // use to verify user have permission on a specific resource 
  const resource = await getSesourceFn(req, res, next)

  if (req.user && resource) {
    if (req.user.organization_id.equals(resource.organization_id)) {
      return next()
    }
    else {
      return Error.ForbiddenResponse(res, 'You do not have permission to perform this action.')
    }
  }
  else {
    return Error.NotFoundResponse(res)
  }


}