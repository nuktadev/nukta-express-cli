import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import { TemplateManager } from '../templates/TemplateManager';

export interface ProjectConfig {
  name: string;
  description: string;
  author: string;
  license: string;
  template: string;
  database: string;
  authentication: boolean;
  cors: boolean;
  logging: boolean;
  validation: boolean;
  testing: boolean;
  docker: boolean;
  git: boolean;
  install: boolean;
}

export class ProjectGenerator {
  private config: ProjectConfig;
  private templateManager: TemplateManager;
  private projectPath: string;

  constructor(config: ProjectConfig) {
    this.config = config;
    this.templateManager = new TemplateManager();
    this.projectPath = path.resolve(process.cwd(), config.name);
  }

  async generate(): Promise<void> {
    try {
      // Create project directory
      await this.createProjectDirectory();
      
      // Generate project files
      await this.generateProjectFiles();
      
      // Initialize git if requested
      if (this.config.git) {
        await this.initializeGit();
      }
      
      // Install dependencies if requested
      if (this.config.install) {
        await this.installDependencies();
      }
      
    } catch (error) {
      throw new Error(`Failed to generate project: ${error}`);
    }
  }

  private async createProjectDirectory(): Promise<void> {
    if (await fs.pathExists(this.projectPath)) {
      throw new Error(`Directory "${this.config.name}" already exists`);
    }
    
    await fs.ensureDir(this.projectPath);
  }

  private async generateProjectFiles(): Promise<void> {
    const template = this.templateManager.getTemplate(this.config.template);
    
    // Generate all files from template
    for (const file of template.files) {
      await this.generateFile(file);
    }
    
    // Generate package.json
    await this.generatePackageJson();
    
    // Generate README.md
    await this.generateReadme();
    
    // Generate .env.example
    await this.generateEnvExample();
    
    // Generate .gitignore
    await this.generateGitignore();
  }

  private async generateFile(fileConfig: any): Promise<void> {
    const filePath = path.join(this.projectPath, fileConfig.path);
    const dirPath = path.dirname(filePath);
    
    // Ensure directory exists
    await fs.ensureDir(dirPath);
    
    // Generate file content
    const content = await this.templateManager.renderTemplate(
      fileConfig.template,
      this.config
    );
    
    // Write file
    await fs.writeFile(filePath, content);
  }

  private async generatePackageJson(): Promise<void> {
    const packageJson = {
      name: this.config.name,
      version: "1.0.0",
      description: this.config.description,
      main: "src/server.ts",
      repository: {
        type: "git",
        url: `https://github.com/${this.config.author}/${this.config.name}.git`
      },
      author: this.config.author,
      license: this.config.license,
             scripts: {
         build: "npx tsc && npm run copy-keys",
         start: "node build/server.js",
         dev: "nodemon src/server.ts",
         "copy-keys": "cpx \"src/keys/**/*\" build/keys",
         test: "jest",
         "test:watch": "jest --watch",
         lint: "eslint src/**/*.ts",
         format: "prettier --write src/**/*.ts"
       },
      dependencies: this.getDependencies(),
      devDependencies: this.getDevDependencies()
    };

    const filePath = path.join(this.projectPath, 'package.json');
    await fs.writeFile(filePath, JSON.stringify(packageJson, null, 2));
  }

  private getDependencies(): Record<string, string> {
    const baseDeps = {
      "express": "^4.18.2",
      "mongoose": "^8.2.1",
      "dotenv": "^16.4.4",
      "cors": "^2.8.5",
      "helmet": "^7.1.0",
      "express-rate-limit": "^7.1.5",
      "express-async-errors": "^3.1.1",
      "express-promise-router": "^4.1.1",
      "http-status-codes": "^2.3.0"
    };

    if (this.config.authentication) {
      Object.assign(baseDeps, {
        "bcrypt": "^5.1.1",
        "jsonwebtoken": "^9.0.2",
        "@types/bcrypt": "^5.0.2",
        "@types/jsonwebtoken": "^9.0.2"
      });
    }

    if (this.config.logging) {
      Object.assign(baseDeps, {
        "morgan": "^1.10.0",
        "@types/morgan": "^1.9.9"
      });
    }

    if (this.config.validation) {
      Object.assign(baseDeps, {
        "joi": "^17.11.0",
        "@types/joi": "^17.2.3"
      });
    }

    return baseDeps;
  }

