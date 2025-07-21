import { Request, Response, NextFunction } from "express";
import sendResponse from "../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  sendResponse(res, {
    statusCode: StatusCodes.NOT_FOUND,
    success: false,
    message: "Route Not Found",
    data: null,
  });
};

export default notFoundMiddleware;
