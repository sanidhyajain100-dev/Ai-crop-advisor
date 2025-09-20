import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#8BC34A']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>AI Crop Advisor</Text>
        <Text style={styles.headerSubtitle}>Smart Farming Solutions</Text>
      </LinearGradient>

      <View style={styles.cardsContainer}>
        <Card style={styles.card} onPress={() => navigation.navigate('CropRecommendation' as never)}>
          <Card.Content>
            <View style={[styles.cardIcon, {backgroundColor: '#E8F5E9'}]}>
              <Text style={styles.emoji}>🌾</Text>
            </View>
            <Title>Crop Recommendation</Title>
            <Paragraph>Get personalized crop suggestions based on soil and climate data</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" style={styles.button}>Get Started</Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card} onPress={() => navigation.navigate('DiseaseDetection' as never)}>
          <Card.Content>
            <View style={[styles.cardIcon, {backgroundColor: '#FFF3E0'}]}>
              <Text style={styles.emoji}>🔍</Text>
            </View>
            <Title>Disease Detection</Title>
            <Paragraph>Identify plant diseases by taking a photo of affected plants</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" style={styles.button}>Scan Plant</Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card} onPress={() => navigation.navigate('WeatherInfo' as never)}>
          <Card.Content>
            <View style={[styles.cardIcon, {backgroundColor: '#E3F2FD'}]}>
              <Text style={styles.emoji}>☁️</Text>
            </View>
            <Title>Weather Information</Title>
            <Paragraph>Get real-time weather updates for your location</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" style={styles.button}>Check Weather</Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card} onPress={() => navigation.navigate('FarmAssistant' as never)}>
          <Card.Content>
            <View style={[styles.cardIcon, {backgroundColor: '#F3E5F5'}]}>
              <Text style={styles.emoji}>💬</Text>
            </View>
            <Title>Farm Assistant</Title>
            <Paragraph>Chat with our AI assistant for farming advice and tips</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" style={styles.button}>Ask Questions</Button>
          </Card.Actions>
        </Card>
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
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  cardsContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 30,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#4CAF50',
  },
});

export default HomeScreen;