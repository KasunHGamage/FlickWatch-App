import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import WatchlistScreen from '../screens/WatchlistScreen';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: '#0b0b0f' },
        headerTintColor: '#f5f5f5',
        headerTitleStyle: { fontWeight: '700' },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        sceneContainerStyle: { backgroundColor: '#0b0b0f' },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: 4,
          letterSpacing: 0.6,
        },
        tabBarActiveTintColor: '#e50914',
        tabBarInactiveTintColor: '#9aa0a6',

        // Normal, full-width tab bar (not floating)
        tabBarStyle: {
          backgroundColor: '#141418',
          borderTopWidth: 0,
          // Base height plus safe area inset at bottom
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom,
          // Optional subtle shadow
          shadowColor: '#000',
          shadowOpacity: 0.35,
          shadowRadius: 22,
          shadowOffset: { width: 0, height: 12 },
          elevation: 12,
        },

        tabBarItemStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 4,
        },

        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Watchlist') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'FlickWatch' }} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Watchlist" component={WatchlistScreen} />
    </Tab.Navigator>
  );
}
