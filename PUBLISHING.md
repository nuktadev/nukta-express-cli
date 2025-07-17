# Publishing nukta-express CLI

This document outlines the steps to publish the nukta-express CLI package to npm.

## Prerequisites

1. **npm account**: You need an npm account with publish permissions
2. **Login to npm**: Run `npm login` in your terminal
3. **Node.js**: Ensure you have Node.js v16 or higher installed

## Pre-publish Checklist

Before publishing, ensure the following:

- [ ] All tests pass (`npm test`)
- [ ] Code is linted (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Version is updated in `package.json`
- [ ] Changelog is updated
- [ ] README is up to date
- [ ] All dependencies are correctly specified

## Build Process

1. **Clean and build**:
   ```bash
   npm run build
   ```

2. **Run tests**:
   ```bash
   npm test
   ```

3. **Check the build output**:
   ```bash
   ls -la dist/
   ```

## Publishing Steps

### 1. Update Version

Update the version in `package.json`:

```bash
# For patch release (bug fixes)
npm version patch

# For minor release (new features)
npm version minor

# For major release (breaking changes)
npm version major
```

### 2. Build the Package

```bash
npm run build
```

### 3. Test the Build

```bash
# Test the CLI locally
node dist/index.js --help
```

### 4. Publish to npm

```bash
npm publish
```

### 5. Verify Publication

Check that the package is published:

```bash
npm view nukta-express
```

## Post-publish

1. **Create a Git tag**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **Update documentation** if needed

3. **Announce the release** on relevant channels

## Troubleshooting

### Common Issues

1. **Package name already exists**: Choose a different package name
2. **Build errors**: Check TypeScript compilation
3. **Test failures**: Fix failing tests before publishing
4. **Permission denied**: Ensure you're logged in to npm

### Rollback

If you need to unpublish a version:

```bash
npm unpublish nukta-express@1.0.0
```

**Note**: npm has restrictions on unpublishing packages, especially after 24 hours.

## Versioning Strategy

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

## Release Notes

For each release, update:

1. `CHANGELOG.md`
2. `package.json` version
3. Git tags

## Security

- Never commit sensitive information
- Use environment variables for secrets
- Regularly update dependencies
- Monitor for security vulnerabilities

## Support

For publishing issues:

1. Check npm documentation
2. Review npm policies
3. Contact npm support if needed 