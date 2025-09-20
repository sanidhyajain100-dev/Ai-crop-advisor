import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, RefreshControl, Modal, Animated, Image } from 'react-native';
import { Card, Title, Paragraph, Text, Button, IconButton, ActivityIndicator, Avatar, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cropService } from '../api/cropService';

const { width } = Dimensions.get('window');

interface StatCard {
  title: string;
  value: string;
  percentage: string;
  icon: string;
  color: string;
}

interface FeatureCard {
  title: string;
  description: string;
  status: 'Available' | 'Coming Soon';
  icon: string;
}

const DashboardScreen = ({ navigation }: any) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [stats, setStats] = useState<StatCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  // Default stats as fallback
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
    },
    {
      title: 'Crop Varieties',
      value: '13',
      percentage: '+22%',
      icon: 'leaf',
      color: '#2196F3'
    },
    {
      title: 'Success Rate',
      value: '95.2%',
      percentage: '+5%',
      icon: 'check-circle',
      color: '#9C27B0'
    }
  ];

  const fetchDashboardStats = async () => {
    try {
      console.log('Fetching dashboard stats...');
      // Add timeout to prevent hanging (increased to 15 seconds)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 15000)
      );
      
      const response = await Promise.race([
        cropService.getDashboardStats(),
        timeoutPromise
      ]) as any;
      
      console.log('Dashboard stats response:', response);
      if (response && response.success) {
        const apiStats: StatCard[] = [
          {
            title: 'Total Predictions',
            value: response.stats.total_predictions.value,
            percentage: response.stats.total_predictions.growth,
            icon: 'chart-line',
            color: '#4CAF50'
          },
          {
            title: 'Farmers Helped',
            value: response.stats.farmers_helped.value,
            percentage: response.stats.farmers_helped.growth,
            icon: 'account-group',
            color: '#FF9800'
          },
          {
            title: 'Crop Varieties',
            value: response.stats.crop_varieties.value,
            percentage: response.stats.crop_varieties.growth,
            icon: 'leaf',
            color: '#2196F3'
          },
          {
            title: 'Success Rate',
            value: response.stats.success_rate.value,
            percentage: response.stats.success_rate.growth,
            icon: 'check-circle',
            color: '#9C27B0'
          }
        ];
        setStats(apiStats);
        setLastUpdated(new Date(response.last_updated).toLocaleTimeString());
      } else {
        setStats(defaultStats);
      }
      
      // Animate cards when data loads
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    } catch (error) {
      // Silently handle dashboard stats errors - not critical for app functionality
      console.log('Dashboard stats unavailable, using default values');
      setStats(defaultStats);
      
      // Still animate even with fallback data
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Start with default stats immediately to avoid blank screen
    setStats(defaultStats);
    setLoading(false);
    
    // Animate the default stats
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Try to fetch real stats in background
    fetchDashboardStats();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardStats();
  };

  const features: FeatureCard[] = [
    {
      title: 'Smart Crop Recommendations',
      description: 'AI-powered suggestions based on soil, weather, and market conditions',
      status: 'Available',
      icon: 'brain'
    },
    {
      title: 'Disease Detection',
      description: 'Upload plant images for instant disease identification and treatment',
      status: 'Available',
      icon: 'camera-plus'
    },
    {
      title: 'Weather Integration',
      description: 'Real-time weather data for optimal farming decisions',
      status: 'Available',
      icon: 'weather-cloudy'
    },
    {
      title: 'Voice Assistant',
      description: 'Speak and get farming advice in your local language',
      status: 'Available',
      icon: 'microphone'
    },
    {
      title: 'Offline Mode',
      description: 'Basic predictions and advice without internet connectivity',
      status: 'Coming Soon',
      icon: 'wifi-off'
    },
    {
      title: 'Expert Connect',
      description: 'Direct access to agricultural experts for complex queries',
      status: 'Coming Soon',
      icon: 'account-tie'
    }
  ];

  const quickStartSteps = [
    'Check current weather conditions for your area',
    'Browse crop database for planting recommendations',
    'Upload plant photos for disease detection',
    'Chat with AI assistant for personalized advice'
  ];

  const navigateToFeature = (featureTitle: string) => {
    switch (featureTitle) {
      case 'Smart Crop Recommendations':
        navigation.navigate('CropRecommendation');
        break;
      case 'Disease Detection':
        navigation.navigate('DiseaseDetection');
        break;
      case 'Weather Integration':
        navigation.navigate('WeatherInfo');
        break;
      case 'Voice Assistant':
        navigation.navigate('Chatbot');
        break;
      default:
        // For coming soon features, show a placeholder
        break;
    }
  };

  // Simple inline Sidebar component
  const renderSidebar = () => (
    <Modal
      visible={sidebarVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setSidebarVisible(false)}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.overlayTouch} 
          activeOpacity={1} 
          onPress={() => setSidebarVisible(false)}
        />
        <View style={styles.sidebar}>
          <View style={styles.profileSection}>
            <Avatar.Icon 
              size={60} 
              icon="account" 
              style={styles.avatar}
            />
            <Text style={styles.profileName}>CropAI Assistant</Text>
            <Text style={styles.profileSubtitle}>Smart farming solutions</Text>
          </View>
          <Divider style={styles.divider} />
          
          {[
            { title: 'Dashboard', icon: 'view-dashboard', screen: 'Dashboard' },
            { title: 'Weather', icon: 'weather-cloudy', screen: 'WeatherInfo' },
            { title: 'Crop Prediction', icon: 'sprout', screen: 'CropRecommendation' },
            { title: 'Disease Detection', icon: 'camera-plus', screen: 'DiseaseDetection' },
            { title: 'AI Assistant', icon: 'robot', screen: 'Chatbot' },
            { title: 'Crop Calendar', icon: 'calendar', screen: 'CropCalendar' },
            { title: 'Community', icon: 'account-group', screen: 'Community' },
            { title: 'Settings', icon: 'cog', screen: 'Settings' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                setSidebarVisible(false);
                navigation.navigate(item.screen);
              }}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={24}
                color="#666"
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {renderSidebar()}
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4CAF50']}
            tintColor="#4CAF50"
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => setSidebarVisible(true)}
            style={styles.menuButton}
          >
            <MaterialCommunityIcons name="menu" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Title style={styles.headerTitle}>AI Crop Advisor</Title>
            <Text style={styles.hackathonBadge}>Smart India Hackathon 2025 | Problem ID: 25030</Text>
            <Paragraph style={styles.headerSubtitle}>
              Team CODEHEX - Empowering farmers with AI-driven solutions
            </Paragraph>
            {lastUpdated && (
              <Text style={styles.lastUpdated}>
                Last updated: {lastUpdated}
              </Text>
            )}
          </View>
        </View>

        {/* Statistics Cards */}
        <Animated.View 
          style={[
            styles.statsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {loading ? (
            // Loading state for statistics
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} style={styles.statCard}>
                <Card.Content style={styles.statContent}>
                  <ActivityIndicator size="small" color="#4CAF50" />
                  <Text style={styles.loadingText}>Loading...</Text>
                </Card.Content>
              </Card>
            ))
          ) : (
            stats.map((stat, index) => (
              <Animated.View
                key={index}
                style={{
                  opacity: fadeAnim,
                  transform: [{ 
                    translateY: Animated.add(slideAnim, new Animated.Value(index * 10))
                  }]
                }}
              >
                <Card style={[styles.statCard, { borderLeftColor: stat.color }]}>
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
              </Animated.View>
            ))
          )}
        </Animated.View>

        {/* Platform Features */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Platform Features</Title>
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.featureCard}
                  onPress={() => navigateToFeature(feature.title)}
                  disabled={feature.status === 'Coming Soon'}
                >
                  <View style={styles.featureHeader}>
                    <MaterialCommunityIcons 
                      name={feature.icon as any} 
                      size={24} 
                      color="#4CAF50" 
                    />
                    <View style={[
                      styles.statusBadge, 
                      { backgroundColor: feature.status === 'Available' ? '#4CAF50' : '#FF9800' }
                    ]}>
                      <Text style={styles.statusText}>{feature.status}</Text>
                    </View>
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Quick Start Guide */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Quick Start Guide</Title>
            <View style={styles.quickStartContainer}>
              {quickStartSteps.map((step, index) => (
                <View key={index} style={styles.quickStartStep}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  menuButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  headerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  logoText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  hackathonBadge: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    textShadowColor: 'rgb(255, 255, 255)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontWeight: '500',
  },
  lastUpdated: {
    color: 'rgba(158, 129, 129, 0.8)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  statCard: {
    width: (width - 48) / 2,
    marginBottom: 12,
    borderLeftWidth: 4,
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
  loadingText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  sectionCard: {
    margin: 16,
    elevation: 2,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  quickStartContainer: {
    marginTop: 8,
  },
  quickStartStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 20,
  },
  // Sidebar styles
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouch: {
    flex: 1,
  },
  sidebar: {
    width: width * 0.75,
    maxWidth: 300,
    backgroundColor: 'white',
    paddingTop: 50,
    elevation: 5,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  avatar: {
    marginBottom: 12,
    backgroundColor: '#4CAF50',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  divider: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default DashboardScreen;
