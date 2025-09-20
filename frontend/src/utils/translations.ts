// Multi-language support for AI Crop Advisor
export interface Translation {
  // Navigation
  dashboard: string;
  weather: string;
  crops: string;
  detection: string;
  chat: string;
  calendar: string;
  
  // Common
  loading: string;
  error: string;
  success: string;
  submit: string;
  cancel: string;
  reset: string;
  
  // Crop Prediction
  cropRecommendation: string;
  enterSoilData: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  temperature: string;
  humidity: string;
  phValue: string;
  rainfall: string;
  getRecommendation: string;
  recommendedCrop: string;
  confidence: string;
  season: string;
  duration: string;
  expectedYield: string;
  marketPrice: string;
  farmingTips: string;
  
  // Weather
  liveWeather: string;
  windSpeed: string;
  refreshWeather: string;
  
  // AI Chat
  aiAssistant: string;
  typeMessage: string;
  
  // Disease Detection
  diseaseDetection: string;
  uploadPhoto: string;
  chooseImage: string;
  analyzing: string;
  
  // Analytics
  totalPredictions: string;
  farmersHelped: string;
  successRate: string;
  cropVarieties: string;
}

export const translations: Record<string, Translation> = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    weather: "Weather",
    crops: "Crops",
    detection: "Disease Detection",
    chat: "AI Assistant",
    calendar: "Crop Calendar",
    
    // Common
    loading: "Loading...",
    error: "Error",
    success: "Success",
    submit: "Submit",
    cancel: "Cancel",
    reset: "Reset",
    
    // Crop Prediction
    cropRecommendation: "Crop Recommendation",
    enterSoilData: "Enter soil and climate data to get personalized crop recommendations",
    nitrogen: "Nitrogen (N) - kg/hectare",
    phosphorus: "Phosphorus (P) - kg/hectare",
    potassium: "Potassium (K) - kg/hectare",
    temperature: "Temperature (°C)",
    humidity: "Humidity (%)",
    phValue: "pH Value",
    rainfall: "Rainfall (mm)",
    getRecommendation: "Get Recommendation",
    recommendedCrop: "Recommended Crop",
    confidence: "Confidence",
    season: "Season",
    duration: "Duration",
    expectedYield: "Expected Yield",
    marketPrice: "Market Price",
    farmingTips: "Farming Tips",
    
    // Weather
    liveWeather: "Live Weather",
    windSpeed: "Wind Speed",
    refreshWeather: "Refresh",
    
    // AI Chat
    aiAssistant: "AI Assistant",
    typeMessage: "Ask about crops, diseases, weather...",
    
    // Disease Detection
    diseaseDetection: "Disease Detection",
    uploadPhoto: "Upload a photo of your crop for disease analysis",
    chooseImage: "Choose Image",
    analyzing: "Analyzing...",
    
    // Analytics
    totalPredictions: "Total Predictions",
    farmersHelped: "Farmers Helped",
    successRate: "Success Rate",
    cropVarieties: "Crop Varieties"
  },
  
  hi: {
    // Navigation
    dashboard: "डैशबोर्ड",
    weather: "मौसम",
    crops: "फसल",
    detection: "रोग पहचान",
    chat: "AI सहायक",
    calendar: "फसल कैलेंडर",
    
    // Common
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    submit: "जमा करें",
    cancel: "रद्द करें",
    reset: "रीसेट करें",
    
    // Crop Prediction
    cropRecommendation: "फसल सिफारिश",
    enterSoilData: "व्यक्तिगत फसल सिफारिशें प्राप्त करने के लिए मिट्टी और जलवायु डेटा दर्ज करें",
    nitrogen: "नाइट्रोजन (N) - किग्रा/हेक्टेयर",
    phosphorus: "फास्फोरस (P) - किग्रा/हेक्टेयर",
    potassium: "पोटेशियम (K) - किग्रा/हेक्टेयर",
    temperature: "तापमान (°C)",
    humidity: "आर्द्रता (%)",
    phValue: "pH मान",
    rainfall: "वर्षा (मिमी)",
    getRecommendation: "सिफारिश प्राप्त करें",
    recommendedCrop: "सुझाई गई फसल",
    confidence: "विश्वास",
    season: "मौसम",
    duration: "अवधि",
    expectedYield: "अपेक्षित उत्पादन",
    marketPrice: "बाजार मूल्य",
    farmingTips: "खेती के सुझाव",
    
    // Weather
    liveWeather: "लाइव मौसम",
    windSpeed: "हवा की गति",
    refreshWeather: "रिफ्रेश करें",
    
    // AI Chat
    aiAssistant: "AI सहायक",
    typeMessage: "फसल, रोग, मौसम के बारे में पूछें...",
    
    // Disease Detection
    diseaseDetection: "रोग पहचान",
    uploadPhoto: "रोग विश्लेषण के लिए अपनी फसल की तस्वीर अपलोड करें",
    chooseImage: "छवि चुनें",
    analyzing: "विश्लेषण हो रहा है...",
    
    // Analytics
    totalPredictions: "कुल भविष्यवाणियां",
    farmersHelped: "किसानों की मदद की",
    successRate: "सफलता दर",
    cropVarieties: "फसल किस्में"
  }
};

// Language context
import { createContext, useContext } from 'react';

export interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: Translation;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: translations.en
});

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
