#!/bin/bash

echo "🚀 Building nukta-express CLI..."

# Clean previous build
echo "📦 Cleaning previous build..."
rm -rf dist/

# Install dependencies
echo "📥 Installing dependencies..."
npm install

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

# Make the CLI executable
echo "🔧 Making CLI executable..."
chmod +x dist/index.js

# Run tests
echo "🧪 Running tests..."
npm test

echo "✅ Build completed successfully!"
echo "📦 Ready to publish with: npm publish" 