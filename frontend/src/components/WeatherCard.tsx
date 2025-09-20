import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { api } from "@/lib/utils";
import { useToast } from "@/lib/use-toast";

interface WeatherData {
  location: string;
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy";
  humidity: number;
  windSpeed: number;
  description: string;
}

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: "Pune, Maharashtra",
    temperature: 28,
    condition: "sunny",
    humidity: 65,
    windSpeed: 12,
    description: "Perfect conditions for farming"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [customLocation, setCustomLocation] = useState("");
  const { toast } = useToast();

  const fetchWeather = async (lat: number = 19.076, lon: number = 72.8777) => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/weather', {
        latitude: lat,
        longitude: lon
      });

      if (response.success) {
        const weather = response.weather;
        setWeatherData({
          location: customLocation || "Pune, Maharashtra",
          temperature: Math.round(weather.temperature),
          condition: weather.description.includes('rain') ? 'rainy' : 
                    weather.description.includes('cloud') ? 'cloudy' : 'sunny',
          humidity: weather.humidity,
          windSpeed: 12, // Default since API doesn't provide wind speed
          description: weather.description
        });
      } else {
        toast({
          title: "Weather Error",
          description: "Could not fetch weather data",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Weather fetch error:', error);
      toast({
        title: "Weather Error",
        description: "Failed to connect to weather service",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-12 w-12 text-weather-sunny" />;
      case "cloudy":
        return <Cloud className="h-12 w-12 text-weather-cloudy" />;
      case "rainy":
        return <CloudRain className="h-12 w-12 text-weather-rainy" />;
      default:
        return <Sun className="h-12 w-12 text-weather-sunny" />;
    }
  };

  const getBackgroundGradient = (condition: string) => {
    switch (condition) {
      case "sunny":
        return "bg-gradient-to-br from-weather-sunny/20 to-primary/10";
      case "cloudy":
        return "bg-gradient-to-br from-weather-cloudy/20 to-muted/30";
      case "rainy":
        return "bg-gradient-to-br from-weather-rainy/20 to-primary/10";
      default:
        return "bg-gradient-to-br from-weather-sunny/20 to-primary/10";
    }
  };

  return (
    <Card className={`shadow-card transition-all duration-300 hover:shadow-elevated animate-fade-in ${getBackgroundGradient(weatherData.condition)}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-primary" />
          Live Weather
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {weatherData.location}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {isLoading ? "..." : `${weatherData.temperature}°C`}
            </p>
            <p className="text-sm text-success capitalize">{weatherData.description}</p>
          </div>
          <div className="flex flex-col items-center">
            {getWeatherIcon(weatherData.condition)}
            <p className="text-sm text-muted-foreground mt-2 capitalize">{weatherData.condition}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="font-semibold text-foreground">{weatherData.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Wind Speed</p>
              <p className="font-semibold text-foreground">{weatherData.windSpeed} km/h</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-3 border-t border-border">
          <Input
            placeholder="Enter location..."
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={() => fetchWeather()} 
            disabled={isLoading}
            size="sm"
          >
            {isLoading ? "..." : "Refresh"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;