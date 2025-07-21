import ejs from "ejs";
import path from "path";
import fs from "fs-extra";
import { promisify } from "util";
import { pipeline } from "stream";
import { createReadStream, createWriteStream } from "fs";

const pipelineAsync = promisify(pipeline);

export interface TemplateFile {
  path: string;
  template: string;
  content?: string;
  transform?: (content: string, data: any) => string;
}

export interface Template {
  name: string;
  description: string;
  files: TemplateFile[];
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export interface TemplateCache {
  content: string;
  timestamp: number;
  data: any;
}

export class TemplateManager {
  private templates: Map<string, Template>;
  private templateCache: Map<string, TemplateCache>;
  private templateBasePath: string;
  private cacheExpiry: number = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.templates = new Map();
    this.templateCache = new Map();
    // Use absolute path to the template app
    this.templateBasePath = path.resolve(__dirname, "../templete-app");
    this.initializeTemplates();
  }

  private initializeTemplates(): void {
    // Basic template - minimal setup
    this.templates.set("basic", {
      name: "basic",
      description: "Minimal Express.js setup with TypeScript",
      files: [
        { path: "src/app.ts", template: "src/app.ts" },
        { path: "src/server.ts", template: "src/server.ts" },
        {
          path: "src/app/config/index.ts",
          template: "src/app/config/index.ts",
        },
        { path: "src/app/constants.ts", template: "src/app/constants.ts" },
        {
          path: "src/app/middlewares/error-handler.ts",
          template: "src/app/middlewares/error-handler.ts",
        },
        {
          path: "src/app/middlewares/not-found.ts",
          template: "src/app/middlewares/not-found.ts",
        },
        {
          path: "src/app/routes/index.ts",
          template: "src/app/routes/index.ts",
        },
        { path: "src/@types/index.d.ts", template: "src/@types/index.d.ts" },
        { path: "tsconfig.json", template: "tsconfig.json" },
        { path: "package.json", template: "package.json" },
        { path: ".gitignore", template: ".gitignore" },
        { path: "README.md", template: "README.md" },
      ],
      dependencies: {
        express: "^4.18.2",
        dotenv: "^16.4.4",
        cors: "^2.8.5",
        "express-async-errors": "^3.1.1",
        "http-status-codes": "^2.3.0",
      },
      devDependencies: {
        "@types/express": "^4.17.13",
        "@types/node": "^20.10.0",
        "@types/cors": "^2.8.17",
        typescript: "^5.3.2",
        "ts-node": "^10.9.1",
        nodemon: "^3.1.7",
      },
    });

    // Auth template - with authentication
    this.templates.set("auth", {
      name: "auth",
      description: "Express.js with authentication middleware",
      files: [
        ...this.templates.get("basic")!.files,
        {
          path: "src/app/middlewares/authentication.ts",
          template: "src/app/middlewares/authentication.ts",
        },
        {
          path: "src/app/modules/user/user.model.ts",
          template: "src/app/modules/user/user.model.ts",
        },
        {
          path: "src/app/modules/user/user.type.ts",
          template: "src/app/modules/user/user.type.ts",
        },
        {
          path: "src/app/modules/auth/auth.controller.ts",
          template: "src/app/modules/auth/auth.controller.ts",
        },
        {
          path: "src/app/modules/auth/auth.service.ts",
          template: "src/app/modules/auth/auth.service.ts",
        },
        {
          path: "src/app/modules/auth/auth.route.ts",
          template: "src/app/modules/auth/auth.route.ts",
        },
        {
          path: "src/app/modules/auth/auth.type.ts",
          template: "src/app/modules/auth/auth.type.ts",
        },
        {
          path: "src/app/shared/createJWT.ts",
          template: "src/app/shared/createJWT.ts",
        },
        {
          path: "src/app/shared/sendResponse.ts",
          template: "src/app/shared/sendResponse.ts",
        },
        {
          path: "src/app/shared/setCookie.ts",
          template: "src/app/shared/setCookie.ts",
        },
        {
          path: "src/app/shared/userTokens.ts",
          template: "src/app/shared/userTokens.ts",
        },
        {
          path: "src/app/errors/bad-request.ts",
          template: "src/app/errors/bad-request.ts",
        },
        {
          path: "src/app/errors/custom-api.ts",
          template: "src/app/errors/custom-api.ts",
        },
        {
          path: "src/app/errors/forbidden.ts",
          template: "src/app/errors/forbidden.ts",
        },
        {
          path: "src/app/errors/not-found.ts",
          template: "src/app/errors/not-found.ts",
        },
        {
          path: "src/app/errors/unauthenticated.ts",
          template: "src/app/errors/unauthenticated.ts",
        },
      ],
      dependencies: {
        ...this.templates.get("basic")!.dependencies,
        mongoose: "^8.2.1",
        bcrypt: "^5.1.1",
        jsonwebtoken: "^9.0.2",
        "@types/bcrypt": "^5.0.2",
        "@types/jsonwebtoken": "^9.0.2",
      },
      devDependencies: {
        ...this.templates.get("basic")!.devDependencies,
      },
    });

    // Full template - complete setup
    this.templates.set("full", {
      name: "full",
      description: "Complete setup with all features",
      files: [
        ...this.templates.get("auth")!.files,
        {
          path: "src/app/shared/QueryBuilder.ts",
          template: "src/app/shared/QueryBuilder.ts",
        },
        { path: "jest.config.js", template: "jest.config.js" },
        { path: ".eslintrc.js", template: ".eslintrc.js" },
        { path: ".prettierrc", template: ".prettierrc" },
        { path: "Dockerfile", template: "Dockerfile" },
        { path: "docker-compose.yml", template: "docker-compose.yml" },
      ],
      dependencies: {
        ...this.templates.get("auth")!.dependencies,
        morgan: "^1.10.0",
        "@types/morgan": "^1.9.9",
        joi: "^17.11.0",
        "@types/joi": "^17.2.3",
        helmet: "^7.1.0",
        "express-rate-limit": "^7.1.5",
        "express-promise-router": "^4.1.1",
      },
      devDependencies: {
        ...this.templates.get("auth")!.devDependencies,
        jest: "^29.7.0",
        "ts-jest": "^29.1.1",
        "@types/jest": "^29.5.8",
        supertest: "^6.3.3",
        "@types/supertest": "^2.0.16",
        eslint: "^8.54.0",
        "@typescript-eslint/eslint-plugin": "^6.13.0",
        "@typescript-eslint/parser": "^6.13.0",
        prettier: "^3.1.0",
        cpx: "^1.5.0",
      },
    });
  }

