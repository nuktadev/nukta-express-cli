import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { join } from 'path';
import { validateProjectName } from '../utils/validation';
import { ProjectGenerator } from '../generators/ProjectGenerator';
import { TemplateManager } from '../templates/TemplateManager';

interface CreateOptions {
  template: string;
  yes: boolean;
  git: boolean;
  install: boolean;
}

export async function createProject(projectName: string, options: CreateOptions): Promise<void> {
  const spinner = ora('Initializing project...').start();

  try {
    // Validate project name
    const validation = validateProjectName(projectName);
    if (!validation.valid) {
      spinner.fail('Invalid project name');
      console.error(chalk.red(validation.errors.join('\n')));
      process.exit(1);
    }

    // Get project configuration
    const config = await getProjectConfig(projectName, options);
    
    spinner.text = 'Creating project structure...';
    
    // Initialize project generator
    const generator = new ProjectGenerator(config);
    const templateManager = new TemplateManager();
    
    // Generate project
    await generator.generate();
    
    spinner.succeed('Project created successfully!');
    
    // Show next steps
    showNextSteps(projectName, config);
    
  } catch (error) {
    spinner.fail('Failed to create project');
    throw error;
  }
}

async function getProjectConfig(projectName: string, options: CreateOptions) {
  if (options.yes) {
    return {
      name: projectName,
      template: options.template,
      git: options.git,
      install: options.install,
      description: `${projectName} - Express.js API`,
      author: 'Nukta Solutions',
      license: 'MIT',
      database: 'mongodb',
      authentication: true,
      cors: true,
      logging: true,
      validation: true,
      testing: true,
      docker: true
    };
  }

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: 'Project description:',
      default: `${projectName} - Express.js API`
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author:',
      default: 'Nukta Solutions'
    },
    {
      type: 'list',
      name: 'license',
      message: 'License:',
      choices: ['MIT', 'Apache-2.0', 'GPL-3.0', 'ISC'],
      default: 'MIT'
    },
    {
      type: 'list',
      name: 'template',
      message: 'Choose template:',
      choices: [
        { name: 'Basic - Minimal setup', value: 'basic' },
        { name: 'Auth - With authentication', value: 'auth' },
        { name: 'Full - Complete setup (recommended)', value: 'full' }
      ],
      default: options.template
    },
    {
      type: 'confirm',
      name: 'authentication',
      message: 'Include authentication middleware?',
      default: true,
      when: (answers) => answers.template !== 'basic'
    },
    {
      type: 'confirm',
      name: 'cors',
      message: 'Include CORS configuration?',
      default: true
    },
    {
      type: 'confirm',
      name: 'logging',
      message: 'Include logging middleware?',
      default: true
    },
    {
      type: 'confirm',
      name: 'validation',
      message: 'Include request validation?',
      default: true
    },
    {
      type: 'confirm',
      name: 'testing',
      message: 'Include testing setup?',
      default: true
    },
    {
      type: 'confirm',
      name: 'docker',
      message: 'Include Docker configuration?',
      default: true
    },
    {
      type: 'confirm',
      name: 'git',
      message: 'Initialize git repository?',
      default: options.git
    },
    {
      type: 'confirm',
      name: 'install',
      message: 'Install dependencies?',
      default: options.install
    }
  ]);

  return {
    name: projectName,
    ...answers,
    database: 'mongodb'
  };
}

function showNextSteps(projectName: string, config: any): void {
  console.log(chalk.green.bold('\n🎉 Project created successfully!\n'));
  
  console.log(chalk.blue.bold('Next steps:\n'));
  
  if (config.install) {
    console.log(chalk.gray('1. Navigate to your project:'));
    console.log(chalk.white(`   cd ${projectName}\n`));
    
    console.log(chalk.gray('2. Start development server:'));
    console.log(chalk.white('   npm run dev\n'));
  } else {
    console.log(chalk.gray('1. Navigate to your project:'));
    console.log(chalk.white(`   cd ${projectName}\n`));
    
    console.log(chalk.gray('2. Install dependencies:'));
    console.log(chalk.white('   npm install\n'));
    
    console.log(chalk.gray('3. Start development server:'));
    console.log(chalk.white('   npm run dev\n'));
  }
  
  console.log(chalk.gray('4. Open your browser and visit:'));
  console.log(chalk.white('   http://localhost:5000\n'));
  
  console.log(chalk.yellow('📚 Documentation: https://github.com/nukta-solutions/nukta-express\n'));
} 