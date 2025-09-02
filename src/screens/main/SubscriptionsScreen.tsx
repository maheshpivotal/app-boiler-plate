import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Button, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, SPACING } from '../../constants';
import { MainScreenProps } from '../../navigation/navigationUtils';

type SubscriptionsScreenProps = MainScreenProps<'Subscriptions'>;

const SubscriptionsScreen: React.FC<SubscriptionsScreenProps> = () => {
  const currentPlan = {
    name: 'Free Plan',
    price: 0,
    features: [
      'Basic features',
      'Limited storage',
      'Email support',
    ],
  };

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      period: 'month',
      popular: false,
      features: [
        'All Free features',
        'Unlimited storage',
        'Priority support',
        'Advanced analytics',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 19.99,
      period: 'month',
      popular: true,
      features: [
        'All Basic features',
        'Team collaboration',
        'Custom branding',
        'API access',
        'Phone support',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 49.99,
      period: 'month',
      popular: false,
      features: [
        'All Pro features',
        'Unlimited team members',
        'Advanced security',
        'Dedicated account manager',
        'Custom integrations',
      ],
    },
  ];

  const handleUpgrade = (planId: string) => {
    Alert.alert('Coming Soon', `Upgrade to ${planId} plan will be implemented`);
  };

  const handleManageBilling = () => {
    Alert.alert('Coming Soon', 'Billing management will be implemented');
  };

  const PlanCard = ({ plan, isCurrentPlan = false }: { plan: any; isCurrentPlan?: boolean }) => (
    <Card style={[styles.planCard, plan.popular && styles.popularCard]}>
      {plan.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Most Popular</Text>
        </View>
      )}
      
      <Card.Content style={styles.planContent}>
        <View style={styles.planHeader}>
          <Text style={styles.planName}>{plan.name}</Text>
          {isCurrentPlan && <Chip mode="outlined" textStyle={styles.currentPlanChip}>Current</Chip>}
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${plan.price}</Text>
          <Text style={styles.period}>/{plan.period}</Text>
        </View>
        
        <View style={styles.featuresContainer}>
          {plan.features.map((feature: string, index: number) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        
        {!isCurrentPlan && (
          <Button
            mode={plan.popular ? 'contained' : 'outlined'}
            onPress={() => handleUpgrade(plan.id)}
            style={[styles.upgradeButton, plan.popular && styles.popularButton]}
            labelStyle={styles.upgradeButtonText}
          >
            Upgrade to {plan.name}
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Current Plan Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Plan</Text>
        <Card style={styles.currentPlanCard}>
          <Card.Content style={styles.currentPlanContent}>
            <View style={styles.currentPlanHeader}>
              <View>
                <Text style={styles.currentPlanName}>{currentPlan.name}</Text>
                <Text style={styles.currentPlanPrice}>
                  ${currentPlan.price}/month
                </Text>
              </View>
              <Button
                mode="outlined"
                onPress={handleManageBilling}
                style={styles.manageButton}
              >
                Manage
              </Button>
            </View>
            
            <View style={styles.currentPlanFeatures}>
              {currentPlan.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Available Plans */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upgrade Your Plan</Text>
        <Text style={styles.sectionSubtitle}>
          Choose a plan that best fits your needs
        </Text>
        
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </View>

      {/* Additional Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Need Help?</Text>
        <Text style={styles.infoText}>
          Contact our support team if you have any questions about our plans or billing.
        </Text>
        <Button
          mode="text"
          onPress={() => Alert.alert('Coming Soon', 'Support contact will be implemented')}
          style={styles.contactButton}
        >
          Contact Support
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  contentContainer: {
    padding: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  currentPlanCard: {
    backgroundColor: COLORS.primary,
  },
  currentPlanContent: {
    padding: SPACING.lg,
  },
  currentPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  currentPlanName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  currentPlanPrice: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.8,
  },
  manageButton: {
    borderColor: COLORS.white,
  },
  currentPlanFeatures: {
    marginTop: SPACING.md,
  },
  planCard: {
    marginBottom: SPACING.lg,
    position: 'relative',
  },
  popularCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.md,
    zIndex: 1,
  },
  popularText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  planContent: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  currentPlanChip: {
    fontSize: 12,
    color: COLORS.primary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SPACING.lg,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  period: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  featuresContainer: {
    marginBottom: SPACING.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  upgradeButton: {
    marginTop: SPACING.md,
  },
  popularButton: {
    backgroundColor: COLORS.primary,
  },
  upgradeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  contactButton: {
    marginTop: SPACING.sm,
  },
});

export default SubscriptionsScreen;
