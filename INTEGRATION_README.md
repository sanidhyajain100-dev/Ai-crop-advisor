# AI Crop Advisor - Frontend & Backend Integration

## 🏆 Smart India Hackathon 2024 - Problem Statement ID: 25030
**Team: CODEHEX | Theme: Agriculture & Rural Development**

## Overview
This project combines a beautiful React frontend with a powerful Flask backend to create a complete AI-powered crop advisory system for Smart India Hackathon 2024. Our solution addresses Problem Statement 25030 by providing farmers with intelligent agricultural guidance through modern web and mobile technologies.

## Features Integrated
- ✅ **AI Chat Assistant** - Connected to your Gemini API
- ✅ **Weather Dashboard** - Real-time weather data from OpenWeatherMap
- ✅ **Disease Detection** - Image upload and analysis
- ✅ **Crop Prediction** - ML model for crop recommendations
- ✅ **Crop Database** - Information about different crops

## Quick Start

### Option 1: Use the Startup Script (Recommended)
```bash
# On Windows
start-dev.bat

# On Linux/Mac
./start-dev.sh
```

### Option 2: Manual Setup

#### 1. Start the Flask Backend
```bash
# In the main directory
python app.py
```
Backend will run on: http://localhost:5000

#### 2. Start the React Frontend
```bash
# In the frontend directory
cd frontend
npm install
npm run dev
```
Frontend will run on: http://localhost:5173

## Project Structure
```
ai-crop-advisor/
├── app.py                          # Flask backend
├── backend/                        # Backend files
├── frontend/                       # React frontend
│   ├── src/
│   │   ├── components/            # UI components
│   │   │   ├── AIChat.tsx        # Connected to /api/chatbot
│   │   │   ├── WeatherCard.tsx   # Connected to /api/weather
│   │   │   ├── DiseaseDetection.tsx # Connected to /api/disease-detection
│   │   │   └── CropPrediction.tsx # Connected to /api/predict
│   │   ├── config/
│   │   │   └── api.ts            # API configuration
│   │   └── lib/
│   │       └── utils.ts          # API helper functions
│   └── package.json
├── start-dev.bat                  # Windows startup script
└── start-dev.sh                   # Linux/Mac startup script
```

## API Endpoints Used
- `POST /api/chatbot` - AI chat responses
- `POST /api/weather` - Weather data
- `POST /api/predict` - Crop recommendations
- `POST /api/upload-image` - Image upload
- `POST /api/disease-detection` - Disease analysis

## Configuration
The frontend automatically connects to your Flask backend at `http://localhost:5000`. If you need to change this:

1. Edit `New folder/src/config/api.ts`
2. Change the `BASE_URL` value
3. Or set environment variable: `VITE_API_URL=your-backend-url`

## Features Working
- **Dashboard**: Overview with statistics and quick actions
- **Weather**: Real-time weather with location input
- **Crops**: Crop prediction form + crop database
- **Disease Detection**: Image upload and AI analysis
- **AI Chat**: Conversational AI assistant
- **Navigation**: Responsive sidebar navigation

## Troubleshooting

### Backend Issues
- Ensure Python dependencies are installed: `pip install -r requirements.txt`
- Check API keys are set in `app.py`
- Verify Flask is running on port 5000

### Frontend Issues
- Install dependencies: `cd frontend && npm install`
- Check if backend is running and accessible
- Look for CORS errors in browser console

### Connection Issues
- Ensure both servers are running
- Check firewall settings
- Verify API endpoints are correct

## Next Steps
1. Test all features by running both servers
2. Customize the UI components as needed
3. Add more crop data to your backend
4. Enhance the AI responses
5. Deploy to production when ready

## Support
If you encounter any issues:
1. Check the browser console for errors
2. Verify both servers are running
3. Test API endpoints directly (e.g., http://localhost:5000/api/test-keys)
4. Check the Flask logs for backend errors
