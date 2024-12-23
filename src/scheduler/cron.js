const cron = require('node-cron');
const DayAttendanceController = require('../controllers/day-attendance.controller')

const initialAttendanceForAll = cron.schedule('44 10 * * *', async () => {
  await DayAttendanceController.createTodayAttendanceListForAllOrg()
  console.log("It's work!!")
}, {
  scheduled: true,
  timezone: "Asia/Ho_Chi_Minh"
});


module.exports = initialAttendanceForAll