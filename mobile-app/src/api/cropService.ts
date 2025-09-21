import axios from 'axios';
import { Platform } from 'react-native';

// Base URL for the backend API
// Use Railway production URL for both development and production
const RAILWAY_API_URL = 'https://web-production-af45d.up.railway.app/api';
const LOCAL_API_URL = 'http://10.0.2.2:5000/api'; // Android emulator localhost
const LOCALHOST_API_URL = 'http://localhost:5000/api'; // iOS simulator

// Try Railway first, fallback to local if needed
const API_URL = RAILWAY_API_URL;

console.log('Using API URL:', API_URL);
console.log('Platform:', Platform.OS);

// Network connectivity test function
const testConnectivity = async (url: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${url}/dashboard-stats`, {
      timeout: 5000,
    });
    return response.status === 200;
  } catch (error) {
    console.log(`Connectivity test failed for ${url}:`, error);
    return false;
  }
};

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

// Get the best available API URL
export const getBestApiUrl = async (): Promise<string> => {
  console.log('Testing connectivity to find best API URL...');
  
  // Test Railway first
  if (await testConnectivity(RAILWAY_API_URL)) {
    console.log('Railway API is available');
    return RAILWAY_API_URL;
  }
  
  // Test local APIs as fallback
  const localUrl = Platform.OS === 'android' ? LOCAL_API_URL : LOCALHOST_API_URL;
  if (await testConnectivity(localUrl)) {
    console.log('Local API is available');
    return localUrl;
  }
  
  console.log('No API available, defaulting to Railway');
  return RAILWAY_API_URL; // Default fallback
};

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

  // Upload image for disease detection with fallback mechanism
  detectDisease: async (imageUri: string): Promise<DiseaseDetectionResponse> => {
    const tryDetectWithUrl = async (apiUrl: string): Promise<DiseaseDetectionResponse> => {
      console.log('Starting disease detection for image:', imageUri);
      console.log('Using API URL:', apiUrl);
      
      // Create FormData for React Native
      const formData = new FormData();
      
      // For React Native, we need to handle the image differently
      const imageFile = {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'plant_image.jpg',
      };
      
      // Append the image to FormData
      formData.append('image', imageFile as any);

      console.log('Uploading image to:', `${apiUrl}/upload-image`);
      
      // First upload the image
      const uploadResponse = await axios.post(`${apiUrl}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 15000, // Reduced timeout for faster fallback
      });

      console.log('Image upload response:', uploadResponse.data);

      if (!uploadResponse.data.success || !uploadResponse.data.image_base64) {
        throw new Error('Failed to upload image or get base64 data');
      }

      console.log('Sending to disease detection endpoint');
      
      // Then detect disease using the uploaded image
      const diseaseResponse = await axios.post(`${apiUrl}/disease-detection`, {
        image_base64: uploadResponse.data.image_base64,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000, // Reduced timeout for faster fallback
      });

      console.log('Disease detection response:', diseaseResponse.data);

      if (!diseaseResponse.data.success) {
        throw new Error('Disease detection failed');
      }

      return diseaseResponse.data;
    };

    // Retry mechanism with exponential backoff
    const maxRetries = 2;
    let lastError: any;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt + 1}/${maxRetries + 1} - Trying Railway API`);
        return await tryDetectWithUrl(RAILWAY_API_URL);
      } catch (error) {
        lastError = error;
        console.warn(`Railway API attempt ${attempt + 1} failed:`, error);
        
        if (attempt < maxRetries) {
          // Wait before retry (exponential backoff)
          const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s...
          console.log(`Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    // Try local API as final fallback (for development)
    try {
      console.log('Trying local API as fallback...');
      const localUrl = Platform.OS === 'android' ? LOCAL_API_URL : LOCALHOST_API_URL;
      return await tryDetectWithUrl(localUrl);
    } catch (localError) {
      console.error('Local API also failed:', localError);
      
      // Provide more specific error information based on the last Railway error
      if (axios.isAxiosError(lastError)) {
        if (lastError.response) {
          console.error('Response error:', lastError.response.status, lastError.response.data);
          throw new Error(`Server error: ${lastError.response.status} - ${lastError.response.data?.error || 'Unknown error'}`);
        } else if (lastError.request) {
          console.error('Request error:', lastError.request);
          throw new Error('Network error: Unable to reach server. Please check your internet connection and try again.');
        } else {
          console.error('Setup error:', lastError.message);
          throw new Error(`Request setup error: ${lastError.message}`);
        }
      }
      
      throw new Error('Unable to connect to any server after multiple attempts. Please check your internet connection and try again.');
    }
  },

  // Get dashboard statistics
  getDashboardStats: async (): Promise<DashboardStatsResponse> => {
    try {
      const response = await axios.get(`${API_URL}/dashboard-stats`, {
        timeout: 8000, // 8 second timeout
      });
      return response.data;
    } catch (error) {
      console.log('Dashboard stats unavailable, using fallback data');
      throw error;
    }
  },
};