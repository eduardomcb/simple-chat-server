import PrettyError from "pretty-error";
import HTTPStatus from "http-status";

import APIError, { RequiredError } from "./error";

export default function logErrorService(err, req, res, next) {
  if (!err) {
    return new APIError(
      "Error with the server!",
      HTTPStatus.INTERNAL_SERVER_ERROR,
      true
    );
  }

  const pe = new PrettyError();
  pe.skipNodeFiles();
  pe.skipPackage("express");

  console.log(pe.render(err));

  const error = {
    message: err.message || "Internal Server Error.",
  };

  if (err.errors) {
    error.errors = {};
    const { errors } = err;
    if (Array.isArray(errors)) {
      error.errors = RequiredError.makePretty(errors);
    } else {
      Object.keys(errors).forEach((key) => {
        error.errors[key] = errors[key].message;
      });
    }
  }

  res.status(err.status || HTTPStatus.INTERNAL_SERVER_ERROR).json(error);

  return next();
}
