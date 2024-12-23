const startOfDay = (targetDate) => {
  var res = new Date(targetDate)
  res.setHours(0, 0, 0, 0)
  res = new Date(res.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }))
  return res
}

const endOfDay = (targetDate) => {
  var res = new Date(targetDate)
  res.setHours(23, 59, 59, 999)
  res = new Date(res.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }))
  return res
}

const startOfMonth = (month, year) => {
  var res = new Date(year, month - 1, 1)
  res.setHours(0, 0, 0, 0)
  res = new Date(res.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }))
  return res
}

const startOfNextMonth = (month, year) => {
  var res = new Date(year, month, 1)
  res.setHours(0, 0, 0, 0)
  res = new Date(res.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }))
  return res
}


module.exports = { startOfDay, endOfDay, startOfMonth, startOfNextMonth }
