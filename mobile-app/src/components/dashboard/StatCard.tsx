import React from 'react';
import { Card, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface StatCardProps {
  title: string;
  value: string;
  percentage: string;
  icon: string;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentage,
  icon,
  color,
}) => (
  <Card style={styles.card}>
    <Card.Content style={styles.cardContent}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
        <MaterialCommunityIcons name={icon as any} size={24} color={color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
      </View>
      <View style={styles.percentageContainer}>
        <Text style={[styles.percentage, { color }]}>{percentage}</Text>
      </View>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    elevation: 2,
    borderRadius: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  percentageContainer: {
    marginLeft: 8,
  },
  percentage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
