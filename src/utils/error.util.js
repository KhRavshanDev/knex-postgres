const error = new Map([
  ["NO_PROPERTY", "no_property"],
  ["DATA_BASE_ERROR", "data_base_error"],
  ["BAD_REQUEST", "bad_request"],
]);

const codes = new Map([
  ["BAD_REQUEST", 400],
  ["NO_PROPERTY", 422],
  ["DATA_BASE_ERROR", 405],
]);

class BaseError extends Error {
  statusCode;

  constructor(name, statusCode) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;

    Error.captureStackTrace(this);
  }
}

class BadRequestError extends BaseError {
  constructor(name, statusCode = codes.get("BAD_REQUEST")) {
    super(name, statusCode);
  }
}

class PropertyRequiredError extends BaseError {
  constructor(message, statusCode = codes.get("NO_PROPERTY")) {
    super(message, statusCode);
  }
}

class DataBaseError extends BaseError {
  constructor(message, statusCode = codes.get("DATA_BASE_ERROR")) {
    super(message, statusCode);
  }
}

module.exports = {
  PropertyRequiredError,
  BadRequestError,
  DataBaseError,
  codes,
  error,
};
