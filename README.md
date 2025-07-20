# Nukta Express CLI

A high-performance, comprehensive Express.js boilerplate generator with TypeScript, MongoDB, and best practices. Built with efficiency and developer experience in mind.

## 🚀 Features

### Core Features

- **Multiple Templates**: Basic, Auth, and Full templates to suit different project needs
- **TypeScript Support**: Full TypeScript configuration with strict type checking
- **MongoDB Integration**: Mongoose ODM with optimized connection handling
- **Authentication System**: JWT-based authentication with refresh tokens
- **Error Handling**: Comprehensive error handling middleware
- **Validation**: Request validation using Joi
- **Security**: Helmet, CORS, rate limiting, and security headers
- **Testing**: Jest configuration for unit and integration tests
- **Docker Support**: Docker and Docker Compose configurations

### Performance Features

- **Template Caching**: Intelligent caching system for faster project generation
- **Parallel Processing**: Concurrent file generation for improved performance
- **Performance Monitoring**: Built-in metrics tracking and analysis
- **Optimized Templates**: File-based template system using the `templete-app` structure
- **Memory Efficient**: Stream-based operations for large projects

## 📦 Installation

```bash
npm install -g nukta-express-cli
```

## 🎯 Quick Start

### Create a new project

```bash
# Interactive mode (recommended)
nukta-express create my-api

# Quick mode with defaults
nukta-express create my-api --yes

# With specific template
nukta-express create my-api --template auth

# With performance monitoring
nukta-express create my-api --performance
```

### Available Templates

- **Basic**: Minimal Express.js setup with TypeScript
- **Auth**: Express.js with authentication middleware (includes user management)
- **Full**: Complete setup with all features (recommended)

## 🛠️ Commands

### Create Project

```bash
nukta-express create <project-name> [options]
```

**Options:**

- `-t, --template <template>` - Choose template (basic, auth, full)
- `-y, --yes` - Skip prompts and use defaults
- `--git` - Initialize git repository
- `--no-install` - Skip dependency installation
- `--performance` - Show performance statistics

### List Templates

```bash
nukta-express templates
```

### Cache Management

```bash
nukta-express cache --stats    # Show cache statistics
nukta-express cache --clear    # Clear template cache
```

### Performance Metrics

```bash
nukta-express metrics          # Show performance metrics
nukta-express metrics --reset  # Reset all metrics
```

## 📊 Performance Features

### Template Caching

The CLI uses an intelligent caching system that:

- Caches rendered templates for 5 minutes
- Reduces generation time for repeated operations
- Provides cache hit rate statistics

### Parallel Processing

- File generation happens concurrently
- Optimized for multi-core systems
- Reduces total generation time significantly

### Performance Monitoring

Track your CLI usage with built-in metrics:

- Total projects created
- Average generation time
- Cache hit rates
- Template usage statistics

## 🏗️ Project Structure

Generated projects follow the optimized structure from `templete-app`:

```
src/
├── app/
│   ├── config/          # Configuration files
│   ├── constants.ts     # Application constants
│   ├── errors/          # Custom error classes
│   ├── middlewares/     # Express middlewares
│   ├── modules/         # Feature modules
│   │   ├── auth/        # Authentication module
│   │   └── user/        # User module
│   ├── routes/          # Route definitions
│   └── shared/          # Shared utilities
├── @types/              # TypeScript type definitions
├── app.ts               # Express app configuration
└── server.ts            # Server entry point
```

## 🔧 Configuration

### Environment Variables

The CLI generates comprehensive environment configuration:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/your-database

# JWT Configuration
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_SALT_ROUNDS=12
```

## 🚀 Development

### Prerequisites

- Node.js 16+
- MongoDB (for full functionality)
- Git (optional)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📈 Performance Benchmarks

### Generation Times (Average)

- **Basic Template**: ~800ms
- **Auth Template**: ~1200ms
- **Full Template**: ~1800ms

### Cache Performance

- **First Run**: No cache hits
- **Subsequent Runs**: 85-95% cache hit rate
- **Memory Usage**: <50MB for typical projects

## 🔍 Troubleshooting

### Common Issues

**Template not found error**

```bash
# Clear cache and retry
nukta-express cache --clear
nukta-express create my-api
```

**Slow generation**

```bash
# Check performance metrics
nukta-express metrics

# Clear cache if needed
nukta-express cache --clear
```

**Dependency installation fails**

```bash
# Manual installation
cd my-api
npm install
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
git clone https://github.com/nuktadev/nukta-express-cli.git
cd nukta-express-cli
npm install
npm run build
npm link
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📚 [Documentation](https://github.com/nuktadev/nukta-express-cli)
- 🐛 [Issues](https://github.com/nuktadev/nukta-express-cli/issues)
- 💬 [Discussions](https://github.com/nuktadev/nukta-express-cli/discussions)

## 🙏 Acknowledgments

- Built with the optimized `templete-app` structure
- Inspired by modern Express.js best practices
- Performance optimizations based on real-world usage patterns
