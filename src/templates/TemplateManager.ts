import ejs from 'ejs';
import path from 'path';
import fs from 'fs-extra';

export interface TemplateFile {
  path: string;
  template: string;
  content?: string;
}

export interface Template {
  name: string;
  description: string;
  files: TemplateFile[];
}

export class TemplateManager {
  private templates: Map<string, Template>;

  constructor() {
    this.templates = new Map();
    this.initializeTemplates();
  }

  private initializeTemplates(): void {
    // Basic template
    this.templates.set('basic', {
      name: 'basic',
      description: 'Minimal Express.js setup with TypeScript',
      files: [
        {
          path: 'src/app.ts',
          template: 'app-basic.ejs'
        },
        {
          path: 'src/server.ts',
          template: 'server.ejs'
        },
        {
          path: 'src/app/config/index.ts',
          template: 'config.ejs'
        },
        {
          path: 'src/app/middlewares/error-handler.ts',
          template: 'error-handler.ejs'
        },
        {
          path: 'src/app/middlewares/not-found.ts',
          template: 'not-found.ejs'
        },
        {
          path: 'src/app/routes/index.ts',
          template: 'routes-index.ejs'
        },
        {
          path: 'src/@types/index.d.ts',
          template: 'types-index.ejs'
        },
        {
          path: 'tsconfig.json',
          template: 'tsconfig.ejs'
        }
      ]
    });

    // Auth template
    this.templates.set('auth', {
      name: 'auth',
      description: 'Express.js with authentication middleware',
      files: [
        ...this.templates.get('basic')!.files,
        {
          path: 'src/app/middlewares/authentication.ts',
          template: 'authentication.ejs'
        },
        {
          path: 'src/app/modules/user/user.model.ts',
          template: 'user-model.ejs'
        },
        {
          path: 'src/app/modules/user/user.type.ts',
          template: 'user-type.ejs'
        },
        {
          path: 'src/app/modules/auth/auth.controller.ts',
          template: 'auth-controller.ejs'
        },
        {
          path: 'src/app/modules/auth/auth.service.ts',
          template: 'auth-service.ejs'
        },
        {
          path: 'src/app/modules/auth/auth.route.ts',
          template: 'auth-route.ejs'
        },
        {
          path: 'src/app/modules/auth/auth.type.ts',
          template: 'auth-type.ejs'
        }
      ]
    });

    // Full template
    this.templates.set('full', {
      name: 'full',
      description: 'Complete setup with all features',
      files: [
        ...this.templates.get('auth')!.files,
        {
          path: 'src/app/middlewares/cors.ts',
          template: 'cors.ejs'
        },
        {
          path: 'src/app/middlewares/rate-limit.ts',
          template: 'rate-limit.ejs'
        },
        {
          path: 'src/app/middlewares/security.ts',
          template: 'security.ejs'
        },
        {
          path: 'src/app/shared/validation.ts',
          template: 'validation.ejs'
        },
        {
          path: 'src/app/shared/response.ts',
          template: 'response.ejs'
        },
        {
          path: 'src/app/shared/database.ts',
          template: 'database.ejs'
        },
        {
          path: 'jest.config.js',
          template: 'jest-config.ejs'
        },
        {
          path: '.eslintrc.js',
          template: 'eslint-config.ejs'
        },
        {
          path: '.prettierrc',
          template: 'prettier-config.ejs'
        },
        {
          path: 'Dockerfile',
          template: 'dockerfile.ejs'
        },
        {
          path: 'docker-compose.yml',
          template: 'docker-compose.ejs'
        }
      ]
    });
  }

  getTemplate(name: string): Template {
    const template = this.templates.get(name);
    if (!template) {
      throw new Error(`Template "${name}" not found`);
    }
    return template;
  }

  async renderTemplate(templateName: string, data: any): Promise<string> {
    const templatePath = path.join(__dirname, '../templates', templateName);
    
    try {
      const templateContent = await fs.readFile(templatePath, 'utf8');
      return ejs.render(templateContent, data, {
        async: false,
        escape: (str: string) => str
      });
    } catch (error) {
      // If template file doesn't exist, return default content
      return this.getDefaultContent(templateName, data);
    }
  }

