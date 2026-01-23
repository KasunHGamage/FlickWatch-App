import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabsNavigator from "./TabsNavigator";
import DetailScreen from "../screens/DetailScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0b0b0f" },
        headerTintColor: "#f5f5f5",
        headerTitleStyle: { fontWeight: "700" },
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerBackTitle: "",
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{ headerShown: false, title: "" }}
      />

      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: "Details",
          headerBackTitleVisible: false,
          headerBackTitle: "",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack.Navigator>
  );
}
