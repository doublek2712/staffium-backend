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

class ThrowableError extends Error {
  constructor({ status, msg }) {
    super(msg)
    this.status = status
  }
}

const ThrowErrorHandler = (res, statusCode, msg) => {
  switch (statusCode) {
    case StatusCodes.BAD_REQUEST: {
      return BadRequestResponse(res, msg)
    }
    case StatusCodes.UNAUTHORIZED: {
      return UnauthorizedResponse(res, msg)
    }
    case StatusCodes.NOT_FOUND: {
      return NotFoundResponse(res, msg)
    }
    case StatusCodes.FORBIDDEN: {
      return ForbiddenResponse(res, msg)
    }
    case StatusCodes.REQUEST_TIMEOUT: {
      return RequestTimeoutResponse(res, msg)
    }
    case StatusCodes.CONFLICT: {
      return ConflictResponse(res, msg)
    }
    case StatusCodes.INTERNAL_SERVER_ERROR: {
      return InternalServerErrorResponse(res, msg)
    }
    default: {
      return InternalServerErrorResponse(res, msg)
    }
  }
}

module.exports = {
  BadRequestResponse,
  UnauthorizedResponse,
  NotFoundResponse,
  ForbiddenResponse,
  RequestTimeoutResponse,
  ConflictResponse,
  InternalServerErrorResponse,
  ThrowableError,
  ThrowErrorHandler,
}
