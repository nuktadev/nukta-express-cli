import { Request, Response, NextFunction } from "express";
import CustomAPIError from "../errors/custom-api";
import sendResponse from "../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

// Error handling middleware
const errorHandler = (
  err: Error | CustomAPIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the error is an instance of CustomAPIError
  if (err instanceof CustomAPIError) {
    sendResponse(res, {
      statusCode: err.statusCode,
      success: false,
      message: err.message,
      data: null,
    });
    return;
  }

  // Handle generic errors (not instances of CustomAPIError)
  console.error("Unhandled Error:", err); // Useful for logging

  sendResponse(res, {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    success: false,
    message: err.message,
    data: null,
  });
};

export default errorHandler;
