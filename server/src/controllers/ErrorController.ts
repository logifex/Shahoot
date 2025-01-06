import { NextFunction, Request, Response } from "express";

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
    res.status(400).json({
      errors: Object.values(error.errors).map((err: any) => ({
        path: err.path,
        message: err.message,
      })),
    });
    return;
  }

  if (error.name === "CastError") {
    res.status(400).json({
      errors: {
        path: error.path,
        message: error.message,
      },
    });
    return;
  }

  return next(error);
};

const handleError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  res.status(500).send();
};

export default {
  handleNotFound,
  handleErrors: [handleKnownErrors, handleMongooseErrors, handleError],
};
