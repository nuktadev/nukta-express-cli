# my-api

my-api - Express.js API

## Features

- Express.js with TypeScript
- MongoDB with Mongoose
- Authentication & Authorization
- Request validation
- Error handling middleware
- Logging
- CORS configuration
- Rate limiting
- Security headers

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── app/
│   ├── config/          # Configuration files
│   ├── middlewares/     # Express middlewares
│   ├── modules/         # Feature modules
│   ├── routes/          # Route definitions
│   └── shared/          # Shared utilities
├── @types/              # TypeScript type definitions
├── app.ts              # Express app configuration
└── server.ts           # Server entry point
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `JWT_REFRESH_SECRET` - JWT refresh secret key

## API Documentation

The API will be available at `http://localhost:5000`

## License

MIT
