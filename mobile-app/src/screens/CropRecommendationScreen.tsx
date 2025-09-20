import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { cropService, CropPredictionResponse } from '../api/cropService';

const CropRecommendationScreen = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CropPredictionResponse | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    
    setLoading(true);
    try {
      const response = await cropService.predictCrop({
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall)
      });
      
      setResult(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Crop Recommendation</Title>
        <Paragraph style={styles.subtitle}>
          Enter soil and climate data to get personalized crop recommendations
        </Paragraph>

        <Card style={styles.formCard}>
          <Card.Content>
            <View style={styles.inputRow}>
              <TextInput
                label="Nitrogen (N)"
                value={formData.nitrogen}
                onChangeText={(text) => handleInputChange('nitrogen', text)}
                style={styles.input}
                keyboardType="numeric"
                mode="outlined"
                outlineColor="#4CAF50"
                activeOutlineColor="#2E7D32"
              />
              <TextInput
                label="Phosphorus (P)"
                value={formData.phosphorus}
                onChangeText={(text) => handleInputChange('phosphorus', text)}
                style={styles.input}
                keyboardType="numeric"
                mode="outlined"
                outlineColor="#4CAF50"
                activeOutlineColor="#2E7D32"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Potassium (K)"
                value={formData.potassium}
                onChangeText={(text) => handleInputChange('potassium', text)}
                style={styles.input}
                keyboardType="numeric"
                mode="outlined"
                outlineColor="#4CAF50"
                activeOutlineColor="#2E7D32"
              />
              <TextInput
                label="Temperature (°C)"
                value={formData.temperature}
                onChangeText={(text) => handleInputChange('temperature', text)}
                style={styles.input}
                keyboardType="numeric"
                mode="outlined"
                outlineColor="#4CAF50"
                activeOutlineColor="#2E7D32"
              />
            </View>

            <View style={styles.inputRow}>
              <TextInput
                label="Humidity (%)"
                value={formData.humidity}
                onChangeText={(text) => handleInputChange('humidity', text)}
                style={styles.input}
                keyboardType="numeric"
                mode="outlined"
                outlineColor="#4CAF50"
                activeOutlineColor="#2E7D32"
              />
              <TextInput
                label="pH value"
                value={formData.ph}
                onChangeText={(text) => handleInputChange('ph', text)}
                style={styles.input}
                keyboardType="numeric"
                mode="outlined"
                outlineColor="#4CAF50"
                activeOutlineColor="#2E7D32"
              />
            </View>

            <TextInput
              label="Rainfall (mm)"
              value={formData.rainfall}
              onChangeText={(text) => handleInputChange('rainfall', text)}
              style={[styles.input, styles.fullWidthInput]}
              keyboardType="numeric"
              mode="outlined"
              outlineColor="#4CAF50"
              activeOutlineColor="#2E7D32"
            />

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}
              loading={loading}
              disabled={loading || !isFormValid()}
            >
              Get Recommendation
            </Button>
          </Card.Content>
        </Card>

        {result && (
          <Card style={styles.resultCard}>
            <Card.Content>
              <View style={styles.resultHeader}>
                <Text style={styles.cropEmoji}>{result.prediction?.emoji || '🌱'}</Text>
                <View>
                  <Title style={styles.cropName}>{(result.prediction?.crop || 'Unknown Crop')}</Title>
                  <Paragraph style={styles.confidence}>
                    Confidence: {((result.prediction?.confidence || 0) * 100).toFixed(1)}%
                  </Paragraph>
                </View>
              </View>

              <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Best Season:</Text>
                  <Text style={styles.infoValue}>{result.crop_info?.season || '-'}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Expected Yield:</Text>
                  <Text style={styles.infoValue}>{result.crop_info?.yield || '-'}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Duration:</Text>
                  <Text style={styles.infoValue}>{result.crop_info?.duration || '-'}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Market Price:</Text>
                  <Text style={styles.infoValue}>{result.crop_info?.market_price || '-'}</Text>
                </View>
              </View>

              <View style={styles.tipsContainer}>
                <Title style={styles.tipsTitle}>Farming Tips</Title>
                <Paragraph style={styles.tipText}>{result.crop_info?.tips || '—'}</Paragraph>
              </View>
            </Card.Content>
          </Card>
        )}
        
        {!result && (
          <Card style={styles.placeholderCard}>
            <Card.Content style={styles.placeholderContent}>
              <Text style={styles.placeholderEmoji}>🌱</Text>
              <Text style={styles.placeholderText}>
                Fill in the form above to get crop recommendations
              </Text>
            </Card.Content>
          </Card>
        )}
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
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  formCard: {
    marginBottom: 20,
    elevation: 4,
    borderRadius: 12,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: 'white',
  },
  fullWidthInput: {
    marginHorizontal: 4,
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 8,
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
  },
  resultCard: {
    marginBottom: 20,
    elevation: 4,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cropEmoji: {
    fontSize: 50,
    marginRight: 16,
  },
  cropName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  confidence: {
    fontSize: 14,
    color: '#388E3C',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  infoValue: {
    color: '#555',
  },
  tipsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
  },
  tipsTitle: {
    fontSize: 18,
    marginBottom: 8,
    color: '#2E7D32',
  },
  tipText: {
    color: '#555',
    lineHeight: 20,
  },
  placeholderCard: {
    marginBottom: 20,
    borderRadius: 12,
    height: 200,
  },
  placeholderContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  placeholderEmoji: {
    fontSize: 50,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default CropRecommendationScreen;