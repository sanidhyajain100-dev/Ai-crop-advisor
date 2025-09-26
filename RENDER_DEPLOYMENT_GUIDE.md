# Render Deployment Guide for AI Crop Advisor

This guide will help you deploy the AI Crop Advisor application on Render with separate services for the backend API and frontend.

## Prerequisites

1. A Render account (free tier available)
2. Your GitHub repository pushed with all the changes
3. API keys for:
   - Google Gemini AI (`GEMINI_API_KEY`)
   - OpenWeatherMap (`WEATHER_API_KEY`)

## Deployment Options

### Option 1: Using render.yaml (Recommended)

1. **Push your code to GitHub** with the `render.yaml` file in the root directory
2. **Connect to Render**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Select the repository containing your AI Crop Advisor code
3. **Configure Environment Variables**:
   - Render will create both services automatically
   - Go to each service and add the required environment variables

### Option 2: Manual Service Creation

#### Backend Deployment

1. **Create Web Service**:
   - Go to Render Dashboard
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:

```
Name: ai-crop-advisor-backend
Environment: Python
Region: Choose closest to your users
Branch: main (or your default branch)
Root Directory: . (repository root)
Build Command: pip install -r requirements.txt
Start Command: python -m gunicorn --bind 0.0.0.0:$PORT app:app
```

2. **Environment Variables** (Add in Render dashboard):
```
GEMINI_API_KEY=your_actual_gemini_api_key
WEATHER_API_KEY=your_actual_weather_api_key
PYTHON_VERSION=3.11.7
```

3. **Advanced Settings**:
   - Health Check Path: `/`
   - Auto-Deploy: Yes

#### Frontend Deployment

1. **Create Static Site**:
   - Go to Render Dashboard
   - Click "New" → "Static Site"
   - Connect your GitHub repository
   - Configure the site:

```
Name: ai-crop-advisor-frontend
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: frontend/dist
```

2. **Environment Variables**:
```
VITE_API_URL=https://ai-crop-advisor-backend.onrender.com
```

Note: Replace `ai-crop-advisor-backend` with your actual backend service name if different.

3. **Redirects/Rewrites**:
   - Add this rule for SPA routing:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`

## Post-Deployment Steps

1. **Test Backend**:
   - Visit your backend URL: `https://your-backend-name.onrender.com`
   - You should see: `{"message": "AI Crop Advisor Running", "status": "OK", ...}`
   - Test API endpoints:
     - `GET /api/test-keys` - Check if API keys are working
     - `POST /api/predict` - Test crop prediction
     - `POST /api/chatbot` - Test AI chatbot

2. **Test Frontend**:
   - Visit your frontend URL: `https://your-frontend-name.onrender.com`
   - Test all features:
     - Crop prediction form
     - Weather integration
     - AI chatbot
     - Disease detection

3. **Verify Integration**:
   - Ensure frontend can communicate with backend
   - Check browser console for any CORS errors
   - Test all API calls from the frontend

## Troubleshooting

### Common Issues

1. **"ModuleNotFoundError: No module named 'app'" Error**:
   - Ensure Root Directory is set to `.` (repository root)
   - Use start command: `python -m gunicorn --bind 0.0.0.0:$PORT app:app`
   - Verify `app.py` is in the repository root, not in a subdirectory
   - Check that the repository structure is correct

2. **Build Failures**:
   - Check build logs in Render dashboard
   - Ensure all dependencies are in `requirements.txt` and `package.json`
   - Verify Python version compatibility

2. **API Key Issues**:
   - Ensure environment variables are set correctly
   - Check that keys have proper permissions
   - Test keys using `/api/test-keys` endpoint

3. **CORS Errors**:
   - Backend already has CORS enabled globally
   - If issues persist, check the frontend's `VITE_API_URL`

4. **Frontend Build Issues**:
   - Ensure Node.js version compatibility
   - Check that all frontend dependencies are installed
   - Verify build output in `dist` directory

### Performance Optimization

1. **Free Tier Limitations**:
   - Services may sleep after 15 minutes of inactivity
   - First request after sleep may be slow (cold start)
   - Consider upgrading to paid plans for production use

2. **Monitoring**:
   - Use Render's built-in monitoring
   - Check service logs regularly
   - Set up alerts for service failures

## Environment Variables Reference

### Backend Service
```
GEMINI_API_KEY=your_gemini_api_key_here
WEATHER_API_KEY=your_weather_api_key_here
PYTHON_VERSION=3.11.7
```

### Frontend Service
```
VITE_API_URL=https://your-backend-service.onrender.com
```

## File Structure for Render

```
ai-crop-advisor/
├── render.yaml                 # Render configuration (optional)
├── requirements.txt            # Python dependencies
├── runtime.txt                 # Python version
├── app.py                      # Flask application
├── wsgi.py                     # WSGI entry point
├── build.sh                    # Backend build script
├── .env.render                 # Environment variables template
├── frontend/
│   ├── package.json           # Node.js dependencies
│   ├── vite.config.ts         # Vite configuration
│   ├── build.sh               # Frontend build script
│   ├── .env.production        # Production environment
│   └── dist/                  # Build output (generated)
└── mobile-app/               # Not deployed to Render
```

## Support

If you encounter issues:
1. Check Render's documentation: https://render.com/docs
2. Review service logs in the Render dashboard
3. Test API endpoints individually
4. Verify environment variables are set correctly

## Security Notes

- Never commit API keys to your repository
- Use Render's environment variables for all secrets
- Regularly rotate your API keys
- Monitor usage of your external APIs (Gemini, OpenWeatherMap)
