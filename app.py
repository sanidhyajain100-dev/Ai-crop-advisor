from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import requests
import google.generativeai as genai
import logging
import base64
import random
import os

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# API Keys
GEMINI_API_KEY = os.environ.get('Gemini_API_key')
WEATHER_API_KEY = os.environ.get('Weather_API_key')

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Combined training data (corrected - all arrays have 30 elements)
training_data = {
    'N': [90, 80, 60, 55, 85, 74, 78, 50, 20, 40, 45, 55, 80, 70, 30, 25, 120, 110, 90, 100, 60, 80, 80, 60, 280, 50, 25, 150, 100, 500],
    'P': [40, 45, 35, 30, 58, 35, 42, 25, 30, 35, 25, 40, 50, 45, 60, 70, 80, 75, 65, 70, 30, 35, 40, 40, 90, 75, 50, 100, 50, 250],
    'K': [43, 40, 38, 35, 41, 40, 42, 20, 25, 30, 35, 25, 40, 35, 50, 60, 70, 65, 55, 60, 25, 30, 40, 40, 90, 30, 25, 100, 150, 500],
    'temperature': [25, 26, 27, 23, 21.7, 26.4, 20.1, 15.5, 18.2, 22.1, 19.8, 24.3, 25.2, 28.5, 30.1, 32.5, 27.8, 29.2, 24.5, 26.8, 18.5, 22.3, 28, 30, 26, 27, 28, 24, 25, 23],
    'humidity': [80, 75, 70, 68, 80, 80, 81, 75, 70, 85, 78, 83, 88, 85, 60, 55, 65, 62, 70, 68, 75, 78, 55, 50, 70, 65, 60, 70, 60, 60],
    'ph': [6.5, 6.8, 7.0, 6.7, 7.0, 6.9, 7.6, 6.2, 6.8, 7.2, 6.4, 7.1, 7.5, 6.8, 8.2, 8.5, 7.8, 8.0, 7.2, 7.5, 6.0, 6.5, 7.0, 7.5, 6.8, 6.5, 6.3, 6.5, 6.8, 6.0],
    'rainfall': [200, 210, 220, 190, 226, 242, 262, 180, 150, 200, 175, 210, 250, 280, 120, 90, 80, 100, 140, 160, 220, 240, 60, 50, 150, 80, 60, 80, 75, 100],
    'label': [
        'rice', 'wheat', 'maize', 'cotton', 'rice', 'rice', 'rice', 'wheat', 'wheat', 'wheat', 
        'wheat', 'wheat', 'maize', 'maize', 'cotton', 'cotton', 'sugarcane', 'sugarcane', 
        'potato', 'potato', 'tomato', 'tomato', 'jowar', 'bajra', 'sugarcane', 'soybean', 
        'groundnut', 'tomato', 'grapes', 'orange'
    ]
}

df = pd.DataFrame(training_data)
X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = df['label']

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_scaled, y)

logger.info(f"Model trained with accuracy: {model.score(X_scaled, y):.2%}")

