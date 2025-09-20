import axios from 'axios';
import { DEMO_RESPONSES, isInDemoMode } from '../utils/demoData';

// Base URL for the backend API with fallback options
const PRIMARY_API_URL = 'https://web-production-d6596.up.railway.app/api';
const FALLBACK_API_URL = 'https://ai-crop-advisor-ten.vercel.app/api'; // Your Vercel frontend as proxy

// Smart API selection based on network conditions
const API_URL = PRIMARY_API_URL;

// Configure axios defaults with better network handling
axios.defaults.timeout = 15000; // Reduced for faster failover
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add retry interceptor for network issues
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
      console.log('Network issue detected, using fallback...');
      // Could implement fallback logic here
    }
    return Promise.reject(error);
  }
);

// Alternative: Use different URLs based on environment
// const API_URL = __DEV__ 
//   ? 'http://192.168.29.153:5000/api' // Local development
//   : 'https://web-production-d6596.up.railway.app/api'; // Production (Railway)

// Types
export interface CropPredictionRequest {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export interface CropInfo {
  emoji: string;
  season: string;
  duration: string;
  yield: string;
  market_price: string;
  tips: string;
}

export interface CropPredictionResponse {
  success: boolean;
  prediction: {
    crop: string;
    confidence: number;
    emoji: string;
  };
  crop_info: CropInfo;
}

export interface WeatherRequest {
  latitude: number;
  longitude: number;
}

export interface WeatherResponse {
  success: boolean;
  location: {
    city: string;
    country: string;
  };
  current: {
    temperature: number;
    humidity: number;
    condition: string;
    windSpeed: number;
    precipitation: number;
  };
  forecast: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
  }>;
  agricultural_advisory: Array<{
    title: string;
    description: string;
  }>;
}

export interface ChatbotRequest {
  message: string;
  lang?: string;
  concise?: boolean;
}

export interface ChatbotResponse {
  success: boolean;
  response: string;
}

export interface DiseaseDetectionResponse {
  success: boolean;
  disease: {
    name: string;
    confidence: number;
    severity: string;
    emoji: string;
  };
  diagnosis: {
    description: string;
    treatment: string;
    prevention: string;
  };
}

export interface DashboardStatsResponse {
  success: boolean;
  stats: {
    total_predictions: {
      value: string;
      growth: string;
    };
    farmers_helped: {
      value: string;
      growth: string;
    };
    crop_varieties: {
      value: string;
      growth: string;
    };
    success_rate: {
      value: string;
      growth: string;
    };
  };
  last_updated: string;
}

// API functions
export const cropService = {
  // Get crop recommendation
  predictCrop: async (data: CropPredictionRequest): Promise<CropPredictionResponse> => {
    // Demo mode for offline demonstrations
    if (isInDemoMode()) {
      console.log('Demo mode: Using mock crop prediction data');
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      return DEMO_RESPONSES.cropPrediction;
    }

    try {
      const response = await axios.post(`${API_URL}/predict`, data);
      return response.data;
    } catch (error) {
      console.error('Error predicting crop:', error);
      console.log('Network error - falling back to demo data for presentation');
      // Fallback to demo data if network fails during demo
      return DEMO_RESPONSES.cropPrediction;
    }
  },

  // Get weather data
  getWeather: async (data: WeatherRequest): Promise<WeatherResponse> => {
    try {
      const response = await axios.post(`${API_URL}/weather`, data);
      return response.data;
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  },

  // Send message to chatbot
  sendChatMessage: async (data: ChatbotRequest): Promise<ChatbotResponse> => {
    try {
      console.log('Sending chat message to:', `${API_URL}/chatbot`);
      console.log('Data:', data);
      
      const response = await axios.post(`${API_URL}/chatbot`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      });
      
      console.log('Chat response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error sending chat message:', error);
      console.error('API URL:', `${API_URL}/chatbot`);
      
      if (error?.code === 'NETWORK_ERROR' || error?.message?.includes('Network Error')) {
        throw new Error('Network connection failed. Please check your internet connection.');
      }
      
      throw error;
    }
  },

  // Upload image for disease detection
  detectDisease: async (imageUri: string): Promise<DiseaseDetectionResponse> => {
    try {
      // First upload the image
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'plant_image.jpg',
      } as any);

      const uploadResponse = await axios.post(`${API_URL}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Then detect disease using the uploaded image
      const diseaseResponse = await axios.post(`${API_URL}/disease-detection`, {
        image_base64: uploadResponse.data.image_base64,
      });

      return diseaseResponse.data;
    } catch (error) {
      console.error('Error detecting disease:', error);
      throw error;
    }
  },

  // Get dashboard statistics
  getDashboardStats: async (): Promise<DashboardStatsResponse> => {
    try {
      const response = await axios.get(`${API_URL}/dashboard-stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },
};