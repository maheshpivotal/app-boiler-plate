import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Avatar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, SPACING } from '../../constants';
import { MainScreenProps } from '../../navigation/navigationUtils';
import { AppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/slices/authSlice';

type HomeScreenProps = MainScreenProps<'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.auth?.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const QuickActionCard = ({ title, description, icon, onPress }: {
    title: string;
    description: string;
    icon: string;
    onPress: () => void;
  }) => (
    <Card style={styles.actionCard} onPress={onPress}>
      <Card.Content style={styles.actionCardContent}>
        <View style={styles.actionIconContainer}>
          <Ionicons name={icon as any} size={24} color={COLORS.primary} />
        </View>
        <View style={styles.actionTextContainer}>
          <Text style={styles.actionTitle}>{title}</Text>
          <Text style={styles.actionDescription}>{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray[400]} />
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Welcome Header */}
      <View style={styles.header}>
        <View style={styles.welcomeSection}>
          <Avatar.Text 
            size={50} 
            label={user ? `${user.firstName[0]}${user.lastName[0]}` : 'U'} 
            style={styles.avatar}
          />
          <View style={styles.welcomeText}>
            <Text style={styles.greeting}>Hello</Text>
            <Text style={styles.userName}>
              {user ? `${user.firstName} ${user.lastName}` : 'User'}
            </Text>
          </View>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={styles.statsCard}>
          <Card.Content style={styles.statsContent}>
            <Text style={styles.statsNumber}>24</Text>
            <Text style={styles.statsLabel}>Tasks</Text>
          </Card.Content>
        </Card>
        
        <Card style={styles.statsCard}>
          <Card.Content style={styles.statsContent}>
            <Text style={styles.statsNumber}>8</Text>
            <Text style={styles.statsLabel}>Projects</Text>
          </Card.Content>
        </Card>
        
        <Card style={styles.statsCard}>
          <Card.Content style={styles.statsContent}>
            <Text style={styles.statsNumber}>95%</Text>
            <Text style={styles.statsLabel}>Progress</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <QuickActionCard
          title="My Account"
          description="Manage your profile and settings"
          icon="person-circle"
          onPress={() => navigation.navigate('Account')}
        />
        
        <QuickActionCard
          title="Subscription"
          description="View and manage your subscription"
          icon="card"
          onPress={() => navigation.navigate('Subscriptions')}
        />
        
        <QuickActionCard
          title="Support"
          description="Get help and contact support"
          icon="help-circle"
          onPress={() => {/* TODO: Navigate to support */}}
        />
        
        <QuickActionCard
          title="Settings"
          description="App preferences and configuration"
          icon="settings"
          onPress={() => {/* TODO: Navigate to settings */}}
        />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: 12,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: SPACING.md,
  },
  welcomeText: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  logoutButton: {
    color: COLORS.error,
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  statsCard: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
  statsContent: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statsLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  actionCard: {
    marginBottom: SPACING.md,
  },
  actionCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  actionDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default HomeScreen;
