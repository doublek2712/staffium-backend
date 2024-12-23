
var User = require('../models/user.model')
const { Error, Success } = require('../common/responses/index.js')
var passport = require('passport')
const { StatusCodes } = require('../utils/httpStatusCode.js')

const UserService = {
  getUserById: async (id) => {
    return await User.getUserById(id)
  },
  getOrganization: async (id) => {
    const user = await UserService.getUserById(id)
    if (user) {
      return user.organization_id
    } else {
      throw new Error.ThrowableError({ status: StatusCodes.NOT_FOUND, msg: 'User not found.' })
    }
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
  joinAnOrganization: async (user, org_id) => {
    const updateUser = await User.joinAnOrganization(user, org_id)
    if (updateUser) {
      return updateUser
    } else {
      throw new Error.ThrowableError({ status: StatusCodes.NOT_FOUND, msg: 'User not found.' })
    }
  },
  updateUsername: () => { },
  updatePassword: () => { },

}

module.exports = UserService