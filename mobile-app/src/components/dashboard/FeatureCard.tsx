import React from 'react';
import { Card, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FeatureCardProps {
  title: string;
  description: string;
  status: 'Available' | 'Coming Soon';
  icon: string;
  onPress?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  status,
  icon,
  onPress,
}) => {
  const theme = useTheme();
  const isAvailable = status === 'Available';
  
  return (
    <TouchableOpacity onPress={isAvailable ? onPress : undefined} disabled={!isAvailable}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons 
                name={icon as any} 
                size={24} 
                color={isAvailable ? theme.colors.primary : '#999'} 
              />
            </View>
            <View style={styles.statusContainer}>
              <Text 
                style={[
                  styles.status, 
                  { 
                    backgroundColor: isAvailable 
                      ? 'rgba(76, 175, 80, 0.1)' 
                      : 'rgba(158, 158, 158, 0.1)',
                    color: isAvailable ? '#4CAF50' : '#9E9E9E'
                  }
                ]}
              >
                {status}
              </Text>
            </View>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});
