
var User = require('../models/user.model')
var Organization = require('../models/organization.model.js')
const { Error, Success } = require('../common/responses/index.js')
var passport = require('passport')
var authenticate = require('../auth/authenticate')

const UserService = {
  getUserById: async (id) => {
    return await User.getUserById(id)
  },
  createAnUser: async (createUserDTO, req, res, cb) => {
    User.register(new User({
      username: createUserDTO.username,
      roles: createUserDTO.roles
    }),
      createUserDTO.password, (err, user) => {
        if (err) {
          return cb(err, null)
        }
        else {
          passport.authenticate('local')(req, res, () => {
            cb(null, user)
          });
        }
      });
  },
  joinAnOrganization: async (user, org_id, res) => {
    const org = await Organization.findById(org_id)
    if (!org)
      return Error.InternalServerErrorResponse(res, 'Could not found organization. Please try again.')
    else
      return await User.joinAnOrganization(user, org)
  },
  updateUsername: () => { },
  updatePassword: () => { },

}

module.exports = UserService