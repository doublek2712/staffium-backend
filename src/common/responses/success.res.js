const { StatusCodes, ReasonPhrases } = require('../../utils/httpStatusCode');

const SuccessJson = (status, title, msg, data) => {
  return {
    status: status,
    title: title,
    message: msg,
    data: data
  }
}

const ResponseBuilder = (res, msg, data, status, title) =>
  res
    .status(status)
    .json(SuccessJson(status, title, msg, data))

const OkResponse = (res, msg, data) => ResponseBuilder(res, msg, data, StatusCodes.OK, ReasonPhrases.OK)
const CreatedResponse = (res, msg, data) => ResponseBuilder(res, msg, data, StatusCodes.CREATED, ReasonPhrases.CREATED)

module.exports = {
  OkResponse,
  CreatedResponse
}