# nukta-express

A comprehensive Express.js boilerplate generator with TypeScript, MongoDB, and best practices. Create production-ready Express.js applications with a single command.

## Features

- 🚀 **Quick Setup** - Generate a complete Express.js project in seconds
- 📦 **TypeScript Support** - Full TypeScript configuration and type definitions
- 🗄️ **MongoDB Integration** - Mongoose ODM with proper connection handling
- 🔐 **Authentication Ready** - JWT-based authentication with bcrypt password hashing
- 🛡️ **Security First** - Helmet, CORS, rate limiting, and security headers
- 📝 **Request Validation** - Joi schema validation for all endpoints
- 🧪 **Testing Setup** - Jest configuration for unit and integration tests
- 🐳 **Docker Ready** - Dockerfile and docker-compose configuration
- 📋 **Code Quality** - ESLint and Prettier configuration
- 🎯 **Modular Architecture** - Clean, scalable project structure
- 📚 **Comprehensive Documentation** - Detailed README and inline comments

## Installation

```bash
npm install -g nukta-express
```

## Quick Start

```bash
# Create a new project
nukta-express create my-api

# Or with specific template
nukta-express create my-api --template auth

# Skip prompts and use defaults
nukta-express create my-api --yes
```

## Available Templates

### Basic Template
Minimal Express.js setup with TypeScript and MongoDB.

```bash
nukta-express create my-api --template basic
```

**Includes:**
- Express.js with TypeScript
- MongoDB connection
- Basic error handling
- Health check endpoint

### Auth Template
Express.js with authentication middleware and user management.

```bash
nukta-express create my-api --template auth
```

**Includes:**
- Everything from Basic template
- JWT authentication
- User model and routes
- Password hashing with bcrypt
- Protected route middleware

### Full Template (Default)
Complete setup with all features and best practices.

```bash
nukta-express create my-api --template full
```

**Includes:**
- Everything from Auth template
- CORS configuration
- Rate limiting
- Security headers (Helmet)
- Request validation (Joi)
- Testing setup (Jest)
- Docker configuration
- Code quality tools (ESLint, Prettier)

## Command Options

```bash
nukta-express create <project-name> [options]

Options:
  -t, --template <template>  Choose template (basic, auth, full) [default: full]
  -y, --yes                  Skip prompts and use defaults
  --no-git                   Skip git initialization
  --no-install               Skip dependency installation
  -h, --help                 Display help for command
```

## Project Structure

Generated projects follow a clean, modular architecture:

```
src/
├── app/
│   ├── config/              # Configuration files
│   ├── middlewares/         # Express middlewares
│   │   ├── authentication.ts
│   │   ├── error-handler.ts
│   │   ├── not-found.ts
│   │   ├── cors.ts
│   │   ├── rate-limit.ts
│   │   └── security.ts
│   ├── modules/             # Feature modules
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.route.ts
│   │   │   └── auth.type.ts
│   │   └── user/
│   │       ├── user.model.ts
│   │       └── user.type.ts
│   ├── routes/              # Route definitions
│   │   └── index.ts
│   └── shared/              # Shared utilities
│       ├── validation.ts
│       ├── response.ts
│       └── database.ts
├── @types/                  # TypeScript type definitions
│   └── index.d.ts
├── app.ts                   # Express app configuration
└── server.ts               # Server entry point
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=mongodb://localhost:27017/your-database

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=365d

# Application Configuration
BCRYPT_SALT_ROUNDS=10
CORS_ORIGIN=http://localhost:3000
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm start           # Start production server

# Testing
npm test            # Run tests
npm run test:watch  # Run tests in watch mode

# Code Quality
npm run lint        # Run ESLint
npm run format      # Format code with Prettier
```

## API Endpoints

### Health Check
```
GET /api/v1/health
```

### Authentication (Auth & Full templates)
```
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/profile (protected)
```

## Development

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Docker (optional)

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the API:**
   ```
   http://localhost:5000
   ```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build and run manually
docker build -t my-api .
docker run -p 5000:5000 my-api
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@nuktasolutions.com
- 🐛 Issues: [GitHub Issues](https://github.com/nukta-solutions/nukta-express/issues)
- 📚 Documentation: [GitHub Wiki](https://github.com/nukta-solutions/nukta-express/wiki)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

---

Made with ❤️ by [Nukta Solutions](https://nuktasolutions.com) 