import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Alert } from 'react-native';
import { enableDemoMode, disableDemoMode, isInDemoMode } from '../utils/demoData';

const DemoModeToggle = () => {
  const [isDemoEnabled, setIsDemoEnabled] = useState(isInDemoMode());

  const toggleDemoMode = (value: boolean) => {
    if (value) {
      Alert.alert(
        'Demo Mode',
        'Enable offline demo mode? This will use mock data for all API calls.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Enable',
            onPress: () => {
              enableDemoMode();
              setIsDemoEnabled(true);
              Alert.alert('Demo Mode Enabled', 'App will now use mock data for demonstrations.');
            },
          },
        ]
      );
    } else {
      disableDemoMode();
      setIsDemoEnabled(false);
      Alert.alert('Demo Mode Disabled', 'App will now use live API data.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Demo Mode (Offline)</Text>
      <Switch
        value={isDemoEnabled}
        onValueChange={toggleDemoMode}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isDemoEnabled ? '#f5dd4b' : '#f4f3f4'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f9fa',
    marginVertical: 8,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default DemoModeToggle;