  private getDefaultContent(templateName: string, data: any): string {
    switch (templateName) {
      case 'app-basic.ejs':
        return this.getBasicAppContent(data);
      case 'server.ejs':
        return this.getServerContent(data);
      case 'config.ejs':
        return this.getConfigContent(data);
      case 'error-handler.ejs':
        return this.getErrorHandlerContent(data);
      case 'not-found.ejs':
        return this.getNotFoundContent(data);
      case 'routes-index.ejs':
        return this.getRoutesIndexContent(data);
      case 'types-index.ejs':
        return this.getTypesIndexContent(data);
      case 'tsconfig.ejs':
        return this.getTsConfigContent(data);
      case 'authentication.ejs':
        return this.getAuthenticationContent(data);
      case 'user-model.ejs':
        return this.getUserModelContent(data);
      case 'user-type.ejs':
        return this.getUserTypeContent(data);
      case 'auth-controller.ejs':
        return this.getAuthControllerContent(data);
      case 'auth-service.ejs':
        return this.getAuthServiceContent(data);
      case 'auth-route.ejs':
        return this.getAuthRouteContent(data);
      case 'auth-type.ejs':
        return this.getAuthTypeContent(data);
      case 'cors.ejs':
        return this.getCorsContent(data);
      case 'rate-limit.ejs':
        return this.getRateLimitContent(data);
      case 'security.ejs':
        return this.getSecurityContent(data);
      case 'validation.ejs':
        return this.getValidationContent(data);
      case 'response.ejs':
        return this.getResponseContent(data);
      case 'database.ejs':
        return this.getDatabaseContent(data);
      case 'jest-config.ejs':
        return this.getJestConfigContent(data);
      case 'eslint-config.ejs':
        return this.getEslintConfigContent(data);
      case 'prettier-config.ejs':
        return this.getPrettierConfigContent(data);
      case 'dockerfile.ejs':
        return this.getDockerfileContent(data);
      case 'docker-compose.ejs':
        return this.getDockerComposeContent(data);
      default:
        return '';
    }
  }

  // Template content methods
  private getBasicAppContent(data: any): string {
    return `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { join } from 'path';

import errorHandleMiddleware from './middlewares/error-handler';
import notFoundMiddleware from './middlewares/not-found';
import routes from './routes';

dotenv.config({ path: join(process.cwd(), '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ${data.name} API',
    version: '1.0.0',
    status: 'running'
  });
});

app.use('/api/v1', routes);

// Error handling
app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

export default app;
`;
  }

  private getServerContent(data: any): string {
    return `import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT || 5000;
const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/${data.name}';

// Connect to MongoDB
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(\`Server is running on port \${port} at http://localhost:\${port}\`);
});
`;
  }

  private getConfigContent(data: any): string {
    return `import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 5000,
  node_env: process.env.NODE_ENV || 'development',
  database_url: process.env.DATABASE_URL || 'mongodb://localhost:27017/${data.name}',
  jwt_secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
  jwt_expire: process.env.JWT_EXPIRE || '7d',
  bcrypt_salt_rounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10'),
  cors_origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
};
`;
  }

  private getErrorHandlerContent(data: any): string {
    return `import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

const errorHandleMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

export default errorHandleMiddleware;
`;
  }

  private getNotFoundContent(data: any): string {
    return `import { Request, Response, NextFunction } from 'express';

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(\`Route \${req.originalUrl} not found\`) as any;
  error.statusCode = 404;
  next(error);
};

export default notFoundMiddleware;
`;
  }

  private getRoutesIndexContent(data: any): string {
    return `import { Router } from 'express';

const router = Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;
`;
  }

  private getTypesIndexContent(data: any): string {
    return `declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}

export {};
`;
  }

