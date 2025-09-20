import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Badge } from '@/components/badge';
import { 
  TrendingUp, 
  Users, 
  Target, 
  BarChart3, 
  MapPin,
  Sprout,
  Award,
  DollarSign
} from 'lucide-react';
import { API_CONFIG } from '@/config/api';

interface AnalyticsData {
  success: boolean;
  analytics: {
    overview: {
      total_predictions: { value: string; growth: string };
      accuracy_rate: { value: string; growth: string };
      farmers_helped: { value: string; growth: string };
      crop_varieties: { value: string; growth: string };
    };
    regional_performance: Record<string, { predictions: number; accuracy: number }>;
    crop_accuracy: Record<string, number>;
    success_metrics: {
      prediction_accuracy: number;
      farmer_satisfaction: number;
      yield_improvement: number;
      cost_reduction: number;
    };
  };
  last_updated: string;
}

const AnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/analytics`);
      const data = await response.json();
      if (data.success) {
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Unable to load analytics data.</p>
        </CardContent>
      </Card>
    );
  }

  const { overview, regional_performance, crop_accuracy, success_metrics } = analytics.analytics;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Predictions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.total_predictions.value}</div>
            <p className="text-xs text-success">
              {overview.total_predictions.growth} from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{overview.accuracy_rate.value}</div>
            <p className="text-xs text-success">
              {overview.accuracy_rate.growth} improvement
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Farmers Helped</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.farmers_helped.value}</div>
            <p className="text-xs text-success">
              {overview.farmers_helped.growth} new farmers
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crop Varieties</CardTitle>
            <Sprout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.crop_varieties.value}</div>
            <p className="text-xs text-success">
              {overview.crop_varieties.growth} coverage increase
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Regional Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(regional_performance).map(([state, data]) => (
              <div key={state} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium">{state}</h4>
                  <p className="text-sm text-muted-foreground">{data.predictions} predictions</p>
                </div>
                <Badge variant="secondary" className="bg-success/20 text-success">
                  {data.accuracy.toFixed(1)}% accuracy
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Crop Accuracy */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Crop Prediction Accuracy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(crop_accuracy).map(([crop, accuracy]) => (
              <div key={crop} className="flex items-center justify-between">
                <span className="font-medium capitalize">{crop}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full transition-all duration-500"
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">
                    {accuracy.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Metrics */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Impact Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-success/20 to-success/10 rounded-lg">
              <div className="text-2xl font-bold text-success">
                {success_metrics.prediction_accuracy.toFixed(1)}%
              </div>
              <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {success_metrics.farmer_satisfaction.toFixed(1)}%
              </div>
              <p className="text-sm text-muted-foreground">Farmer Satisfaction</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                +{success_metrics.yield_improvement.toFixed(1)}%
              </div>
              <p className="text-sm text-muted-foreground">Yield Improvement</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                -{success_metrics.cost_reduction.toFixed(1)}%
              </div>
              <p className="text-sm text-muted-foreground">Cost Reduction</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Last Updated */}
      <div className="text-center text-sm text-muted-foreground">
        Last updated: {new Date(analytics.last_updated).toLocaleString()}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
