import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import WatchlistScreen from "../screens/WatchlistScreen";

import ThemeToggleButton from "../components/common/ThemeToggleButton";
import { useTheme } from "../state/theme/ThemeContext";
import { darkTheme, lightTheme } from "../state/theme/colors";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitle: "FlickWatch",
        headerTitleAlign: "center",
        headerRight: () => <ThemeToggleButton />,

        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.text, fontWeight: "800" },
        headerShadowVisible: false,
        headerTintColor: colors.text,

        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,

        tabBarIcon: ({ color, size, focused }) => {
          let name = "home-outline";
          if (route.name === "Home") name = focused ? "home" : "home-outline";
          if (route.name === "Search") name = focused ? "search" : "search-outline";
          if (route.name === "Watchlist") name = focused ? "bookmark" : "bookmark-outline";
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Watchlist" component={WatchlistScreen} />
    </Tab.Navigator>
  );
}