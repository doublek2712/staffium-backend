'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema
const crypto = require('crypto')

const MODELS_NAME = require('./_models-name');

const INVITATION_EXPIRE_TIME = 60 * 60 * 24 * 7

const generateCode = () => {
  return crypto.randomBytes(4).toString('hex'); // Example: '9f8c2a7e'
}

var Invitation = new Schema({
  code: {
    type: String,
    unique: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODELS_NAME.USER,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: INVITATION_EXPIRE_TIME
  },
})


Invitation.statics.findByCreator = async (user) => {
  return await mongoose.model(MODELS_NAME.INVITATION).findOne({ createdBy: user._id })
}
Invitation.statics.createOneByCreator = async (user) => {
  while (true) {
    const code = generateCode();
    const existingInvitation = await mongoose.model(MODELS_NAME.INVITATION).findOne({ code: code });
    if (!existingInvitation) {
      return await mongoose.model(MODELS_NAME.INVITATION).create({
        code: code,
        createdBy: user._id
      })
      break
    }
  }
}
Invitation.statics.findByCode = async (code) => {
  return await mongoose.model(MODELS_NAME.INVITATION).findOne({ code: code }).populate('createdBy')
}

module.exports = mongoose.model(MODELS_NAME.INVITATION, Invitation);


