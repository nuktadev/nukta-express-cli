import validateNpmPackageName from 'validate-npm-package-name';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateProjectName(name: string): ValidationResult {
  const errors: string[] = [];
  
  // Check if name is provided
  if (!name || name.trim().length === 0) {
    errors.push('Project name is required');
    return { valid: false, errors };
  }
  
  // Validate npm package name
  const npmValidation = validateNpmPackageName(name);
  if (!npmValidation.validForNewPackages) {
    errors.push(...npmValidation.errors || []);
  }
  
  // Check for reserved words
  const reservedWords = ['node_modules', 'package', 'package.json', 'package-lock.json'];
  if (reservedWords.includes(name.toLowerCase())) {
    errors.push(`"${name}" is a reserved word and cannot be used as a project name`);
  }
  
  // Check length
  if (name.length > 214) {
    errors.push('Project name cannot be longer than 214 characters');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function validatePort(port: string): ValidationResult {
  const errors: string[] = [];
  const portNum = parseInt(port);
  
  if (isNaN(portNum)) {
    errors.push('Port must be a valid number');
  } else if (portNum < 1 || portNum > 65535) {
    errors.push('Port must be between 1 and 65535');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateDatabaseUrl(url: string): ValidationResult {
  const errors: string[] = [];
  
  if (!url || url.trim().length === 0) {
    errors.push('Database URL is required');
    return { valid: false, errors };
  }
  
  // Basic MongoDB URL validation
  if (!url.startsWith('mongodb://') && !url.startsWith('mongodb+srv://')) {
    errors.push('Database URL must be a valid MongoDB connection string');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
} 