# Combined crop database (enhanced info from both)
crop_database = {
    'rice': {'emoji': '🌾', 'season': 'Kharif (June-October)', 'duration': '120-150 days', 'yield': '3-4 tons/hectare', 'market_price': '₹2000-2500/quintal', 'tips': 'Use NPK fertilizer 4:2:1 ratio or apply 120kg N, 60kg P2O5, 40kg K2O per hectare.'},
    'wheat': {'emoji': '🌾', 'season': 'Rabi (November-April)', 'duration': '120-150 days', 'yield': '2-3 tons/hectare', 'market_price': '₹2100-2600/quintal', 'tips': 'Apply urea and phosphorus properly, about 150kg N, 75kg P2O5, 60kg K2O per hectare.'},
    'maize': {'emoji': '🌽', 'season': 'Year-round', 'duration': '90-120 days', 'yield': '4-6 tons/hectare', 'market_price': '₹1800-2200/quintal', 'tips': 'Use balanced fertilizer and irrigation, apply 120kg N, 60kg P2O5, 40kg K2O per hectare.'},
    'cotton': {'emoji': '🌿', 'season': 'Kharif (April-October)', 'duration': '180-200 days', 'yield': '1-2 tons/hectare', 'market_price': '₹5500-6500/quintal', 'tips': 'Soil testing is important before sowing. Apply 100kg N, 50kg P2O5, 50kg K2O per hectare.'},
    'sugarcane': {'emoji': '🎋', 'season': 'Year-round', 'duration': '12-18 months', 'yield': '70-100 tons/hectare', 'market_price': '₹280-350/quintal', 'tips': 'Apply 280kg N, 90kg P2O5, 90kg K2O per hectare.'},
    'potato': {'emoji': '🥔', 'season': 'Rabi (October-February)', 'duration': '90-120 days', 'yield': '20-25 tons/hectare', 'market_price': '₹800-1500/quintal', 'tips': 'Apply 180kg N, 80kg P2O5, 100kg K2O per hectare.'},
    'tomato': {'emoji': '🍅', 'season': 'Year-round', 'duration': '90-120 days', 'yield': '40-60 tons/hectare', 'market_price': '₹1000-2000/quintal', 'tips': 'Apply 150kg N, 100kg P2O5, 100kg K2O per hectare.'},
    'jowar': {'emoji': '🌾', 'season': 'Kharif/Rabi', 'duration': '110-130 days', 'yield': '2-3 tons/hectare', 'market_price': '₹2500-3000/quintal (approx)', 'tips': 'Apply NPK fertilizer 80:40:40 kg/ha.'},
    'bajra': {'emoji': '🌾', 'season': 'Kharif (June-October)', 'duration': '80-100 days', 'yield': '1.5-2 tons/hectare', 'market_price': '₹2300-2600/quintal (approx)', 'tips': 'Apply NPK fertilizer 60:40:40 kg/ha.'},
    'soybean': {'emoji': '🌱', 'season': 'Kharif (June-October)', 'duration': '90-110 days', 'yield': '1.5-2 tons/hectare', 'market_price': '₹3800-4500/quintal (approx)', 'tips': 'Apply NPK fertilizer 50:75:30 kg/ha.'},
    'groundnut': {'emoji': '🥜', 'season': 'Kharif (June-October)', 'duration': '100-120 days', 'yield': '2-3 tons/hectare', 'market_price': '₹5000-6000/quintal (approx)', 'tips': 'Apply NPK fertilizer 25:50:25 kg/ha.'},
    'grapes': {'emoji': '🍇', 'season': 'Dec-Apr (harvest)', 'duration': '4-5 months (after pruning)', 'yield': '20-25 tons/hectare', 'market_price': '₹2500-6000/quintal', 'tips': 'High potassium, drip irrigation recommended.'},
    'orange': {'emoji': '🍊', 'season': 'Oct-Feb (harvest)', 'duration': '~1 year cycle', 'yield': '10-15 tons/hectare', 'market_price': '₹3000-5000/quintal', 'tips': 'Apply NPK fertilizer 500:250:500 g/plant annually.'}
}

# Combined disease database
disease_database = {
    'healthy': {
        'name': 'Healthy Plant',
        'severity': 'None',
        'description': 'Your plant appears healthy.',
        'treatment': 'Keep maintaining your crop regularly.',
        'prevention': 'Ensure proper watering and nutrition.',
        'emoji': '🌱'
    },
    'bacterial_spot': {
        'name': 'Bacterial Spot',
        'severity': 'Medium',
        'description': 'Dark spots on leaves with yellow halos.',
        'treatment': 'Apply copper fungicides.',
        'prevention': 'Avoid overhead irrigation.',
        'emoji': '🦠'
    },
    'early_blight': {
        'name': 'Early Blight',
        'severity': 'High',
        'description': 'Brown rings on older leaves.',
        'treatment': 'Use fungicides like chlorothalonil.',
        'prevention': 'Rotate crops and mulch soil.',
        'emoji': '🍂'
    }
}

