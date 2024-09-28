import { Request, Response, NextFunction } from "express";

// Custom error class to handle various error types
class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handler middleware
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Set default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    // Handle Mongoose-specific errors
    if (err.name === "ValidationError") error = handleValidationError(err);
    if (err.code && err.code === 11000) error = handleDuplicateKeyError(err);
    if (err.name === "CastError") error = handleCastErrorDB(err);

    res.status(error.statusCode || 500).json({
      status: error.status || "error",
      message: error.message || "Something went wrong!",
    });
  }
};

// Helper functions to handle specific Mongoose errors
const handleValidationError = (err: any) => {
  const messages = Object.values(err.errors).map((el: any) => el.message);
  return new AppError(`Invalid input data. ${messages.join(". ")}`, 400);
};

const handleDuplicateKeyError = (err: any) => {
  const key = Object.keys(err.keyValue)[0];
  return new AppError(
    `Duplicate field value: ${key}. Please use another value!`,
    400
  );
};

const handleCastErrorDB = (err: any) => {
  return new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
};

export { globalErrorHandler, AppError };
