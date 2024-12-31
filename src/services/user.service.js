
var User = require('../models/user.model')
const { Error, Success } = require('../common/responses/index.js')
var passport = require('passport')
const { StatusCodes } = require('../utils/httpStatusCode.js')

const UserService = {
  getAllUserByOrg: async (org_id) => {
    try {
      const users = await User.find({ organization_id: org_id })
      return users
    }
    catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  getUserById: async (id) => {
    return await User.getUserById(id)
  },
  getUserByIdFullData: async (id) => {
    try {
      const user = await User.getUserByIdFullData(id)
      return user
    }
    catch (err) {
      throw new Error.ThrowableError({ status: StatusCodes.NOT_FOUND, msg: 'User not found.' })
    }
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
  updateUsernameByUsername: async (username, newUsername) => {
    try {
      const user = await User.findOneAndUpdate({ username: username }, { $set: { username: newUsername } }, { new: true })
      return user
    }
    catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  updatePasswordByUsername: async (username, oldPassword, newPassword) => {
    try {
      await User.findByUsername(username, (err, user) => {
        if (err) {
          throw new Error.ThrowableError({ status: err.status, msg: err.message })
        }
        else {
          user.changePassword(oldPassword, newPassword)
        }
      })
    }
    catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },
  uploadAvatarById: async (id, file_id) => {
    try {
      await User.findByIdAndUpdate(id, {
        $set: { avatar: file_id }
      })
    }
    catch (err) {
      throw new Error.ThrowableError({ status: err.status, msg: err.message })
    }
  },

}

module.exports = UserService