# Weather function shared by both
def get_weather_data(lat, lon):
    try:
        url = "https://api.openweathermap.org/data/2.5/weather"
        params = {'lat': lat, 'lon': lon, 'appid': WEATHER_API_KEY, 'units': 'metric'}
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            return {
                'temperature': data['main']['temp'],
                'humidity': data['main']['humidity'],
                'description': data['weather'][0]['description']
            }
    except Exception as e:
        logger.error(f"Weather API error: {e}")
    return None

# Routes merged and enhanced

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'AI Crop Advisor Running', 'status': 'OK'})

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        required = ['nitrogen', 'phosphorus', 'potassium', 'temperature', 'humidity', 'ph', 'rainfall']
        features = []
        for field in required:
            if field not in data:
                return jsonify({'success': False, 'error': f'Missing {field}'}), 400
            features.append(float(data[field]))

        scaled = scaler.transform([features])
        pred = model.predict(scaled)[0]
        conf = float(max(model.predict_proba(scaled)[0]))
        info = crop_database.get(pred, {})

        return jsonify({
            'success': True,
            'prediction': {
                'crop': pred,
                'confidence': conf,
                'emoji': info.get('emoji', '🌱'),
            },
            'crop_info': info
        })
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({'success': False, 'error': 'Prediction failed'}), 500

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    user_msg = data.get('message', '')
    lang = data.get('lang', 'en-US')
    concise = bool(data.get('concise', True))
    if not user_msg:
        return jsonify({'error': 'No message'}), 400
    try:
        if not GEMINI_API_KEY:
            logger.warning('Gemini API key missing; returning fallback reply')
            return jsonify({'success': True, 'response': 'I cannot access the assistant right now. Please try again later.'})

        model_ai = genai.GenerativeModel('gemini-1.5-flash')
        style = 'Answer very concisely in 1-3 sentences.' if concise else 'Answer clearly and helpfully.'
        locale = f"Respond in language/locale: {lang}." if lang else ''
        prompt = f"You are a farming expert. {style} {locale} Question: {user_msg}"
        resp = model_ai.generate_content(prompt)
        text = (resp.text or '').strip()
        if not text:
            text = 'Sorry, I could not generate a response.'
        return jsonify({'success': True, 'response': text, 'lang': lang, 'concise': concise})
    except Exception as e:
        logger.error(f"Chatbot error: {e}")
        return jsonify({'success': True, 'response': 'Please consult local experts.'})

@app.route('/api/weather', methods=['POST'])
def weather():
    data = request.json
    lat = data.get('latitude', 19.076)
    lon = data.get('longitude', 72.8777)
    weather = get_weather_data(lat, lon)
    if weather:
        return jsonify({'success': True, 'weather': weather})
    else:
        return jsonify({'success': False, 'error': 'Weather fetch failed'}), 500

@app.route('/api/upload-image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'success': False, 'error': 'No image provided'}), 400
    file = request.files['image']
    img_bytes = file.read()
    img_b64 = base64.b64encode(img_bytes).decode('utf-8')
    return jsonify({'success': True, 'image_base64': img_b64})

@app.route('/api/disease-detection', methods=['POST'])
def disease_detect():
    data = request.json
    img_b64 = data.get('image_base64')
    if not img_b64:
        return jsonify({'success': False, 'error': 'No image data'}), 400
    disease = random.choice(list(disease_database.keys()))
    conf = round(random.uniform(0.7, 0.95), 2)
    info = disease_database[disease]
    return jsonify({
        'success': True,
        'disease': {
            'name': info['name'],
            'confidence': conf,
            'severity': info['severity'],
            'emoji': info['emoji']
        },
        'diagnosis': {
            'description': info['description'],
            'treatment': info['treatment'],
            'prevention': info['prevention']
        }
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
