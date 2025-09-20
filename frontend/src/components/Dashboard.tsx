import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { TrendingUp, Users, Zap, Shield } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Dashboard = () => {
  const { t } = useTranslation();
  
  const stats = [
    {
      title: t('dashboard.stats.farmers'),
      value: "12,500+",
      change: "+15%",
      icon: Users,
      color: "text-success"
    },
    {
      title: t('dashboard.stats.diseases'),
      value: "3,240",
      change: "+8%",
      icon: Shield,
      color: "text-warning"
    },
    {
      title: t('dashboard.stats.recommendations'),
      value: "8,750",
      change: "+22%",
      icon: TrendingUp,
      color: "text-primary"
    },
    {
      title: t('dashboard.stats.queries'),
      value: "25,600",
      change: "+18%",
      icon: Zap,
      color: "text-accent"
    }
  ];

  const features = [
    {
      title: t('dashboard.features.cropRecommendations.title'),
      description: t('dashboard.features.cropRecommendations.description'),
      status: t('common.available')
    },
    {
      title: t('dashboard.features.diseaseDetection.title'),
      description: t('dashboard.features.diseaseDetection.description'),
      status: t('common.available')
    },
    {
      title: t('dashboard.features.weatherIntegration.title'),
      description: t('dashboard.features.weatherIntegration.description'),
      status: t('common.available')
    },
    {
      title: t('dashboard.features.voiceAssistant.title'),
      description: t('dashboard.features.voiceAssistant.description'),
      status: t('common.available')
    },
    {
      title: t('dashboard.features.offlineMode.title'),
      description: t('dashboard.features.offlineMode.description'),
      status: t('common.comingSoon')
    },
    {
      title: t('dashboard.features.marketplace.title'),
      description: t('dashboard.features.marketplace.description'),
      status: t('common.inDevelopment')
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-crop shadow-elevated">
        <div className="relative p-8 text-center">
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            {t('dashboard.hero.title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('dashboard.hero.subtitle')}
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
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}/10`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-xs mt-2 text-muted-foreground">
                  <span className={stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                    {stat.change}
                  </span>{' '}
                  {t('dashboard.stats.fromLastMonth')}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>{t('dashboard.features.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{feature.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    feature.status === t('common.available') ? 'bg-success/10 text-success' :
                    feature.status === t('common.comingSoon') ? 'bg-warning/10 text-warning' :
                    'bg-muted text-muted-foreground'
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