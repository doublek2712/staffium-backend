'use strict';
require('dotenv').config();

const config = {
  development: {
    port: process.env.APP_PORT_DEV || 8083,
  },

  production: {
    port: process.env.APP_PORT_PROD || 8080,
  }
}

module.exports = config[process.env.NODE_ENV || 'development']