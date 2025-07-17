# 🚀 nukta-express CLI

> **A comprehensive Express.js boilerplate generator with TypeScript, MongoDB, and best practices**

Create production-ready Express.js applications with a single command. Perfect for developers who want to skip the boilerplate setup and focus on building features.

[![npm version](https://badge.fury.io/js/nukta-express.svg)](https://badge.fury.io/js/nukta-express)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)

## ✨ Features

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
- 🎨 **Developer Friendly** - Beautiful CLI interface with clear prompts and visual feedback
- 🔧 **Flexible Configuration** - Git initialization disabled by default for better workflow control

## 📦 Installation

### Global Installation

You can install the CLI globally using any of these package managers:

#### Using npm

```bash
npm install -g nukta-express
```

#### Using yarn

```bash
yarn global add nukta-express
```

#### Using pnpm

```bash
pnpm add -g nukta-express
```

### Verify Installation

After installation, verify that the CLI is working:

```bash
nukta-express --version
nukta-express --help
```

## 🚀 Quick Start

### Basic Usage

```bash
# Create a new project with default settings
nukta-express create my-api

# Create with specific template
nukta-express create my-api --template auth

# Skip all prompts and use defaults
nukta-express create my-api --yes
```

### Advanced Usage

```bash
# Create project with git initialization (disabled by default)
nukta-express create my-api --git

# Create project without installing dependencies
nukta-express create my-api --no-install

# Combine multiple options
nukta-express create my-api --template basic --yes --git
```

## 📋 Available Templates

### 🎯 Basic Template

Minimal Express.js setup with TypeScript and MongoDB.

```bash
nukta-express create my-api --template basic
```

**Perfect for:**

- Simple APIs
- Learning Express.js with TypeScript
- Quick prototypes

**Includes:**

- ✅ Express.js with TypeScript
- ✅ MongoDB connection with Mongoose
- ✅ Basic error handling
- ✅ Health check endpoint
- ✅ Environment configuration
- ✅ Basic project structure

### 🔐 Auth Template

Express.js with authentication middleware and user management.

```bash
nukta-express create my-api --template auth
```

**Perfect for:**

- APIs requiring user authentication
- User management systems
- Protected routes

**Includes:**

- ✅ Everything from Basic template
- ✅ JWT authentication system
- ✅ User model and routes
- ✅ Password hashing with bcrypt
- ✅ Protected route middleware
- ✅ Login/Register endpoints

### 🚀 Full Template (Default)

Complete setup with all features and best practices.

```bash
nukta-express create my-api --template full
```

**Perfect for:**

- Production applications
- Enterprise projects
- Full-featured APIs

**Includes:**

- ✅ Everything from Auth template
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Security headers (Helmet)
- ✅ Request validation (Joi)
- ✅ Testing setup (Jest)
- ✅ Docker configuration
- ✅ Code quality tools (ESLint, Prettier)
- ✅ Comprehensive error handling
- ✅ Logging system

## 🛠️ Command Options

```bash
nukta-express create <project-name> [options]

Arguments:
  project-name              Name of the project to create

Options:
  -t, --template <template>  Choose template (basic, auth, full) [default: full]
  -y, --yes                  Skip prompts and use defaults
  --git                      Initialize git repository (disabled by default)
  --no-install               Skip dependency installation
  -h, --help                 Display help for command
  -V, --version              Display version number

Examples:
  nukta-express create my-api
  nukta-express create my-api --template auth
  nukta-express create my-api --yes --git
```

## 📁 Generated Project Structure

```
my-api/
├── src/
│   ├── app/
│   │   ├── config/              # Configuration files
│   │   ├── middlewares/         # Express middlewares
│   │   │   ├── authentication.ts
│   │   │   ├── error-handler.ts
│   │   │   ├── not-found.ts
│   │   │   ├── cors.ts
│   │   │   ├── rate-limit.ts
│   │   │   └── security.ts
│   │   ├── modules/             # Feature modules
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.route.ts
│   │   │   │   └── auth.type.ts
│   │   │   └── user/
│   │   │       ├── user.model.ts
│   │   │       └── user.type.ts
│   │   ├── routes/              # Route definitions
│   │   │   └── index.ts
│   │   └── shared/              # Shared utilities
│   │       ├── validation.ts
│   │       ├── response.ts
│   │       └── database.ts
│   ├── @types/                  # TypeScript type definitions
│   │   └── index.d.ts
│   ├── app.ts                   # Express app configuration
│   └── server.ts               # Server entry point
├── tests/                       # Test files
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore file
├── docker-compose.yml           # Docker Compose configuration
├── Dockerfile                   # Docker configuration
├── jest.config.js              # Jest testing configuration
├── package.json                 # Project dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## ⚙️ Environment Configuration

Copy `.env.example` to `.env` and configure your environment variables:

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

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm start           # Start production server

# Testing
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint        # Run ESLint
npm run format      # Format code with Prettier
npm run lint:fix    # Fix ESLint errors automatically
```

## 🔌 API Endpoints

### Health Check

```http
GET /api/v1/health
```

### Authentication (Auth & Full templates)

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/profile (protected)
```

## 🚀 Getting Started with Generated Project

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git (optional)

### Step-by-Step Setup

1. **Navigate to your project:**

   ```bash
   cd my-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB:**

   ```bash
   # Local MongoDB
   mongod

   # Or use Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Start development server:**

   ```bash
   npm run dev
   ```

6. **Access your API:**
   ```
   http://localhost:5000
   ```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- auth.test.ts
```

## 🐳 Docker Support

### Using Docker Compose (Recommended)

```bash
# Start all services (API + MongoDB)
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

### Manual Docker Build

```bash
# Build the image
docker build -t my-api .

# Run the container
docker run -p 5000:5000 --env-file .env my-api
```

## 📚 Use Cases & Examples

### 1. **Quick API Prototype**

```bash
# Create a basic API for prototyping
nukta-express create prototype-api --template basic --yes
cd prototype-api
npm run dev
```

### 2. **Authentication System**

```bash
# Create an API with authentication
nukta-express create auth-api --template auth
cd auth-api
# Configure JWT secrets in .env
npm run dev
```

### 3. **Production-Ready Application**

```bash
# Create a full-featured API
nukta-express create production-api --template full
cd production-api
# Configure all environment variables
npm run build
npm start
```

### 4. **Microservice Setup**

```bash
# Create multiple services
nukta-express create user-service --template auth
nukta-express create product-service --template basic
nukta-express create order-service --template full
```

## 🔧 Development

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Docker (optional)

### Local Development Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nukta-solutions/nukta-express.git
   cd nukta-express
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build the project:**

   ```bash
   npm run build
   ```

4. **Link globally for testing:**

   ```bash
   npm link
   ```

5. **Test the CLI:**
   ```bash
   nukta-express --help
   nukta-express create test-project --template basic
   ```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create your feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Community

### Getting Help

- 📧 **Email:** support@nuktasolutions.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/nukta-solutions/nukta-express/issues)
- 📚 **Documentation:** [GitHub Wiki](https://github.com/nukta-solutions/nukta-express/wiki)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/nukta-solutions/nukta-express/discussions)

### Common Issues

#### Installation Problems

```bash
# If you get permission errors on Linux/Mac
sudo npm install -g nukta-express

# If npm link doesn't work
npm unlink -g nukta-express
npm install -g nukta-express
```

#### MongoDB Connection Issues

```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # Mac
```

#### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

## 📈 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes and version history.

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- TypeScript team for excellent type safety
- MongoDB team for the powerful database
- All contributors and users of this project

---

<div align="center">

**Made with ❤️ by [Nukta Solutions](https://nuktasolutions.com)**

[![Nukta Solutions](https://img.shields.io/badge/Nukta-Solutions-blue?style=for-the-badge&logo=github)](https://nuktasolutions.com)

_If this CLI helps you build faster, consider giving us a ⭐ on GitHub!_

</div>
