# KrishiMitra Mobile App - Complete Guide for Beginners

## Table of Contents
1. [Project Overview](#project-overview)
2. [Setting Up React Native Environment](#setting-up-react-native-environment)
3. [Installing Dependencies](#installing-dependencies)
4. [Understanding Project Structure](#understanding-project-structure)
5. [Code Explanation - Screen by Screen](#code-explanation---screen-by-screen)
6. [Navigation Setup](#navigation-setup)
7. [API Integration](#api-integration)
8. [Styling with React Native Paper](#styling-with-react-native-paper)
9. [Testing on Devices](#testing-on-devices)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

**KrishiMitra Mobile App** is built with **React Native** and **Expo** for cross-platform mobile development. It provides native mobile experience for:

- Crop recommendations with ML predictions
- Plant disease detection via camera
- Real-time weather information
- AI-powered farming assistant
- Crop calendar and scheduling
- Community features (coming soon)
- Multi-language support (English/Hindi)

**Tech Stack:**
- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Screen navigation
- **React Native Paper**: Material Design components
- **Expo Image Picker**: Camera and gallery access
- **Axios**: HTTP client for API calls

---

## Setting Up React Native Environment

### Step 1: Install Prerequisites
```bash
# Install Node.js (16+ required)
# Download from https://nodejs.org/

# Install Expo CLI globally
npm install -g @expo/cli

# Verify installation
expo --version
```

**Why Expo?**:
- **Easier Setup**: No need for Android Studio/Xcode initially
- **Fast Development**: Hot reloading and live updates
- **Built-in APIs**: Camera, location, notifications out of the box
- **Easy Testing**: Expo Go app for testing on real devices

### Step 2: Create Project
```bash
# Navigate to main project directory
cd ai-crop-advisor

# Create mobile app with Expo
npx create-expo-app mobile-app --template

# Navigate to mobile app directory
cd mobile-app
```

### Step 3: Install Expo Development Tools
```bash
# Install Expo development client
npx expo install expo-dev-client

# Install EAS CLI for building
npm install -g @expo/eas-cli
```

---

## Installing Dependencies

### Step 4: Install Navigation Libraries
```bash
# React Navigation v6
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs

# Required dependencies for Expo
npx expo install react-native-screens react-native-safe-area-context
```

### Step 5: Install UI and Utility Libraries
```bash
# Material Design components
npm install react-native-paper

# Vector icons
npx expo install @expo/vector-icons

# Image picker for camera/gallery
npx expo install expo-image-picker

# Location services
npx expo install expo-location

# HTTP client
npm install axios

# Linear gradient
npx expo install expo-linear-gradient

# Status bar
npx expo install expo-status-bar

# Constants
npx expo install expo-constants
```

**Library Explanations**:
- **React Navigation**: Handles screen transitions and navigation
- **React Native Paper**: Google's Material Design components
- **Expo Image Picker**: Access device camera and photo gallery
- **Expo Location**: Get user's GPS coordinates
- **Axios**: Make API calls to backend server

---

## Understanding Project Structure

```
mobile-app/
├── assets/                 # Images, fonts, icons
│   ├── icon.png           # App icon
│   ├── splash-icon.png    # Splash screen
│   └── adaptive-icon.png  # Android adaptive icon
├── src/                   # Source code
│   ├── screens/           # App screens
│   │   ├── DashboardScreen.tsx
│   │   ├── CropRecommendationScreen.tsx
│   │   ├── DiseaseDetectionScreen.tsx
│   │   ├── WeatherInfoScreen.tsx
│   │   ├── ChatbotScreen.tsx
│   │   ├── CropCalendarScreen.tsx
│   │   ├── CommunityScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── components/        # Reusable components
│   │   └── LanguageSelector.tsx
│   ├── navigation/        # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── api/              # API integration
│   │   └── cropService.ts
│   ├── utils/            # Utility functions
│   │   └── translations.ts
│   └── hooks/            # Custom hooks
│       └── useTranslation.ts
├── App.tsx               # Main app component
├── app.json              # Expo configuration
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript config
```

---

## Code Explanation - Screen by Screen

### Main App Component (App.tsx)
```typescript
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <PaperProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
```

**Explanation**:
- **PaperProvider**: Provides Material Design theme to all components
- **AppNavigator**: Handles all screen navigation
- **StatusBar**: Controls status bar appearance

### Navigation Setup (navigation/AppNavigator.tsx)
```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import CropRecommendationScreen from '../screens/CropRecommendationScreen';
import DiseaseDetectionScreen from '../screens/DiseaseDetectionScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{ title: 'KrishiMitra' }}
        />
        <Stack.Screen 
          name="CropRecommendation" 
          component={CropRecommendationScreen}
          options={{ title: 'Crop Recommendation' }}
        />
        <Stack.Screen 
          name="DiseaseDetection" 
          component={DiseaseDetectionScreen}
          options={{ title: 'Disease Detection' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
```

**Key Concepts**:
- **Stack Navigator**: Manages screen stack (push/pop navigation)
- **Screen Options**: Customizes header appearance
- **Navigation Props**: Automatically passed to screen components

### Dashboard Screen (screens/DashboardScreen.tsx)
```typescript
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface StatCard {
  title: string;
  value: string;
  percentage: string;
  icon: string;
  color: string;
}

const DashboardScreen = ({ navigation }: any) => {
  const [stats, setStats] = useState<StatCard[]>([]);

  const defaultStats: StatCard[] = [
    {
      title: 'Total Predictions',
      value: '12,500+',
      percentage: '+15%',
      icon: 'chart-line',
      color: '#4CAF50'
    },
    {
      title: 'Farmers Helped',
      value: '3,240',
      percentage: '+8%',
      icon: 'account-group',
      color: '#FF9800'
    }
  ];

  useEffect(() => {
    setStats(defaultStats);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Welcome to KrishiMitra</Title>
        <Paragraph style={styles.headerSubtitle}>
          Empowering farmers with AI-driven agricultural solutions
        </Paragraph>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <View style={styles.statHeader}>
                <MaterialCommunityIcons 
                  name={stat.icon as any} 
                  size={24} 
                  color={stat.color} 
                />
                <Text style={[styles.statPercentage, { color: stat.color }]}>
                  {stat.percentage}
                </Text>
              </View>
              <Title style={styles.statValue}>{stat.value}</Title>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={styles.featuresContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('CropRecommendation')}
          style={styles.featureButton}
          icon="sprout"
        >
          Get Crop Recommendation
        </Button>
        
        <Button
          mode="contained"
          onPress={() => navigation.navigate('DiseaseDetection')}
          style={styles.featureButton}
          icon="camera-plus"
        >
          Detect Plant Disease
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  statCard: {
    width: '48%',
    marginBottom: 12,
    elevation: 2,
  },
  statContent: {
    paddingVertical: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statPercentage: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
  },
  featuresContainer: {
    padding: 16,
    gap: 12,
  },
  featureButton: {
    marginVertical: 6,
  },
});

export default DashboardScreen;
```

**React Native Concepts**:
- **StyleSheet**: Optimized styling system
- **Flexbox**: Layout system (similar to CSS flexbox)
- **TouchableOpacity**: Touchable wrapper for buttons
- **ScrollView**: Scrollable container
- **Material Community Icons**: Vector icons from Expo

---

## API Integration

### API Service (api/cropService.ts)
```typescript
import axios from 'axios';
import Constants from 'expo-constants';

// Get API URL from app config or use default
const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl || 'https://web-production-af45d.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (error.response?.status === 500) {
      console.error('Server error');
    } else if (error.response?.status === 404) {
      console.error('Endpoint not found');
    }
    
    return Promise.reject(error);
  }
);

export const cropService = {
  // Crop prediction
  predictCrop: async (soilData: any) => {
    try {
      const response = await api.post('/api/predict', soilData);
      return response.data;
    } catch (error) {
      console.error('Crop prediction error:', error);
      throw error;
    }
  },

  // Disease detection
  detectDisease: async (imageUri: string) => {
    try {
      const formData = new FormData();
      
      // Create file object for React Native
      const fileInfo = {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'plant_image.jpg',
      };
      
      formData.append('image', fileInfo as any);
      
      const response = await api.post('/api/disease-detection', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // Longer timeout for image processing
      });
      
      return response.data;
    } catch (error) {
      console.error('Disease detection error:', error);
      throw error;
    }
  },

  // Weather data
  getWeather: async (latitude: number, longitude: number) => {
    try {
      const response = await api.post('/api/weather', {
        latitude,
        longitude,
      });
      return response.data;
    } catch (error) {
      console.error('Weather error:', error);
      throw error;
    }
  },

  // AI Chatbot
  chatWithAI: async (message: string, language: string = 'en-US') => {
    try {
      const response = await api.post('/api/chatbot', {
        message,
        lang: language,
        concise: true,
      });
      return response.data;
    } catch (error) {
      console.error('Chatbot error:', error);
      throw error;
    }
  },

  // Dashboard stats
  getDashboardStats: async () => {
    try {
      const response = await api.get('/api/dashboard-stats');
      return response.data;
    } catch (error) {
      console.error('Dashboard stats error:', error);
      // Return fallback data instead of throwing
      return {
        success: false,
        error: 'Could not fetch stats',
      };
    }
  },
};

export default cropService;
```

**Mobile-Specific Considerations**:
- **FormData**: Different implementation for React Native
- **File Upload**: Uses URI instead of File object
- **Timeout Handling**: Longer timeouts for mobile networks
- **Error Handling**: Graceful degradation for network issues

---

## Multi-Language Support

### Translation System (utils/translations.ts)
```typescript
export interface Translation {
  app: {
    title: string;
    tagline: string;
    welcome: string;
  };
  navigation: {
    dashboard: string;
    weather: string;
    cropPrediction: string;
    diseaseDetection: string;
    aiAssistant: string;
    cropCalendar: string;
    community: string;
    settings: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    submit: string;
    cancel: string;
    reset: string;
  };
}

export const translations: Record<string, Translation> = {
  en: {
    app: {
      title: "KrishiMitra",
      tagline: "Smart farming solutions",
      welcome: "Welcome to KrishiMitra"
    },
    navigation: {
      dashboard: "Dashboard",
      weather: "Weather",
      cropPrediction: "Crop Prediction",
      diseaseDetection: "Disease Detection",
      aiAssistant: "AI Assistant",
      cropCalendar: "Crop Calendar",
      community: "Community",
      settings: "Settings"
    },
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      submit: "Submit",
      cancel: "Cancel",
      reset: "Reset"
    }
  },
  hi: {
    app: {
      title: "कृषिमित्र",
      tagline: "स्मार्ट खेती समाधान",
      welcome: "कृषिमित्र में आपका स्वागत है"
    },
    navigation: {
      dashboard: "डैशबोर्ड",
      weather: "मौसम",
      cropPrediction: "फसल भविष्यवाणी",
      diseaseDetection: "रोग पहचान",
      aiAssistant: "एआई सहायक",
      cropCalendar: "फसल कैलेंडर",
      community: "समुदाय",
      settings: "सेटिंग्स"
    },
    common: {
      loading: "लोड हो रहा है...",
      error: "त्रुटि",
      success: "सफल",
      submit: "जमा करें",
      cancel: "रद्द करें",
      reset: "रीसेट"
    }
  }
};
```

### Translation Hook (hooks/useTranslation.ts)
```typescript
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, Translation } from '../utils/translations';

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('app_language');
      if (savedLanguage && translations[savedLanguage]) {
        setCurrentLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = async (languageCode: string) => {
    try {
      if (translations[languageCode]) {
        setCurrentLanguage(languageCode);
        await AsyncStorage.setItem('app_language', languageCode);
      }
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || fallback || key;
  };

  return {
    t,
    currentLanguage,
    changeLanguage,
    isLoading,
    availableLanguages: Object.keys(translations),
  };
};
```

**Features**:
- **Persistent Storage**: Saves language preference
- **Nested Key Access**: Supports dot notation (app.title)
- **Fallback Support**: Returns fallback or key if translation missing
- **Type Safety**: TypeScript interfaces for translations

---

## Testing on Devices

### Development Testing
```bash
# Start Expo development server
npx expo start

# Options will appear:
# - Press 'a' for Android emulator
# - Press 'i' for iOS simulator
# - Scan QR code with Expo Go app on physical device
```

### Physical Device Testing
1. **Install Expo Go** from App Store/Play Store
2. **Scan QR Code** from terminal or browser
3. **Shake Device** to open developer menu
4. **Enable Fast Refresh** for hot reloading

### Building for Production
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure build
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS (requires Apple Developer account)
eas build --platform ios
```

---

## Troubleshooting

### Common Issues

#### 1. **Metro Bundler Issues**
```bash
# Clear cache and restart
npx expo start --clear

# Or reset Metro cache
npx expo start --reset-cache
```

#### 2. **Image Picker Permissions**
```typescript
// Add to app.json
{
  "expo": {
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to detect plant diseases.",
          "cameraPermission": "The app accesses your camera to take photos of plants."
        }
      ]
    ]
  }
}
```

#### 3. **Network Request Failures**
```typescript
// Check network connectivity
import NetInfo from '@react-native-async-storage/async-storage';

const checkConnection = async () => {
  const state = await NetInfo.fetch();
  console.log('Connection type:', state.type);
  console.log('Is connected?', state.isConnected);
};
```

#### 4. **Android Build Issues**
```bash
# Update Expo CLI
npm install -g @expo/cli@latest

# Clear node modules
rm -rf node_modules
npm install
```

### Performance Optimization

1. **Image Optimization**
```typescript
// Resize images before upload
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const resizeImage = async (uri: string) => {
  const result = await manipulateAsync(
    uri,
    [{ resize: { width: 800 } }],
    { compress: 0.8, format: SaveFormat.JPEG }
  );
  return result.uri;
};
```

2. **Memory Management**
```typescript
// Use FlatList for large lists instead of ScrollView
import { FlatList } from 'react-native';

const renderItem = ({ item }) => <ItemComponent item={item} />;

<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
/>
```

---

## Why We Made These Choices

### **React Native vs Flutter vs Native**
- **React Native**: JavaScript knowledge, code sharing with web, large community
- **Flutter**: Dart language learning curve, newer ecosystem
- **Native**: Separate codebases for iOS/Android, more development time

### **Expo vs React Native CLI**
- **Expo**: Faster development, built-in APIs, easier deployment
- **CLI**: More control, custom native modules, larger app size

### **React Native Paper vs NativeBase**
- **Paper**: Material Design, better TypeScript support, active development
- **NativeBase**: More components but less consistent updates

---

## Next Steps for Learning

1. **Push Notifications**: Implement with Expo Notifications
2. **Offline Storage**: Add SQLite or Realm database
3. **Background Tasks**: Learn Expo TaskManager
4. **Deep Linking**: Handle URL schemes and universal links
5. **Performance Monitoring**: Add Flipper or Reactotron
6. **Testing**: Add Jest and Detox for E2E testing

---

## Conclusion

This mobile app provides a native experience for farmers using modern React Native patterns. It demonstrates:

- **Cross-Platform Development**: Single codebase for iOS and Android
- **Modern React Patterns**: Hooks, TypeScript, custom hooks
- **Native APIs**: Camera, location, file system access
- **Offline Capabilities**: Local storage and graceful degradation
- **Internationalization**: Multi-language support

The architecture is scalable and follows React Native best practices, making it maintainable and performant for production use.

Remember: **Mobile users expect fast, intuitive interfaces**. Always test on real devices and optimize for different screen sizes and network conditions.
