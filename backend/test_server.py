#!/usr/bin/env python3
"""
Simple test server to diagnose mobile app connectivity issues.
Run this to test if the mobile app can connect to a local server.
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import base64

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'Test Server Running',
        'status': 'OK',
        'server': 'Local Test Server'
    })

@app.route('/api/dashboard-stats', methods=['GET'])
def dashboard_stats():
    return jsonify({
        'success': True,
        'stats': {
            'total_predictions': {'value': '100+', 'growth': '+10%'},
            'farmers_helped': {'value': '50', 'growth': '+5%'},
            'crop_varieties': {'value': '5', 'growth': '+0%'},
            'success_rate': {'value': '95%', 'growth': '+2%'}
        },
        'last_updated': '2025-09-21T17:42:00Z',
        'server': 'Local Test Server'
    })

@app.route('/api/upload-image', methods=['POST'])
def upload_image():
    print("Received image upload request")
    print("Headers:", dict(request.headers))
    
    if 'image' not in request.files:
        return jsonify({'success': False, 'error': 'No image provided'}), 400
    
    file = request.files['image']
    print(f"File received: {file.filename}, Content-Type: {file.content_type}")
    
    # Read and encode the image
    img_bytes = file.read()
    img_b64 = base64.b64encode(img_bytes).decode('utf-8')
    
    print(f"Image encoded successfully, size: {len(img_b64)} characters")
    
    return jsonify({
        'success': True,
        'image_base64': img_b64,
        'server': 'Local Test Server'
    })

@app.route('/api/disease-detection', methods=['POST'])
def disease_detect():
    print("Received disease detection request")
    data = request.json
    
    if not data or 'image_base64' not in data:
        return jsonify({'success': False, 'error': 'No image data'}), 400
    
    print(f"Image data received, size: {len(data['image_base64'])} characters")
    
    # Mock response
    return jsonify({
        'success': True,
        'disease': {
            'name': 'Test Disease Detection',
            'confidence': 0.85,
            'severity': 'Low',
            'emoji': '🧪'
        },
        'diagnosis': {
            'description': 'This is a test response from the local server.',
            'treatment': 'No treatment needed - this is just a test.',
            'prevention': 'This is a test server response.'
        },
        'server': 'Local Test Server'
    })

if __name__ == '__main__':
    print("Starting test server...")
    print("This server will help diagnose mobile app connectivity issues.")
    print("Access URLs:")
    print("  - http://localhost:5000")
    print("  - http://10.0.2.2:5000 (Android emulator)")
    print("  - http://127.0.0.1:5000")
    print("\nPress Ctrl+C to stop the server")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
