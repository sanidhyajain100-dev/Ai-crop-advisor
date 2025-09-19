import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';

// Replace with your backend IP address
const API_BASE_URL = 'https://farmerapp-hgdd.onrender.com';

export default function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [weather, setWeather] = useState(null);
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [debugLog, setDebugLog] = useState([]); // Added debug log
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const lastSpokenIndexRef = useRef(-1);
  const [isRecognizing, setIsRecognizing] = useState(false);

  // Speech recognition: live transcript flows into chatInput
  useSpeechRecognitionEvent && useSpeechRecognitionEvent('start', () => setIsRecognizing(true));
  useSpeechRecognitionEvent && useSpeechRecognitionEvent('end', () => setIsRecognizing(false));
  useSpeechRecognitionEvent && useSpeechRecognitionEvent('result', (event) => {
    try {
      const result = event?.results?.[0]?.transcript || '';
      if (result) setChatInput(result);
    } catch (e) {
      addDebugLog(`STT parse error: ${e.message}`);
    }
  });
  useSpeechRecognitionEvent && useSpeechRecognitionEvent('error', (event) => {
    addDebugLog(`STT error: ${event?.error || 'unknown'} ${event?.message || ''}`);
    setIsRecognizing(false);
  });

  // Debug logging function
  const addDebugLog = (message) => {
    console.log(message);
    setDebugLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Update form field
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Load sample data
  const loadSampleData = (crop) => {
    addDebugLog(`Loading sample data for ${crop}`);
    const samples = {
      rice: {
        nitrogen: '90',
        phosphorus: '42',
        potassium: '43',
        temperature: '20.8',
        humidity: '82',
        ph: '6.5',
        rainfall: '202',
      },
      wheat: {
        nitrogen: '50',
        phosphorus: '25',
        potassium: '20',
        temperature: '15.5',
        humidity: '75',
        ph: '6.2',
        rainfall: '180',
      },
      maize: {
        nitrogen: '80',
        phosphorus: '50',
        potassium: '40',
        temperature: '25.2',
        humidity: '88',
        ph: '7.5',
        rainfall: '250',
      },
      cotton: {
        nitrogen: '55',
        phosphorus: '30',
        potassium: '35',
        temperature: '23',
        humidity: '68',
        ph: '6.7',
        rainfall: '190',
      },
      potato: {
        nitrogen: '90',
        phosphorus: '65',
        potassium: '55',
        temperature: '24.5',
        humidity: '70',
        ph: '7.2',
        rainfall: '140',
      },
      jowar: {
        nitrogen: '80',
        phosphorus: '40',
        potassium: '40',
        temperature: '28',
        humidity: '55',
        ph: '7.0',
        rainfall: '60'
    },
      bajra: {
        nitrogen: '60',
        phosphorus: '40',
        potassium: '40',
        temperature: '30',
        humidity: '50',
        ph: '7.5',
        rainfall: '50'
    },
     sugarcane: {
        nitrogen: '280',
        phosphorus: '90',
        potassium: '90',
        temperature: '26',
        humidity: '70',
        ph: '6.8',
        rainfall: '150'
    },
    soybean: {
        nitrogen: '50',
        phosphorus: '75',
        potassium: '30',
        temperature: '27',
        humidity: '65',
        ph: '6.5',
        rainfall: '80'
    },
     groundnut: {
        nitrogen: '25',
        phosphorus: '50',
        potassium: '25',
        temperature: '28',
        humidity: '60',
        ph: '6.3',
        rainfall: '60'
    },
     tomato: {
        nitrogen: '150',
        phosphorus: '100',
        potassium: '100',
        temperature: '24',
        humidity: '70',
        ph: '6.5',
        rainfall: '80'
    },
     grapes: {
        nitrogen: '100',
        phosphorus: '50',
        potassium: '150',
        temperature: '25',
        humidity: '60',
        ph: '6.8',
        rainfall: '75'
    },
        orange: {
        nitrogen: '500',  // per plant per year
        phosphorus: '250',
        potassium: '500',
        temperature: '23',
        humidity: '60',
        ph: '6.0',
        rainfall: '100'
    }
    };
    setFormData(samples[crop] || {});
    addDebugLog(`Sample data loaded for ${crop}`);
  };

  // Predict crop
  const predictCrop = async () => {
    addDebugLog('Predict crop button clicked');
    const required = ['nitrogen', 'phosphorus', 'potassium', 'temperature', 'humidity', 'ph', 'rainfall'];
    const missingFields = required.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      Alert.alert('Missing Data', `Please fill: ${missingFields.join(', ')}`);
      addDebugLog(`Missing fields: ${missingFields.join(', ')}`);
      return;
    }

    setLoading(true);
    addDebugLog(`Making prediction request to ${API_BASE_URL}/api/predict`);
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      addDebugLog(`Prediction response status: ${res.status}`);
      const data = await res.json();
      addDebugLog(`Prediction response data: ${JSON.stringify(data).substring(0, 100)}...`);
      
      if (data.success) {
        setPrediction(data);
        addDebugLog('Prediction successful');
      } else {
        Alert.alert('Error', data.error);
        addDebugLog(`Prediction error: ${data.error}`);
      }
    } catch (error) {
      addDebugLog(`Prediction fetch error: ${error.message}`);
      Alert.alert('Error', 'Cannot connect to server');
    }
    setLoading(false);
  };

  // Fetch weather
  const fetchWeather = async () => {
    addDebugLog('Fetching weather data');
    try {
      const res = await fetch(`${API_BASE_URL}/api/weather`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: 19.076, longitude: 72.8777 }),
      });
      
      addDebugLog(`Weather response status: ${res.status}`);
      const data = await res.json();
      addDebugLog(`Weather data received: ${JSON.stringify(data).substring(0, 100)}...`);
      
      if (data.success) {
        setWeather(data.weather);
        addDebugLog('Weather data set successfully');
      } else {
        addDebugLog(`Weather error: ${data.error}`);
      }
    } catch (error) {
      addDebugLog(`Weather fetch error: ${error.message}`);
    }
  };

  // Send chat
  const sendChat = async () => {
    if (!chatInput.trim()) return;
    
    addDebugLog(`Sending chat message: ${chatInput}`);
    setChatMessages((prev) => [...prev, { type: 'user', text: chatInput }]);
    const currentMsg = chatInput;
    setChatInput('');
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentMsg }),
      });
      
      addDebugLog(`Chat response status: ${res.status}`);
      const data = await res.json();
      addDebugLog(`Chat response: ${JSON.stringify(data).substring(0, 100)}...`);
      
      if (data.success) {
        setChatMessages((prev) => [...prev, { type: 'bot', text: data.response }]);
        addDebugLog('Chat response received');
      } else {
        setChatMessages((prev) => [...prev, { type: 'bot', text: 'Sorry, I could not process your request.' }]);
        addDebugLog(`Chat error: ${data.error}`);
      }
    } catch (error) {
      addDebugLog(`Chat fetch error: ${error.message}`);
      setChatMessages((prev) => [...prev, { type: 'bot', text: 'Network error. Please check connection.' }]);
    }
  };

  // Pick image for disease detection
  const pickImage = async () => {
    addDebugLog('Pick image button clicked');
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status.status !== 'granted') {
      alert('Permission denied to access gallery');
      addDebugLog('Gallery permission denied');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });
    if (!result.canceled) {
      addDebugLog('Image selected, starting disease detection');
      detectDisease(result.assets[0].uri);
    } else {
      addDebugLog('Image selection canceled');
    }
  };

  // Detect disease
  const detectDisease = async (uri) => {
    setLoading(true);
    addDebugLog(`Starting disease detection for image: ${uri}`);
    
    try {
      const photo = {
        uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
      const formDataImage = new FormData();
      formDataImage.append('image', photo);
      
      addDebugLog('Uploading image...');
      const uploadRes = await fetch(`${API_BASE_URL}/api/upload-image`, {
        method: 'POST',
        body: formDataImage,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      addDebugLog(`Upload response status: ${uploadRes.status}`);
      const uploadData = await uploadRes.json();
      addDebugLog(`Upload response: ${JSON.stringify(uploadData).substring(0, 100)}...`);
      
      if (!uploadData.success) {
        alert('Image upload failed');
        addDebugLog(`Image upload failed: ${uploadData.error}`);
        setLoading(false);
        return;
      }
      
      addDebugLog('Image uploaded, detecting disease...');
      const detectRes = await fetch(`${API_BASE_URL}/api/disease-detection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_base64: uploadData.image_base64 }),
      });
      
      addDebugLog(`Detection response status: ${detectRes.status}`);
      const detectData = await detectRes.json();
      addDebugLog(`Detection response: ${JSON.stringify(detectData).substring(0, 100)}...`);
      
      if (detectData.success) {
        setDiseaseResult(detectData);
        addDebugLog('Disease detection successful');
      } else {
        alert('Disease detection failed');
        addDebugLog(`Disease detection failed: ${detectData.error}`);
      }
    } catch (error) {
      addDebugLog(`Disease detection error: ${error.message}`);
      alert('Detection request failed');
    }
    setLoading(false);
  };

  useEffect(() => {
    addDebugLog('App started, fetching initial weather data');
    fetchWeather();
  }, []);

  // Speak the latest bot reply when voice is enabled
  useEffect(() => {
    const lastIndex = chatMessages.length - 1;
    if (!voiceEnabled || lastIndex < 0) return;
    const lastMsg = chatMessages[lastIndex];
    if (lastMsg.type === 'bot' && lastIndex > lastSpokenIndexRef.current) {
      try {
        Speech.stop();
        Speech.speak(lastMsg.text, { language: 'en-US' });
        lastSpokenIndexRef.current = lastIndex;
        addDebugLog('Spoke bot reply');
      } catch (e) {
        addDebugLog(`TTS error: ${e.message}`);
      }
    }
  }, [chatMessages, voiceEnabled]);

  // Cleanup any ongoing speech on unmount
  useEffect(() => {
    return () => {
      try { Speech.stop(); } catch (e) {}
      try { ExpoSpeechRecognitionModule && ExpoSpeechRecognitionModule.stop && ExpoSpeechRecognitionModule.stop(); } catch (e) {}
    };
  }, []);

  const requestMicPermission = async () => {
    try {
      if (!ExpoSpeechRecognitionModule?.requestPermissionsAsync) return true;
      const res = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      const granted = res?.granted ?? res?.status === 'granted';
      if (!granted) Alert.alert('Permission needed', 'Microphone access is required for voice input.');
      return !!granted;
    } catch (e) {
      addDebugLog(`Mic permission error: ${e.message}`);
      return false;
    }
  };

  const startRecognition = async () => {
    const ok = await requestMicPermission();
    if (!ok) return;
    try {
      if (ExpoSpeechRecognitionModule?.start) {
        await ExpoSpeechRecognitionModule.start({
          lang: 'en-US',
          interimResults: true,
          continuous: false,
          maxAlternatives: 1,
          addsPunctuation: false,
        });
      }
    } catch (e) {
      addDebugLog(`STT start error: ${e.message}`);
    }
  };

  const stopRecognition = async () => {
    try {
      if (ExpoSpeechRecognitionModule?.stop) await ExpoSpeechRecognitionModule.stop();
    } catch (e) {
      addDebugLog(`STT stop error: ${e.message}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌾 AI Farm Assistant</Text>

      {/* Debug Section - Remove this in production */}
      <View style={styles.debugSection}>
        <Text style={styles.debugTitle}>🐛 Debug Log (Latest 5):</Text>
        {debugLog.map((log, index) => (
          <Text key={index} style={styles.debugText}>{log}</Text>
        ))}
        <TouchableOpacity style={styles.clearDebugButton} onPress={() => setDebugLog([])}>
          <Text style={styles.buttonText}>Clear Debug Log</Text>
        </TouchableOpacity>
      </View>

      {/* Weather Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌤️ Current Weather</Text>
        {weather ? (
          <View style={styles.weatherCard}>
            <Text style={styles.weatherText}>🌡️ Temperature: {weather.temperature}°C</Text>
            <Text style={styles.weatherText}>💧 Humidity: {weather.humidity}%</Text>
            <Text style={styles.weatherText}>☁️ Condition: {weather.description}</Text>
          </View>
        ) : (
          <Text style={styles.loadingText}>Loading weather...</Text>
        )}
        <TouchableOpacity style={styles.refreshButton} onPress={fetchWeather}>
          <Text style={styles.buttonText}>Refresh Weather</Text>
        </TouchableOpacity>
      </View>

      {/* Crop Prediction Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌱 Crop Prediction</Text>

        {/* Sample Data Buttons */}
        <Text style={styles.subTitle}>Load Sample Data:</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.sampleButton, { backgroundColor: '#4CAF50' }]} onPress={() => loadSampleData('rice')}>
            <Text style={styles.buttonText}>🌾 Rice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sampleButton, { backgroundColor: '#FF9800' }]} onPress={() => loadSampleData('wheat')}>
            <Text style={styles.buttonText}>🌾 Wheat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.sampleButton, { backgroundColor: '#9C27B0' }]} onPress={() => loadSampleData('maize')}>
            <Text style={styles.buttonText}>🌽 Maize</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sampleButton, { backgroundColor: '#607D8B' }]} onPress={() => loadSampleData('cotton')}>
            <Text style={styles.buttonText}>🌿 Cotton</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sampleButton, { backgroundColor: '#607D8B' }]} onPress={() => loadSampleData('potato')}>
            <Text style={styles.buttonText}>🥔 Potato</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
           <TouchableOpacity style={[styles.sampleButton, { backgroundColor: '#2411d1ff' }]} onPress={() => loadSampleData('jowar')}>
            <Text style={styles.buttonText}>🌾 jowar</Text>
          </TouchableOpacity>
           <TouchableOpacity style={[styles.sampleButton, { backgroundColor: '#0acc4bff' }]} onPress={() => loadSampleData('bajra')}>
            <Text style={styles.buttonText}>🌾 bajra</Text>
          </TouchableOpacity>
           <TouchableOpacity style={[styles.sampleButton, { backgroundColor: '#2995d4ff' }]} onPress={() => loadSampleData('tomato')}>
            <Text style={styles.buttonText}>🍅 tomato</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
           <TouchableOpacity style={[styles.sampleButton, { backgroundColor: '#285232ff' }]} onPress={() => loadSampleData('sugarcane')}>
            <Text style={styles.buttonText}>🎋  sugarcane</Text>
          </TouchableOpacity>
           <TouchableOpacity style={[styles.sampleButton, { backgroundColor: '#ceb31aff' }]} onPress={() => loadSampleData('grapes')}>
            <Text style={styles.buttonText}>🍇 grapes</Text>
          </TouchableOpacity>
           <TouchableOpacity style={[styles.sampleButton, { backgroundColor: '#e045d3ff' }]} onPress={() => loadSampleData('orange')}>
            <Text style={styles.buttonText}>🍊 orange</Text>
          </TouchableOpacity>
          </View>
           <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.sampleButton, { backgroundColor: '#4CAF50' }]} onPress={() => loadSampleData('soyabean')}>
            <Text style={styles.buttonText}>🌱 soybean</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sampleButton, { backgroundColor: '#FF9800' }]} onPress={() => loadSampleData('groundnut')}>
            <Text style={styles.buttonText}>🥜 groundnut</Text>
          </TouchableOpacity>
        </View>



        {/* Input Fields */}
        <Text style={styles.subTitle}>Enter Soil & Weather Data:</Text>
        {Object.keys(formData).map((key) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter ${key}`}
              value={formData[key]}
              onChangeText={(value) => updateField(key, value)}
              keyboardType="numeric"
            />
          </View>
        ))}

        <TouchableOpacity style={styles.predictButton} onPress={predictCrop} disabled={loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>🔍 Predict Best Crop</Text>}
        </TouchableOpacity>

        {/* Prediction Results */}
        {prediction && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>
              {prediction.prediction.emoji} Recommended: {prediction.prediction.crop.toUpperCase()}
            </Text>
            <Text style={styles.resultText}>🎯 Confidence: {(prediction.prediction.confidence * 100).toFixed(1)}%</Text>

            {prediction.crop_info && (
              <View style={styles.cropInfo}>
                <Text style={styles.cropInfoTitle}>📋 Crop Information:</Text>
                <Text style={styles.cropInfoText}>🗓️ Season: {prediction.crop_info.season}</Text>
                <Text style={styles.cropInfoText}>⏱️ Duration: {prediction.crop_info.duration}</Text>
                <Text style={styles.cropInfoText}>📈 Yield: {prediction.crop_info.yield}</Text>
                <Text style={styles.cropInfoText}>💰 Price: {prediction.crop_info.market_price}</Text>
                <Text style={styles.cropInfoText}>🌱 Tips: {prediction.crop_info.tips}</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Disease Detection Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔍 Disease Detection</Text>
        <TouchableOpacity style={styles.button} onPress={pickImage} disabled={loading}>
          <Text style={styles.buttonText}>Pick Plant Image</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator style={{ marginTop: 16 }} />}
        {diseaseResult && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>
              {diseaseResult.disease.emoji} {diseaseResult.disease.name}
            </Text>
            <Text style={styles.resultText}>Confidence: {(diseaseResult.disease.confidence * 100).toFixed(2)}%</Text>
            <Text style={styles.resultText}>Description: {diseaseResult.diagnosis.description}</Text>
            <Text style={styles.resultText}>Treatment: {diseaseResult.diagnosis.treatment}</Text>
            <Text style={styles.resultText}>Prevention: {diseaseResult.diagnosis.prevention}</Text>
          </View>
        )}
      </View>

      {/* Chatbot Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💬 Ask Farm Expert</Text>
        <Text style={styles.subTitle}>Get personalized farming advice</Text>

        <View style={styles.chatContainer}>
          <ScrollView style={styles.chatMessages} nestedScrollEnabled={true}>
            {chatMessages.length === 0 ? (
              <Text style={styles.chatPlaceholder}>
                Ask me anything about farming! 🌱{'\n'}
                Try: "How to improve soil?" or "Best time for tomatoes?"
              </Text>
            ) : (
              chatMessages.map((msg, i) => (
                <View key={i} style={[styles.message, msg.type === 'user' ? styles.userMessage : styles.botMessage]}>
                  <Text style={[styles.messageText, msg.type === 'user' ? styles.userMessageText : styles.botMessageText]}>
                    {msg.text}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>

          <View style={styles.ttsRow}>
            <TouchableOpacity
              style={[styles.ttsToggleButton, { backgroundColor: voiceEnabled ? '#4CAF50' : '#9E9E9E' }]}
              onPress={() => setVoiceEnabled((prev) => !prev)}
            >
              <Text style={styles.buttonText}>{voiceEnabled ? 'Voice: On' : 'Voice: Off'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ttsStopButton}
              onPress={() => {
                try { Speech.stop(); } catch (e) {}
              }}
            >
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.chatInputContainer}>
            <TextInput
              style={styles.chatInput}
              placeholder="Ask your farming question..."
              value={chatInput}
              onChangeText={setChatInput}
              multiline
              maxLength={300}
            />
            <TouchableOpacity
              style={[styles.micButton, { backgroundColor: isRecognizing ? '#f44336' : '#607D8B' }]}
              onPress={isRecognizing ? stopRecognition : startRecognition}
            >
              <Text style={styles.buttonText}>{isRecognizing ? 'Stop' : 'Mic'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton} onPress={sendChat}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
    color: '#5eeb4bff',
  },
  debugSection: {
    backgroundColor: '#ffe6e6',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffcccc',
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#cc0000',
  },
  debugText: {
    fontSize: 10,
    marginBottom: 2,
    color: '#666',
    fontFamily: 'monospace',
  },
  clearDebugButton: {
    backgroundColor: '#ff6666',
    padding: 4,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2d5a27',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
  },
  weatherCard: {
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#2d5a27',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  refreshButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sampleButton: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    fontSize: 16,
  },
  predictButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  button: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultCard: {
    backgroundColor: '#e8f5e8',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2d5a27',
  },
  resultText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#2d5a27',
  },
  cropInfo: {
    marginTop: 12,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 6,
  },
  cropInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2d5a27',
  },
  cropInfoText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  chatContainer: {
    height: 300,
  },
  chatMessages: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    maxHeight: 220,
  },
  chatPlaceholder: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 20,
    marginTop: 20,
  },
  message: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 12,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: '#e9ecef',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 18,
  },
  userMessageText: {
    color: 'white',
  },
  botMessageText: {
    color: '#333',
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 6,
    maxHeight: 80,
    backgroundColor: 'white',
  },
  sendButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    marginLeft: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  micButton: {
    padding: 12,
    borderRadius: 6,
    marginLeft: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  ttsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  ttsToggleButton: {
    padding: 10,
    borderRadius: 6,
    marginLeft: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  ttsStopButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 6,
    marginLeft: 8,
    minWidth: 60,
    alignItems: 'center',
  },
});