  getTemplate(name: string): Template {
    const template = this.templates.get(name);
    if (!template) {
      throw new Error(
        `Template "${name}" not found. Available templates: ${Array.from(this.templates.keys()).join(", ")}`
      );
    }
    return template;
  }

  getAvailableTemplates(): Array<{ name: string; description: string }> {
    return Array.from(this.templates.values()).map((template) => ({
      name: template.name,
      description: template.description,
    }));
  }

  async renderTemplate(templateName: string, data: any): Promise<string> {
    const cacheKey = `${templateName}_${JSON.stringify(data)}`;
    const cached = this.templateCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.content;
    }

    const templatePath = path.join(this.templateBasePath, templateName);

    try {
      const templateContent = await fs.readFile(templatePath, "utf8");
      const renderedContent = ejs.render(templateContent, data, {
        async: false,
        escape: (str: string) => str,
        rmWhitespace: true,
        compileDebug: false,
      });

      // Cache the result
      this.templateCache.set(cacheKey, {
        content: renderedContent,
        timestamp: Date.now(),
        data,
      });

      return renderedContent;
    } catch (error) {
      // If template file doesn't exist, return default content
      return this.getDefaultContent(templateName, data);
    }
  }

  async renderTemplateFile(
    fileConfig: TemplateFile,
    data: any
  ): Promise<string> {
    const content = await this.renderTemplate(fileConfig.template, data);

    if (fileConfig.transform) {
      return fileConfig.transform(content, data);
    }

    return content;
  }

  async copyTemplateFile(
    sourcePath: string,
    targetPath: string,
    data: any
  ): Promise<void> {
    const sourceFullPath = path.join(this.templateBasePath, sourcePath);
    const targetFullPath = path.resolve(process.cwd(), targetPath);

    try {
      // Ensure target directory exists
      await fs.ensureDir(path.dirname(targetFullPath));

      // Check if source file exists
      if (await fs.pathExists(sourceFullPath)) {
        // Read and render template
        const content = await this.renderTemplate(sourcePath, data);
        await fs.writeFile(targetFullPath, content);
      } else {
        // Use default content if template doesn't exist
        const defaultContent = this.getDefaultContent(
          path.basename(sourcePath),
          data
        );
        await fs.writeFile(targetFullPath, defaultContent);
      }
    } catch (error) {
      throw new Error(`Failed to copy template file ${sourcePath}: ${error}`);
    }
  }

  async processTemplateFiles(
    template: Template,
    data: any,
    targetDir: string
  ): Promise<void> {
    const tasks = template.files.map(async (fileConfig) => {
      const targetPath = path.join(targetDir, fileConfig.path);
      await this.copyTemplateFile(fileConfig.template, targetPath, data);
    });

    // Process files in parallel for better performance
    await Promise.all(tasks);
  }

  private getDefaultContent(templateName: string, data: any): string {
    // Fallback content for missing templates
    const fileName = path.basename(templateName);

    switch (fileName) {
      case "package.json":
        return this.generatePackageJson(data);
      case "tsconfig.json":
        return this.generateTsConfig(data);
      case ".gitignore":
        return this.generateGitignore(data);
      case "README.md":
        return this.generateReadme(data);
      case "jest.config.js":
        return this.generateJestConfig(data);
      case ".eslintrc.js":
        return this.generateEslintConfig(data);
      case ".prettierrc":
        return this.generatePrettierConfig(data);
      case "Dockerfile":
        return this.generateDockerfile(data);
      case "docker-compose.yml":
        return this.generateDockerCompose(data);
      default:
        return `// Generated file: ${fileName}\n// Template: ${templateName}\n`;
    }
  }

  private generatePackageJson(data: any): string {
    const template = this.templates.get(data.template);
    const dependencies = template?.dependencies || {};
    const devDependencies = template?.devDependencies || {};

    return JSON.stringify(
      {
        name: data.name,
        version: "1.0.0",
        description: data.description,
        main: "src/server.ts",
        repository: {
          type: "git",
          url: `https://github.com/${data.author}/${data.name}.git`,
        },
        author: data.author,
        license: data.license,
        scripts: {
          build: "npx tsc && npm run copy-keys",
          start: "node build/server.js",
          dev: "nodemon src/server.ts",
          "copy-keys": 'cpx "src/keys/**/*" build/keys',
          test: "jest",
          "test:watch": "jest --watch",
          lint: "eslint src/**/*.ts",
          format: "prettier --write src/**/*.ts",
        },
        dependencies,
        devDependencies,
      },
      null,
      2
    );
  }

  private generateTsConfig(data: any): string {
    return JSON.stringify(
      {
        compilerOptions: {
          target: "ES2020",
          module: "commonjs",
          lib: ["ES2020"],
          outDir: "./build",
          rootDir: "./src",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          resolveJsonModule: true,
          declaration: true,
          declarationMap: true,
          sourceMap: true,
          removeComments: true,
          noImplicitAny: true,
          strictNullChecks: true,
          strictFunctionTypes: true,
          noImplicitThis: true,
          noImplicitReturns: true,
          noFallthroughCasesInSwitch: true,
          moduleResolution: "node",
          baseUrl: "./",
          paths: {
            "@/*": ["src/*"],
          },
          allowSyntheticDefaultImports: true,
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
        },
        include: ["src/**/*"],
        exclude: [
          "node_modules",
          "build",
          "dist",
          "**/*.test.ts",
          "**/*.spec.ts",
        ],
      },
      null,
      2
    );
  }

  private generateGitignore(data: any): string {
    return `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
build/
dist/
*.tsbuildinfo

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Keys and certificates
src/keys/
*.pem
*.key
*.crt

# Docker
.dockerignore`;
  }

  private generateReadme(data: any): string {
    return `# ${data.name}

${data.description}

## Features

- Express.js with TypeScript
- MongoDB with Mongoose
- Authentication & Authorization
- Request validation
- Error handling middleware
- Logging
- CORS configuration
- Rate limiting
- Security headers
${data.testing ? "- Unit and integration testing\n" : ""}${data.docker ? "- Docker configuration\n" : ""}
## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
${data.docker ? "- Docker (optional)\n" : ""}
### Installation

\`\`\`bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
\`\`\`

### Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm start\` - Start production server
- \`npm test\` - Run tests
- \`npm run lint\` - Run ESLint
- \`npm run format\` - Format code with Prettier

## Project Structure

\`\`\`
src/
├── app/
│   ├── config/          # Configuration files
│   ├── constants.ts     # Application constants
│   ├── errors/          # Custom error classes
│   ├── middlewares/     # Express middlewares
│   ├── modules/         # Feature modules
│   │   ├── auth/        # Authentication module
│   │   └── user/        # User module
│   ├── routes/          # Route definitions
│   └── shared/          # Shared utilities
├── @types/              # TypeScript type definitions
├── app.ts               # Express app configuration
└── server.ts            # Server entry point
\`\`\`

## Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=30d
\`\`\`

## API Documentation

### Authentication Endpoints

- \`POST /api/v1/auth/register\` - Register a new user
- \`POST /api/v1/auth/login\` - Login user
- \`GET /api/v1/auth/profile\` - Get user profile
- \`POST /api/v1/auth/refresh-token\` - Refresh access token
- \`PATCH /api/v1/auth/reset-password\` - Reset password

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the ${data.license} License.

## Support

For support, email support@nukta.dev or create an issue in the repository.`;
  }

  private generateJestConfig(data: any): string {
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
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
};`;
  }

  private generateEslintConfig(data: any): string {
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
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};`;
  }

  private generatePrettierConfig(data: any): string {
    return `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}`;
  }

  private generateDockerfile(data: any): string {
    return `FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]`;
  }

  private generateDockerCompose(data: any): string {
    return `version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/${data.name}
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

  // Performance optimization: Clear cache
  clearCache(): void {
    this.templateCache.clear();
  }

  // Performance optimization: Get cache stats
  getCacheStats(): {
    size: number;
    entries: Array<{ key: string; age: number }>;
  } {
    const now = Date.now();
    const entries = Array.from(this.templateCache.entries()).map(
      ([key, value]) => ({
        key,
        age: now - value.timestamp,
      })
    );

    return {
      size: this.templateCache.size,
      entries,
    };
  }
}
