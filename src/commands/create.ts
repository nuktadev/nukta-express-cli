import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import { join } from "path";
import { validateProjectName } from "../utils/validation";
import { ProjectGenerator } from "../generators/ProjectGenerator";
import { TemplateManager } from "../templates/TemplateManager";

interface CreateOptions {
  template: string;
  yes: boolean;
  git?: boolean;
  install: boolean;
}

export async function createProject(
  projectName: string,
  options: CreateOptions
): Promise<void> {
  const spinner = ora(chalk.blue("🚀 Initializing project...")).start();

  try {
    // Validate project name
    const validation = validateProjectName(projectName);
    if (!validation.valid) {
      spinner.fail(chalk.red("❌ Invalid project name"));
      console.error(chalk.red(validation.errors.join("\n")));
      process.exit(1);
    }

    // Get project configuration
    const config = await getProjectConfig(projectName, options);

    spinner.text = chalk.blue("📁 Creating project structure...");

    // Initialize project generator
    const generator = new ProjectGenerator(config);
    const templateManager = new TemplateManager();

    // Generate project
    await generator.generate();

    spinner.succeed(chalk.green("✅ Project created successfully!"));

    // Show next steps
    showNextSteps(projectName, config);
  } catch (error) {
    spinner.fail(chalk.red("❌ Failed to create project"));
    throw error;
  }
}

async function getProjectConfig(projectName: string, options: CreateOptions) {
  if (options.yes) {
    return {
      name: projectName,
      template: options.template,
      git: options.git || false,
      install: options.install,
      description: `${projectName} - Express.js API`,
      author: "Nukta Solutions",
      license: "MIT",
      database: "mongodb",
      authentication: true,
      cors: true,
      logging: true,
      validation: true,
      testing: false,
      docker: false,
    };
  }

  // Show welcome message
  console.log(chalk.blue.bold("\n🚀 Welcome to Nukta Express CLI!\n"));
  console.log(
    chalk.gray(
      "Let's create your Express.js project with TypeScript and MongoDB.\n"
    )
  );

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "description",
      message: chalk.cyan("📝 Project description:"),
      default: `${projectName} - Express.js API`,
    },
    {
      type: "input",
      name: "author",
      message: chalk.cyan("👤 Author:"),
      default: "Nukta Solutions",
    },
    {
      type: "list",
      name: "license",
      message: chalk.cyan("📄 License:"),
      choices: ["MIT", "Apache-2.0", "GPL-3.0", "ISC"],
      default: "MIT",
    },
    {
      type: "separator",
      line: chalk.gray("─".repeat(50)),
    },
    {
      type: "list",
      name: "template",
      message: chalk.cyan("🎯 Choose template:"),
      choices: [
        {
          name:
            chalk.green("● Basic") +
            chalk.gray(" - Minimal Express.js setup with TypeScript"),
          value: "basic",
        },
        {
          name:
            chalk.green("● Auth") +
            chalk.gray(" - Express.js with authentication middleware"),
          value: "auth",
        },
        {
          name:
            chalk.green("● Full") +
            chalk.gray(" - Complete setup with all features (recommended)"),
          value: "full",
        },
      ],
      default: options.template,
    },
    {
      type: "separator",
      line: chalk.gray("─".repeat(50)),
    },
    {
      type: "confirm",
      name: "authentication",
      message: chalk.cyan("🔐 Include authentication middleware?"),
      default: true,
      when: (answers) => answers.template !== "basic",
    },
    {
      type: "confirm",
      name: "cors",
      message: chalk.cyan("🌐 Include CORS configuration?"),
      default: true,
    },
    {
      type: "confirm",
      name: "logging",
      message: chalk.cyan("📊 Include logging middleware?"),
      default: true,
    },
    {
      type: "confirm",
      name: "validation",
      message: chalk.cyan("✅ Include request validation?"),
      default: true,
    },
    {
      type: "confirm",
      name: "testing",
      message: chalk.cyan("🧪 Include testing setup?"),
      default: true,
    },
    {
      type: "confirm",
      name: "docker",
      message: chalk.cyan("🐳 Include Docker configuration?"),
      default: true,
    },
    {
      type: "separator",
      line: chalk.gray("─".repeat(50)),
    },
    {
      type: "confirm",
      name: "git",
      message: chalk.cyan("📦 Initialize git repository?"),
      default: false,
    },
    {
      type: "confirm",
      name: "install",
      message: chalk.cyan("⚡ Install dependencies?"),
      default: options.install,
    },
  ]);

  return {
    name: projectName,
    ...answers,
    database: "mongodb",
  };
}

function showNextSteps(projectName: string, config: any): void {
  console.log(chalk.green.bold("\n🎉 Project created successfully!\n"));

  console.log(chalk.blue.bold("📋 Next steps:\n"));

  const steps = [];

  // Always show navigation step
  steps.push({
    number: "1",
    title: "Navigate to your project",
    command: `cd ${projectName}`,
    description: "Change to the project directory",
  });

  // Add install step if dependencies weren't installed
  if (!config.install) {
    steps.push({
      number: "2",
      title: "Install dependencies",
      command: "npm install",
      description: "Install all required packages",
    });
  }

  // Add development server step
  steps.push({
    number: config.install ? "2" : "3",
    title: "Start development server",
    command: "npm run dev",
    description: "Run the development server with hot reload",
  });

  // Add browser step
  steps.push({
    number: config.install ? "3" : "4",
    title: "Open in browser",
    command: "http://localhost:5000",
    description: "View your API in the browser",
  });

  // Display steps with better formatting
  steps.forEach((step, index) => {
    console.log(chalk.cyan.bold(`${step.number}. ${step.title}`));
    console.log(chalk.gray(`   ${step.description}`));
    console.log(chalk.white(`   ${step.command}`));

    if (index < steps.length - 1) {
      console.log(); // Add spacing between steps
    }
  });

  console.log(chalk.gray("\n" + "─".repeat(60)));
  console.log(
    chalk.yellow(
      "📚 Documentation: https://github.com/nukta-solutions/nukta-express"
    )
  );
  console.log(
    chalk.yellow(
      "🐛 Issues: https://github.com/nukta-solutions/nukta-express/issues"
    )
  );
  console.log(chalk.gray("─".repeat(60) + "\n"));
}
