import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Text, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface RevenueStream {
  title: string;
  description: string;
  icon: string;
  pricing: string;
  color: string;
}

interface ScalabilityPhase {
  phase: string;
  goals: string[];
  features: string[];
  investment: string;
}

interface ImpactMetric {
  label: string;
  value: string;
  growth: string;
  icon: string;
}

const BusinessModelScreen = ({ navigation }: any) => {
  const revenueStreams: RevenueStream[] = [
    {
      title: "Freemium Model",
      description: "Basic crop recommendations free, premium analytics paid",
      icon: "currency-usd",
      pricing: "₹99/month for premium features",
      color: "#4CAF50"
    },
    {
      title: "B2B Partnerships",
      description: "White-label solutions for agricultural companies",
      icon: "office-building",
      pricing: "₹50,000+ per enterprise license",
      color: "#2196F3"
    },
    {
      title: "Government Contracts",
      description: "State agricultural departments and schemes",
      icon: "shield-check",
      pricing: "₹10-50 lakhs per state contract",
      color: "#9C27B0"
    },
    {
      title: "Data Insights",
      description: "Anonymized agricultural insights for research",
      icon: "chart-line",
      pricing: "₹25,000+ per data package",
      color: "#FF9800"
    }
  ];

  const scalabilityPlan: ScalabilityPhase[] = [
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

  const impactMetrics: ImpactMetric[] = [
    { label: "Farmers Reached", value: "50,000+", growth: "+300%", icon: "account-group" },
    { label: "Yield Improvement", value: "23%", growth: "Average increase", icon: "trending-up" },
    { label: "Cost Reduction", value: "15%", growth: "Input cost savings", icon: "currency-usd" },
    { label: "Success Rate", value: "94%", growth: "Prediction accuracy", icon: "target" }
  ];

  const competitiveAdvantages = [
    "AI-powered crop recommendations with 94%+ accuracy",
    "Multi-language support (English, Hindi, regional languages)",
    "Real-time weather integration and agricultural advisories",
    "Offline-capable mobile app for rural connectivity",
    "Government partnership potential through existing schemes",
    "Scalable cloud architecture (Railway + Vercel deployment)"
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>AI Crop Advisor</Title>
        <Paragraph style={styles.subtitle}>
          Business Model & Scalability
        </Paragraph>

        {/* Mission & Vision */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.missionVisionContainer}>
              <View style={styles.missionVision}>
                <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons name="heart" size={20} color="#F44336" />
                  <Text style={styles.sectionTitle}>Mission</Text>
                </View>
                <Paragraph style={styles.description}>
                  Democratize AI-powered agricultural insights to help farmers make data-driven decisions, 
                  increase yields, and reduce costs while promoting sustainable farming practices.
                </Paragraph>
              </View>
              
              <View style={styles.missionVision}>
                <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons name="earth" size={20} color="#2196F3" />
                  <Text style={styles.sectionTitle}>Vision</Text>
                </View>
                <Paragraph style={styles.description}>
                  Become India's leading AgriTech platform, serving 10 million farmers by 2030 and 
                  expanding to Southeast Asia with localized AI solutions.
                </Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Revenue Streams */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="currency-usd" size={20} color="#4CAF50" />
              <Text style={styles.sectionTitle}>Revenue Streams</Text>
            </View>
            
            <View style={styles.revenueStreams}>
              {revenueStreams.map((stream, index) => (
                <Card key={index} style={[styles.revenueCard, { borderLeftColor: stream.color }]}>
                  <Card.Content style={styles.revenueCardContent}>
                    <View style={styles.revenueHeader}>
                      <View style={[styles.iconContainer, { backgroundColor: `${stream.color}20` }]}>
                        <MaterialCommunityIcons 
                          name={stream.icon as any} 
                          size={20} 
                          color={stream.color} 
                        />
                      </View>
                      <View style={styles.revenueInfo}>
                        <Text style={styles.revenueTitle}>{stream.title}</Text>
                        <Paragraph style={styles.revenueDescription}>{stream.description}</Paragraph>
                        <Chip style={styles.pricingChip} textStyle={styles.pricingText}>
                          {stream.pricing}
                        </Chip>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Impact Metrics */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="trending-up" size={20} color="#4CAF50" />
              <Text style={styles.sectionTitle}>Current Impact & Traction</Text>
            </View>
            
            <View style={styles.metricsGrid}>
              {impactMetrics.map((metric, index) => (
                <View key={index} style={styles.metricCard}>
                  <MaterialCommunityIcons 
                    name={metric.icon as any} 
                    size={24} 
                    color="#4CAF50" 
                  />
                  <Text style={styles.metricValue}>{metric.value}</Text>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                  <Text style={styles.metricGrowth}>{metric.growth}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Scalability Roadmap */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="rocket" size={20} color="#4CAF50" />
              <Text style={styles.sectionTitle}>3-Year Scalability Roadmap</Text>
            </View>
            
            <View style={styles.roadmap}>
              {scalabilityPlan.map((phase, index) => (
                <View key={index} style={styles.phaseContainer}>
                  <View style={styles.phaseHeader}>
                    <View style={styles.phaseNumber}>
                      <Text style={styles.phaseNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.phaseTitle}>{phase.phase}</Text>
                  </View>
                  
                  <View style={styles.phaseDetails}>
                    <View style={styles.phaseSection}>
                      <Text style={styles.phaseSectionTitle}>GOALS</Text>
                      {phase.goals.map((goal, i) => (
                        <View key={i} style={styles.phaseItem}>
                          <View style={styles.bullet} />
                          <Text style={styles.phaseItemText}>{goal}</Text>
                        </View>
                      ))}
                    </View>
                    
                    <View style={styles.phaseSection}>
                      <Text style={styles.phaseSectionTitle}>FEATURES</Text>
                      {phase.features.map((feature, i) => (
                        <View key={i} style={styles.phaseItem}>
                          <View style={[styles.bullet, { backgroundColor: '#2196F3' }]} />
                          <Text style={styles.phaseItemText}>{feature}</Text>
                        </View>
                      ))}
                    </View>
                    
                    <View style={styles.phaseSection}>
                      <Text style={styles.phaseSectionTitle}>INVESTMENT</Text>
                      <Chip style={styles.investmentChip} textStyle={styles.investmentText}>
                        {phase.investment}
                      </Chip>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Competitive Advantages */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="shield-check" size={20} color="#4CAF50" />
              <Text style={styles.sectionTitle}>Competitive Advantages</Text>
            </View>
            
            <View style={styles.advantages}>
              {competitiveAdvantages.map((advantage, index) => (
                <View key={index} style={styles.advantageItem}>
                  <View style={styles.advantageBullet} />
                  <Text style={styles.advantageText}>{advantage}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Call to Action */}
        <Card style={styles.ctaCard}>
          <Card.Content style={styles.ctaContent}>
            <Text style={styles.ctaTitle}>Ready to Scale Agricultural Innovation?</Text>
            <Paragraph style={styles.ctaDescription}>
              Join us in revolutionizing farming with AI-powered insights that help farmers thrive.
            </Paragraph>
            <View style={styles.ctaChips}>
              <Chip style={[styles.ctaChip, { backgroundColor: '#4CAF50' }]} textStyle={styles.ctaChipText}>
                Proven Technology
              </Chip>
              <Chip style={[styles.ctaChip, { backgroundColor: '#2196F3' }]} textStyle={styles.ctaChipText}>
                Scalable Architecture
              </Chip>
              <Chip style={[styles.ctaChip, { backgroundColor: '#FF9800' }]} textStyle={styles.ctaChipText}>
                Market Ready
              </Chip>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.bottomSpacing} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  sectionCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  missionVisionContainer: {
    gap: 20,
  },
  missionVision: {
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  revenueStreams: {
    gap: 12,
  },
  revenueCard: {
    borderLeftWidth: 4,
    elevation: 1,
  },
  revenueCardContent: {
    paddingVertical: 12,
  },
  revenueHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  revenueInfo: {
    flex: 1,
  },
  revenueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  revenueDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  pricingChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0F0',
  },
  pricingText: {
    fontSize: 10,
    color: '#333',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  metricCard: {
    width: (width - 64) / 2,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  metricGrowth: {
    fontSize: 10,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 2,
  },
  roadmap: {
    gap: 20,
  },
  phaseContainer: {
    marginBottom: 16,
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  phaseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  phaseNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  phaseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  phaseDetails: {
    gap: 12,
  },
  phaseSection: {
    marginBottom: 8,
  },
  phaseSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  phaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  phaseItemText: {
    fontSize: 12,
    color: '#333',
    flex: 1,
  },
  investmentChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
  },
  investmentText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  advantages: {
    gap: 12,
  },
  advantageItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  advantageBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 12,
    marginTop: 4,
  },
  advantageText: {
    fontSize: 12,
    color: '#333',
    flex: 1,
    lineHeight: 18,
  },
  ctaCard: {
    backgroundColor: '#E8F5E8',
    elevation: 2,
    borderRadius: 12,
  },
  ctaContent: {
    alignItems: 'center',
    padding: 20,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  ctaChip: {
    marginHorizontal: 4,
  },
  ctaChipText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default BusinessModelScreen;
