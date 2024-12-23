'use strict';

const express = require('express');
const router = express.Router();

router.use('/api/auth', require('./auth.route'))
router.use('/api/org', require('./organization.route'))
router.use('/api/user', require('./user.route'))
router.use('/api/staff', require('./staff.route'))
router.use('/api/dept', require('./department.route'))
router.use('/api/position', require('./position.route'))
router.use('/api/attendance', require('./attendance.route'))

module.exports = router;