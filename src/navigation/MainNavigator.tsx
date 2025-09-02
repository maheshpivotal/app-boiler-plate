import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from '../types';
import { COLORS } from '../constants';

// Import main screens
import HomeScreen from '../screens/main/HomeScreen';
import AccountScreen from '../screens/main/AccountScreen';
import SubscriptionsScreen from '../screens/main/SubscriptionsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Account':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Subscriptions':
              iconName = focused ? 'card' : 'card-outline';
              break;
            default:
              iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray[500],
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.gray[200],
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: COLORS.white,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.gray[200],
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: COLORS.textPrimary,
        },
        headerTintColor: COLORS.primary,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Home',
          headerTitle: 'Dashboard',
        }}
      />
      <Tab.Screen 
        name="Account" 
        component={AccountScreen}
        options={{
          title: 'Account',
          headerTitle: 'My Account',
        }}
      />
      <Tab.Screen 
        name="Subscriptions" 
        component={SubscriptionsScreen}
        options={{
          title: 'Plans',
          headerTitle: 'Subscription',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
