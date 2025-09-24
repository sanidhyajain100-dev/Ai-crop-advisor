import { useState } from "react";
import { Calendar, Bell, Droplets, Scissors, Sprout, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "sowing" | "irrigation" | "fertilizer" | "harvest";
  crop: string;
  description: string;
}

interface CropSeason {
  crop: string;
  emoji: string;
  season: string;
  plantingMonths: string[];
  harvestMonths: string[];
  duration: string;
  tips: string;
  color: string;
}

const CropCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedSeason, setSelectedSeason] = useState<'All' | 'Kharif' | 'Rabi' | 'Zaid'>('All');

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const seasons = ['All', 'Kharif', 'Rabi', 'Zaid'];

  const cropCalendar: CropSeason[] = [
    {
      crop: 'Rice',
      emoji: '🌾',
      season: 'Kharif',
      plantingMonths: ['Jun', 'Jul', 'Aug'],
      harvestMonths: ['Oct', 'Nov', 'Dec'],
      duration: '120-150 days',
      tips: 'Plant during monsoon. Requires flooded fields.',
      color: '#4CAF50'
    },
    {
      crop: 'Wheat',
      emoji: '🌾',
      season: 'Rabi',
      plantingMonths: ['Nov', 'Dec', 'Jan'],
      harvestMonths: ['Mar', 'Apr', 'May'],
      duration: '120-150 days',
      tips: 'Plant in winter. Requires cool weather for growth.',
      color: '#FF9800'
    },
    {
      crop: 'Maize',
      emoji: '🌽',
      season: 'Kharif',
      plantingMonths: ['Jun', 'Jul'],
      harvestMonths: ['Sep', 'Oct'],
      duration: '90-120 days',
      tips: 'Can be grown year-round with irrigation.',
      color: '#FFC107'
    },
    {
      crop: 'Cotton',
      emoji: '🌿',
      season: 'Kharif',
      plantingMonths: ['Apr', 'May', 'Jun'],
      harvestMonths: ['Oct', 'Nov', 'Dec'],
      duration: '180-200 days',
      tips: 'Requires warm weather and moderate rainfall.',
      color: '#E91E63'
    },
    {
      crop: 'Sugarcane',
      emoji: '🎋',
      season: 'Year-round',
      plantingMonths: ['Feb', 'Mar', 'Oct', 'Nov'],
      harvestMonths: ['Dec', 'Jan', 'Feb', 'Mar'],
      duration: '12-18 months',
      tips: 'Long duration crop. Plant in spring or autumn.',
      color: '#9C27B0'
    },
    {
      crop: 'Potato',
      emoji: '🥔',
      season: 'Rabi',
      plantingMonths: ['Oct', 'Nov', 'Dec'],
      harvestMonths: ['Jan', 'Feb', 'Mar'],
      duration: '90-120 days',
      tips: 'Cool weather crop. Avoid frost during harvest.',
      color: '#795548'
    },
    {
      crop: 'Tomato',
      emoji: '🍅',
      season: 'Year-round',
      plantingMonths: ['Jun', 'Jul', 'Oct', 'Nov'],
      harvestMonths: ['Sep', 'Oct', 'Jan', 'Feb'],
      duration: '90-120 days',
      tips: 'Can be grown in multiple seasons with proper care.',
      color: '#F44336'
    },
    {
      crop: 'Mustard',
      emoji: '🌻',
      season: 'Rabi',
      plantingMonths: ['Oct', 'Nov'],
      harvestMonths: ['Feb', 'Mar'],
      duration: '90-110 days',
      tips: 'Cool season oilseed crop.',
      color: '#FFEB3B'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case "sowing": return <Sprout className="h-4 w-4" />;
      case "irrigation": return <Droplets className="h-4 w-4" />;
      case "fertilizer": return <Bell className="h-4 w-4" />;
      case "harvest": return <Scissors className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "sowing": return "bg-success/20 text-success border-success/30";
      case "irrigation": return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      case "fertilizer": return "bg-warning/20 text-warning border-warning/30";
      case "harvest": return "bg-crop-grain/20 text-crop-grain border-crop-grain/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getFilteredCrops = () => {
    let filtered = cropCalendar;
    
    if (selectedSeason !== 'All') {
      filtered = filtered.filter(crop => 
        crop.season === selectedSeason || crop.season === 'Year-round'
      );
    }
    
    return filtered;
  };

  const getCurrentMonthActivity = () => {
    const currentMonth = months[selectedMonth];
    const cropsToPlant = cropCalendar.filter(crop => 
      crop.plantingMonths.includes(currentMonth)
    );
    const cropsToHarvest = cropCalendar.filter(crop => 
      crop.harvestMonths.includes(currentMonth)
    );
    
    return { cropsToPlant, cropsToHarvest };
  };

  const { cropsToPlant, cropsToHarvest } = getCurrentMonthActivity();

  const upcomingEvents: CalendarEvent[] = [
    {
      id: "1",
      title: "Rice Transplanting",
      date: "Tomorrow",
      type: "sowing",
      crop: "Rice",
      description: "Optimal time for rice transplanting in Kharif season"
    },
    {
      id: "2",
      title: "Wheat Irrigation",
      date: "In 3 days",
      type: "irrigation",
      crop: "Wheat",
      description: "Second irrigation recommended for wheat crop"
    },
    {
      id: "3",
      title: "Cotton Fertilizer",
      date: "In 5 days",
      type: "fertilizer",
      crop: "Cotton",
      description: "Apply NPK fertilizer for cotton flowering stage"
    },
    {
      id: "4",
      title: "Tomato Harvest",
      date: "In 1 week",
      type: "harvest",
      crop: "Tomato",
      description: "First harvest of tomato crop ready"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Month Selector */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Select Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedMonth(selectedMonth === 0 ? 11 : selectedMonth - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold">{months[selectedMonth]} 2024</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedMonth(selectedMonth === 11 ? 0 : selectedMonth + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {months.map((month, index) => (
              <Button
                key={month}
                variant={selectedMonth === index ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMonth(index)}
                className="text-xs"
              >
                {month}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Season Filter */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Filter by Season</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {seasons.map((season) => (
              <Button
                key={season}
                variant={selectedSeason === season ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSeason(season as any)}
              >
                {season}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Month Activities */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-primary" />
            Activities for {months[selectedMonth]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {cropsToPlant.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sprout className="h-4 w-4 text-success" />
                  <h4 className="font-medium">Time to Plant</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cropsToPlant.map((crop, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                      <span className="text-2xl">{crop.emoji}</span>
                      <div>
                        <p className="font-medium">{crop.crop}</p>
                        <p className="text-sm text-muted-foreground">{crop.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cropsToHarvest.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Scissors className="h-4 w-4 text-warning" />
                  <h4 className="font-medium">Time to Harvest</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cropsToHarvest.map((crop, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
                      <span className="text-2xl">{crop.emoji}</span>
                      <div>
                        <p className="font-medium">{crop.crop}</p>
                        <p className="text-sm text-muted-foreground">{crop.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cropsToPlant.length === 0 && cropsToHarvest.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No major planting or harvesting activities for {months[selectedMonth]}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Upcoming Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Personalized farming schedule based on your crops and location
            </div>
            
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:shadow-soft transition-shadow"
              >
                <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground">{event.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {event.crop}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">{event.date}</p>
                  <p className="text-xs text-muted-foreground capitalize">{event.type}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Crop Calendar Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Crop Calendar Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getFilteredCrops().map((crop, index) => (
              <Card key={index} className="border-l-4" style={{ borderLeftColor: crop.color }}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{crop.emoji}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold">{crop.crop}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {crop.season}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Sprout className="h-3 w-3 text-success" />
                      <span className="text-muted-foreground">Plant:</span>
                      <span>{crop.plantingMonths.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Scissors className="h-3 w-3 text-warning" />
                      <span className="text-muted-foreground">Harvest:</span>
                      <span>{crop.harvestMonths.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{crop.duration}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
                    {crop.tips}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weather-Based Recommendations */}
      <Card className="shadow-card bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-6">
          <h5 className="font-medium text-foreground mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Weather-Based Recommendations
          </h5>
          <p className="text-sm text-muted-foreground">
            Current conditions are favorable for field activities. No rain expected for the next 3 days.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropCalendar;