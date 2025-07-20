import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import chalk from "chalk";
import { TemplateManager } from "../templates/TemplateManager";
import ora from "ora";

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
  private spinner: ora.Ora;

  constructor(config: ProjectConfig) {
    this.config = config;
    this.templateManager = new TemplateManager();
    this.projectPath = path.resolve(process.cwd(), config.name);
    this.spinner = ora();
  }

  async generate(): Promise<void> {
    try {
      this.spinner.start(chalk.blue("🚀 Initializing project..."));

      // Validate template
      const template = this.templateManager.getTemplate(this.config.template);

      this.spinner.text = chalk.blue("📁 Creating project structure...");
      await this.createProjectDirectory();

      this.spinner.text = chalk.blue("📄 Generating project files...");
      await this.generateProjectFiles(template);

      if (this.config.git) {
        this.spinner.text = chalk.blue("📦 Initializing git repository...");
        await this.initializeGit();
      }

      if (this.config.install) {
        this.spinner.text = chalk.blue("⚡ Installing dependencies...");
        await this.installDependencies();
      }

      this.spinner.succeed(chalk.green("✅ Project created successfully!"));
    } catch (error) {
      this.spinner.fail(chalk.red("❌ Failed to generate project"));
      throw new Error(`Failed to generate project: ${error}`);
    }
  }

  private async createProjectDirectory(): Promise<void> {
    if (await fs.pathExists(this.projectPath)) {
      throw new Error(`Directory "${this.config.name}" already exists`);
    }

    await fs.ensureDir(this.projectPath);
  }

  private async generateProjectFiles(template: any): Promise<void> {
    try {
      // Process all template files in parallel for better performance
      await this.templateManager.processTemplateFiles(
        template,
        this.config,
        this.projectPath
      );

      // Generate additional files
      await this.generateAdditionalFiles();
    } catch (error) {
      throw new Error(`Failed to generate project files: ${error}`);
    }
  }

  private async generateAdditionalFiles(): Promise<void> {
    const additionalFiles = [
      { path: ".env.example", content: this.generateEnvExample() },
      { path: ".env", content: this.generateEnvFile() },
    ];

    const tasks = additionalFiles.map(async (file) => {
      const filePath = path.join(this.projectPath, file.path);
      await fs.writeFile(filePath, file.content);
    });

    await Promise.all(tasks);
  }

  private generateEnvExample(): string {
    return `# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/${this.config.name}

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
JWT_REFRESH_EXPIRES_IN=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info

# Security
BCRYPT_SALT_ROUNDS=12
`;
  }

  private generateEnvFile(): string {
    return `# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/${this.config.name}

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here-change-in-production
JWT_REFRESH_EXPIRES_IN=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info

# Security
BCRYPT_SALT_ROUNDS=12
`;
  }

  private async initializeGit(): Promise<void> {
    try {
      execSync("git init", { cwd: this.projectPath, stdio: "pipe" });

      // Create initial commit
      execSync("git add .", { cwd: this.projectPath, stdio: "pipe" });
      execSync('git commit -m "Initial commit: Express.js project setup"', {
        cwd: this.projectPath,
        stdio: "pipe",
      });
    } catch (error) {
      console.warn(
        chalk.yellow(
          "⚠️  Git initialization failed, but project was created successfully"
        )
      );
    }
  }

  private async installDependencies(): Promise<void> {
    try {
      execSync("npm install", {
        cwd: this.projectPath,
        stdio: "pipe",
        timeout: 300000, // 5 minutes timeout
      });
    } catch (error) {
      console.warn(
        chalk.yellow(
          "⚠️  Dependency installation failed, but project was created successfully"
        )
      );
      console.log(
        chalk.cyan(
          "💡 You can install dependencies manually by running: npm install"
        )
      );
    }
  }

  // Performance monitoring methods
  getTemplateCacheStats(): any {
    return this.templateManager.getCacheStats();
  }

  clearTemplateCache(): void {
    this.templateManager.clearCache();
  }
}
