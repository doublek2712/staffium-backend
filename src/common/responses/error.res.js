const { StatusCodes, ReasonPhrases } = require('../../utils/httpStatusCode');

const ErrorJson = (status, title, msg) => {
  return {
    status: status,
    title: title,
    message: msg
  }
}

const ResponseBuilder = (res, msg, status, title) =>
  res
    .status(status)
    .json(ErrorJson(status, title, msg))

const BadRequestResponse = (res, msg) => ResponseBuilder(res, msg, StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
const UnauthorizedResponse = (res, msg) => ResponseBuilder(res, msg, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
const NotFoundResponse = (res, msg) => ResponseBuilder(res, msg, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, msg)
const ForbiddenResponse = (res, msg) => ResponseBuilder(res, msg, StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN, msg)
const RequestTimeoutResponse = (res, msg) => ResponseBuilder(res, msg, StatusCodes.REQUEST_TIMEOUT, ReasonPhrases.REQUEST_TIMEOUT)
const ConflictResponse = (res, msg) => ResponseBuilder(res, msg, StatusCodes.CONFLICT, ReasonPhrases.CONFLICT)
const InternalServerErrorResponse = (res, msg) => ResponseBuilder(res, msg, StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)

module.exports = {
  BadRequestResponse,
  UnauthorizedResponse,
  NotFoundResponse,
  ForbiddenResponse,
  RequestTimeoutResponse,
  ConflictResponse,
  InternalServerErrorResponse
}