  private getDevDependencies(): Record<string, string> {
    const baseDevDeps = {
      "@types/express": "^4.17.13",
      "@types/node": "^20.10.0",
      "@types/cors": "^2.8.17",
      "typescript": "^5.3.2",
      "ts-node": "^10.9.1",
      "nodemon": "^3.1.7",
      "cpx": "^1.5.0",
      "eslint": "^8.54.0",
      "@typescript-eslint/eslint-plugin": "^6.13.0",
      "@typescript-eslint/parser": "^6.13.0",
      "prettier": "^3.1.0"
    };

    if (this.config.testing) {
      Object.assign(baseDevDeps, {
        "jest": "^29.7.0",
        "ts-jest": "^29.1.1",
        "@types/jest": "^29.5.8",
        "supertest": "^6.3.3",
        "@types/supertest": "^2.0.16"
      });
    }

    return baseDevDeps;
  }

  private async generateReadme(): Promise<void> {
    const readmeContent = `# ${this.config.name}

${this.config.description}

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
${this.config.testing ? '- Unit and integration testing\n' : ''}${this.config.docker ? '- Docker configuration\n' : ''}
## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
${this.config.docker ? '- Docker (optional)\n' : ''}
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
│   ├── middlewares/     # Express middlewares
│   ├── modules/         # Feature modules
│   ├── routes/          # Route definitions
│   └── shared/          # Shared utilities
├── @types/              # TypeScript type definitions
├── app.ts              # Express app configuration
└── server.ts           # Server entry point
\`\`\`

## Environment Variables

Copy \`.env.example\` to \`.env\` and configure:

- \`PORT\` - Server port (default: 5000)
- \`NODE_ENV\` - Environment (development/production)
- \`DATABASE_URL\` - MongoDB connection string
- \`JWT_SECRET\` - JWT secret key
- \`JWT_REFRESH_SECRET\` - JWT refresh secret key

## API Documentation

The API will be available at \`http://localhost:5000\`

## License

${this.config.license}
`;

    const filePath = path.join(this.projectPath, 'README.md');
    await fs.writeFile(filePath, readmeContent);
  }

  private async generateEnvExample(): Promise<void> {
    const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=mongodb://localhost:27017/${this.config.name}

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=365d

# Application Configuration
BCRYPT_SALT_ROUNDS=10
SEND_OTP_INTERVAL=300
OTP_LIFETIME=300

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
`;

    const filePath = path.join(this.projectPath, '.env.example');
    await fs.writeFile(filePath, envContent);
  }

  private async generateGitignore(): Promise<void> {
    const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build output
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

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
node_modules/
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

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Keys directory
src/keys/
`;

    const filePath = path.join(this.projectPath, '.gitignore');
    await fs.writeFile(filePath, gitignoreContent);
  }

  private async initializeGit(): Promise<void> {
    try {
      execSync('git init', { cwd: this.projectPath, stdio: 'ignore' });
      console.log(chalk.green('✓ Git repository initialized'));
    } catch (error) {
      console.log(chalk.yellow('⚠ Failed to initialize git repository'));
    }
  }

  private async installDependencies(): Promise<void> {
    try {
      console.log(chalk.blue('Installing dependencies...'));
      execSync('npm install', { cwd: this.projectPath, stdio: 'inherit' });
      console.log(chalk.green('✓ Dependencies installed successfully'));
    } catch (error) {
      console.log(chalk.yellow('⚠ Failed to install dependencies. Please run "npm install" manually.'));
    }
  }
} 