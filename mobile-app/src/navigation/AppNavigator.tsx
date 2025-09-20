import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import HomeScreen from '../screens/HomeScreen';
import CropRecommendationScreen from '../screens/CropRecommendationScreen';
import DiseaseDetectionScreen from '../screens/DiseaseDetectionScreen';
import WeatherInfoScreen from '../screens/WeatherInfoScreen';
import FarmAssistantScreen from '../screens/FarmAssistantScreen';
import CropCalendarScreen from '../screens/CropCalendarScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CommunityScreen from '../screens/CommunityScreen';

export type RootStackParamList = {
  Dashboard: undefined;
  Home: undefined;
  CropRecommendation: undefined;
  DiseaseDetection: undefined;
  WeatherInfo: undefined;
  FarmAssistant: undefined;
  Chatbot: undefined;
  CropCalendar: undefined;
  Settings: undefined;
  Community: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'AI Crop Advisor' }}
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
        <Stack.Screen 
          name="WeatherInfo" 
          component={WeatherInfoScreen} 
          options={{ title: 'Weather Information' }}
        />
        <Stack.Screen 
          name="FarmAssistant" 
          component={FarmAssistantScreen} 
          options={{ title: 'Farm Assistant' }}
        />
        <Stack.Screen 
          name="Chatbot" 
          component={FarmAssistantScreen} 
          options={{ title: 'AI Assistant' }}
        />
        <Stack.Screen 
          name="CropCalendar" 
          component={CropCalendarScreen} 
          options={{ title: 'Crop Calendar' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: 'Settings' }}
        />
        <Stack.Screen 
          name="Community" 
          component={CommunityScreen} 
          options={{ title: 'Community' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;