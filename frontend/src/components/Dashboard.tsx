import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { TrendingUp, Users, Zap, Shield } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Farmers",
      value: "12,500+",
      change: "+15%",
      icon: Users,
      color: "text-success"
    },
    {
      title: "Diseases Detected",
      value: "3,240",
      change: "+8%",
      icon: Shield,
      color: "text-warning"
    },
    {
      title: "Crop Recommendations",
      value: "8,750",
      change: "+22%",
      icon: TrendingUp,
      color: "text-primary"
    },
    {
      title: "AI Queries Answered",
      value: "25,600",
      change: "+18%",
      icon: Zap,
      color: "text-accent"
    }
  ];

  const features = [
    {
      title: "Smart Crop Recommendations",
      description: "AI-powered suggestions based on soil, weather, and market conditions",
      status: "Available"
    },
    {
      title: "Disease Detection",
      description: "Upload plant images for instant disease identification and treatment",
      status: "Available"
    },
    {
      title: "Weather Integration",
      description: "Real-time weather data for optimal farming decisions",
      status: "Available"
    },
    {
      title: "Voice Assistant",
      description: "Speak to get farming advice in your local language",
      status: "Available"
    },
    {
      title: "Offline Mode",
      description: "Basic predictions and advice without internet connectivity",
      status: "Coming Soon"
    },
    {
      title: "Expert Connect",
      description: "Direct access to agricultural experts for complex queries",
      status: "Coming Soon"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-crop shadow-elevated">
        <div className="relative p-8 text-center">
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            AI Crop Advisor
          </h1>
          <div className="inline-block bg-white/20 px-4 py-1 rounded-full mb-2">
            <p className="text-primary-foreground/95 text-sm font-semibold">
              Smart India Hackathon 2025 | Problem ID: 25030
            </p>
          </div>
          <p className="text-primary-foreground/90 text-lg">
            Team CODEHEX - Empowering farmers with AI-driven solutions
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                  <span className={`text-xs font-medium ${stat.color}`}>{stat.change}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Platform Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg border bg-card hover:shadow-soft transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{feature.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    feature.status === "Available" 
                      ? "bg-success/20 text-success" 
                      : "bg-warning/20 text-warning"
                  }`}>
                    {feature.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
              <span>Check current weather conditions for your area</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</div>
              <span>Browse crop database for planting recommendations</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</div>
              <span>Upload plant photos for disease detection</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</div>
              <span>Chat with AI assistant for personalized advice</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;