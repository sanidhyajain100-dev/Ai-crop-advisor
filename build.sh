#!/bin/bash

# Build script for Render deployment
echo "Starting Render build process..."

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Build completed successfully!"
