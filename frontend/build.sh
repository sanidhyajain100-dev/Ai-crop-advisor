#!/bin/bash

# Frontend build script for Render
echo "Building frontend for Render..."

# Install dependencies
echo "Installing npm dependencies..."
npm install

# Build the application
echo "Building Vite application..."
npm run build

echo "Frontend build completed successfully!"
echo "Build output is in the 'dist' directory"
