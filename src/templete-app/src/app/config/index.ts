import dotenv from "dotenv";
import { join } from "path";

dotenv.config({ path: join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5000,
  node_env: process.env.NODE_ENV || "development",
  database_url: process.env.DATABASE_URL || "mongodb://localhost:27017/my-api",
  jwt_secret: process.env.JWT_SECRET || "your-super-secret-jwt-key",
  jwt_expire: process.env.JWT_EXPIRE || "7d",
  jwt_refresh_secret:
    process.env.JWT_REFRESH_SECRET || "your-super-ref-secret-jwt-key",
  jwt_refresh_expire: process.env.JWT_REFRESH_EXPIRE || "365d",
  bcrypt_salt_rounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
  cors_origin: process.env.CORS_ORIGIN || "http://localhost:3000",
};
