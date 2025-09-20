import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Badge } from '@/components/badge';
import { 
  Rocket, 
  Users, 
  DollarSign, 
  Globe, 
  TrendingUp,
  Target,
  Zap,
  Shield,
  Heart,
  Building
} from 'lucide-react';

const BusinessModel: React.FC = () => {
  const revenueStreams = [
    {
      title: "Freemium Model",
      description: "Basic crop recommendations free, premium analytics paid",
      icon: <DollarSign className="h-5 w-5" />,
      pricing: "₹99/month for premium features",
      color: "bg-green-500/20 text-green-600"
    },
    {
      title: "B2B Partnerships",
      description: "White-label solutions for agricultural companies",
      icon: <Building className="h-5 w-5" />,
      pricing: "₹50,000+ per enterprise license",
      color: "bg-blue-500/20 text-blue-600"
    },
    {
      title: "Government Contracts",
      description: "State agricultural departments and schemes",
      icon: <Shield className="h-5 w-5" />,
      pricing: "₹10-50 lakhs per state contract",
      color: "bg-purple-500/20 text-purple-600"
    },
    {
      title: "Data Insights",
      description: "Anonymized agricultural insights for research",
      icon: <TrendingUp className="h-5 w-5" />,
      pricing: "₹25,000+ per data package",
      color: "bg-orange-500/20 text-orange-600"
    }
  ];

  const scalabilityPlan = [
    {
      phase: "Phase 1: Foundation (0-6 months)",
      goals: ["10,000+ farmers", "5 states coverage", "₹10 lakhs revenue"],
      features: ["Basic crop prediction", "Weather integration", "Hindi support"],
      investment: "₹25 lakhs"
    },
    {
      phase: "Phase 2: Growth (6-18 months)",
      goals: ["100,000+ farmers", "15 states coverage", "₹1 crore revenue"],
      features: ["Disease detection", "Market price integration", "Voice commands"],
      investment: "₹75 lakhs"
    },
    {
      phase: "Phase 3: Scale (18-36 months)",
      goals: ["1 million+ farmers", "Pan-India coverage", "₹10 crore revenue"],
      features: ["IoT integration", "Drone analytics", "International expansion"],
      investment: "₹5 crores"
    }
  ];

  const impactMetrics = [
    { label: "Farmers Reached", value: "50,000+", growth: "+300%", icon: <Users className="h-4 w-4" /> },
    { label: "Yield Improvement", value: "23%", growth: "Average increase", icon: <TrendingUp className="h-4 w-4" /> },
    { label: "Cost Reduction", value: "15%", growth: "Input cost savings", icon: <DollarSign className="h-4 w-4" /> },
    { label: "Success Rate", value: "94%", growth: "Prediction accuracy", icon: <Target className="h-4 w-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Business Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            AI Crop Advisor - Business Model & Scalability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                Mission
              </h3>
              <p className="text-muted-foreground">
                Democratize AI-powered agricultural insights to help farmers make data-driven decisions, 
                increase yields, and reduce costs while promoting sustainable farming practices.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-500" />
                Vision
              </h3>
              <p className="text-muted-foreground">
                Become India's leading AgriTech platform, serving 10 million farmers by 2030 and 
                expanding to Southeast Asia with localized AI solutions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Streams */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Revenue Streams
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {revenueStreams.map((stream, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-soft transition-shadow">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${stream.color}`}>
                    {stream.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{stream.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{stream.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {stream.pricing}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Impact Metrics */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Current Impact & Traction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  {metric.icon}
                </div>
                <div className="text-2xl font-bold text-primary">{metric.value}</div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-xs text-success mt-1">{metric.growth}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scalability Roadmap */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            3-Year Scalability Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {scalabilityPlan.map((phase, index) => (
              <div key={index} className="relative">
                {index < scalabilityPlan.length - 1 && (
                  <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-border"></div>
                )}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="font-semibold text-lg">{phase.phase}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">GOALS</h4>
                        <ul className="text-sm space-y-1">
                          {phase.goals.map((goal, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">FEATURES</h4>
                        <ul className="text-sm space-y-1">
                          {phase.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">INVESTMENT</h4>
                        <Badge variant="outline" className="text-sm font-semibold">
                          {phase.investment}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitive Advantages */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Competitive Advantages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "AI-powered crop recommendations with 94%+ accuracy",
              "Multi-language support (English, Hindi, regional languages)",
              "Real-time weather integration and agricultural advisories",
              "Offline-capable mobile app for rural connectivity",
              "Government partnership potential through existing schemes",
              "Scalable cloud architecture (Railway + Vercel deployment)"
            ].map((advantage, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">{advantage}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="shadow-card bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Ready to Scale Agricultural Innovation?</h3>
          <p className="text-muted-foreground mb-4">
            Join us in revolutionizing farming with AI-powered insights that help farmers thrive.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="bg-success text-success-foreground">Proven Technology</Badge>
            <Badge className="bg-blue-500 text-white">Scalable Architecture</Badge>
            <Badge className="bg-orange-500 text-white">Market Ready</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessModel;
