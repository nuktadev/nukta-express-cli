# nukta-express CLI Usage Examples

This document provides practical examples of how to use the nukta-express CLI to generate Express.js projects.

## Basic Usage

### 1. Create a Simple API

```bash
# Create a basic Express.js project
nukta-express create my-simple-api

# This will:
# - Create a new directory called 'my-simple-api'
# - Set up TypeScript configuration
# - Install all necessary dependencies
# - Create a basic Express.js server
```

### 2. Create an API with Authentication

```bash
# Create a project with authentication
nukta-express create my-auth-api --template auth

# This will include:
# - User model with password hashing
# - JWT authentication
# - Login/register endpoints
# - Protected route middleware
```

### 3. Create a Full-Featured API

```bash
# Create a complete production-ready API
nukta-express create my-production-api --template full

# This will include everything:
# - Authentication system
# - Security middleware (Helmet, CORS, rate limiting)
# - Request validation
# - Testing setup
# - Docker configuration
# - Code quality tools
```

## Advanced Usage

### 4. Skip Prompts and Use Defaults

```bash
# Create project without interactive prompts
nukta-express create my-api --yes

# This will use all default settings:
# - Template: full
# - Git: true
# - Install dependencies: true
```

### 5. Custom Configuration

```bash
# Create project with specific template
nukta-express create my-api --template auth --no-git --no-install

# This will:
# - Use auth template
# - Skip git initialization
# - Skip dependency installation
```

### 6. List Available Templates

```bash
# See all available templates
nukta-express templates

# Output:
# Available Templates:
# 
# • basic    - Minimal Express.js setup with TypeScript
# • auth     - Express.js with authentication middleware
# • full     - Complete setup with all features (recommended)
```

## Generated Project Structure

After running the CLI, you'll get a project structure like this:

```
my-api/
├── src/
│   ├── app/
│   │   ├── config/
│   │   │   └── index.ts
│   │   ├── middlewares/
│   │   │   ├── authentication.ts
│   │   │   ├── error-handler.ts
│   │   │   ├── not-found.ts
│   │   │   ├── cors.ts
│   │   │   ├── rate-limit.ts
│   │   │   └── security.ts
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.route.ts
│   │   │   │   └── auth.type.ts
│   │   │   └── user/
│   │   │       ├── user.model.ts
│   │   │       └── user.type.ts
│   │   ├── routes/
│   │   │   └── index.ts
│   │   └── shared/
│   │       ├── validation.ts
│   │       ├── response.ts
│   │       └── database.ts
│   ├── @types/
│   │   └── index.d.ts
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
├── README.md
├── jest.config.js
├── .eslintrc.js
├── .prettierrc
├── Dockerfile
└── docker-compose.yml
```

## Next Steps After Generation

### 1. Navigate to Project

```bash
cd my-api
```

### 2. Install Dependencies (if not done automatically)

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Test the API

```bash
# Health check
curl http://localhost:5000/api/v1/health

# Register a user (if using auth template)
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login (if using auth template)
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## Environment Configuration

Edit the `.env` file with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=mongodb://localhost:27017/my-api

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=365d

# Application Configuration
BCRYPT_SALT_ROUNDS=10
CORS_ORIGIN=http://localhost:3000
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server

# Testing
npm test            # Run tests
npm run test:watch  # Run tests in watch mode

# Code Quality
npm run lint        # Run ESLint
npm run format      # Format code with Prettier
```

## Docker Usage

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build and run manually
docker build -t my-api .
docker run -p 5000:5000 my-api
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the PORT in `.env`
2. **MongoDB not running**: Start MongoDB or use MongoDB Atlas
3. **Permission denied**: Check file permissions
4. **Dependencies not installed**: Run `npm install`

### Getting Help

```bash
# Show CLI help
nukta-express --help

# Show create command help
nukta-express create --help
```

## Best Practices

1. **Always use version control**: The CLI initializes git by default
2. **Set up environment variables**: Never commit sensitive data
3. **Run tests**: Ensure your code works before deployment
4. **Use Docker**: For consistent deployment environments
5. **Follow the modular structure**: Add new features in the modules directory
6. **Validate requests**: Use the built-in validation middleware
7. **Handle errors properly**: Use the error handling middleware 