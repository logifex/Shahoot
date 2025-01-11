import { NextFunction, Request, Response } from "express";
import NotVerifiedError from "../errors/NotVerifiedError";
import ValidationError from "../errors/ValidationError";
import UserExistsError from "../errors/UserExistsError";
import UnpermittedError from "../errors/UnpermittedError";
import QuizNotFound from "../errors/QuizNotFound";

const handleNotFound = (req: Request, res: Response) => {
  res.status(404).send();
};

const handleKnownErrors = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof URIError) {
    res.status(400).send();
    return;
  }

  if (!("type" in error) || typeof error.type !== "string") {
    return next(error);
  }
  const type = error.type as string;

  if (type === "entity.parse.failed" || type === "request.aborted") {
    res.status(400).send();
    return;
  }
  if (type === "entity.too.large" || type === "parameters.too.many") {
    res.status(413).send();
    return;
  }
  if (type === "encoding.unsupported" || type === "charset.unsupported") {
    res.status(415).send();
    return;
  }

  next(error);
};

const handleMongooseErrors = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === "ValidationError") {
    return next(
      new ValidationError(
        Object.values(error.errors).map((err: any) => ({
          path: err.path,
          message: err.message,
        }))
      )
    );
  }

  if (error.name === "CastError") {
    return next(
      new ValidationError([
        {
          path: error.path,
          message: error.message,
        },
      ])
    );
  }

  return next(error);
};

const handleError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({ code: error.code, errors: error.errors });
  } else if (error instanceof NotVerifiedError) {
    return res.status(401).json({ code: error.code, message: error.message });
  } else if (error instanceof QuizNotFound) {
    return res.status(404).json({ code: error.code, message: error.message });
  } else if (error instanceof UserExistsError) {
    return res.status(409).json({ code: error.code, message: error.message });
  } else if (error instanceof UnpermittedError) {
    return res.status(403).json({ code: error.code, message: error.message });
  }

  console.error(error);

  res.status(500).send();
};

export default {
  handleNotFound,
  handleErrors: [handleKnownErrors, handleMongooseErrors, handleError],
};
