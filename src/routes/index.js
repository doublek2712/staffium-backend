'use strict';

const express = require('express');
const router = express.Router();

router.use('/api/auth', require('./auth.route'))
router.use('/api/org', require('./organization.route'))
router.use('/api/user', require('./user.route'))

module.exports = router;