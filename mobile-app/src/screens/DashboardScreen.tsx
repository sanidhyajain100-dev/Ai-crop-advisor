import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, RefreshControl, Animated } from 'react-native';
import { Text, Title, ActivityIndicator } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cropService } from '../api/cropService';
import { StatCard } from '../components/dashboard/StatCard';
import { FeatureCard } from '../components/dashboard/FeatureCard';
import { DEFAULT_STATS, FEATURES, StatCard as StatCardType } from '../constants/dashboard';

type RootStackParamList = {
  Dashboard: undefined;
  CropRecommendation: undefined;
  DiseaseDetection: undefined;
  Weather: undefined;
  CropCalendar: undefined;
  FarmAssistant: undefined;
};

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

interface DashboardScreenProps {
  navigation: DashboardScreenNavigationProp;
}

const { width } = Dimensions.get('window');

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const [stats, setStats] = useState<StatCardType[]>(DEFAULT_STATS);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  const fetchDashboardStats = useCallback(async () => {
    try {
      setRefreshing(true);
      
      // Start animations immediately for better UX
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

      const response = await Promise.race([
        cropService.getDashboardStats(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 10000))
      ]) as any;
      
      if (response?.success) {
        const apiStats: StatCardType[] = [
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
      }
    } catch (error) {
      console.warn('Failed to fetch dashboard stats:', error);
      // Keep default stats on error
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [fadeAnim, slideAnim]);

  useEffect(() => {
    // Initial data load
    const loadData = async () => {
      setLoading(true);
      await fetchDashboardStats();
    };
    
    loadData();
  }, [fetchDashboardStats]);

  const onRefresh = () => {
    fetchDashboardStats();
  };

  const handleFeaturePress = (screen?: string) => {
    if (screen) {
      navigation.navigate(screen as keyof RootStackParamList);
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4CAF50']}
            tintColor="#4CAF50"
          />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Hello, Farmer!
            </Text>
            <Text style={styles.subtitle}>
              Welcome to your dashboard
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Title style={styles.sectionTitle}>
              Overview
            </Title>
            {lastUpdated && (
              <Text style={styles.lastUpdated}>
                Updated at {lastUpdated}
              </Text>
            )}
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4CAF50" />
            </View>
          ) : (
            <Animated.View 
              style={[
                styles.statsContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  percentage={stat.percentage}
                  icon={stat.icon as any}
                  color={stat.color}
                />
              ))}
            </Animated.View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Title style={styles.sectionTitle}>
              Features
            </Title>
          </View>
          
          <View style={styles.featuresGrid}>
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                status={feature.status}
                icon={feature.icon as any}
                onPress={() => feature.screen && handleFeaturePress(feature.screen)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    paddingVertical: 20,
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.9,
    color: 'white',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  lastUpdated: {
    fontSize: 12,
    color: 'rgba(158, 129, 129, 0.8)',
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  }
});

export default React.memo(DashboardScreen);
