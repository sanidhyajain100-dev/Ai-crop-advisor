import axios from 'axios';

// Base URL for the backend API
// Use different URLs based on environment
// 10.0.2.2 is for Android emulator, 127.0.0.1 or localhost is for web/local testing
// For web preview, we need to use the actual IP address visible in the Flask logs
const API_URL = 'http://192.168.29.153:5000/api'; // Using the actual IP address from Flask logs

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
    try {
      const response = await axios.post(`${API_URL}/predict`, data);
      return response.data;
    } catch (error) {
      console.error('Error predicting crop:', error);
      throw error;
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
      const response = await axios.post(`${API_URL}/chatbot`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error sending chat message:', error);
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