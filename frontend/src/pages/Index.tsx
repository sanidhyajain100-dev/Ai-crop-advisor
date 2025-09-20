import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import WeatherCard from "@/components/WeatherCard";
import CropCategories from "@/components/CropCategories";
import DiseaseDetection from "@/components/DiseaseDetection";
import AIChat from "@/components/AIChat";
import CropCalendar from "@/components/CropCalendar";
import CropPrediction from "@/components/CropPrediction";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <Dashboard />;
      case "weather":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Weather Dashboard</h2>
            <WeatherCard />
          </div>
        );
      case "crops":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Crop Database & Prediction</h2>
            <CropPrediction />
            <CropCategories />
          </div>
        );
      case "detection":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Disease Detection</h2>
            <DiseaseDetection />
          </div>
        );
      case "chat":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">AI Assistant</h2>
            <AIChat />
          </div>
        );
      case "calendar":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Crop Calendar</h2>
            <CropCalendar />
          </div>
        );
      default:
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Feature Coming Soon</h2>
            <p className="text-muted-foreground">This section is under development and will be available soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="md:ml-72 p-4 md:p-6 pt-16 md:pt-6">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
