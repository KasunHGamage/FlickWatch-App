import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import RootNavigator from "./src/navigation/RootNavigator";
import { WatchlistProvider } from "./src/state/watchlist/WatchlistContext";
import { ThemeProvider, useTheme } from "./src/state/theme/ThemeContext";

function AppContainer() {
  const { theme, loading } = useTheme();

  if (loading) return null;

  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <WatchlistProvider>
        <AppContainer />
      </WatchlistProvider>
    </ThemeProvider>
  );
}