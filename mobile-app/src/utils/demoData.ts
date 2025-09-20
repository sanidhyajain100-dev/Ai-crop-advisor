// Demo data for offline demonstrations
export const DEMO_RESPONSES = {
  cropPrediction: {
    success: true,
    prediction: {
      crop: "Rice",
      confidence: 0.92,
      emoji: "🌾"
    },
    crop_info: {
      emoji: "🌾",
      season: "Kharif",
      duration: "120-150 days",
      yield: "4-6 tons/hectare",
      market_price: "₹18-22 per kg",
      tips: "Ensure proper water management during flowering stage. Apply nitrogen fertilizer in split doses for better yield."
    }
  },

  weather: {
    success: true,
    location: {
      city: "Pune",
      country: "India"
    },
    current: {
      temperature: 28,
      humidity: 65,
      condition: "Partly Cloudy",
      windSpeed: 12,
      precipitation: 0
    },
    forecast: [
      {
        date: "Today",
        maxTemp: 32,
        minTemp: 24,
        condition: "Sunny"
      },
      {
        date: "Tomorrow",
        maxTemp: 30,
        minTemp: 22,
        condition: "Cloudy"
      }
    ],
    agricultural_advisory: [
      {
        title: "Irrigation Advisory",
        description: "Good conditions for field activities. Light irrigation recommended."
      }
    ]
  },

  chatbot: {
    success: true,
    response: "Hello! I'm your AI farming assistant. Based on current conditions, I recommend checking soil moisture levels and considering organic fertilizers for better crop health. How can I help you today?"
  },

  diseaseDetection: {
    success: true,
    disease: {
      name: "Healthy Plant",
      confidence: 0.95,
      severity: "None",
      emoji: "✅"
    },
    diagnosis: {
      description: "Your plant appears to be healthy with no signs of disease.",
      treatment: "Continue current care routine.",
      prevention: "Maintain proper watering and ensure good air circulation."
    }
  },

  dashboardStats: {
    success: true,
    stats: {
      total_predictions: {
        value: "1,247",
        growth: "+23%"
      },
      farmers_helped: {
        value: "892",
        growth: "+18%"
      },
      crop_varieties: {
        value: "45",
        growth: "+12%"
      },
      success_rate: {
        value: "94.2%",
        growth: "+5%"
      }
    },
    last_updated: new Date().toISOString()
  }
};

// Check if we should use demo mode (for offline demos)
export const isDemoMode = () => {
  // You can toggle this for demo purposes
  return false; // Set to true for offline demos
};

// Demo mode toggle (you can call this function to enable demo mode)
let demoModeEnabled = false;
export const enableDemoMode = () => {
  demoModeEnabled = true;
};

export const disableDemoMode = () => {
  demoModeEnabled = false;
};

export const isInDemoMode = () => demoModeEnabled;
