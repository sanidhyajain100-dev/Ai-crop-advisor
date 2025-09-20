import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wheat, DollarSign, Apple, ChevronRight } from "lucide-react";
import cropsImage from "@/assets/crops-collage.jpg";

interface Crop {
  id: string;
  name: string;
  season: string;
  growthPeriod: string;
}

interface CropCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  crops: Crop[];
  description: string;
}

const CropCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: CropCategory[] = [
    {
      id: "grain",
      title: "Food / Grain Crops",
      icon: <Wheat className="h-6 w-6" />,
      color: "crop-grain",
      description: "Essential staple crops for food security",
      crops: [
        { id: "rice", name: "Rice", season: "Kharif", growthPeriod: "120-150 days" },
        { id: "wheat", name: "Wheat", season: "Rabi", growthPeriod: "120-130 days" },
        { id: "maize", name: "Maize", season: "Kharif/Rabi", growthPeriod: "90-120 days" },
        { id: "jowar", name: "Jowar", season: "Kharif", growthPeriod: "100-120 days" },
        { id: "bajra", name: "Bajra", season: "Kharif", growthPeriod: "75-90 days" },
      ]
    },
    {
      id: "cash",
      title: "Cash Crops",
      icon: <DollarSign className="h-6 w-6" />,
      color: "crop-cash",
      description: "High-value commercial crops for income generation",
      crops: [
        { id: "cotton", name: "Cotton", season: "Kharif", growthPeriod: "180-200 days" },
        { id: "sugarcane", name: "Sugarcane", season: "Year-round", growthPeriod: "12-18 months" },
        { id: "soybean", name: "Soybean", season: "Kharif", growthPeriod: "90-120 days" },
        { id: "groundnut", name: "Groundnut", season: "Kharif/Rabi", growthPeriod: "100-130 days" },
      ]
    },
    {
      id: "horticulture",
      title: "Horticultural Crops",
      icon: <Apple className="h-6 w-6" />,
      color: "crop-horticulture",
      description: "Fruits and vegetables for nutrition and markets",
      crops: [
        { id: "tomato", name: "Tomato", season: "Year-round", growthPeriod: "70-80 days" },
        { id: "potato", name: "Potato", season: "Rabi", growthPeriod: "90-120 days" },
        { id: "grapes", name: "Grapes", season: "Perennial", growthPeriod: "2-3 years" },
        { id: "orange", name: "Orange", season: "Perennial", growthPeriod: "3-6 years" },
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-lg mb-6">
        <img 
          src={cropsImage} 
          alt="Various crops" 
          className="w-full h-32 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
          <h2 className="text-white text-xl font-bold ml-4">Crop Database</h2>
        </div>
      </div>

      <div className="grid gap-4">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-card border-l-4 ${
              selectedCategory === category.id ? 'shadow-elevated scale-[1.02]' : 'shadow-soft'
            }`}
            style={{ borderLeftColor: `hsl(var(--${category.color}))` }}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `hsl(var(--${category.color}) / 0.2)` }}
                  >
                    <div style={{ color: `hsl(var(--${category.color}))` }}>
                      {category.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <ChevronRight 
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                    selectedCategory === category.id ? 'rotate-90' : ''
                  }`}
                />
              </CardTitle>
            </CardHeader>
            
            {selectedCategory === category.id && (
              <CardContent className="pt-0 animate-slide-up">
                <div className="grid gap-3">
                  {category.crops.map((crop) => (
                    <div 
                      key={crop.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div>
                        <h4 className="font-medium text-foreground">{crop.name}</h4>
                        <p className="text-xs text-muted-foreground">{crop.growthPeriod}</p>
                      </div>
                      <Badge 
                        variant="secondary"
                        className="text-xs"
                        style={{ 
                          backgroundColor: `hsl(var(--${category.color}) / 0.2)`,
                          color: `hsl(var(--${category.color}))`
                        }}
                      >
                        {crop.season}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CropCategories;