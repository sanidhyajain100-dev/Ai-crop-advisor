const axios = require('axios');

const API_URL = 'https://web-production-d6596.up.railway.app/api';

async function testConnection() {
  try {
    console.log('Testing connection to:', API_URL);
    const response = await axios.get(`${API_URL}/dashboard-stats`, {
      timeout: 10000 // 10 seconds timeout
    });
    console.log('Connection successful!');
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Connection failed!');
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.message);
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
    }
  }
}

testConnection();
