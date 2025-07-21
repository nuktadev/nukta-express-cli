import { JwtPayload } from "jsonwebtoken";
import { generateToken, verifyToken } from "./createJWT";
import config from "../config";
import User, { IUser } from "../modules/user/user.model";
import { IsActive } from "../modules/user/user.type";
import CustomAPIError from "../errors/custom-api";

export const createUserTokens = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_secret,
    config.jwt_expire
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expire
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    config.jwt_refresh_secret
  ) as JwtPayload;

  const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });

  if (!isUserExist) {
    throw new CustomAPIError("User does not exist");
  }
  if (
    isUserExist.isActive === IsActive.BLOCKED ||
    isUserExist.isActive === IsActive.INACTIVE
  ) {
    throw new CustomAPIError(`User is ${isUserExist.isActive}`);
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    config.jwt_secret,
    config.jwt_expire
  );

  return accessToken;
};
