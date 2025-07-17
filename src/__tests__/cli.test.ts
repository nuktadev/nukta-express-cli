import { validateProjectName } from '../utils/validation';

describe('CLI Validation', () => {
  describe('validateProjectName', () => {
    it('should validate a correct project name', () => {
      const result = validateProjectName('my-api');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject empty project name', () => {
      const result = validateProjectName('');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Project name is required');
    });

    it('should reject reserved words', () => {
      const result = validateProjectName('node_modules');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('"node_modules" is a reserved word and cannot be used as a project name');
    });

    it('should reject names with invalid characters', () => {
      const result = validateProjectName('my-api@test');
      expect(result.valid).toBe(false);
    });

    it('should reject names that are too long', () => {
      const longName = 'a'.repeat(215);
      const result = validateProjectName(longName);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Project name cannot be longer than 214 characters');
    });
  });
}); 