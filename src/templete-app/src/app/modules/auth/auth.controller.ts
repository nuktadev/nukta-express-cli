import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { IUserCreate, IUserUpdate } from "../user/user.type";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { setAuthCookie } from "../../shared/setCookie";
import CustomAPIError from "../../errors/custom-api";
import { JwtPayload } from "jsonwebtoken";

export class AuthController {
  static async register(req: Request, res: Response) {
    const userData: IUserCreate = req.body;
    const result = await AuthService.register(userData);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Registration successfully",
      data: result,
    });
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);

    setAuthCookie(res, result.token);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Login successfully",
      data: {
        accessToken: result.token.accessToken,
        refreshToken: result.token.refreshToken,
        user: result.user,
      },
    });
  }

  static async getProfile(req: Request, res: Response) {
    const user = req.user;

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "User retrieve successfully",
      data: user,
    });
  }

  static async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new CustomAPIError("Refresh token is required");
    }
    const result = await AuthService.refreshToken(refreshToken);

    setAuthCookie(res, result);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Token refreshed successfully",
      data: result,
    });
  }

  static async resetPassword(req: Request, res: Response) {
    const { newPassword, oldPassword } = req.body;
    const user = req.user;
    const result = await AuthService.resetPassword(
      oldPassword,
      newPassword,
      user as JwtPayload
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: result.message,
      data: result,
    });
  }
}
