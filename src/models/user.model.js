'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose');

const MODELS_NAME = require('./_models-name');

var User = new Schema({
  organization_id: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.ORGANIZATION,
    default: null
  },
  staff_id: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.STAFF,
    required: false
  },
  roles: [{
    type: String,
    required: false
  }],
  lastLogout: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

User.plugin(passportLocalMongoose);

User.statics.joinAnOrganization = async (user, org) => {
  return await mongoose.model(MODELS_NAME.USER).findByIdAndUpdate(user._id, {
    $set: {
      organization_id: org._id
    }
  })
}

User.statics.getUserById = async (id) => {
  return await mongoose.model(MODELS_NAME.USER).findById(id).populate('organization_id')
}


module.exports = mongoose.model(MODELS_NAME.USER, User);