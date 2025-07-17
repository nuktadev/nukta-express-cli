#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { createProject } from "./commands/create";
import { showVersion } from "./utils/version";

const program = new Command();

// Set up the CLI
program
  .name("nukta-express")
  .description(
    "A comprehensive Express.js boilerplate generator with TypeScript, MongoDB, and best practices"
  )
  .version(showVersion(), "-v, --version");

// Create command
program
  .command("create <project-name>")
  .description("Create a new Express.js project with TypeScript and MongoDB")
  .option(
    "-t, --template <template>",
    "Choose a template (basic, auth, full)",
    "full"
  )
  .option("-y, --yes", "Skip prompts and use defaults")
  .option("--git", "Initialize git repository (disabled by default)")
  .option("--no-install", "Skip dependency installation")
  .action(async (projectName: string, options: any) => {
    try {
      await createProject(projectName, options);
    } catch (error) {
      console.error(chalk.red("Error creating project:"), error);
      process.exit(1);
    }
  });

// List templates command
program
  .command("templates")
  .description("List available templates")
  .action(() => {
    console.log(chalk.blue.bold("\nAvailable Templates:\n"));
    console.log(
      chalk.green("• basic    ") +
        chalk.gray("- Minimal Express.js setup with TypeScript")
    );
    console.log(
      chalk.green("• auth     ") +
        chalk.gray("- Express.js with authentication middleware")
    );
    console.log(
      chalk.green("• full     ") +
        chalk.gray("- Complete setup with all features (default)")
    );
    console.log();
  });

// Parse command line arguments
program.parse();