  private getTsConfigContent(data: any): string {
    return `{
  "compilerOptions": {
    "target": "es2016",
    "lib": ["ES2021.String"],
    "module": "commonjs",
    "rootDir": "./src",
    "typeRoots": [
      "@types",
      "node_modules/@types"
    ],
    "sourceMap": true,
    "outDir": "./build",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "build"
  ]
}`;
  }

  // Additional template content methods would go here...
  private getAuthenticationContent(data: any): string {
    return `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

interface AuthRequest extends Request {
  user?: any;
}

const authentication = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, config.jwt_secret);
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

export default authentication;
`;
  }

  private getUserModelContent(data: any): string {
    return `import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
`;
  }

  private getUserTypeContent(data: any): string {
    return `export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  isActive?: boolean;
}
`;
  }

  private getAuthControllerContent(data: any): string {
    return `import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { IUserCreate, IUserUpdate } from '../user/user.type';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const userData: IUserCreate = req.body;
      const result = await AuthService.register(userData);
      
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }

  static async getProfile(req: Request, res: Response) {
    try {
      const user = req.user;
      
      res.json({
        success: true,
        data: user
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}
`;
  }

  private getAuthServiceContent(data: any): string {
    return `import jwt from 'jsonwebtoken';
import User, { IUser } from '../user/user.model';
import { IUserCreate } from '../user/user.type';
import config from '../../config';

export class AuthService {
  static async register(userData: IUserCreate) {
    const { email } = userData;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const user = await User.create(userData);
    
    // Generate token
    const token = this.generateToken(user);
    
    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  }

  static async login(email: string, password: string) {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user);
    
    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  }

  private static generateToken(user: IUser): string {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role
      },
      config.jwt_secret,
      { expiresIn: config.jwt_expire }
    );
  }
}
`;
  }

  private getAuthRouteContent(data: any): string {
    return `import { Router } from 'express';
import { AuthController } from './auth.controller';
import authentication from '../../middlewares/authentication';

const router = Router();

// Public routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Protected routes
router.get('/profile', authentication, AuthController.getProfile);

export default router;
`;
  }

  private getAuthTypeContent(data: any): string {
    return `export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface IAuthResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}
`;
  }

  private getCorsContent(data: any): string {
    return `import cors from 'cors';
import config from '../config';

const corsOptions = {
  origin: config.cors_origin,
  credentials: true,
  optionsSuccessStatus: 200
};

export default cors(corsOptions);
`;
  }

  private getRateLimitContent(data: any): string {
    return `import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  }
});
`;
  }

  private getSecurityContent(data: any): string {
    return `import helmet from 'helmet';

export default helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});
`;
  }

  private getValidationContent(data: any): string {
    return `import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }
    
    next();
  };
};

// Common validation schemas
export const userSchemas = {
  register: Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    role: Joi.string().valid('user', 'admin').optional()
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};
`;
  }

  private getResponseContent(data: any): string {
    return `import { Response } from 'express';

export const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: any
) => {
  const response: any = {
    success,
    message
  };

  if (data !== undefined) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

export const sendSuccess = (res: Response, data?: any, message = 'Success') => {
  return sendResponse(res, 200, true, message, data);
};

export const sendCreated = (res: Response, data?: any, message = 'Created successfully') => {
  return sendResponse(res, 201, true, message, data);
};

export const sendError = (res: Response, message = 'Error occurred', statusCode = 400) => {
  return sendResponse(res, statusCode, false, message);
};
`;
  }

  private getDatabaseContent(data: any): string {
    return `import mongoose from 'mongoose';
import config from '../config';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.database_url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await disconnectDatabase();
  process.exit(0);
});
`;
  }

  private getJestConfigContent(data: any): string {
    return `module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
};
`;
  }

  private getEslintConfigContent(data: any): string {
    return `module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
`;
  }

  private getPrettierConfigContent(data: any): string {
    return `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}`;
  }

  private getDockerfileContent(data: any): string {
    return `FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]`;
  }

  private getDockerComposeContent(data: any): string {
    return `version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mongodb://mongo:27017/${data.name}
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

volumes:
  mongodb_data:`;
  }
} 