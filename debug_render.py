#!/usr/bin/env python3
"""
Debug script to help diagnose Render deployment issues
"""

import os
import sys
import importlib.util

def debug_render_environment():
    print("=" * 50)
    print("RENDER DEPLOYMENT DEBUG INFORMATION")
    print("=" * 50)
    
    print(f"Current working directory: {os.getcwd()}")
    print(f"Python executable: {sys.executable}")
    print(f"Python version: {sys.version}")
    print(f"Python path:")
    for path in sys.path:
        print(f"  - {path}")
    
    print(f"\nEnvironment variables:")
    for key, value in os.environ.items():
        if key in ['PORT', 'PYTHON_VERSION', 'GEMINI_API_KEY', 'WEATHER_API_KEY']:
            print(f"  {key}: {value if key not in ['GEMINI_API_KEY', 'WEATHER_API_KEY'] else '***HIDDEN***'}")
    
    print(f"\nFiles in current directory:")
    try:
        files = os.listdir('.')
        for file in sorted(files):
            if os.path.isfile(file):
                print(f"  📄 {file}")
            else:
                print(f"  📁 {file}/")
    except Exception as e:
        print(f"  Error listing files: {e}")
    
    print(f"\nLooking for app.py:")
    app_locations = [
        './app.py',
        './backend/app.py',
        './backend/App.py',
        'app.py',
        'backend/app.py',
        'backend/App.py'
    ]
    
    for location in app_locations:
        if os.path.exists(location):
            print(f"  ✅ Found: {location}")
        else:
            print(f"  ❌ Not found: {location}")
    
    print(f"\nTesting imports:")
    try:
        import app
        print("  ✅ Successfully imported 'app' module")
        if hasattr(app, 'app'):
            print("  ✅ Found 'app' Flask instance")
        else:
            print("  ❌ No 'app' Flask instance found")
    except ImportError as e:
        print(f"  ❌ Failed to import 'app': {e}")
    
    try:
        from app import app as flask_app
        print("  ✅ Successfully imported Flask app from app module")
    except ImportError as e:
        print(f"  ❌ Failed to import Flask app: {e}")
    
    print("=" * 50)
    print("END DEBUG INFORMATION")
    print("=" * 50)

if __name__ == "__main__":
    debug_render_environment()
    
    # Try to start the app if possible
    try:
        from app import app
        port = int(os.environ.get('PORT', 5000))
        print(f"\nStarting Flask app on port {port}...")
        app.run(host='0.0.0.0', port=port, debug=False)
    except Exception as e:
        print(f"\nFailed to start Flask app: {e}")
        sys.exit(1)
