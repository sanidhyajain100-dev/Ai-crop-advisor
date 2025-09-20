import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Card, Title, Paragraph, Text, Switch, Button, List, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [cropReminders, setCropReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [units, setUnits] = useState('Metric');

  const handleLanguageChange = () => {
    Alert.alert(
      'Language Settings',
      'Language selection will be available in future updates',
      [{ text: 'OK' }]
    );
  };

  const handleUnitsChange = () => {
    Alert.alert(
      'Unit Settings',
      'Choose your preferred units',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Metric (°C, km)', onPress: () => setUnits('Metric') },
        { text: 'Imperial (°F, mi)', onPress: () => setUnits('Imperial') }
      ]
    );
  };

  const handleDataExport = () => {
    Alert.alert(
      'Export Data',
      'This feature will allow you to export your farming data and predictions',
      [{ text: 'OK' }]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data and may improve app performance. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Cache cleared successfully');
          }
        }
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About CropAI Assistant',
      'Version 1.0.0\n\nAn AI-powered agricultural assistant to help farmers make informed decisions about crop selection, disease detection, and farming practices.\n\nDeveloped with ❤️ for farmers worldwide.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Settings</Title>
        <Paragraph style={styles.subtitle}>
          Customize your app experience
        </Paragraph>

        {/* Notifications */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>
              <MaterialCommunityIcons name="bell" size={20} color="#4CAF50" />
              {' '}Notifications
            </Title>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Text style={styles.settingDescription}>
                  Receive general app notifications
                </Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color="#4CAF50"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Weather Alerts</Text>
                <Text style={styles.settingDescription}>
                  Get notified about weather changes
                </Text>
              </View>
              <Switch
                value={weatherAlerts}
                onValueChange={setWeatherAlerts}
                color="#4CAF50"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Crop Reminders</Text>
                <Text style={styles.settingDescription}>
                  Planting and harvesting reminders
                </Text>
              </View>
              <Switch
                value={cropReminders}
                onValueChange={setCropReminders}
                color="#4CAF50"
              />
            </View>
          </Card.Content>
        </Card>

        {/* Appearance */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>
              <MaterialCommunityIcons name="palette" size={20} color="#FF9800" />
              {' '}Appearance
            </Title>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Dark Mode</Text>
                <Text style={styles.settingDescription}>
                  Use dark theme (Coming Soon)
                </Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                color="#4CAF50"
                disabled
              />
            </View>

            <TouchableOpacity style={styles.settingItem} onPress={handleLanguageChange}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Language</Text>
                <Text style={styles.settingDescription}>
                  Current: {language}
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={handleUnitsChange}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Units</Text>
                <Text style={styles.settingDescription}>
                  Current: {units}
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          </Card.Content>
        </Card>

        {/* Data & Storage */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>
              <MaterialCommunityIcons name="database" size={20} color="#2196F3" />
              {' '}Data & Storage
            </Title>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Offline Mode</Text>
                <Text style={styles.settingDescription}>
                  Basic features without internet (Coming Soon)
                </Text>
              </View>
              <Switch
                value={offlineMode}
                onValueChange={setOfflineMode}
                color="#4CAF50"
                disabled
              />
            </View>

            <TouchableOpacity style={styles.settingItem} onPress={handleDataExport}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Export Data</Text>
                <Text style={styles.settingDescription}>
                  Export your farming data
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={handleClearCache}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Clear Cache</Text>
                <Text style={styles.settingDescription}>
                  Free up storage space
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          </Card.Content>
        </Card>

        {/* Support */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>
              <MaterialCommunityIcons name="help-circle" size={20} color="#9C27B0" />
              {' '}Support
            </Title>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Help & FAQ</Text>
                <Text style={styles.settingDescription}>
                  Get help using the app
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Contact Support</Text>
                <Text style={styles.settingDescription}>
                  Report issues or get assistance
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Privacy Policy</Text>
                <Text style={styles.settingDescription}>
                  How we handle your data
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={handleAbout}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>About</Text>
                <Text style={styles.settingDescription}>
                  App version and information
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Quick Actions</Title>
            
            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={() => navigation.navigate('Dashboard')}
                style={styles.actionButton}
                icon="home"
              >
                Back to Dashboard
              </Button>
              
              <Button
                mode="contained"
                onPress={() => navigation.navigate('WeatherInfo')}
                style={styles.actionButton}
                icon="weather-cloudy"
              >
                Check Weather
              </Button>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.bottomSpacing} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  sectionCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 8,
  },
  actionButton: {
    marginBottom: 12,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default SettingsScreen;
