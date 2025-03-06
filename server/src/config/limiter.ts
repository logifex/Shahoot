import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    message: "Too many requests, please try again later.",
    code: "TOO_MANY_REQUESTS",
  },
  keyGenerator: (req) => req.body.username,
  skip: (req) => !req.body.username,
  skipSuccessfulRequests: true,
});

export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    message: "Too many requests, please try again later.",
    code: "TOO_MANY_REQUESTS",
  },
  skipFailedRequests: true,
});

export const emailLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 1,
  message: {
    message: "Too many requests, please try again later.",
    code: "TOO_MANY_REQUESTS",
  },
  keyGenerator: (req) => req.body.username,
  skipFailedRequests: true,
});
