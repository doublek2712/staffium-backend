'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MODELS_NAME = require('./_models-name');

var Staff = new Schema({
  first_name: {
    type: String,
    default: ''
  },
  last_name: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    default: ''
  },
  nationality: {
    type: String,
    default: ''
  },
  birthdate: {
    type: Date,
    default: null
  },
  birthplace: {
    type: String,
    default: ''
  },
  place_of_residence: {
    type: String,
    default: ''
  },
  citizen_id: {
    type: String,
    default: ''
  },
  phone: {
    type: Number,
    default: null
  },
  email: {
    type: String,
    default: ''
  },
  date_of_contract: {
    type: Date,
    default: null
  },
  contract_end_date: {
    type: Date,
    default: null
  },
  contract: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.FILE,
    required: false
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.DEPT,
    default: null
  },
  position: {
    type: Schema.Types.ObjectId,
    ref: MODELS_NAME.POS,
    default: null
  }
}, {
  timestamps: true
})

module.exports = mongoose.model(MODELS_NAME.STAFF, Staff);