@echo off
echo Starting AI Crop Advisor...
echo.
echo Starting Flask backend...
start cmd /k "cd C:\Users\HP\ai-crop-advisor && python app.py"
echo.
echo Starting Expo mobile app...
start "Expo Mobile App" cmd /k "cd /d C:\Users\HP\ai-crop-advisor\mobile-app && npx expo start -c"
echo.
echo All services started! Access the app at:
echo - Backend API: http://localhost:5000
echo - Mobile App: http://localhost:8081