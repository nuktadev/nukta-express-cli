import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

export default class ForbiddenError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
    //console.log(message);
  }
}
