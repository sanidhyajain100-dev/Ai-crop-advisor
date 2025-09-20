# 🌾 AI Crop Advisor

<div align="center">
  <img src="assets/codehex-logo.png" alt="CODEHEX Team Logo" width="300"/>
  
  ## Smart India Hackathon 2024
  **Problem Statement ID: 25030**  
  **Team: CODEHEX**  
  **Theme: Agriculture & Rural Development**
  
  ---
  
  ### 🚀 An AI-Powered Agricultural Advisory Platform
  
  *Empowering farmers with intelligent crop recommendations, weather insights, and disease detection through cutting-edge AI technology.*
</div>

---

## 🎯 Problem Statement 25030

**Challenge**: Develop an intelligent agricultural advisory system that can help farmers make informed decisions about crop selection, disease management, and optimal farming practices using AI and machine learning technologies.

**Our Solution**: AI Crop Advisor - A comprehensive platform that combines:
- 🤖 **AI-Powered Crop Prediction** using machine learning models
- 🌤️ **Real-time Weather Integration** with agricultural advisories  
- 💬 **Intelligent Chat Assistant** powered by Google Gemini AI
- 🔍 **Disease Detection** through image analysis
- 📱 **Cross-platform Accessibility** (Web + Mobile)

---

## ✨ Key Features

### 🧠 AI & Machine Learning
- **Smart Crop Recommendations** based on soil parameters (N, P, K, pH)
- **Weather-based Advisories** using real-time meteorological data
- **Disease Detection** through plant image analysis
- **Predictive Analytics** for optimal farming decisions

### 🌐 Multi-Platform Support
- **Web Application** - Modern React-based interface
- **Mobile App** - Cross-platform React Native application
- **API-First Architecture** - Scalable backend services

### 🔧 Advanced Technologies
- **Backend**: Flask, Scikit-learn, Google Gemini AI
- **Frontend**: React, TypeScript, Tailwind CSS
- **Mobile**: React Native, Expo
- **AI/ML**: Random Forest, Image Processing, NLP

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd ai-crop-advisor
```

### 2. Backend Setup
```bash
# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Set API keys
set GEMINI_API_KEY=your_gemini_key
set WEATHER_API_KEY=your_weather_key

# Run server
python app.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Mobile App Setup
```bash
cd mobile-app
npm install
npm start
```

### 🎯 One-Click Setup
```bash
# Windows
start-dev.bat

# Linux/Mac
./start-dev.sh
```

---

## 📊 Project Impact

### 🎯 Target Audience
- **Small-scale farmers** seeking crop guidance
- **Agricultural consultants** requiring data-driven insights
- **Government agencies** monitoring agricultural trends
- **Research institutions** studying crop patterns

### 📈 Expected Benefits
- **Increased Crop Yield** through optimized crop selection
- **Reduced Losses** via early disease detection
- **Cost Efficiency** through weather-based planning
- **Knowledge Accessibility** for rural farming communities

---

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Frontend  │    │  Mobile App     │    │   API Clients   │
│   (React/TS)    │    │ (React Native)  │    │   (Third-party) │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴───────────┐
                    │     Flask Backend       │
                    │    (Python/AI/ML)       │
                    └─────────────┬───────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
    ┌─────┴─────┐        ┌───────┴───────┐      ┌──────┴──────┐
    │ ML Models │        │  External APIs │      │  Database   │
    │ (Scikit)  │        │ (Weather/AI)   │      │ (Future)    │
    └───────────┘        └───────────────┘      └─────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite |
| **Mobile** | React Native, Expo, React Navigation |
| **Backend** | Flask, Python 3.8+, Gunicorn |
| **AI/ML** | Scikit-learn, Google Gemini AI, Pandas |
| **APIs** | OpenWeatherMap, Google Generative AI |
| **Deployment** | Heroku, Netlify, Expo EAS |

---

## 📱 Screenshots & Demo

### Web Application
- Modern dashboard with real-time statistics
- Crop prediction interface with ML recommendations
- Weather integration with agricultural advisories
- AI chat assistant for farming queries

### Mobile Application  
- Native mobile experience with Material Design
- Camera integration for disease detection
- GPS-based weather services
- Offline capability for remote areas

---

## 🏆 Team CODEHEX

We are a passionate team of developers and agricultural enthusiasts participating in Smart India Hackathon 2024, committed to leveraging technology for India's agricultural transformation.

### 🎯 Our Mission
To democratize access to intelligent agricultural guidance and empower farmers with AI-driven insights for sustainable and profitable farming.

---

## 📞 Support & Contact

- **Documentation**: [Complete Project Documentation](COMPLETE_PROJECT_DOCUMENTATION.md)
- **Setup Guide**: [Integration README](INTEGRATION_README.md)
- **Issues**: Create GitHub issues for bug reports
- **Contributions**: Pull requests welcome!

---

## 📄 License

This project is developed for Smart India Hackathon 2024 and is open for educational and research purposes.

---

<div align="center">
  
  **🌾 Built with ❤️ by Team CODEHEX for Smart India Hackathon 2024 🇮🇳**
  
  *Problem Statement ID: 25030 | Agriculture & Rural Development*
  
</div>
