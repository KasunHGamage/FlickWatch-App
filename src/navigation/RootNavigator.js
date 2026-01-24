import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabsNavigator from "./TabsNavigator";
import DetailScreen from "../screens/DetailScreen";
import { useTheme } from "../state/theme/ThemeContext";
import { darkTheme, lightTheme } from "../state/theme/colors";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
          fontWeight: "800",
        },
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
    >
      {/* Bottom tabs (Home / Search / Watchlist) */}
      <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{
          headerShown: false,
        }}
      />

      {/* Details screen */}
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: "",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack.Navigator>
  );
}
