#!/bin/bash

# Start script for Render deployment
echo "Starting AI Crop Advisor backend..."
echo "Current directory: $(pwd)"
echo "Contents: $(ls -la)"

# Check if app.py exists
if [ -f "app.py" ]; then
    echo "Found app.py, starting with gunicorn..."
    exec gunicorn --bind 0.0.0.0:$PORT app:app
else
    echo "app.py not found in current directory!"
    echo "Looking for app.py..."
    find . -name "app.py" -type f
    exit 1
fi
