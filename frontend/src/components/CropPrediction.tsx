import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Sprout, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/lib/use-toast";
import { api } from "@/lib/utils";

interface CropPrediction {
  crop: string;
  confidence: number;
  emoji: string;
  crop_info: {
    season: string;
    duration: string;
    yield: string;
    market_price: string;
    tips: string;
  };
}

const CropPrediction = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<CropPrediction | null>(null);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const requiredFields = ['nitrogen', 'phosphorus', 'potassium', 'temperature', 'humidity', 'ph', 'rainfall'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await api.post('/api/predict', {
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall)
      });

      if (response.success) {
        setPrediction(response);
        toast({
          title: "Prediction Complete",
          description: `Recommended crop: ${response.prediction.crop}`,
        });
      } else {
        throw new Error(response.error || "Prediction failed");
      }
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: "Prediction Failed",
        description: "Could not get crop recommendation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      temperature: "",
      humidity: "",
      ph: "",
      rainfall: ""
    });
    setPrediction(null);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-primary" />
            Crop Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nitrogen">Nitrogen (N) - kg/hectare</Label>
                <Input
                  id="nitrogen"
                  type="number"
                  placeholder="e.g., 90"
                  value={formData.nitrogen}
                  onChange={(e) => handleInputChange('nitrogen', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phosphorus">Phosphorus (P) - kg/hectare</Label>
                <Input
                  id="phosphorus"
                  type="number"
                  placeholder="e.g., 40"
                  value={formData.phosphorus}
                  onChange={(e) => handleInputChange('phosphorus', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="potassium">Potassium (K) - kg/hectare</Label>
                <Input
                  id="potassium"
                  type="number"
                  placeholder="e.g., 43"
                  value={formData.potassium}
                  onChange={(e) => handleInputChange('potassium', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 25"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange('temperature', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  id="humidity"
                  type="number"
                  placeholder="e.g., 80"
                  value={formData.humidity}
                  onChange={(e) => handleInputChange('humidity', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ph">Soil pH</Label>
                <Input
                  id="ph"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 6.5"
                  value={formData.ph}
                  onChange={(e) => handleInputChange('ph', e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="rainfall">Rainfall (mm)</Label>
                <Input
                  id="rainfall"
                  type="number"
                  placeholder="e.g., 200"
                  value={formData.rainfall}
                  onChange={(e) => handleInputChange('rainfall', e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Get Recommendation
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={resetForm}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {prediction && (
        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">{prediction.prediction.emoji}</span>
              Recommended Crop: {prediction.prediction.crop}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-primary/10 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Confidence</span>
                <span className="font-semibold text-primary">
                  {Math.round(prediction.prediction.confidence * 100)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${prediction.prediction.confidence * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Season</p>
                    <p className="font-medium">{prediction.crop_info.season}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{prediction.crop_info.duration}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Yield</p>
                    <p className="font-medium">{prediction.crop_info.yield}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Market Price</p>
                    <p className="font-medium">{prediction.crop_info.market_price}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Farming Tips</h4>
              <p className="text-sm text-muted-foreground">{prediction.crop_info.tips}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CropPrediction;
