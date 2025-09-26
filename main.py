#!/usr/bin/env python3
"""
Main entry point for the AI Crop Advisor Flask application.
This file ensures the app can be found regardless of the directory structure.
"""

import os
import sys

# Ensure we can import from the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

def main():
    """Main function to start the Flask app."""
    try:
        # Import the Flask app
        from app import app
        
        # Get port from environment or default to 5000
        port = int(os.environ.get('PORT', 5000))
        
        print(f"Starting AI Crop Advisor on port {port}")
        print(f"Current directory: {os.getcwd()}")
        
        # Run the app
        app.run(host='0.0.0.0', port=port, debug=False)
        
    except ImportError as e:
        print(f"Error importing app: {e}")
        print(f"Current directory: {os.getcwd()}")
        print(f"Files in directory: {os.listdir('.')}")
        sys.exit(1)
    except Exception as e:
        print(f"Error starting app: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
