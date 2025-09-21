export interface StatCard {
  title: string;
  value: string;
  percentage: string;
  icon: string;
  color: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  status: 'Available' | 'Coming Soon';
  icon: string;
  screen?: string;
}

export const DEFAULT_STATS: StatCard[] = [
  {
    title: 'Total Predictions',
    value: '12,500+',
    percentage: '+15%',
    icon: 'chart-line',
    color: '#4CAF50',
  },
  {
    title: 'Farmers Helped',
    value: '3,240',
    percentage: '+8%',
    icon: 'account-group',
    color: '#FF9800',
  },
  {
    title: 'Crop Varieties',
    value: '13',
    percentage: '+22%',
    icon: 'leaf',
    color: '#2196F3',
  },
  {
    title: 'Success Rate',
    value: '95.2%',
    percentage: '+5%',
    icon: 'check-circle',
    color: '#9C27B0',
  },
];

export const FEATURES: FeatureCard[] = [
  {
    title: 'Smart Crop Recommendations',
    description: 'AI-powered suggestions based on soil, weather, and market conditions',
    status: 'Available',
    icon: 'brain',
    screen: 'CropRecommendation',
  },
  {
    title: 'Disease Detection',
    description: 'Upload plant images for instant disease identification and treatment',
    status: 'Available',
    icon: 'camera-plus',
    screen: 'DiseaseDetection',
  },
  {
    title: 'Weather Integration',
    description: 'Real-time weather data for optimal farming decisions',
    status: 'Available',
    icon: 'weather-cloudy',
    screen: 'Weather',
  },
  {
    title: 'Crop Calendar',
    description: 'Track planting and harvesting schedules for different crops',
    status: 'Available',
    icon: 'calendar-month',
    screen: 'CropCalendar',
  },
  {
    title: 'Farm Assistant',
    description: 'Get personalized farming advice and best practices',
    status: 'Available',
    icon: 'robot',
    screen: 'FarmAssistant',
  },
  {
    title: 'Community Forum',
    description: 'Connect with other farmers and share experiences',
    status: 'Coming Soon',
    icon: 'forum',
  },
];
