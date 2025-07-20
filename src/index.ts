#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { createProject } from "./commands/create";
import { showVersion } from "./utils/version";
import { TemplateManager } from "./templates/TemplateManager";
import { performanceMonitor } from "./utils/performance";

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
  .option("--performance", "Show performance statistics and cache information")
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
    const templateManager = new TemplateManager();
    const templates = templateManager.getAvailableTemplates();

    console.log(chalk.blue.bold("\n📋 Available Templates:\n"));

    templates.forEach((template) => {
      console.log(
        chalk.green(`• ${template.name.padEnd(10)}`) +
          chalk.gray(`- ${template.description}`)
      );
    });

    console.log(
      chalk.gray(
        "\n💡 Use --template option to specify a template when creating a project"
      )
    );
    console.log(
      chalk.gray("   Example: nukta-express create my-app --template auth\n")
    );
  });

// Cache management command
program
  .command("cache")
  .description("Manage template cache")
  .option("--clear", "Clear template cache")
  .option("--stats", "Show cache statistics")
  .action((options: any) => {
    const templateManager = new TemplateManager();

    if (options.clear) {
      templateManager.clearCache();
      console.log(chalk.green("✅ Template cache cleared successfully"));
    } else if (options.stats) {
      const stats = templateManager.getCacheStats();
      console.log(chalk.blue.bold("\n📊 Template Cache Statistics:\n"));
      console.log(chalk.gray(`Cache size: ${stats.size} entries`));
      console.log(chalk.gray(`Cache entries:`));
      stats.entries.forEach((entry) => {
        console.log(chalk.gray(`  • ${entry.key} (age: ${entry.age}ms)`));
      });
    } else {
      console.log(
        chalk.yellow("Use --clear to clear cache or --stats to view statistics")
      );
    }
  });

// Performance metrics command
program
  .command("metrics")
  .description("Show CLI performance metrics")
  .option("--reset", "Reset all metrics")
  .action((options: any) => {
    if (options.reset) {
      performanceMonitor.resetMetrics();
      console.log(chalk.green("✅ Performance metrics reset successfully"));
    } else {
      performanceMonitor.displayMetrics();
    }
  });

// Parse command line arguments
program.parse();
