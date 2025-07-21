import User from "../user/user.model";
import { IUserCreate } from "../user/user.type";
import {
  createNewAccessTokenWithRefreshToken,
  createUserTokens,
} from "../../shared/userTokens";
import { JwtPayload } from "jsonwebtoken";
import CustomAPIError from "../../errors/custom-api";

export class AuthService {
  static async register(userData: IUserCreate) {
    const { email } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create new user
    const user = await User.create(userData);

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  static async login(email: string, password: string) {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Generate token
    const token = await createUserTokens(user);

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  static async refreshToken(refreshToken: string) {
    const newAccessToken =
      await createNewAccessTokenWithRefreshToken(refreshToken);
    return {
      accessToken: newAccessToken,
    };
  }

  static async resetPassword(
    oldPassword: string,
    newPassword: string,
    user: JwtPayload
  ) {
    const isUserExist = await User.findOne({ email: user.email });
    if (!isUserExist) {
      throw new CustomAPIError("User not found");
    }

    const isPasswordValid = await isUserExist.comparePassword(oldPassword);
    if (!isPasswordValid) {
      throw new CustomAPIError("Invalid credentials");
    }

    isUserExist.password = newPassword;
    await isUserExist.save();
    return {
      message: "Password reset successfully",
    };
  }
}
