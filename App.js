import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./src/navigation/RootNavigator";
import { WatchlistProvider } from "./src/state/watchlist/WatchlistContext";

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

export default function App() {
  return (
    <WatchlistProvider>
      <NavigationContainer theme={AppTheme}>
        <StatusBar style="light" />
        <RootNavigator />
      </NavigationContainer>
    </WatchlistProvider>
  );
}
